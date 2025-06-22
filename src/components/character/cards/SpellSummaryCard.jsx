import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BrainCircuit, Target } from "lucide-react";

export default function SpellSummaryCard({ character }) {
  return (
    <Card className="shadow-lg border-blue-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#3c82f7] to-[#818cf8] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          סיכום לחשים
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-800 mb-1">תכונת הטלת לחשים</p>
          <p className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-500"/> {character?.spell_casting_ability || "-"}
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-800 mb-1">דירוג קושי להצלה</p>
          <p className="text-3xl font-bold text-gray-900">{character?.spell_save_dc || "-"}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-800 mb-1">בונוס התקפה ללחשים</p>
           <p className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
             <Target className="w-6 h-6 text-blue-500"/> +{character?.spell_attack_bonus || "0"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 