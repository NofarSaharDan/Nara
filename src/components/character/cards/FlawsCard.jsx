import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { useSingleFieldEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function FlawsCard({ character, updateCharacter }) {
  const {
    editing,
    tempValue,
    startEditing,
    saveChanges,
    cancelEditing,
    setTempValue
  } = useSingleFieldEditing(character.flaws, updateCharacter, "flaws");

  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-flaws">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            פגמים
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
            placeholder="תאר את הפגמים של הדמות..."
            rows={4}
            className="border-orange-300"
          />
        ) : (
          <div className="p-4 bg-white rounded-lg border border-orange-200">
            <p className="text-orange-700 leading-relaxed whitespace-pre-wrap text-sm">
              {character.flaws || "לא הוגדרו פגמים"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 