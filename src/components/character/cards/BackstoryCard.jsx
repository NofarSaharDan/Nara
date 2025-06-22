import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book } from "lucide-react";
import { useSingleFieldEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function BackstoryCard({ character, updateCharacter }) {
  const {
    editing,
    tempValue,
    startEditing,
    saveChanges,
    cancelEditing,
    setTempValue
  } = useSingleFieldEditing(character.backstory, updateCharacter, "backstory");

  return (
    <Card className="lg:col-span-2 shadow-lg">
      <CardHeader className="card-header-background-backstory">
        <CardTitle className="flex items-center justify-between w-full">
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5" />
            סיפור הרקע
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <Textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            placeholder="ספר את סיפור חייה של הדמות..."
            rows={10}
            className="border-indigo-300"
          />
        ) : (
          <ScrollArea className="h-80">
            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <p className="text-indigo-700 leading-relaxed whitespace-pre-wrap text-sm">
                {character.backstory || "לא הוגדר סיפור רקע"}
              </p>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
} 