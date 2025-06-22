import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function HitPointsCard({ character, updateCharacter }) {
  const initialData = {
    base: character.hit_points_base || 0,
    wounds: character.hit_points_wounds || 0
  };

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, (updatedData) => {
    updateCharacter("hit_points_base", updatedData.base);
    updateCharacter("hit_points_wounds", updatedData.wounds);
  });

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
      <CardContent className="p-4 space-y-3">
        <div className="text-center">
          <Label className="text-sm text-gray-600">סה״כ</Label>
          <div className="text-4xl font-bold text-gray-900">
            {(character.hit_points_base || 0) - (character.hit_points_wounds || 0)}
          </div>
          <span className="text-xs text-gray-600">לא כולל נזק הכנעה</span>
        </div>
        
        {editing && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">נק׳ חיים בסיס</Label>
              <Input
                type="number"
                value={tempData.base || 0}
                onChange={(e) => updateTempData("base", parseInt(e.target.value) || 0)}
                className="text-center"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">נזק</Label>
              <Input
                type="number"
                value={tempData.wounds || 0}
                onChange={(e) => updateTempData("wounds", parseInt(e.target.value) || 0)}
                className="text-center"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 