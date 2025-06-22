import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  BookOpen, 
  Star,
  BrainCircuit,
  Target,
  Clock, 
  Component, 
  Hourglass, 
  ChevronDown,
  Filter
} from "lucide-react";
import { defaultSpells, getSchoolColor, spellSchools } from "@/data/spells";

export default function CharacterSpells({ character }) {
  const [expandedSpells, setExpandedSpells] = useState(new Set());
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterSchool, setFilterSchool] = useState('all');
  const [filterName, setFilterName] = useState('');

  const toggleSpell = (spellId) => {
    const newExpanded = new Set(expandedSpells);
    if (newExpanded.has(spellId)) {
      newExpanded.delete(spellId);
    } else {
      newExpanded.add(spellId);
    }
    setExpandedSpells(newExpanded);
  };

  const getSpellsByLevel = (level) => {
    const characterSpells = character.spells?.filter(spell => spell.level === level) || [];
    const defaultLevelSpells = defaultSpells[level] || [];
    
    const allSpells = [
      ...defaultLevelSpells.map(spell => ({ ...spell, id: `default_${level}_${spell.name}`, isDefault: true })),
      ...characterSpells.filter(spell => !defaultLevelSpells.some(defaultSpell => defaultSpell.name === spell.name))
    ];
    
    return allSpells.sort((a, b) => a.name.localeCompare(b.name));
  };

  const getLevelHeaderColor = (level) => {
    const colors = [
      "from-slate-500 to-slate-600", "from-sky-500 to-sky-600", "from-cyan-500 to-cyan-600",
      "from-teal-500 to-teal-600", "from-emerald-500 to-emerald-600", "from-green-500 to-green-600",
      "from-lime-500 to-lime-600", "from-yellow-500 to-yellow-600", "from-amber-500 to-amber-600",
      "from-orange-500 to-orange-600",
    ];
    return colors[level] || "from-gray-500 to-gray-600";
  }
  
  const getLevelBorderColor = (level) => {
    const colors = [
      "border-slate-300", "border-sky-300", "border-cyan-300", "border-teal-300", "border-emerald-300",
      "border-green-300", "border-lime-300", "border-yellow-300", "border-amber-300", "border-orange-300",
    ];
    return colors[level] || "border-gray-300";
  }

  const SpellLevelCard = ({ level }) => {
    let spells = getSpellsByLevel(level);

    if (filterSchool !== 'all') {
      spells = spells.filter(spell => spell.school === filterSchool);
    }
    if (filterName) {
      spells = spells.filter(spell => spell.name.toLowerCase().includes(filterName.toLowerCase()));
    }
    
    // If filters are active and there are no spells, don't render the card
    if (spells.length === 0 && (filterSchool !== 'all' || filterName !== '')) return null;

    const title = level === 0 ? "קסמי רמה 0" : `לחשים רמה ${level}`;

    return (
      <Card className={`shadow-lg ${getLevelBorderColor(level)} bg-white`}>
        <CardHeader className={`bg-gradient-to-r ${getLevelHeaderColor(level)} text-white rounded-t-lg`}>
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
  };

  const levelsToDisplay = filterLevel === 'all'
    ? Array.from({ length: 10 }, (_, i) => i)
    : [parseInt(filterLevel)];
    
  const filteredCards = levelsToDisplay.map(level => <SpellLevelCard key={level} level={level} />);
  const hasVisibleCards = filteredCards.some(card => card !== null);

  return (
    <div className="space-y-8">
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

      <Collapsible className="space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-center gap-2">
            <Filter className="w-4 h-4"/>
            <span>סינון לחשים</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded-md mt-2">
            <Input 
              placeholder="חיפוש לפי שם..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="text-right"
            />
            <Select value={filterLevel} onValueChange={setFilterLevel} dir="rtl">
              <SelectTrigger>
                <SelectValue placeholder="סינון לפי רמה" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הרמות</SelectItem>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={String(i)}>
                    {i === 0 ? "קסמי רמה 0" : `רמה ${i}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSchool} onValueChange={setFilterSchool} dir="rtl">
              <SelectTrigger>
                <SelectValue placeholder="סינון לפי אסכולה" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל האסכולות</SelectItem>
                {spellSchools.map(school => (
                  <SelectItem key={school} value={school}>{school}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className={filterLevel !== 'all' ? 'w-full' : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'}>
        {hasVisibleCards ? filteredCards : <p className="col-span-full text-center text-gray-500 py-8">לא נמצאו לחשים העונים לסינון.</p>}
      </div>
    </div>
  );
} 