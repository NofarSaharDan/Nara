import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Coins, Plus, Minus } from "lucide-react";

export default function MoneyCard({ character, editing, totalGoldValue, moneyChangeAmount, setMoneyChangeAmount, handleMoneyChange }) {
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
            <Label className="text-sm text-gray-600">סה"כ (במטבעות זהב)</Label>
            <div className="text-2xl font-bold text-gray-900 my-1">{totalGoldValue.toFixed(2)}</div>
            <div className="text-xs text-gray-600">
              {character.money?.platinum || 0} פלטינום, {character.money?.gold || 0} זהב, {character.money?.silver || 0} כסף, {character.money?.copper || 0} נחושת
            </div>
          </div>
          {editing && (
            <div className="flex items-center gap-2 mt-4">
              <Input
                type="number"
                className="w-full h-9 text-center"
                placeholder="סכום (בזהב)..."
                value={moneyChangeAmount || ''}
                onChange={e => setMoneyChangeAmount(parseFloat(e.target.value) || 0)}
              />
              <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleMoneyChange(moneyChangeAmount)}>
                <Plus className="h-4 w-4 ml-1"/>הוסף
              </Button>
              <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={() => handleMoneyChange(-moneyChangeAmount)}>
                <Minus className="h-4 w-4 ml-1"/>הורד
              </Button>
            </div>
          )}
      </CardContent>
    </Card>
  );
} 