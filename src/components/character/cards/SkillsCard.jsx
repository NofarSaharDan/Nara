import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function SkillsCard({ skills, character, getSkillTotal, updateSkill }) {
  const initialData = skills.reduce((acc, skill) => {
    acc[skill.key] = {
      ranks: character.skills?.[skill.key]?.ranks || 0,
      misc: character.skills?.[skill.key]?.misc || 0,
      class_skill: character.skills?.[skill.key]?.class_skill || false
    };
    return acc;
  }, {});

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, (updatedData) => {
    // Update each skill with the new data
    Object.entries(updatedData).forEach(([skillKey, skillData]) => {
      updateSkill(skillKey, "ranks", skillData.ranks);
      updateSkill(skillKey, "misc", skillData.misc);
      updateSkill(skillKey, "class_skill", skillData.class_skill);
    });
  });

  return (
    <Card className="shadow-lg border border-teal-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#16a085] to-[#22c55e] text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            מיומנויות
          </div>
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[45rem]">
          <Table>
            <TableHeader className="sticky top-0 bg-teal-100/50 z-10">
              <TableRow>
                <TableHead className="text-right text-xs p-1 text-gray-900">מיומנות</TableHead>
                <TableHead className="text-center text-xs p-1 text-gray-900">סה״כ</TableHead>
                <TableHead className="text-center text-xs p-1 text-gray-900">דרגות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => {
                const skillData = character.skills?.[skill.key] || {};
                const tempSkillData = tempData[skill.key] || {};
                
                return (
                  <TableRow key={skill.key} className="hover:bg-teal-50/50">
                    <TableCell className="font-medium text-gray-900 text-sm p-2">{skill.name}</TableCell>
                    <TableCell className="text-center font-bold p-2 text-[#16a085]">{getSkillTotal(skill)}</TableCell>
                    <TableCell className="p-1">
                      {editing ? (
                        <Input
                          type="number" 
                          min="0"
                          value={tempSkillData.ranks || 0}
                          onChange={(e) => updateTempData(skill.key, "ranks", parseInt(e.target.value) || 0)}
                          className="w-12 h-7 text-center mx-auto"
                        />
                      ) : (
                        <div className="text-center text-gray-900">{skillData.ranks || 0}</div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 