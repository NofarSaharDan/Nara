import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

export default function LanguagesCard({ character, editing, addLanguage, removeLanguage }) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-languages">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          שפות
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {editing ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {character.languages?.map((language, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-300 cursor-pointer hover:bg-blue-200"
                  onClick={() => removeLanguage(language)}
                >
                  {language} ×
                </Badge>
              ))}
            </div>
            <Input
              placeholder="הוסף שפה חדשה..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  addLanguage(e.target.value.trim());
                  e.target.value = '';
                }
              }}
              className="border-blue-300"
            />
            <p className="text-xs text-blue-600">לחץ Enter להוספת שפה, לחץ על שפה כדי להסיר</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {character.languages?.length > 0 ? (
              character.languages.map((language, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-300"
                >
                  {language}
                </Badge>
              ))
            ) : (
              <p className="text-blue-600">לא הוגדרו שפות</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 