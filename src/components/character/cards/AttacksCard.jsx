import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Swords } from "lucide-react";

export default function AttacksCard() {
  return (
    <Card className="shadow-lg border-orange-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#f87270] to-[#fb923d] text-white rounded-t-lg py-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Swords className="w-4 h-4" />
          התקפות וכישורי קרב
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
            <TableHeader>
                <TableRow className="bg-orange-100/50">
                    <TableHead className="text-right text-xs p-1 text-gray-900">נשק</TableHead>
                    <TableHead className="text-center text-xs p-1 text-gray-900">התקפה</TableHead>
                    <TableHead className="text-center text-xs p-1 text-gray-900">נזק</TableHead>
                    <TableHead className="text-center text-xs p-1 text-gray-900">טווח</TableHead>
                    <TableHead className="text-center text-xs p-1 text-gray-900">סוג</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="hover:bg-orange-50/50">
                    <TableCell className="font-medium text-gray-900 text-sm p-2">חרב ארוכה</TableCell>
                    <TableCell className="text-center p-2 font-semibold text-gray-700">+7</TableCell>
                    <TableCell className="text-center p-2 text-gray-700">1d8+3</TableCell>
                    <TableCell className="text-center p-2 text-gray-700">-</TableCell>
                    <TableCell className="text-center p-2 text-gray-700">חיתוך</TableCell>
                </TableRow>
                <TableRow className="hover:bg-orange-50/50">
                    <TableCell className="font-medium text-gray-900 text-sm p-2">קשת ארוכה</TableCell>
                    <TableCell className="text-center p-2 font-semibold text-gray-700">+5</TableCell>
                    <TableCell className="text-center p-2 text-gray-700">1d8</TableCell>
                    <TableCell className="text-center p-2 text-gray-700">100 רגל</TableCell>
                    <TableCell className="text-center p-2 text-gray-700">דקירה</TableCell>
                </TableRow>
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 