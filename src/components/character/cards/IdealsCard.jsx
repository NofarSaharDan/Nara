import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Target } from "lucide-react";
import { useSingleFieldEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function IdealsCard({ character, updateCharacter }) {
  const {
    editing,
    tempValue,
    startEditing,
    saveChanges,
    cancelEditing,
    setTempValue
  } = useSingleFieldEditing(character.ideals, updateCharacter, "ideals");

  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-ideals">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            אידיאלים
          </div>
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <Textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            placeholder="תאר את האידיאלים של הדמות..."
            rows={4}
            className="border-blue-300"
          />
        ) : (
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <p className="text-blue-700 leading-relaxed whitespace-pre-wrap text-sm">
              {character.ideals || "לא הוגדרו אידיאלים"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 