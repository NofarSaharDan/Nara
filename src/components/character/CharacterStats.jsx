import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { XpLog } from "@/entities/XpLog";
import { Character } from "@/entities/Character";
import {
  GitCommitHorizontal,
  Shield,
  Heart,
  Dice6,
  TrendingUp,
  Star,
  Coins,
  FileText,
  Plus,
  Minus
} from "lucide-react";

export default function CharacterStats({ character, editing, updateAbility, updateCharacter }) {
  const [xpToAdd, setXpToAdd] = useState(0);
  const [xpHistory, setXpHistory] = useState([]);
  const [moneyChangeAmount, setMoneyChangeAmount] = useState(0);

  useEffect(() => {
    if (character?.id) {
      loadXpHistory();
    }
  }, [character?.id]);

  const loadXpHistory = async () => {
    const history = await XpLog.filter({ characterId: character.id }, '-date');
    setXpHistory(history);
  };

  const calculateTotal = (ability) => {
    if (!ability) return 10;
    return (ability.base || 0) + (ability.racial || 0) + (ability.items || 0) + (ability.misc || 0);
  };

  const getModifier = (ability) => {
    const total = calculateTotal(ability);
    return Math.floor((total - 10) / 2);
  };

  const formatModifier = (modifier) => {
    return modifier >= 0 ? `+${modifier}` : modifier.toString();
  };

  const abilities = [
    { name: "כוח", key: "strength", short: "STR" },
    { name: "זריזות", key: "dexterity", short: "DEX" },
    { name: "חוסן", key: "constitution", short: "CON" },
    { name: "תבונה", key: "intelligence", short: "INT" },
    { name: "חוכמה", key: "wisdom", short: "WIS" },
    { name: "כריזמה", key: "charisma", short: "CHA" }
  ];

  const skills = [
    { name: "אקרובטיקה", ability: "dexterity", key: "acrobatics" },
    { name: "טיפוח בעלי חיים", ability: "charisma", key: "animal_empathy" },
    { name: "הערכה", ability: "intelligence", key: "appraise" },
    { name: "איזון", ability: "dexterity", key: "balance" },
    { name: "הטעיה", ability: "charisma", key: "bluff" },
    { name: "טיפוס", ability: "strength", key: "climb" },
    { name: "ריכוז", ability: "constitution", key: "concentration" },
    { name: "מלאכת יד", ability: "intelligence", key: "craft" },
    { name: "פענוח כתב", ability: "intelligence", key: "decipher_script" },
    { name: "דיפלומטיה", ability: "charisma", key: "diplomacy" },
    { name: "השבתת מכשיר", ability: "intelligence", key: "disable_device" },
    { name: "התחפשות", ability: "charisma", key: "disguise" },
    { name: "בריחה מאמנות", ability: "dexterity", key: "escape_artist" },
    { name: "זיוף", ability: "intelligence", key: "forgery" },
    { name: "איסוף מידע", ability: "charisma", key: "gather_information" },
    { name: "טיפול בבעלי חיים", ability: "charisma", key: "handle_animal" },
    { name: "ריפוי", ability: "wisdom", key: "heal" },
    { name: "הסתרה", ability: "dexterity", key: "hide" },
    { name: "הפחדה", ability: "charisma", key: "intimidate" },
    { name: "קפיצה", ability: "strength", key: "jump" },
    { name: "ידע (אלוהים)", ability: "intelligence", key: "knowledge_religion" },
    { name: "ידע (הארכיקה)", ability: "intelligence", key: "knowledge_arcana" },
    { name: "ידע (היסטוריה)", ability: "intelligence", key: "knowledge_history" },
    { name: "ידע (מקומי)", ability: "intelligence", key: "knowledge_local" },
    { name: "ידע (טבע)", ability: "intelligence", key: "knowledge_nature" },
    { name: "ידע (אציליות)", ability: "intelligence", key: "knowledge_nobility" },
    { name: "ידע (המישורים)", ability: "intelligence", key: "knowledge_planes" },
    { name: "הקשבה", ability: "wisdom", key: "listen" },
    { name: "תנועה שקטה", ability: "dexterity", key: "move_silently" },
    { name: "ביצוע", ability: "charisma", key: "perform" },
    { name: "מקצועיות", ability: "wisdom", key: "profession" },
    { name: "רכיבה", ability: "dexterity", key: "ride" },
    { name: "חיפוש", ability: "intelligence", key: "search" },
    { name: "תחושת כוונה", ability: "wisdom", key: "sense_motive" },
    { name: "זריזות יד", ability: "dexterity", key: "sleight_of_hand" },
    { name: "כישוף", ability: "intelligence", key: "spellcraft" },
    { name: "ריצה", ability: "wisdom", key: "spot" },
    { name: "הישרדות", ability: "wisdom", key: "survival" },
    { name: "שחייה", ability: "strength", key: "swim" },
    { name: "נפילה", ability: "dexterity", key: "tumble" },
    { name: "שימוש במכשיר מגי", ability: "charisma", key: "use_magic_device" },
    { name: "שימוש בחבל", ability: "dexterity", key: "use_rope" }
  ];

  const getSkillTotal = (skill) => {
    const abilityMod = getModifier(character[skill.ability]);
    const ranks = character.skills?.[skill.key]?.ranks || 0;
    const misc = character.skills?.[skill.key]?.misc || 0;
    const classSkillBonus = character.skills?.[skill.key]?.class_skill && ranks >= 1 ? 3 : 0;
    return abilityMod + ranks + misc + classSkillBonus;
  };

  const updateSkill = (skillKey, field, value) => {
    const currentSkills = character.skills || {};
    const updatedSkills = {
      ...currentSkills,
      [skillKey]: {
        ...currentSkills[skillKey],
        [field]: value
      }
    };
    updateCharacter("skills", updatedSkills);
  };

  const getSavingThrow = (saveType) => {
    const save = character.saving_throws?.[saveType];
    if (!save) return 0;

    let abilityMod = 0;
    if (saveType === "fortitude") abilityMod = getModifier(character.constitution);
    if (saveType === "reflex") abilityMod = getModifier(character.dexterity);
    if (saveType === "will") abilityMod = getModifier(character.wisdom);

    return (save.base || 0) + abilityMod + (save.magic || 0) + (save.misc || 0);
  };

  const updateSavingThrow = (saveType, field, value) => {
    const currentSaves = character.saving_throws || { fortitude: {}, reflex: {}, will: {} };
    const updatedSaves = {
      ...currentSaves,
      [saveType]: {
        ...currentSaves[saveType],
        [field]: parseInt(value) || 0
      }
    };
    updateCharacter("saving_throws", updatedSaves);
  };

  const handleAddXp = async () => {
    if (xpToAdd > 0) {
      const newTotal = (character.experience_points || 0) + xpToAdd;
      await Character.update(character.id, { experience_points: newTotal });
      await XpLog.create({
        characterId: character.id,
        amount: xpToAdd,
        date: new Date().toISOString(),
        reason: "הוספת נקודות ניסיון"
      });
      updateCharacter("experience_points", newTotal);
      setXpToAdd(0);
      loadXpHistory();
    }
  };

  const handleMoneyChange = (amount) => {
    const { gold = 0, silver = 0, copper = 0, platinum = 0 } = character.money || {};
    const currentTotal = gold + (silver / 10) + (copper / 100) + (platinum * 10);
    const newTotal = Math.max(0, currentTotal + amount);

    let remaining = newTotal;
    const newPlatinum = Math.floor(remaining / 10);
    remaining -= newPlatinum * 10;
    const newGold = Math.floor(remaining);
    remaining -= newGold;
    const newSilver = Math.floor(remaining * 10);
    remaining -= newSilver / 10;
    const newCopper = Math.round(remaining * 100);

    const updatedMoney = {
      ...(character.money || {}),
      gold: newGold,
      silver: newSilver,
      copper: newCopper,
      platinum: newPlatinum
    };
    updateCharacter("money", updatedMoney);
    setMoneyChangeAmount(0);
  };

  const totalAC = 10 +
    getModifier(character.dexterity) +
    (character.ac_components?.armor || 0) +
    (character.ac_components?.shield || 0) +
    (character.ac_components?.natural || 0) +
    (character.ac_components?.magic || 0) +
    (character.ac_components?.misc || 0);

  const updateAcComponent = (component, value) => {
    const updatedComponents = {
      ...(character.ac_components || {}),
      [component]: parseInt(value) || 0
    };
    updateCharacter("ac_components", updatedComponents);
  };

  const totalGoldValue = (character.money?.gold || 0) + (character.money?.silver || 0) / 10 + (character.money?.copper || 0) / 100 + (character.money?.platinum || 0) * 10;

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      {/* Column 1: Core Stats */}
      <div className="space-y-4">
        <Card className="shadow-lg border-rose-200">
          <CardHeader className="bg-gradient-to-r from-rose-800 to-stone-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <GitCommitHorizontal className="w-5 h-5" />
              תכונות
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-rose-50/50">
                  <TableHead className="text-right text-xs p-1">תכונה</TableHead>
                  <TableHead className="text-center text-xs p-1">מתאם</TableHead>
                  <TableHead className="text-center text-xs p-1">סה"כ</TableHead>
                  <TableHead className="text-center text-xs p-1">בסיס</TableHead>
                  <TableHead className="text-center text-xs p-1">גזע</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {abilities.map((abilityInfo) => {
                  const abilityData = character[abilityInfo.key] || {};
                  return (
                    <TableRow key={abilityInfo.key} className="hover:bg-rose-50/50">
                      <TableCell className="font-medium text-stone-800 p-2">
                        {abilityInfo.name} <br />
                        <span className="text-xs text-stone-500">({abilityInfo.short})</span>
                      </TableCell>
                      <TableCell className="text-center font-bold text-lg text-rose-700 p-2">{formatModifier(getModifier(abilityData))}</TableCell>
                      <TableCell className="text-center font-bold text-lg text-rose-800 p-2">{calculateTotal(abilityData)}</TableCell>
                      <TableCell className="p-1">
                        {editing ? <Input type="number" value={abilityData.base || 0} onChange={(e) => updateAbility(abilityInfo.key, "base", parseInt(e.target.value) || 0)} className="w-12 h-8 text-center mx-auto"/> : <div className="text-center">{abilityData.base || 0}</div>}
                      </TableCell>
                       <TableCell className="p-1">
                        {editing ? <Input type="number" value={abilityData.racial || 0} onChange={(e) => updateAbility(abilityInfo.key, "racial", parseInt(e.target.value) || 0)} className="w-12 h-8 text-center mx-auto"/> : <div className="text-center">{abilityData.racial || 0}</div>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-t-lg">
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
                         <span className="font-bold text-blue-800">{save.name}</span>
                         <span className="text-2xl font-bold text-blue-700">{formatModifier(totalSave)}</span>
                      </div>
                      <div className="text-xs text-stone-600 grid grid-cols-4 gap-1 text-center">
                          <div className="font-semibold">סה"כ</div>
                          <div className="font-semibold">בסיס</div>
                          <div className="font-semibold">תכונה</div>
                          <div className="font-semibold">קסם/שונות</div>
                          <div className="font-bold text-base">{formatModifier(totalSave)}</div>
                          <div>{editing ? <Input type="number" value={baseSave} onChange={e => updateSavingThrow(save.key, 'base', e.target.value)} className="h-7 w-full p-1"/> : formatModifier(baseSave)}</div>
                          <div>{formatModifier(abilityMod)}</div>
                          <div className="flex gap-1">
                            {editing ? <Input type="number" value={magicSave} onChange={e => updateSavingThrow(save.key, 'magic', e.target.value)} className="h-7 w-full p-1"/> : <span>{formatModifier(magicSave)}</span>}
                            {editing ? <Input type="number" value={miscSave} onChange={e => updateSavingThrow(save.key, 'misc', e.target.value)} className="h-7 w-full p-1"/> : <span>{formatModifier(miscSave)}</span>}
                          </div>
                      </div>
                    </div>
                    {index < 2 && <Separator className="my-4" />}
                  </React.Fragment>
                )
              })}
          </CardContent>
        </Card>
      </div>

      {/* Column 2: Combat & Wealth */}
      <div className="space-y-4">
        <Card className="shadow-lg border-stone-200">
          <CardHeader className="bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-t-lg py-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-4 h-4" />
              קרב
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4 text-center">
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <Label className="text-sm text-stone-500">יוזמה</Label>
                      <div className="text-2xl font-bold text-stone-800">
                        {formatModifier(character.initiative !== undefined ? character.initiative : getModifier(character.dexterity))}
                      </div>
                  </div>
                   <div>
                      <Label className="text-sm text-stone-500">מהירות</Label>
                      <div className="text-2xl font-bold text-stone-800">{character.speed || 0} רגל</div>
                  </div>
              </div>
              <Separator/>
              <div>
                <Label className="text-sm text-stone-500">דרג״ש</Label>
                <div className="text-4xl font-bold text-stone-800 my-2">{totalAC}</div>
                <div className="text-xs text-stone-600 space-y-1">
                  <span>10 + {formatModifier(getModifier(character.dexterity))} (זריזות) + {character.ac_components?.armor || 0} (שריון) + {character.ac_components?.shield || 0} (מגן) + {character.ac_components?.natural || 0} (טבעי)</span>
                </div>
                {editing &&
                  <div className="grid grid-cols-2 gap-2 mt-4">
                      <Input type="number" title="קסם" placeholder="קסם" value={character.ac_components?.magic || 0} onChange={e => updateAcComponent('magic', e.target.value)} className="h-8"/>
                      <Input type="number" title="שונות" placeholder="שונות" value={character.ac_components?.misc || 0} onChange={e => updateAcComponent('misc', e.target.value)} className="h-8"/>
                  </div>
                }
              </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-rose-200">
          <CardHeader className="bg-gradient-to-r from-rose-800 to-rose-900 text-white rounded-t-lg py-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-4 h-4" />
              נק׳ חיים
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
              <div className="text-center">
                <Label className="text-sm text-rose-600">סה״כ</Label>
                <div className="text-4xl font-bold text-rose-800">
                  {(character.hit_points_base || 0) - (character.hit_points_wounds || 0)}
                </div>
                 <span className="text-xs text-rose-500">לא כולל נזק הכנעה</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <Label className="text-xs">בסיס</Label>
                    {editing ? <Input type="number" value={character.hit_points_base || 0} onChange={(e) => updateCharacter("hit_points_base", parseInt(e.target.value) || 0)} className="h-8"/> : <div className="font-semibold">{character.hit_points_base || 0}</div>}
                  </div>
                  <div>
                    <Label className="text-xs">פצעים</Label>
                    {editing ? <Input type="number" value={character.hit_points_wounds || 0} onChange={(e) => updateCharacter("hit_points_wounds", parseInt(e.target.value) || 0)} className="h-8"/> : <div className="font-semibold">{character.hit_points_wounds || 0}</div>}
                  </div>
                  <div>
                    <Label className="text-xs">הכנעה</Label>
                    {editing ? <Input type="number" value={character.hit_points_subdual || 0} onChange={(e) => updateCharacter("hit_points_subdual", parseInt(e.target.value) || 0)} className="h-8"/> : <div className="font-semibold">{character.hit_points_subdual || 0}</div>}
                  </div>
              </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-t-lg py-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Coins className="w-4 h-4" />
              כסף
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
              <div className="text-center">
                <Label className="text-sm text-amber-700">סה"כ (במטבעות זהב)</Label>
                <div className="text-2xl font-bold text-amber-800 my-1">{totalGoldValue.toFixed(2)}</div>
                <div className="text-xs text-amber-600">
                  {character.money?.platinum || 0} פלטינום, {character.money?.gold || 0} זהב, {character.money?.silver || 0} כסף, {character.money?.copper || 0} נחושת
                </div>
              </div>
              {editing && (
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    type="number"
                    className="w-full h-9 text-center"
                    placeholder="סכום (בזהב)..."
                    value={moneyChangeAmount || ''}
                    onChange={e => setMoneyChangeAmount(parseFloat(e.target.value) || 0)}
                  />
                  <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleMoneyChange(moneyChangeAmount)}>
                    <Plus className="h-4 w-4 ml-1"/>הוסף
                  </Button>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={() => handleMoneyChange(-moneyChangeAmount)}>
                    <Minus className="h-4 w-4 ml-1"/>הורד
                  </Button>
                </div>
              )}
          </CardContent>
        </Card>
      </div>

      {/* Column 3: Skills & XP & Notes */}
      <div className="space-y-4">
        <Card className="shadow-lg border border-teal-200 rounded-lg">
          <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-t-lg p-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="w-5 h-5" />
              נקודות ניסיון
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center pt-2 pb-6 px-4">
            <div className="text-6xl font-bold text-teal-800">
              {character.experience_points || 0}
            </div>
            
            <Separator className="my-4" />

            <h3 className="text-lg font-semibold text-stone-700 mb-2">היסטוריה</h3>
            <ScrollArea className="h-24">
              {xpHistory.length > 0 ? (
                <div className="text-sm text-stone-600 space-y-1 text-right pr-2">
                  {xpHistory.map(log => (
                    <div key={log.id}>
                      <span className="font-semibold text-teal-700">+{log.amount}</span> - {format(new Date(log.date), 'dd/MM/yy')}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-stone-500">אין היסטוריה</p>
              )}
            </ScrollArea>
            
            {editing && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <Input 
                  type="number" 
                  value={xpToAdd} 
                  onChange={(e) => setXpToAdd(parseInt(e.target.value) || 0)} 
                  className="w-24 text-center"
                  placeholder="הוסף/הסר"
                />
                <Button onClick={handleAddXp} size="sm" className="bg-teal-600 hover:bg-teal-700">הוסף</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-700 to-green-800 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5" />
              מיומנויות
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[45rem]">
              <Table>
                <TableHeader className="sticky top-0 bg-green-50 z-10">
                  <TableRow>
                    <TableHead className="text-right text-xs p-1">מיומנות</TableHead>
                    <TableHead className="text-center text-xs p-1">סה״כ</TableHead>
                    <TableHead className="text-center text-xs p-1">דרגות</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skills.map((skill) => (
                    <TableRow key={skill.key} className="hover:bg-green-50/50">
                      <TableCell className="font-medium text-green-800 text-sm p-2">{skill.name}</TableCell>
                      <TableCell className="text-center font-bold p-2">{getSkillTotal(skill)}</TableCell>
                      <TableCell className="p-1">
                        {editing ? (
                          <Input
                            type="number" min="0"
                            value={character.skills?.[skill.key]?.ranks || 0}
                            onChange={(e) => updateSkill(skill.key, "ranks", parseInt(e.target.value) || 0)}
                            className="w-12 h-7 text-center mx-auto"
                          />
                        ) : (
                          <div className="text-center">{character.skills?.[skill.key]?.ranks || 0}</div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 