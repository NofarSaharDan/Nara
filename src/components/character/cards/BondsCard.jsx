import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

export default function BondsCard({ character, editing, updateCharacter }) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-bonds">
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          קשרים
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <Textarea
            value={character.bonds || ""}
            onChange={(e) => updateCharacter("bonds", e.target.value)}
            placeholder="מי או מה חשוב לדמות? מה מחבר אותה לעולם?"
            rows={3}
            className="border-pink-300"
          />
        ) : (
          <div className="p-4 bg-white rounded-lg border border-pink-200 min-h-[80px]">
            <p className="text-pink-700 leading-relaxed whitespace-pre-wrap">
              {character.bonds || "לא הוגדרו קשרים"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 