import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function ArmorCard() {
  return (
    <Card className="shadow-lg border-sky-300 bg-white">
      <CardHeader className="card-header-equipment-armor">
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          שריון
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-sky-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">שריון עור</p>
              <p className="text-sm text-gray-500">סוג: שריון קל</p>
            </div>
            <Badge variant="outline" className="border-sky-300 text-sky-700">
              מודיפיקטור זריזות +11
            </Badge>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-sky-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">מגן עץ</p>
              <p className="text-sm text-gray-500">סוג: מגן</p>
            </div>
            <Badge variant="outline" className="border-sky-300 text-sky-700">
              +2
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 