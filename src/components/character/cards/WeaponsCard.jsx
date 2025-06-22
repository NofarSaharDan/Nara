import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sword } from "lucide-react";

export default function WeaponsCard() {
  return (
    <Card className="shadow-lg border-red-300 bg-white">
      <CardHeader className="card-header-equipment-weapons">
        <CardTitle className="flex items-center gap-2">
          <Sword className="w-5 h-5" />
          נשקים
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-red-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">חרב קצרה</p>
              <p className="text-sm text-gray-500">סוג נזק: חיתוך, תכונות: קל, פיניס</p>
            </div>
            <Badge variant="outline" className="border-red-300 text-red-700">
              1d6
            </Badge>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-red-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">קשת קצרה</p>
              <p className="text-sm text-gray-500">סוג נזק: חודר, תכונות: תחמושת, טווח</p>
            </div>
            <Badge variant="outline" className="border-red-300 text-red-700">
              1d6
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 