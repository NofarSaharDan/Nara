import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";

export default function HitPointsCard({ character, editing, updateCharacter }) {
  return (
    <Card className="shadow-lg border border-rose-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#f472b3] to-[#f87173] text-white rounded-t-lg py-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Heart className="w-4 h-4" />
          נק׳ חיים
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
          <div className="text-center">
            <Label className="text-sm text-gray-600">סה״כ</Label>
            <div className="text-4xl font-bold text-gray-900">
              {(character.hit_points_base || 0) - (character.hit_points_wounds || 0)}
            </div>
             <span className="text-xs text-gray-600">לא כולל נזק הכנעה</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <Label className="text-xs text-gray-600">בסיס</Label>
                {editing ? <Input type="number" value={character.hit_points_base || 0} onChange={(e) => updateCharacter("hit_points_base", parseInt(e.target.value) || 0)} className="h-8"/> : <div className="font-semibold text-gray-900">{character.hit_points_base || 0}</div>}
              </div>
              <div>
                <Label className="text-xs text-gray-600">פצעים</Label>
                {editing ? <Input type="number" value={character.hit_points_wounds || 0} onChange={(e) => updateCharacter("hit_points_wounds", parseInt(e.target.value) || 0)} className="h-8"/> : <div className="font-semibold text-gray-900">{character.hit_points_wounds || 0}</div>}
              </div>
              <div>
                <Label className="text-xs text-gray-600">הכנעה</Label>
                {editing ? <Input type="number" value={character.hit_points_subdual || 0} onChange={(e) => updateCharacter("hit_points_subdual", parseInt(e.target.value) || 0)} className="h-8"/> : <div className="font-semibold text-gray-900">{character.hit_points_subdual || 0}</div>}
              </div>
          </div>
      </CardContent>
    </Card>
  );
} 