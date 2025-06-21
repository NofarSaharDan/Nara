import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Star,
  Clock,
  Zap,
  Target,
  Eye,
  Book
} from "lucide-react";

export default function CharacterSpells({ character, editing, updateCharacter }) {
  const [newSpell, setNewSpell] = useState({
    name: "",
    level: 0,
    school: "",
    casting_time: "",
    range: "",
    components: "",
    duration: "",
    description: ""
  });
  const [showAddSpell, setShowAddSpell] = useState(false);
  const [filterLevel, setFilterLevel] = useState("all");

  const spellSchools = [
    "חיזוי", "קללה", "קסם", "הטעיה", "הגנה", "העברה", "משיכה", "התמרה", "נקרומנסי"
  ];

  // רשימת לחשים מלאה לפי הטבלאות
  const defaultSpells = {
    0: [
      { name: "יצירת מים", school: "שירות", components: "V, S", casting_time: "1 פעולה", range: "קרוב", duration: "מיידי", description: "יוצר 2 גלון מים לכל רמת כוהן" },
      { name: "ריפוי מיקור", school: "נקרומנסי", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "מיידי", description: "מרפא 1 נק' חיים" },
      { name: "איתור קסם", school: "חיזוי", components: "V, S", casting_time: "1 פעולה", range: "60 רגל", duration: "מיידי", description: "מגלה קסמים בטווח 60 רגל" },
      { name: "איתור רעל", school: "חיזוי", components: "V, S", casting_time: "1 פעולה", range: "קרוב", duration: "מיידי", description: "מזהה רעל ביצור או חפץ" },
      { name: "הדרכה", school: "חיזוי", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "1 דקה", description: "+1 לגלגול אחד" },
      { name: "פגיעה זניחית", school: "נקרומנסי", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "מיידי", description: "גורם 1 נק' נזק" },
      { name: "אור", school: "הטעיה", components: "V, M", casting_time: "1 פעולה", range: "מגע", duration: "10 דק'/רמה", description: "מאיר כמו לפיד" },
      { name: "תיקון", school: "התמרה", components: "V, S", casting_time: "1 פעולה", range: "10 רגל", duration: "מיידי", description: "מתקן נזק קל לחפצים" },
      { name: "טיהור אוכל/שתייה", school: "התמרה", components: "V, S", casting_time: "1 פעולה", range: "10 רגל", duration: "מיידי", description: "מנקה נפח אוכל/משקה מזהום" },
      { name: "קריאת קסומה", school: "חיזוי", components: "V, S, M", casting_time: "1 פעולה", range: "אישי", duration: "10 דק'/רמה", description: "מאפשר קריאת כתב קסום" },
      { name: "התנגדות", school: "הגנה", components: "V, S, M", casting_time: "1 פעולה", range: "מגע", duration: "1 דקה", description: "+1 לזריקות הצלה" },
      { name: "מידה טובה", school: "הגנה", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "1 שעה", description: "נותן 1 נק' חיים זמנית" }
    ],
    1: [
      { name: "קללה", school: "קסם", components: "V, S, M", casting_time: "1 פעולה", range: "50 רגל", duration: "1 דק'/רמה", description: "אויבים -1 התקפה ושמירה מפחד" },
      { name: "ברכה", school: "קסם", components: "V, S, M", casting_time: "1 פעולה", range: "50 רגל", duration: "1 דק'/רמה", description: "+1 התקפה ושמירה מפחד לבעלי ברית" },
      { name: "ברכת מים", school: "התמרה", components: "V, S, M", casting_time: "1 דקה", range: "מגע", duration: "מיידי", description: "יוצר מים קדושים" },
      { name: "פחד", school: "נקרומנסי", components: "V, S", casting_time: "1 פעולה", range: "30 רגל", duration: "1ק4 סיבובים +1/רמה", description: "יצור 5 HD בורח" },
      { name: "פקד", school: "קסם", components: "V, S", casting_time: "1 פעולה", range: "קרוב", duration: "1 סיבוב", description: "יצור מציית פקודה של מילה אחת" },
      { name: "הבנת שפות", school: "חיזוי", components: "V, S, M", casting_time: "1 פעולה", range: "אישי", duration: "10 דק'/רמה", description: "מבין שפות מדוברות וכתובות" },
      { name: "ריפוי קל", school: "נקרומנסי", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "מיידי", description: "מרפא 1ק8+1/רמה (עד +5)" },
      { name: "Curse Water", school: "נקרומנסי", components: "V, S", casting_time: "1 דקה", range: "מגע", duration: "מיידי", description: "יוצר מים לא קדושים" },
      { name: "Deathwatch", school: "נקרומנסי", components: "V, S", casting_time: "1 פעולה", range: "30 רגל", duration: "10 דק'/רמה", description: "מגלה יצורים קרובים למוות" },
      { name: "איתור כאוס/רוע/טוב/חוק", school: "חיזוי", components: "V, S", casting_time: "1 פעולה", range: "60 רגל", duration: "ריכוז, עד 10 דק'/רמה", description: "מגלה יישור מוסרי" },
      { name: "איתור אל-מתים", school: "חיזוי", components: "V, S", casting_time: "1 פעולה", range: "60 רגל", duration: "ריכוז, עד 1 דק'/רמה", description: "מגלה אל-מתים במרחק 60 רגל" },
      { name: "Divine Favor", school: "הטעיה", components: "V, S", casting_time: "1 פעולה", range: "אישי", duration: "1 דקה", description: "+1 התקפה ונזק לכל 3 רמות כוהן" },
      { name: "Doom", school: "נקרומנסי", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "1 דק'/רמה", description: "-2 התקפה, שמירה, בדיקות" },
      { name: "Endure Elements", school: "הגנה", components: "V, S, M", casting_time: "1 פעולה", range: "מגע", duration: "24 שעות", description: "עמידות לטמפרטורות קיצוניות" },
      { name: "Entropic Shield", school: "הגנה", components: "V, S", casting_time: "1 פעולה", range: "אישי", duration: "1 דק'/רמה", description: "20% סיכוי להחמצת תקיפות מרחוק" },
      { name: "Hide from Undead", school: "הגנה", components: "V, S, M", casting_time: "1 פעולה", range: "מגע", duration: "10 דק'/רמה", description: "אל-מתים לא רואים יצורים מוגנים" },
      { name: "Inflict Light Wounds", school: "נקרומנסי", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "מיידי", description: "גורם 1ק8+1/רמה נזק (עד +5)" },
      { name: "Magic Stone", school: "התמרה", components: "V, S, M", casting_time: "1 פעולה", range: "מגע", duration: "30 דקות או עד פיזור", description: "3 אבנים +1 התקפה ונזק 1ק6+1" },
      { name: "Magic Weapon", school: "התמרה", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "1 דק'/רמה", description: "נשק +1 התקפה ונזק" },
      { name: "Obscuring Mist", school: "שירות", components: "V, S", casting_time: "1 פעולה", range: "20 רגל", duration: "1 דק'/רמה", description: "ערפל משפיע על ראייה" },
      { name: "Protection from Alignment", school: "הגנה", components: "V, S, M", casting_time: "1 פעולה", range: "מגע", duration: "1 דק'/רמה", description: "+2 דרג\"ש ושמירות נגד יישור מסוים" },
      { name: "Remove Fear", school: "הגנה", components: "V, S", casting_time: "1 פעולה", range: "קרוב", duration: "10 דקות", description: "+4 מוראל נגד פחד, מסיר פחד קיים" },
      { name: "Sanctuary", school: "הגנה", components: "V, S, M", casting_time: "1 פעולה", range: "מגע", duration: "1 סיבוב/רמה", description: "אויבים לא יכולים לתקוף (עד שמטרה תוקפת)" },
      { name: "Shield of Faith", school: "הגנה", components: "V, S, M", casting_time: "1 פעולה", range: "מגע", duration: "1 דק'/רמה", description: "+2 דרג\"ש אסטרל (או +3 ברמה 6+)" },
      { name: "Summon Monster I", school: "שירות", components: "V, S, M", casting_time: "1 סיבוב", range: "קרוב", duration: "1 סיבוב/רמה", description: "מזמן יצור חיצוני לעזרה" }
    ]
  };

  const addSpell = () => {
    const updatedSpells = [...(character.spells || []), { ...newSpell, id: Date.now() }];
    updateCharacter("spells", updatedSpells);
    setNewSpell({
      name: "",
      level: 0,
      school: "",
      casting_time: "",
      range: "",
      components: "",
      duration: "",
      description: ""
    });
    setShowAddSpell(false);
  };

  const removeSpell = (spellId) => {
    const updatedSpells = character.spells?.filter(spell => spell.id !== spellId) || [];
    updateCharacter("spells", updatedSpells);
  };

  const updateSpellSlots = (level, current, max) => {
    const updatedSlots = {
      ...character.spell_slots,
      [level]: { current, max }
    };
    updateCharacter("spell_slots", updatedSlots);
  };

  const getSpellsByLevel = (level) => {
    const characterSpells = character.spells?.filter(spell => spell.level === level) || [];
    const defaultLevelSpells = defaultSpells[level] || [];
    
    // מיזוג לחשים ברירת מחדל עם לחשים שנוספו על ידי המשתמש
    const allSpells = [
      ...defaultLevelSpells.map(spell => ({ ...spell, id: `default_${level}_${spell.name}`, isDefault: true })),
      ...characterSpells.filter(spell => !defaultLevelSpells.some(defaultSpell => defaultSpell.name === spell.name))
    ];
    
    return allSpells;
  };

  const getSchoolColor = (school) => {
    const colors = {
      "חיזוי": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "קללה": "bg-green-100 text-green-800 border-green-300", 
      "נקרומנסי": "bg-gray-100 text-gray-800 border-gray-300",
      "קסם": "bg-pink-100 text-pink-800 border-pink-300",
      "הטעיה": "bg-blue-100 text-blue-800 border-blue-300",
      "הגנה": "bg-emerald-100 text-emerald-800 border-emerald-300",
      "העברה": "bg-amber-100 text-amber-800 border-amber-300",
      "משיכה": "bg-indigo-100 text-indigo-800 border-indigo-300",
      "התמרה": "bg-orange-100 text-orange-800 border-orange-300",
      "שירות": "bg-cyan-100 text-cyan-800 border-cyan-300"
    };
    return colors[school] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const levelsToDisplay = filterLevel === 'all'
    ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    : [parseInt(filterLevel)];

  return (
    <div className="space-y-6">
      {/* Spell Book */}
      <Card className="shadow-lg border-rose-200 bg-gradient-to-br from-white to-rose-50">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="flex items-center gap-2 text-rose-800">
              <Book className="w-5 h-5" />
              ספר הלחשים
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="w-48">
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="bg-white border-yellow-300">
                    <SelectValue placeholder="סנן לפי רמה..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">הצג הכל</SelectItem>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                      <SelectItem key={level} value={level.toString()}>
                        {level === 0 ? "קנטריפים" : `רמה ${level}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {editing && (
                <Button
                  onClick={() => setShowAddSpell(!showAddSpell)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף לחש
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {editing && (
          <AnimatePresence>
            {showAddSpell && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <CardContent className="p-6 border-t border-yellow-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>שם הלחש</Label>
                      <Input
                        value={newSpell.name}
                        onChange={(e) => setNewSpell({...newSpell, name: e.target.value})}
                        placeholder="שם הלחש"
                        className="border-yellow-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>רמה</Label>
                      <Select
                        value={newSpell.level.toString()}
                        onValueChange={(value) => setNewSpell({...newSpell, level: parseInt(value)})}
                      >
                        <SelectTrigger className="border-yellow-300">
                          <SelectValue placeholder="בחר רמה" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                            <SelectItem key={level} value={level.toString()}>
                              {level === 0 ? "קנטריפ" : `רמה ${level}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>בית ספר</Label>
                      <Select
                        value={newSpell.school}
                        onValueChange={(value) => setNewSpell({...newSpell, school: value})}
                      >
                        <SelectTrigger className="border-yellow-300">
                          <SelectValue placeholder="בחר בית ספר" />
                        </SelectTrigger>
                        <SelectContent>
                          {spellSchools.map(school => (
                            <SelectItem key={school} value={school}>
                              {school}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>זמן הטלה</Label>
                      <Input
                        value={newSpell.casting_time}
                        onChange={(e) => setNewSpell({...newSpell, casting_time: e.target.value})}
                        placeholder="לדוגמה: 1 פעולה"
                        className="border-yellow-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>טווח</Label>
                      <Input
                        value={newSpell.range}
                        onChange={(e) => setNewSpell({...newSpell, range: e.target.value})}
                        placeholder="לדוגמה: 30 רגל"
                        className="border-yellow-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>רכיבים</Label>
                      <Input
                        value={newSpell.components}
                        onChange={(e) => setNewSpell({...newSpell, components: e.target.value})}
                        placeholder="לדוגמה: V, S, M"
                        className="border-yellow-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>משך</Label>
                      <Input
                        value={newSpell.duration}
                        onChange={(e) => setNewSpell({...newSpell, duration: e.target.value})}
                        placeholder="לדוגמה: 1 דקה/רמה"
                        className="border-yellow-300"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label>תיאור</Label>
                      <Textarea
                        value={newSpell.description}
                        onChange={(e) => setNewSpell({...newSpell, description: e.target.value})}
                        placeholder="תיאור הלחש..."
                        className="border-yellow-300"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={addSpell} className="bg-yellow-600 hover:bg-yellow-700">
                      שמור לחש
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Card>

      {/* Spell Slots */}
      <Card className="shadow-lg border-blue-200 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg py-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="w-4 h-4" />
            לחשים זמינים
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
              <div key={level} className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                <div className="text-sm font-bold text-blue-700 mb-1">רמה {level}</div>
                <div className="flex items-center justify-center gap-1">
                  {editing ? (
                    <>
                      <Input
                        type="number"
                        min="0"
                        value={character.spell_slots?.[level]?.current || 0}
                        onChange={(e) => updateSpellSlots(level, parseInt(e.target.value) || 0, character.spell_slots?.[level]?.max || 0)}
                        className="w-8 h-6 text-xs text-center p-0 border-blue-300"
                      />
                      <span className="text-xs text-blue-600">/</span>
                      <Input
                        type="number"
                        min="0"
                        value={character.spell_slots?.[level]?.max || 0}
                        onChange={(e) => updateSpellSlots(level, character.spell_slots?.[level]?.current || 0, parseInt(e.target.value) || 0)}
                        className="w-8 h-6 text-xs text-center p-0 border-blue-300"
                      />
                    </>
                  ) : (
                    <div className="text-sm font-bold text-blue-800">
                      {character.spell_slots?.[level]?.current || 0}/{character.spell_slots?.[level]?.max || 0}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spells by Level */}
      <div className="grid gap-6">
        {levelsToDisplay.map((level) => {
          const spells = getSpellsByLevel(level);
          if (spells.length === 0) return null;
          
          const levelColors = {
            0: "from-gray-600 to-gray-700",
            1: "from-red-600 to-red-700", 
            2: "from-orange-600 to-orange-700",
            3: "from-yellow-600 to-yellow-700",
            4: "from-green-600 to-green-700",
            5: "from-blue-600 to-blue-700",
            6: "from-indigo-600 to-indigo-700",
            7: "from-purple-600 to-purple-700",
            8: "from-pink-600 to-pink-700",
            9: "from-rose-600 to-rose-700"
          };
          
          return (
            <Card key={level} className="shadow-lg border-gray-200">
              <CardHeader className={`bg-gradient-to-r ${levelColors[level] || "from-gray-600 to-gray-700"} text-white rounded-t-lg py-3`}>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-4 h-4" />
                  {level === 0 ? "קנטריפים" : `לחשי רמה ${level}`}
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {spells.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {spells.map((spell) => (
                    <motion.div
                      key={spell.id}
                      className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-800 mb-1">{spell.name}</h3>
                          <div className="flex items-center gap-1 flex-wrap mb-2">
                            <Badge className={getSchoolColor(spell.school)} className="text-xs">
                              {spell.school}
                            </Badge>
                            {spell.casting_time && (
                              <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                                {spell.casting_time}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {editing && !spell.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSpell(spell.id)}
                            className="text-red-500 hover:bg-red-100 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      {spell.description && (
                        <div className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-2 rounded">
                          {spell.description}
                        </div>
                      )}
                      
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                        {spell.components && (
                          <span>{spell.components}</span>
                        )}
                        {spell.range && (
                          <span>• {spell.range}</span>
                        )}
                        {spell.duration && (
                          <span>• {spell.duration}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 