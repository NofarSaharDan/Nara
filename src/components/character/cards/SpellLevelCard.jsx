import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Target, Component, Hourglass, ChevronDown } from "lucide-react";
import { getSchoolColor } from "@/data/spells";

export default function SpellLevelCard({ 
  level, 
  character, 
  spells, 
  expandedSpells, 
  toggleSpell, 
  getLevelHeaderColor, 
  getLevelBorderColor 
}) {
  const title = level === 0 ? "קסמי רמה 0" : `לחשים רמה ${level}`;

  return (
    <Card className={`shadow-lg ${getLevelBorderColor(level)} bg-white`}>
      <CardHeader className={getLevelHeaderColor(level)}>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            {title}
          </span>
          <Badge variant="secondary" className="bg-white/20 text-white">{`${character?.spell_slots?.[level]?.current || 0} / ${character?.spell_slots?.[level]?.max || 0}`}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {spells.length > 0 ? (
          spells.map((spell) => (
            <div key={spell.id} className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
              <button onClick={() => toggleSpell(spell.id)} className="flex justify-between items-center w-full group text-right">
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${expandedSpells.has(spell.id) ? 'rotate-180' : ''}`} />
                <div className="flex-grow mr-2">
                  <p className="font-bold text-gray-800">{spell.name}</p>
                </div>
                 <Badge className={`${getSchoolColor(spell.school)} ml-2 flex-shrink-0`}>{spell.school}</Badge>
              </button>
              {expandedSpells.has(spell.id) && (
                <div className="pt-3 mt-3 border-t">
                   <div className="space-y-3 text-sm text-right">
                        <div className="flex justify-end gap-x-4 gap-y-1 text-gray-600 flex-wrap">
                          <span className="flex items-center gap-1.5">{spell.casting_time} <strong>:זמן הטלה</strong> <Clock size={14} /></span>
                          <span className="flex items-center gap-1.5">{spell.range} <strong>:טווח</strong> <Target size={14} /></span>
                        </div>
                        <div className="flex justify-end gap-x-4 gap-y-1 text-gray-600 flex-wrap">
                           <span className="flex items-center gap-1.5">{spell.components} <strong>:רכיבים</strong> <Component size={14} /></span>
                          <span className="flex items-center gap-1.5">{spell.duration} <strong>:משך</strong> <Hourglass size={14} /></span>
                        </div>
                        <Separator className="my-2"/>
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{spell.description}</p>
                   </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">אין לחשים ברמה זו.</p>
        )}
      </CardContent>
    </Card>
  );
} 