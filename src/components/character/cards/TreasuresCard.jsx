import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function TreasuresCard() {
  return (
    <Card className="shadow-lg border-purple-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#a856f8] to-[#a78bfa] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          פריטים מיוחדים ואוצרות
        </CardTitle>
      </CardHeader>
       <CardContent className="p-6 space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-200">
            <div>
              <p className="font-bold text-gray-800 flex items-center gap-2">קמע אסגארד <Badge variant="outline" className="border-purple-300 text-purple-700">נדיר</Badge></p>
              <p className="text-sm text-gray-500 mt-1">קמע עתיק של האל האסגארדי</p>
            </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-200">
            <div>
              <p className="font-bold text-gray-800 flex items-center gap-2">זיכרון דרקוני <Badge variant="outline" className="border-purple-300 text-purple-700">יוצא דופן</Badge></p>
              <p className="text-sm text-gray-500 mt-1">חרוז מכיל זיכרונות עתיקים</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
} 