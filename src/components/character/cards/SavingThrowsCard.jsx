import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dice6 } from "lucide-react";

export default function SavingThrowsCard({ character, editing, getSavingThrow, getModifier, updateSavingThrow, formatModifier }) {
  return (
    <Card className="shadow-lg border-green-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#05b6d3] to-[#13b7a6] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Dice6 className="w-5 h-5" />
          גלגולי הצלה
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
         {[
            { name: "חוסן", key: "fortitude", ability: "constitution" },
            { name: "רפלקס", key: "reflex", ability: "dexterity" },
            { name: "רצון", key: "will", ability: "wisdom" }
          ].map((save, index) => {
            const totalSave = getSavingThrow(save.key);
            const abilityMod = getModifier(character[save.ability]);
            const baseSave = character.saving_throws?.[save.key]?.base || 0;
            const magicSave = character.saving_throws?.[save.key]?.magic || 0;
            const miscSave = character.saving_throws?.[save.key]?.misc || 0;

            return (
              <React.Fragment key={save.key}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-gray-900">{save.name}</span>
                     <span className="text-2xl font-bold text-[#13b7a6]">{formatModifier(totalSave)}</span>
                  </div>
                  <div className="text-xs text-gray-600 grid grid-cols-4 gap-1 text-center">
                      <div className="font-semibold text-gray-900">סה"כ</div>
                      <div className="font-semibold text-gray-900">בסיס</div>
                      <div className="font-semibold text-gray-900">תכונה</div>
                      <div className="font-semibold text-gray-900">קסם/שונות</div>
                      <div className="font-bold text-base text-gray-900">{formatModifier(totalSave)}</div>
                      <div className="text-gray-900">{editing ? <Input type="number" value={baseSave} onChange={e => updateSavingThrow(save.key, 'base', e.target.value)} className="h-7 w-full p-1"/> : formatModifier(baseSave)}</div>
                      <div className="text-gray-900">{formatModifier(abilityMod)}</div>
                      <div className="flex gap-1">
                        {editing ? <Input type="number" value={magicSave} onChange={e => updateSavingThrow(save.key, 'magic', e.target.value)} className="h-7 w-full p-1"/> : <span className="text-gray-900">{formatModifier(magicSave)}</span>}
                        {editing ? <Input type="number" value={miscSave} onChange={e => updateSavingThrow(save.key, 'misc', e.target.value)} className="h-7 w-full p-1"/> : <span className="text-gray-900">{formatModifier(miscSave)}</span>}
                      </div>
                  </div>
                </div>
                {index < 2 && <Separator className="my-4" />}
              </React.Fragment>
            )
          })}
      </CardContent>
    </Card>
  );
} 