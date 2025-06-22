import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Coins, Plus, Minus } from "lucide-react";

export default function MoneyCard({ character, totalGoldValue, moneyChangeAmount, setMoneyChangeAmount, handleMoneyChange }) {
  return (
    <Card className="shadow-lg border-yellow-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#f59f09] to-[#fabf23] text-white rounded-t-lg py-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Coins className="w-4 h-4" />
          כסף
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="text-center">
          <div className="text-sm text-gray-600">סה"כ (במטבעות זהב)</div>
          <div className="text-2xl font-bold text-gray-900 my-1">{totalGoldValue.toFixed(2)}</div>
          <div className="text-xs text-gray-600">
            {character.money?.platinum || 0} פלטינום, {character.money?.gold || 0} זהב, {character.money?.silver || 0} כסף, {character.money?.copper || 0} נחושת
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <Input 
            type="number" 
            value={moneyChangeAmount} 
            onChange={(e) => setMoneyChangeAmount(parseInt(e.target.value) || 0)} 
            className="w-24 text-center"
            placeholder="הוסף/הסר"
          />
          <Button onClick={() => handleMoneyChange(moneyChangeAmount)} size="sm" className="bg-[#f59f09] hover:bg-[#fabf23]">
            <Plus className="w-3 h-3" />
          </Button>
          <Button onClick={() => handleMoneyChange(-moneyChangeAmount)} size="sm" className="bg-[#f59f09] hover:bg-[#fabf23]">
            <Minus className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 