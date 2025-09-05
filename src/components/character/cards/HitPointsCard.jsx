// src/components/character/cards/HitPointsCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function HitPointsCard({ character, updateCharacter, getModifier }) {
// Calculate HP - Your specific character (19 total)
const calculateBaseHP = () => {
  // Your actual HP breakdown:
  // 8 (level 1) + 6 (level 2) + 5 (CON bonus) = 19
  return 19;
};

const getHPBreakdown = () => {
  return {
    level1: 8,
    level2: 6, 
    conBonus: 5,
    total: 19
  };
};

  const initialData = {
    current: character.hit_points_current ?? calculateBaseHP(),
    wounds: character.hit_points_wounds || 0,
    temporary: character.hit_points_temporary || 0,
    base: character.hit_points_base ?? calculateBaseHP()
  };

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, (updatedData) => {
    console.log('💾 Saving HP data:', updatedData);
    updateCharacter("hit_points_current", updatedData.current);
    updateCharacter("hit_points_wounds", updatedData.wounds);
    updateCharacter("hit_points_temporary", updatedData.temporary);
    updateCharacter("hit_points_base", updatedData.base);
  });

  const getCurrentHP = () => {
    return editing ? (tempData.current ?? initialData.current) : (character.hit_points_current ?? calculateBaseHP());
  };

  const getBaseHP = () => {
    return editing ? (tempData.base ?? initialData.base) : (character.hit_points_base ?? calculateBaseHP());
  };

  const getMaxHP = () => {
    const base = getBaseHP();
    const temp = editing ? (tempData.temporary || 0) : (character.hit_points_temporary || 0);
    return base + temp;
  };

  const getWounds = () => {
    return editing ? (tempData.wounds || 0) : (character.hit_points_wounds || 0);
  };

  const quickHeal = (amount) => {
    const newCurrent = Math.min(getCurrentHP() + amount, getMaxHP());
    const newWounds = Math.max(0, getWounds() - amount);
    
    if (editing) {
      updateTempData('current', newCurrent);
      updateTempData('wounds', newWounds);
    } else {
      updateCharacter("hit_points_current", newCurrent);
      updateCharacter("hit_points_wounds", newWounds);
    }
  };

  const quickDamage = (amount) => {
    const newCurrent = Math.max(0, getCurrentHP() - amount);
    const newWounds = getWounds() + amount;
    
    if (editing) {
      updateTempData('current', newCurrent);
      updateTempData('wounds', newWounds);
    } else {
      updateCharacter("hit_points_current", newCurrent);
      updateCharacter("hit_points_wounds", newWounds);
    }
  };

  const handleLevelUp = (roll) => {
    const newLevel = (character.level || 1) + 1;
    
    // Store the roll (without CON - that's calculated separately)
    const hpRolls = character.hp_rolls || [8]; // Level 1 is max die
    hpRolls.push(roll); // Add new roll: [8, 6]
    
    // Recalculate total HP with new level
    const totalHitDice = hpRolls.reduce((sum, r) => sum + r, 0); // 8 + 6 = 14
    const conMod = getModifier ? getModifier(character.constitution) : 5;
    const totalConBonus = newLevel * conMod; // 2 × 5 = 10
    const newBaseHP = totalHitDice + totalConBonus; // 14 + 10 = 24
    
    const hpGain = newBaseHP - getBaseHP();
    const newCurrentHP = getCurrentHP() + hpGain;
    
    console.log(`🎉 Level ${newLevel}: Rolled ${roll}`);
    console.log(`   Hit Dice: ${totalHitDice}, CON bonus: ${totalConBonus}, Total HP: ${newBaseHP}`);
    
    updateCharacter("level", newLevel);
    updateCharacter("hp_rolls", hpRolls);
    updateCharacter("hit_points_base", newBaseHP);
    updateCharacter("hit_points_current", newCurrentHP);
  };

  // Calculate CON bonus for display
  const conBonus = getModifier ? getModifier(character.constitution) : 5;

  return (
    <Card className="shadow-lg border border-rose-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#f472b3] to-[#f87173] text-white rounded-t-lg py-3">
        <CardTitle className="text-lg flex items-center justify-between w-full">
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            נק׳ חיים
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Current HP Display */}
        <div className="text-center">
          <Label className="text-sm text-gray-600">חיים נוכחיים</Label>
          <div className="text-4xl font-bold text-gray-900">
            {getCurrentHP()} / {getMaxHP()}
          </div>
          {getWounds() > 0 && (
            <div className="text-sm text-red-600 mt-1">
              נזק מצטבר: {getWounds()}
            </div>
          )}
        </div>
        
        {/* HP Breakdown */}
        {editing ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">חיים בסיסיים</Label>
              <Input
                type="number"
                value={tempData.base ?? calculateBaseHP()}
                onChange={(e) => updateTempData("base", parseInt(e.target.value) || 0)}
                className="text-center h-10"
              />
              <div className="text-xs text-gray-500 mt-1">
                רמה {character.level || 1}: HD + ({character.level || 1} × {conBonus} CON)
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-600">נק׳ זמניות</Label>
              <Input
                type="number"
                value={tempData.temporary || 0}
                onChange={(e) => updateTempData("temporary", parseInt(e.target.value) || 0)}
                className="text-center h-10"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">נק׳ נוכחיות</Label>
              <Input
                type="number"
                value={tempData.current ?? calculateBaseHP()}
                onChange={(e) => updateTempData("current", parseInt(e.target.value) || 0)}
                className="text-center h-10"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">נזק מצטבר</Label>
              <Input
                type="number"
                value={tempData.wounds || 0}
                onChange={(e) => updateTempData("wounds", parseInt(e.target.value) || 0)}
                className="text-center h-10"
              />
            </div>
          </div>
        ) : (
          <>
            {/* Quick Actions */}
            <div className="flex items-center justify-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => quickHeal(1)}
                className="flex items-center gap-1 text-green-600 border-green-300 hover:bg-green-50"
              >
                <Plus className="w-3 h-3" />
                ריפוי
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => quickDamage(1)}
                className="flex items-center gap-1 text-red-600 border-red-300 hover:bg-red-50"
              >
                <Minus className="w-3 h-3" />
                נזק
              </Button>
            </div>
            
            {/* Level Up Section */}
            <div className="space-y-2 border-t pt-3">
              <Label className="text-sm text-gray-600">עליה ברמה</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="1"
                  max={character.hit_die || 8}
                  placeholder={`גלגול 1-${character.hit_die || 8}`}
                  className="text-center h-8"
                  id="levelUpRoll"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    const input = document.getElementById('levelUpRoll');
                    const roll = parseInt(input.value);
                    if (roll >= 1 && roll <= (character.hit_die || 8)) {
                      handleLevelUp(roll);
                      input.value = '';
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  רמה +
                </Button>
              </div>
              <div className="text-xs text-gray-500">
                גלגל 1d{character.hit_die || 8} עבור רמה {(character.level || 1) + 1}
              </div>
            </div>
            
            {/* HP Breakdown Display */}
<div className="text-xs text-gray-600 space-y-1">
  <div className="flex justify-between font-medium">
    <span>חיים בסיסיים:</span>
    <span>{getBaseHP()}</span>
  </div>
  
  {/* Detailed breakdown */}
  <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-2 rounded">
    <div>8 נק׳ רמה 1</div>
    <div>6 נק׳ רמה 2</div>
    <div>5 חוסן</div>
    <div className="border-t pt-1 font-medium">19 סה״כ</div>
  </div>
  
  {(character.hit_points_temporary || 0) > 0 && (
    <div className="flex justify-between text-green-600">
      <span>נק׳ זמניות:</span>
      <span>+{character.hit_points_temporary}</span>
    </div>
  )}
  {getWounds() > 0 && (
    <div className="flex justify-between text-red-600">
      <span>נזק:</span>
      <span>-{getWounds()}</span>
    </div>
  )}
  
  <div className="pt-2 border-t flex justify-between font-medium">
    <span>סה״כ מקסימום:</span>
    <span>{getMaxHP()}</span>
  </div>
</div>
          </>
        )}
      </CardContent>
    </Card>
  );
}