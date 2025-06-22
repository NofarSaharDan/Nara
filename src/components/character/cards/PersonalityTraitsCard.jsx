import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

export default function PersonalityTraitsCard({ character, editing, updateCharacter }) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-personality">
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          תכונות אישיות
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <Textarea
            value={character.personality_traits || ""}
            onChange={(e) => updateCharacter("personality_traits", e.target.value)}
            placeholder="תאר את תכונות האישיות של הדמות..."
            rows={4}
            className="border-green-300"
          />
        ) : (
          <div className="p-4 bg-white rounded-lg border border-green-200 min-h-[100px]">
            <p className="text-green-700 leading-relaxed whitespace-pre-wrap">
              {character.personality_traits || "לא הוגדרו תכונות אישיות"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 