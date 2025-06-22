import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dice6 } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function SavingThrowsCard({ character, getSavingThrow, getModifier, updateSavingThrow, formatModifier }) {
  const savingThrows = [
    { name: "חוסן", key: "fortitude", ability: "constitution" },
    { name: "רפלקס", key: "reflex", ability: "dexterity" },
    { name: "רצון", key: "will", ability: "wisdom" }
  ];

  const initialData = savingThrows.reduce((acc, save) => {
    acc[save.key] = {
      base: character.saving_throws?.[save.key]?.base || 0,
      magic: character.saving_throws?.[save.key]?.magic || 0,
      misc: character.saving_throws?.[save.key]?.misc || 0
    };
    return acc;
  }, {});

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, (updatedData) => {
    // Update each saving throw with the new data
    Object.entries(updatedData).forEach(([saveKey, saveData]) => {
      updateSavingThrow(saveKey, "base", saveData.base);
      updateSavingThrow(saveKey, "magic", saveData.magic);
      updateSavingThrow(saveKey, "misc", saveData.misc);
    });
  });

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
        {savingThrows.map((save) => {
          const saveData = character.saving_throws?.[save.key] || {};
          const tempSaveData = tempData[save.key] || {};
          const total = getSavingThrow(save.key);
          
          return (
            <div key={save.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{save.name}</span>
                <span className="text-lg font-bold text-[#05b6d3]">{formatModifier(total)}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div className="text-center">
                  <span>בסיס: {saveData.base || 0}</span>
                  {editing && (
                    <Input
                      type="number"
                      value={tempSaveData.base || 0}
                      onChange={(e) => updateTempData(save.key, "base", parseInt(e.target.value) || 0)}
                      className="w-full h-6 text-center mt-1"
                    />
                  )}
                </div>
                <div className="text-center">
                  <span>קסם: {saveData.magic || 0}</span>
                  {editing && (
                    <Input
                      type="number"
                      value={tempSaveData.magic || 0}
                      onChange={(e) => updateTempData(save.key, "magic", parseInt(e.target.value) || 0)}
                      className="w-full h-6 text-center mt-1"
                    />
                  )}
                </div>
                <div className="text-center">
                  <span>שונות: {saveData.misc || 0}</span>
                  {editing && (
                    <Input
                      type="number"
                      value={tempSaveData.misc || 0}
                      onChange={(e) => updateTempData(save.key, "misc", parseInt(e.target.value) || 0)}
                      className="w-full h-6 text-center mt-1"
                    />
                  )}
                </div>
              </div>
              {save.key !== "will" && <Separator />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
} 