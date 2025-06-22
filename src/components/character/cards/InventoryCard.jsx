import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export default function InventoryCard() {
  return (
     <Card className="shadow-lg border-green-300 bg-white">
      <CardHeader className="card-header-equipment-inventory">
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          ציוד ומלאי
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {name: 'תרמיל', quantity: 1}, {name: 'ערכת ריפוי', quantity: 1}, {name: 'חבל (15 מטר)', quantity: 1},
          {name: 'לפיד', quantity: 10}, {name: 'מנות ליום', quantity: 5}, {name: 'כד מים', quantity: 1},
          {name: 'סכין', quantity: 1}, {name: 'חליפי טיפוס', quantity: 1},
        ].map(item => (
            <div key={item.name} className="p-3 bg-white rounded-lg shadow-sm border border-green-200 flex justify-between items-center">
               <span className="font-semibold text-gray-800">{item.name}</span>
               <Badge variant="secondary" className="bg-green-100 text-green-800">x {item.quantity}</Badge>
            </div>
        ))}
      </CardContent>
    </Card>
  );
} 