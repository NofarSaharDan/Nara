import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export default function IdealsCard({ character, editing, updateCharacter }) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-ideals">
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          אידיאלים
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <Textarea
            value={character.ideals || ""}
            onChange={(e) => updateCharacter("ideals", e.target.value)}
            placeholder="מה מניע את הדמות? מה האידיאלים שלה?"
            rows={3}
            className="border-yellow-300"
          />
        ) : (
          <div className="p-4 bg-white rounded-lg border border-yellow-200 min-h-[80px]">
            <p className="text-yellow-700 leading-relaxed whitespace-pre-wrap">
              {character.ideals || "לא הוגדרו אידיאלים"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 