import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";
import { useSingleFieldEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function BondsCard({ character, updateCharacter }) {
  const {
    editing,
    tempValue,
    startEditing,
    saveChanges,
    cancelEditing,
    setTempValue
  } = useSingleFieldEditing(character.bonds, updateCharacter, "bonds");

  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-bonds">
        <CardTitle className="flex items-center justify-between w-full">
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            קשרים
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <Textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            placeholder="תאר את הקשרים של הדמות..."
            rows={4}
            className="border-red-300"
          />
        ) : (
          <div className="p-4 bg-white rounded-lg border border-red-200">
            <p className="text-red-700 leading-relaxed whitespace-pre-wrap text-sm">
              {character.bonds || "לא הוגדרו קשרים"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 