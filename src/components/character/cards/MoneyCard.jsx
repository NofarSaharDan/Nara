import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Coins, Plus, Minus } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function MoneyCard({ character, totalGoldValue, moneyChangeAmount, setMoneyChangeAmount, handleMoneyChange }) {
  const initialData = {
    platinum: character.money?.platinum || 0,
    gold: character.money?.gold || 0,
    silver: character.money?.silver || 0,
    copper: character.money?.copper || 0
  };

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, (updatedData) => {
    // Update money through the existing handler
    const currentTotal = (character.money?.gold || 0) + ((character.money?.silver || 0) / 10) + ((character.money?.copper || 0) / 100) + ((character.money?.platinum || 0) * 10);
    const newTotal = (updatedData.gold || 0) + ((updatedData.silver || 0) / 10) + ((updatedData.copper || 0) / 100) + ((updatedData.platinum || 0) * 10);
    const difference = newTotal - currentTotal;
    handleMoneyChange(difference);
  });

  return (
    <Card className="shadow-lg border-yellow-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#f59f09] to-[#fabf23] text-white rounded-t-lg py-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4" />
            כסף
          </div>
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
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
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-600">פלטינום</Label>
              <Input
                type="number"
                value={tempData.platinum || 0}
                onChange={(e) => updateTempData("platinum", parseInt(e.target.value) || 0)}
                className="h-8 text-center"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-600">זהב</Label>
              <Input
                type="number"
                value={tempData.gold || 0}
                onChange={(e) => updateTempData("gold", parseInt(e.target.value) || 0)}
                className="h-8 text-center"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-600">כסף</Label>
              <Input
                type="number"
                value={tempData.silver || 0}
                onChange={(e) => updateTempData("silver", parseInt(e.target.value) || 0)}
                className="h-8 text-center"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-600">נחושת</Label>
              <Input
                type="number"
                value={tempData.copper || 0}
                onChange={(e) => updateTempData("copper", parseInt(e.target.value) || 0)}
                className="h-8 text-center"
              />
            </div>
          </div>
        )}
        
        {!editing && (
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
        )}
      </CardContent>
    </Card>
  );
} 