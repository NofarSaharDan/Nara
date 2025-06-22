import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { useSingleFieldEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function PersonalityTraitsCard({ character, updateCharacter }) {
  const {
    editing,
    tempValue,
    startEditing,
    saveChanges,
    cancelEditing,
    setTempValue
  } = useSingleFieldEditing(character.personality_traits, updateCharacter, "personality_traits");

  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-personality">
        <CardTitle className="flex items-center justify-between w-full">
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            תכונות אישיות
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <Textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            placeholder="תאר את תכונות האישיות של הדמות..."
            rows={4}
            className="border-pink-300"
          />
        ) : (
          <div className="p-4 bg-white rounded-lg border border-pink-200">
            <p className="text-pink-700 leading-relaxed whitespace-pre-wrap text-sm">
              {character.personality_traits || "לא הוגדרו תכונות אישיות"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 