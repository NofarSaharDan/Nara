import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Filter } from "lucide-react";
import { defaultSpells, spellSchools } from "@/data/spells";

// Import the new card components
import SpellSummaryCard from "./cards/SpellSummaryCard";
import SpellLevelCard from "./cards/SpellLevelCard";

export default function CharacterSpells({ character, updateCharacter }) {
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
    return `card-header-spells-${level}`;
  }
  
  const getLevelBorderColor = (level) => {
    return `card-border-spells-${level}`;
  }

  const levelsToDisplay = filterLevel === 'all'
    ? Array.from({ length: 10 }, (_, i) => i)
    : [parseInt(filterLevel)];
    
  const filteredCards = levelsToDisplay.map(level => {
    let spells = getSpellsByLevel(level);

    if (filterSchool !== 'all') {
      spells = spells.filter(spell => spell.school === filterSchool);
    }
    if (filterName) {
      spells = spells.filter(spell => spell.name.toLowerCase().includes(filterName.toLowerCase()));
    }
    
    // If filters are active and there are no spells, don't render the card
    if (spells.length === 0 && (filterSchool !== 'all' || filterName !== '')) return null;

    return (
      <SpellLevelCard
        key={level}
        level={level}
        character={character}
        spells={spells}
        expandedSpells={expandedSpells}
        toggleSpell={toggleSpell}
        getLevelHeaderColor={getLevelHeaderColor}
        getLevelBorderColor={getLevelBorderColor}
      />
    );
  });
  
  const hasVisibleCards = filteredCards.some(card => card !== null);

  return (
    <div className="space-y-8">
      <SpellSummaryCard character={character} updateCharacter={updateCharacter} />

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