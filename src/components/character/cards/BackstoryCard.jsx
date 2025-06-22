import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book } from "lucide-react";

export default function BackstoryCard({ character, editing, updateCharacter }) {
  return (
    <Card className="lg:col-span-2 shadow-lg">
      <CardHeader className="card-header-background-backstory">
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5" />
          סיפור הרקע
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <Textarea
            value={character.backstory || ""}
            onChange={(e) => updateCharacter("backstory", e.target.value)}
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