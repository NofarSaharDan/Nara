// src/components/character/cards/MoneyCard.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Coins, Plus, Minus, History, ChevronDown, ChevronUp } from "lucide-react";

export default function MoneyCard({ character, totalGoldValue, updateCharacter }) {
  const [moneyChangeAmount, setMoneyChangeAmount] = useState(0);
  const [transactionNote, setTransactionNote] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const handleMoneyChange = (amount, isIncome = true) => {
    const { gold = 0, silver = 0, copper = 0, platinum = 0 } = character.money || {};
    const currentTotal = gold + (silver / 10) + (copper / 100) + (platinum * 10);
    const finalAmount = isIncome ? Math.abs(amount) : -Math.abs(amount);
    const newTotal = Math.max(0, currentTotal + finalAmount);

    // Convert back to coins
    let remaining = newTotal;
    const newPlatinum = Math.floor(remaining / 10);
    remaining -= newPlatinum * 10;
    const newGold = Math.floor(remaining);
    remaining -= newGold;
    const newSilver = Math.floor(remaining * 10);
    remaining -= newSilver / 10;
    const newCopper = Math.round(remaining * 100);

    const updatedMoney = {
      ...(character.money || {}),
      gold: newGold,
      silver: newSilver,
      copper: newCopper,
      platinum: newPlatinum
    };

    // Add transaction to history
    const transaction = {
      id: Date.now(),
      amount: finalAmount,
      note: transactionNote || (isIncome ? "הכנסה" : "הוצאה"),
      date: new Date().toISOString(),
      type: isIncome ? "income" : "expense"
    };

    const transactionHistory = character.money_history || [];
    const updatedHistory = [transaction, ...transactionHistory].slice(0, 50); // Keep last 50 transactions

    updateCharacter("money", updatedMoney);
    updateCharacter("money_history", updatedHistory);
    
    setMoneyChangeAmount(0);
    setTransactionNote("");
  };

  const getRecentTransactions = () => {
    return (character.money_history || []).slice(0, 5);
  };

  const getAllTransactions = () => {
    return character.money_history || [];
  };

  return (
    <Card className="shadow-lg border-yellow-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#f59f09] to-[#fabf23] text-white rounded-t-lg py-3">
        <CardTitle className="text-lg flex items-center justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="w-4 h-4 mr-1" />
            {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </Button>
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4" />
            כסף
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Current Money Display */}
        <div className="text-center">
          <div className="text-sm text-gray-600">סה"כ (במטבעות זהב)</div>
          <div className="text-3xl font-bold text-gray-900 my-2">{totalGoldValue.toFixed(2)}</div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>{character.money?.platinum || 0} פלטינום, {character.money?.gold || 0} זהב</div>
            <div>{character.money?.silver || 0} כסף, {character.money?.copper || 0} נחושת</div>
          </div>
        </div>
        
        {/* Transaction Form */}
        <div className="space-y-3">
          <div>
            <Label className="text-sm text-gray-600">סכום (זהב)</Label>
            <Input 
              type="number" 
              step="0.01"
              value={moneyChangeAmount} 
              onChange={(e) => setMoneyChangeAmount(parseFloat(e.target.value) || 0)} 
              className="text-center h-10"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <Label className="text-sm text-gray-600">הערה</Label>
            <Textarea
              value={transactionNote}
              onChange={(e) => setTransactionNote(e.target.value)}
              placeholder="בעבור מה? (קניית ציוד, מכירת שלל, שכר...)"
              className="h-20 resize-none"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => handleMoneyChange(moneyChangeAmount, true)} 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              disabled={moneyChangeAmount <= 0}
            >
              <Plus className="w-3 h-3 mr-1" />
              הכנסה
            </Button>
            <Button 
              onClick={() => handleMoneyChange(moneyChangeAmount, false)} 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={moneyChangeAmount <= 0}
            >
              <Minus className="w-3 h-3 mr-1" />
              הוצאה
            </Button>
          </div>
        </div>

        {/* Recent Transactions */}
        {!showHistory && getRecentTransactions().length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs text-gray-500">עסקאות אחרונות</Label>
            {getRecentTransactions().map((transaction) => (
              <div key={transaction.id} className={`text-xs p-2 rounded ${transaction.type === 'income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <div className="flex justify-between">
                  <span>{transaction.type === 'income' ? '+' : ''}{transaction.amount.toFixed(2)} זהב</span>
                  <span>{new Date(transaction.date).toLocaleDateString('he-IL')}</span>
                </div>
                <div className="text-gray-600">{transaction.note}</div>
              </div>
            ))}
          </div>
        )}

        {/* Full History */}
        {showHistory && (
          <div className="space-y-2">
            <Label className="text-sm text-gray-600 flex items-center justify-between">
              <span>כל העסקאות</span>
              <span className="text-xs">({getAllTransactions().length} עסקאות)</span>
            </Label>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {getAllTransactions().map((transaction) => (
                <div key={transaction.id} className={`p-3 rounded-lg ${transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : ''}{transaction.amount.toFixed(2)} זהב
                      </div>
                      <div className="text-sm text-gray-600">{transaction.note}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('he-IL')}
                    </div>
                  </div>
                </div>
              ))}
              {!getAllTransactions().length && (
                <div className="text-center text-gray-500 py-4">אין עסקאות</div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}