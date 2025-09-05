// src/components/character/cards/SkillsCard.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, GraduationCap, Eye, EyeOff } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";
import { Character } from "@/entities/Character";

// נתוני המיומנויות המלאים כולל כל מיומנויות הידע
const SKILL_DATA = [
  // Combat Skills
  { key: 'concentration', name: 'ריכוז', ability: 'constitution', classes: { cleric: true }, trainedOnly: false, armorCheckPenalty: false },
  
  // Knowledge Skills - כולן מיומנויות מקצוע לכומר
  { key: 'knowledge_arcana', name: 'ידע (ארקאנה)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'knowledge_architecture', name: 'ידע (אדריכלות)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'knowledge_dungeoneering', name: 'ידע (מחתרות)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'knowledge_geography', name: 'ידע (גיאוגרפיה)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'knowledge_history', name: 'ידע (היסטוריה)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'knowledge_local', name: 'ידע (מקומי)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'knowledge_nature', name: 'ידע (טבע)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'knowledge_nobility', name: 'ידע (אצילות)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'knowledge_religion', name: 'ידע (דת)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'knowledge_planes', name: 'ידע (מישורים)', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  
  // Cleric Class Skills
  { key: 'craft', name: 'אומנות', ability: 'intelligence', classes: { cleric: true }, trainedOnly: false, armorCheckPenalty: false },
  { key: 'diplomacy', name: 'דיפלומטיה', ability: 'charisma', classes: { cleric: true }, trainedOnly: false, armorCheckPenalty: false },
  { key: 'heal', name: 'ריפוי', ability: 'wisdom', classes: { cleric: true }, trainedOnly: false, armorCheckPenalty: false },
  { key: 'profession', name: 'מקצוע', ability: 'wisdom', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  { key: 'spellcraft', name: 'אומנות לחש', ability: 'intelligence', classes: { cleric: true }, trainedOnly: true, armorCheckPenalty: false },
  
  // Cross-Class Skills
  { key: 'appraise', name: 'הערכה', ability: 'intelligence', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'balance', name: 'שיווי משקל', ability: 'dexterity', classes: {}, trainedOnly: false, armorCheckPenalty: true },
  { key: 'bluff', name: 'הטעיה', ability: 'charisma', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'climb', name: 'טיפוס', ability: 'strength', classes: {}, trainedOnly: false, armorCheckPenalty: true },
  { key: 'disguise', name: 'התחפשות', ability: 'charisma', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'escape_artist', name: 'אמן בריחה', ability: 'dexterity', classes: {}, trainedOnly: false, armorCheckPenalty: true },
  { key: 'forgery', name: 'זיוף', ability: 'intelligence', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'gather_information', name: 'איסוף מידע', ability: 'charisma', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'hide', name: 'הסתתרות', ability: 'dexterity', classes: {}, trainedOnly: false, armorCheckPenalty: true },
  { key: 'intimidate', name: 'הפחדה', ability: 'charisma', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'jump', name: 'קפיצה', ability: 'strength', classes: {}, trainedOnly: false, armorCheckPenalty: true },
  { key: 'listen', name: 'הקשבה', ability: 'wisdom', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'move_silently', name: 'תנועה שקטה', ability: 'dexterity', classes: {}, trainedOnly: false, armorCheckPenalty: true },
  { key: 'open_lock', name: 'פתיחת מנעולים', ability: 'dexterity', classes: {}, trainedOnly: true, armorCheckPenalty: false },
  { key: 'perform', name: 'הופעה', ability: 'charisma', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'ride', name: 'רכיבה', ability: 'dexterity', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'search', name: 'חיפוש', ability: 'intelligence', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'sense_motive', name: 'הבנת מניע', ability: 'wisdom', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'sleight_of_hand', name: 'זריזות יד', ability: 'dexterity', classes: {}, trainedOnly: true, armorCheckPenalty: true },
  { key: 'speak_language', name: 'דיבור שפה', ability: 'none', classes: {}, trainedOnly: true, armorCheckPenalty: false },
  { key: 'spot', name: 'איתור', ability: 'wisdom', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'survival', name: 'הישרדות', ability: 'wisdom', classes: {}, trainedOnly: false, armorCheckPenalty: false },
  { key: 'swim', name: 'שחייה', ability: 'strength', classes: {}, trainedOnly: false, armorCheckPenalty: true },
  { key: 'tumble', name: 'גלגול', ability: 'dexterity', classes: {}, trainedOnly: true, armorCheckPenalty: true },
  { key: 'use_magic_device', name: 'שימוש במכשיר קסום', ability: 'charisma', classes: {}, trainedOnly: true, armorCheckPenalty: false },
  { key: 'use_rope', name: 'שימוש בחבל', ability: 'dexterity', classes: {}, trainedOnly: false, armorCheckPenalty: false }
];

// נקודות המיומנות המתוכננות לנארה
const NARA_SKILL_ALLOCATION = {
  knowledge_religion: { ranks: 5, cost: 5 },
  heal: { ranks: 5, cost: 5 },
  concentration: { ranks: 5, cost: 5 },
  swim: { ranks: 1, cost: 2 },
  listen: { ranks: 2, cost: 4 },
  spot: { ranks: 2, cost: 4 },
  search: { ranks: 1, cost: 2 },
  sense_motive: { ranks: 1, cost: 2 }
  // Total: 30 points
};

export default function SkillsCard({ character, updateSkill }) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  // נתונים ראשוניים כולל החלוקה המתוכננת
  const initialData = SKILL_DATA.reduce((acc, skill) => {
    const plannedAllocation = NARA_SKILL_ALLOCATION[skill.key];
    const currentData = character.skills?.[skill.key] || {};
    
    acc[skill.key] = {
      ranks: currentData.ranks || plannedAllocation?.ranks || 0,
      misc: currentData.misc || 0,
      class_skill: currentData.class_skill || skill.classes?.cleric || false,
      item_bonus: currentData.item_bonus || 0,
      race_bonus: currentData.race_bonus || 0,
      feat_bonus: currentData.feat_bonus || 0
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
    console.log('💾 Saving skills data:', updatedData);
    
    Object.entries(updatedData).forEach(([skillKey, skillData]) => {
      console.log(`Updating skill ${skillKey}:`, skillData);
      updateSkill(skillKey, "ranks", skillData.ranks || 0);
      updateSkill(skillKey, "misc", skillData.misc || 0);
      updateSkill(skillKey, "class_skill", skillData.class_skill || false);
      updateSkill(skillKey, "item_bonus", skillData.item_bonus || 0);
      updateSkill(skillKey, "race_bonus", skillData.race_bonus || 0);
      updateSkill(skillKey, "feat_bonus", skillData.feat_bonus || 0);
    });
  });

  // חישובי נקודות מיומנות
  const getTotalSkillPoints = () => {
    return 30; // נארה רמה 2 - החלטת DM
  };

  const getSpentSkillPoints = () => {
    return Object.entries(editing ? tempData : initialData).reduce((total, [skillKey, skillData]) => {
      const ranks = skillData?.ranks || 0;
      if (ranks === 0) return total;
      
      const skill = SKILL_DATA.find(s => s.key === skillKey);
      const isClassSkill = skill?.classes?.cleric || skillData?.class_skill || false;
      
      return total + (isClassSkill ? ranks : ranks * 2);
    }, 0);
  };

  const getAvailableSkillPoints = () => {
    return getTotalSkillPoints() - getSpentSkillPoints();
  };

  const getMaxRanks = (skill, skillData) => {
    const level = character.level || 2;
    const isClassSkill = skill.classes?.cleric || skillData?.class_skill || false;
    
    return isClassSkill ? level + 3 : Math.floor((level + 3) / 2);
  };

  const getSkillBreakdown = (skill) => {
    const skillData = (editing ? tempData : initialData)?.[skill.key] || {};
    const abilityMod = skill.ability !== 'none' ? (Character.getAbilityModifier(character[skill.ability]) || 0) : 0;
    const ranks = skillData.ranks || 0;
    const misc = skillData.misc || 0;
    
    const isClassSkill = skill.classes?.cleric || skillData?.class_skill || false;
    const classSkillBonus = isClassSkill && ranks >= 1 ? 3 : 0;
    
    const itemBonus = skillData.item_bonus || 0;
    const raceBonus = skillData.race_bonus || 0;
    const featBonus = skillData.feat_bonus || 0;
    const synergyBonus = Character.calculateSynergyBonus?.(character, skill.key) || 0;
    const armorCheckPenalty = skill.armorCheckPenalty ? (Character.getArmorCheckPenalty?.(character) || 0) : 0;
    
    const total = abilityMod + ranks + misc + classSkillBonus + itemBonus + raceBonus + featBonus + synergyBonus - armorCheckPenalty;
    
    return {
      abilityMod,
      ranks,
      misc,
      classSkillBonus,
      itemBonus,
      raceBonus,
      featBonus,
      synergyBonus,
      armorCheckPenalty,
      isClassSkill,
      maxRanks: getMaxRanks(skill, skillData),
      total
    };
  };

  const canAffordRanks = (skill, currentRanks, newRanks) => {
    if (newRanks <= currentRanks) return true;
    
    const skillData = (editing ? tempData : initialData)?.[skill.key] || {};
    const isClassSkill = skill.classes?.cleric || skillData.class_skill || false;
    const ranksDiff = newRanks - currentRanks;
    const cost = isClassSkill ? ranksDiff : ranksDiff * 2;
    
    return cost <= getAvailableSkillPoints();
  };

  // מיומנויות לתצוגה
  const getVisibleSkills = () => {
    return SKILL_DATA.filter(skill => {
      const skillData = (editing ? tempData : initialData)?.[skill.key] || {};
      const hasRanks = skillData.ranks > 0;
      const isPlanned = NARA_SKILL_ALLOCATION[skill.key];
      
      // תציג אם: יש דרגות, או מתוכנן, או לא דורש אימון
      return hasRanks || isPlanned || !skill.trainedOnly;
    });
  };

  const visibleSkills = getVisibleSkills();
  const classSkills = visibleSkills.filter(skill => skill.classes?.cleric);
  const crossClassSkills = visibleSkills.filter(skill => !skill.classes?.cleric);

  const renderSkillRow = (skill) => {
    const breakdown = getSkillBreakdown(skill);
    const skillData = (editing ? tempData : initialData)?.[skill.key] || {};
    const isPlanned = NARA_SKILL_ALLOCATION[skill.key];
    
    return (
      <TableRow 
        key={skill.key} 
        className={`hover:bg-opacity-50 ${
          breakdown.isClassSkill 
            ? 'hover:bg-green-50 bg-green-25' 
            : 'hover:bg-orange-50 bg-orange-25'
        } ${isPlanned ? 'ring-1 ring-blue-200' : ''}`}
      >
        <TableCell className="font-medium text-gray-900 text-sm p-2">
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${
              breakdown.isClassSkill ? 'bg-green-500' : 'bg-orange-500'
            }`}></span>
            {skill.name}
            {skill.trainedOnly && <GraduationCap className="w-3 h-3 text-blue-500" title="דורש אימון" />}
            {skill.armorCheckPenalty && <span className="text-red-500 text-xs">♦</span>}
            {isPlanned && <span className="text-blue-500 text-xs">★</span>}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {skill.ability !== 'none' ? skill.ability.slice(0, 3).toUpperCase() : ''} • 
            מקס: {breakdown.maxRanks}
            {skill.trainedOnly && ' • דורש אימון'}
          </div>
        </TableCell>
        
        <TableCell className="text-center p-2 w-20">
          <div className={`text-lg font-bold rounded-lg px-2 py-1 ${
            breakdown.isClassSkill 
              ? 'text-green-600 bg-green-100' 
              : 'text-orange-600 bg-orange-100'
          }`}>
            {breakdown.total >= 0 ? '+' : ''}{breakdown.total}
          </div>
        </TableCell>
        
        <TableCell className="text-center p-2 w-16">
          {editing ? (
            <Input
              type="number"
              min="0"
              max={breakdown.maxRanks}
              value={tempData[skill.key]?.ranks ?? 0}
              onChange={(e) => {
                const newRanks = parseInt(e.target.value) || 0;
                console.log(`Changing ${skill.name} to ${newRanks} ranks`);
                
                if (newRanks <= breakdown.maxRanks && canAffordRanks(skill, skillData.ranks || 0, newRanks)) {
                  updateTempData(skill.key, {
                    ...tempData[skill.key],
                    ranks: newRanks
                  });
                }
              }}
              className="w-12 h-8 text-center text-sm"
            />
          ) : (
            <div className="text-lg font-semibold text-gray-900">{breakdown.ranks}</div>
          )}
        </TableCell>
        
        {editing && (
          <TableCell className="text-center p-2 w-16">
            <div className={`text-sm ${
              breakdown.isClassSkill ? 'text-green-600' : 'text-orange-600'
            }`}>
              {breakdown.isClassSkill 
                ? (tempData[skill.key]?.ranks || 0)
                : (tempData[skill.key]?.ranks || 0) * 2
              } נק׳
            </div>
          </TableCell>
        )}
      </TableRow>
    );
  };

  return (
    <Card className="shadow-lg border border-teal-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#16a085] to-[#22c55e] text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between w-full text-lg">
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="הצג/הסתר פירוט חישובים"
            >
              {showBreakdown ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <TrendingUp className="w-5 h-5" />
            מיומנויות - רמה {character.level || 2}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* סיכום נקודות מיומנות - מקוצר */}
        <div className="p-3 bg-teal-50 border-b">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">סה"כ נקודות: </span>
              <span className="text-[#16a085] font-bold">30</span>
              <div className="text-xs text-gray-600">רמה {character.level || 2} - החלטת DM</div>
            </div>
            <div>
              <span className="font-semibold">זמינות: </span>
              <span className={`font-bold ${
                getAvailableSkillPoints() < 0 ? 'text-red-600' : 'text-[#16a085]'
              }`}>
                {getAvailableSkillPoints()}
              </span>
              <div className="text-xs text-gray-600">
                נוצל: {getSpentSkillPoints()}/{getTotalSkillPoints()}
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            🟢 מקצוע: מקס {(character.level || 2) + 3}, 1 נק׳=1 דרגה (+3) • 
            🟠 חוצה: מקס {Math.floor(((character.level || 2) + 3) / 2)}, 2 נק׳=1 דרגה • 
            ★ מתוכנן לנארה
          </div>
        </div>
        
        <ScrollArea className="h-[45rem]">
          <Table>
            <TableHeader className="sticky top-0 bg-teal-100/50 z-10">
              <TableRow>
                <TableHead className="text-right text-sm p-2 text-gray-900">מיומנות</TableHead>
                <TableHead className="text-center text-sm p-2 text-gray-900 w-20">ציון</TableHead>
                <TableHead className="text-center text-sm p-2 text-gray-900 w-16">דרגות</TableHead>
                {editing && <TableHead className="text-center text-sm p-2 text-gray-900 w-16">עלות</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* מיומנויות מקצוע */}
              {classSkills.length > 0 && (
                <>
                  <TableRow>
                    <TableCell colSpan={editing ? 4 : 3} className="bg-green-100 text-center text-sm font-semibold text-green-800 py-2">
                      🟢 מיומנויות מקצוע - מקס {(character.level || 2) + 3} דרגות ({classSkills.length})
                    </TableCell>
                  </TableRow>
                  {classSkills.map(renderSkillRow)}
                </>
              )}
              
              {/* חוצות מקצוע */}
              {crossClassSkills.length > 0 && (
                <>
                  <TableRow>
                    <TableCell colSpan={editing ? 4 : 3} className="bg-orange-100 text-center text-sm font-semibold text-orange-800 py-2">
                      🟠 חוצות מקצוע - מקס {Math.floor(((character.level || 2) + 3) / 2)} דרגות ({crossClassSkills.length})
                    </TableCell>
                  </TableRow>
                  {crossClassSkills.map(renderSkillRow)}
                </>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}