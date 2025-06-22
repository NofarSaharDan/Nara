import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, BrainCircuit, Target } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function SpellSummaryCard({ character, updateCharacter }) {
  const initialData = {
    spell_casting_ability: character.spell_casting_ability || "",
    spell_save_dc: character.spell_save_dc || 0,
    spell_attack_bonus: character.spell_attack_bonus || 0
  };

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, (updatedData) => {
    updateCharacter("spell_casting_ability", updatedData.spell_casting_ability);
    updateCharacter("spell_save_dc", updatedData.spell_save_dc);
    updateCharacter("spell_attack_bonus", updatedData.spell_attack_bonus);
  });

  return (
    <Card className="shadow-lg border-blue-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#3c82f7] to-[#818cf8] text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            סיכום לחשים
          </div>
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-800 mb-1">תכונת הטלת לחשים</p>
          {editing ? (
            <Input
              value={tempData.spell_casting_ability}
              onChange={(e) => updateTempData("spell_casting_ability", e.target.value)}
              className="text-center border-blue-300"
            />
          ) : (
            <p className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <BrainCircuit className="w-6 h-6 text-blue-500"/> {character?.spell_casting_ability || "-"}
            </p>
          )}
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-800 mb-1">דירוג קושי להצלה</p>
          {editing ? (
            <Input
              type="number"
              value={tempData.spell_save_dc}
              onChange={(e) => updateTempData("spell_save_dc", parseInt(e.target.value) || 0)}
              className="text-center border-blue-300"
            />
          ) : (
            <p className="text-3xl font-bold text-gray-900">{character?.spell_save_dc || "-"}</p>
          )}
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-800 mb-1">בונוס התקפה ללחשים</p>
          {editing ? (
            <Input
              type="number"
              value={tempData.spell_attack_bonus}
              onChange={(e) => updateTempData("spell_attack_bonus", parseInt(e.target.value) || 0)}
              className="text-center border-blue-300"
            />
          ) : (
            <p className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Target className="w-6 h-6 text-blue-500"/> +{character?.spell_attack_bonus || "0"}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 