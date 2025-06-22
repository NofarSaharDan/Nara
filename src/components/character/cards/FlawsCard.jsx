import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";

export default function FlawsCard({ character, editing, updateCharacter }) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-flaws">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          פגמים
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <Textarea
            value={character.flaws || ""}
            onChange={(e) => updateCharacter("flaws", e.target.value)}
            placeholder="מה החולשות והפחדים של הדמות?"
            rows={3}
            className="border-red-300"
          />
        ) : (
          <div className="p-4 bg-white rounded-lg border border-red-200 min-h-[80px]">
            <p className="text-red-700 leading-relaxed whitespace-pre-wrap">
              {character.flaws || "לא הוגדרו חולשות"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 