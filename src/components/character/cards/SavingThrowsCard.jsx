// src/components/character/cards/SavingThrowsCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dice6 } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function SavingThrowsCard({ character, getSavingThrow, getModifier, updateSavingThrow, formatModifier, updateCharacter }) {
  const savingThrows = [
    { name: "חוסן", key: "fortitude", ability: "constitution" },
    { name: "רפלקס", key: "reflex", ability: "dexterity" },
    { name: "רצון", key: "will", ability: "wisdom" }
  ];

  // Set correct values from your Excel
  const initialData = {
    fortitude: {
      base: character.saving_throws?.fortitude?.base || 2, // From Excel
      magic: character.saving_throws?.fortitude?.magic || 0,
      misc: character.saving_throws?.fortitude?.misc || 0
    },
    reflex: {
      base: character.saving_throws?.reflex?.base || 0, // From Excel
      magic: character.saving_throws?.reflex?.magic || 0,
      misc: character.saving_throws?.reflex?.misc || 0
    },
    will: {
      base: character.saving_throws?.will?.base || 2, // From Excel
      magic: character.saving_throws?.will?.magic || 0,
      misc: character.saving_throws?.will?.misc || 0
    }
  };

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, (updatedData) => {
    console.log('💾 Saving saving throws:', updatedData);
    
    // Update saving throws directly through updateCharacter
    updateCharacter("saving_throws", updatedData);
  });

  const calculateSavingThrow = (saveKey) => {
    const saveData = editing ? tempData[saveKey] : (character.saving_throws?.[saveKey] || initialData[saveKey]);
    const save = savingThrows.find(s => s.key === saveKey);
    
    let abilityMod = 0;
    if (save.ability === "constitution") abilityMod = getModifier(character.constitution);
    if (save.ability === "dexterity") abilityMod = getModifier(character.dexterity);
    if (save.ability === "wisdom") abilityMod = getModifier(character.wisdom);

    return (saveData.base || 0) + abilityMod + (saveData.magic || 0) + (saveData.misc || 0);
  };

  return (
    <Card className="shadow-lg border-green-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#05b6d3] to-[#13b7a6] text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between w-full text-lg">
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
          <div className="flex items-center gap-2">
            <Dice6 className="w-5 h-5" />
            גלגולי הצלה
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {savingThrows.map((save, index) => {
          const saveData = editing ? tempData[save.key] : (character.saving_throws?.[save.key] || initialData[save.key]);
          const total = calculateSavingThrow(save.key);
          
          return (
            <div key={save.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{save.name}</span>
                <span className="text-lg font-bold text-[#05b6d3]">{formatModifier(total)}</span>
              </div>
              
              {editing ? (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="space-y-1">
                    <span className="text-gray-500">בסיס</span>
                    <Input
                      type="number"
                      value={tempData[save.key]?.base || 0}
                      onChange={(e) => updateTempData(save.key, { ...tempData[save.key], base: parseInt(e.target.value) || 0 })}
                      className="w-full h-8 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500">קסם</span>
                    <Input
                      type="number"
                      value={tempData[save.key]?.magic || 0}
                      onChange={(e) => updateTempData(save.key, { ...tempData[save.key], magic: parseInt(e.target.value) || 0 })}
                      className="w-full h-8 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500">שונות</span>
                    <Input
                      type="number"
                      value={tempData[save.key]?.misc || 0}
                      onChange={(e) => updateTempData(save.key, { ...tempData[save.key], misc: parseInt(e.target.value) || 0 })}
                      className="w-full h-8 text-center"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
                  <div className="text-center">
                    <span>בסיס</span>
                    <div className="font-medium">{saveData.base || 0}</div>
                  </div>
                  <div className="text-center">
                    <span>{save.ability.slice(0, 3).toUpperCase()}</span>
                    <div className="font-medium">{formatModifier(getModifier(character[save.ability]))}</div>
                  </div>
                  <div className="text-center">
                    <span>קסם</span>
                    <div className="font-medium">{saveData.magic || 0}</div>
                  </div>
                  <div className="text-center">
                    <span>שונות</span>
                    <div className="font-medium">{saveData.misc || 0}</div>
                  </div>
                </div>
              )}
              
              {index < savingThrows.length - 1 && <Separator />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}