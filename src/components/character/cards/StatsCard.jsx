import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GitCommitHorizontal } from "lucide-react";

export default function StatsCard({ abilities, character, editing, updateAbility, calculateTotal, getModifier, formatModifier }) {
  return (
    <Card className="shadow-lg border border-slate-300 bg-white">
      <CardHeader className="card-header-stats">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GitCommitHorizontal className="w-5 h-5" />
          תכונות
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100/50">
              <TableHead className="text-right text-xs p-1 text-gray-900">תכונה</TableHead>
              <TableHead className="text-center text-xs p-1 text-gray-900">מתאם</TableHead>
              <TableHead className="text-center text-xs p-1 text-gray-900">סה"כ</TableHead>
              <TableHead className="text-center text-xs p-1 text-gray-900">בסיס</TableHead>
              <TableHead className="text-center text-xs p-1 text-gray-900">גזע</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {abilities.map((abilityInfo) => {
              const abilityData = character[abilityInfo.key] || {};
              return (
                <TableRow key={abilityInfo.key} className="hover:bg-slate-100/50">
                  <TableCell className="font-medium text-gray-900 p-2">
                    {abilityInfo.name} <br />
                    <span className="text-xs text-gray-600">({abilityInfo.short})</span>
                  </TableCell>
                  <TableCell className="text-center font-bold text-lg text-[#2c3e50] p-2">{formatModifier(getModifier(abilityData))}</TableCell>
                  <TableCell className="text-center font-bold text-lg text-gray-900 p-2">{calculateTotal(abilityData)}</TableCell>
                  <TableCell className="p-1">
                    {editing ? <Input type="number" value={abilityData.base || 0} onChange={(e) => updateAbility(abilityInfo.key, "base", parseInt(e.target.value) || 0)} className="w-12 h-8 text-center mx-auto"/> : <div className="text-center text-gray-900">{abilityData.base || 0}</div>}
                  </TableCell>
                   <TableCell className="p-1">
                    {editing ? <Input type="number" value={abilityData.racial || 0} onChange={(e) => updateAbility(abilityInfo.key, "racial", parseInt(e.target.value) || 0)} className="w-12 h-8 text-center mx-auto"/> : <div className="text-center text-gray-900">{abilityData.racial || 0}</div>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 