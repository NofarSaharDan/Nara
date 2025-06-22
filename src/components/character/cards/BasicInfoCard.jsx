import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function BasicInfoCard({ character, updateCharacter }) {
  const initialData = {
    name: character.name || "",
    race: character.race || "",
    class: character.class || "",
    level: character.level || 1,
    background: character.background || "",
    alignment: character.alignment || ""
  };

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, updateCharacter);

  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-basic-info">
        <CardTitle className="flex items-center justify-between w-full">
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            פרטי הדמות
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-amber-700">שם</Label>
            {editing ? (
              <Input
                value={tempData.name}
                onChange={(e) => updateTempData("name", e.target.value)}
                className="border-amber-300"
              />
            ) : (
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <div className="font-semibold text-amber-800">{character.name}</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-amber-700">גזע</Label>
            {editing ? (
              <Input
                value={tempData.race}
                onChange={(e) => updateTempData("race", e.target.value)}
                className="border-amber-300"
              />
            ) : (
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <div className="font-semibold text-amber-800">{character.race}</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-amber-700">מחלקה</Label>
            {editing ? (
              <Input
                value={tempData.class}
                onChange={(e) => updateTempData("class", e.target.value)}
                className="border-amber-300"
              />
            ) : (
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <div className="font-semibold text-amber-800">{character.class}</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-amber-700">רמה</Label>
            {editing ? (
              <Input
                type="number"
                min="1"
                max="20"
                value={tempData.level}
                onChange={(e) => updateTempData("level", parseInt(e.target.value) || 1)}
                className="border-amber-300"
              />
            ) : (
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <div className="font-semibold text-amber-800">{character.level}</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-amber-700">רקע</Label>
            {editing ? (
              <Input
                value={tempData.background}
                onChange={(e) => updateTempData("background", e.target.value)}
                className="border-amber-300"
              />
            ) : (
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <div className="font-semibold text-amber-800">{character.background}</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-amber-700">יישור מוסרי</Label>
            {editing ? (
              <Input
                value={tempData.alignment}
                onChange={(e) => updateTempData("alignment", e.target.value)}
                className="border-amber-300"
              />
            ) : (
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <div className="font-semibold text-amber-800">{character.alignment}</div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 