import React, { useState, useEffect } from "react";
import { Character } from "@/entities/Character";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Flame, 
  Crown,
  User,
  Swords,
  Shield,
  ScrollText,
  BookUser,
  BookOpen
} from "lucide-react";

import CharacterStats from "../components/character/CharacterStats";
import CharacterSpells from "../components/character/CharacterSpells"; 
import CharacterEquipment from "../components/character/CharacterEquipment";
import CharacterBackground from "../components/character/CharacterBackground";
import CharacterJournal from "../components/character/CharacterJournal";

export default function CharacterSheet() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stats");

  useEffect(() => {
    loadCharacter();
  }, []);

  const loadCharacter = async () => {
    try {
      const characters = await Character.list();
      let characterData;

      if (characters.length > 0) {
        characterData = characters[0];
      } else {
        characterData = await Character.create({
          name: "נארה",
          race: "דרקון-בורן",
          class: "כוהנת",
          level: 2, // ← עודכן לרמה 2
          alignment: "טוב כאוטי",
          experience_points: 1425, // ← עודכן ל-1425 XP
          hit_points_base: 19, // ← עודכן ל-19 HP
          hit_points_current: 19, // ← הוסף HP נוכחיים
          hit_points_wounds: 0, // ← הוסף נזק
          hit_points_temporary: 0, // ← הוסף HP זמניים
          hit_dice: "1d8",
          hp_rolls: [8, 6], // ← הוסף גלגולי HP: רמה 1 = 8, רמה 2 = 6
          
          ac_components: { armor: 3, shield: 1, natural: 4, magic: 0, misc: 0 },
          initiative: 4,
          initiative_bonus: 0, // ← הוסף בונוס יוזמה
          speed: 20, // ← עודכן לפי האקסל שלך (20 רגל = 6 מטר)
          base_attack_bonus: 0,
          proficiency_bonus: 2,
          
          // יכולות - עם החלפת INT ו-CHA
          strength: { base: 19, racial: 8, items: 0, misc: 0 },
          dexterity: { base: 18, racial: 0, items: 0, misc: 0 },
          constitution: { base: 18, racial: 2, items: 0, misc: 0 },
          intelligence: { base: 17, racial: 2, items: 0, misc: 0 }, // ← החלפה: 17 base
          wisdom: { base: 20, racial: 0, items: 0, misc: 0 },
          charisma: { base: 13, racial: 2, items: 0, misc: 0 }, // ← החלפה: 13 base
          
          // גלגולי הצלה - לפי האקסל שלך
          saving_throws: {
            fortitude: { base: 2, magic: 0, misc: 0 }, // ← מהאקסל
            reflex: { base: 0, magic: 0, misc: 0 }, // ← מהאקסל
            will: { base: 2, magic: 0, misc: 0 } // ← מהאקסל
          },
          
          // מיומנויות - 30 נקודות מחולקות לפי הרשימה שלך
          skills: {
            // Class skills (5 ranks each = 15 points)
            'knowledge_religion': { ranks: 5, class_skill: true, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'heal': { ranks: 5, class_skill: true, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'concentration': { ranks: 5, class_skill: true, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            
            // Cross-class skills (14 points total)
            'swim': { ranks: 1, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 }, // 2 points
            'listen': { ranks: 2, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 }, // 4 points  
            'spot': { ranks: 2, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 }, // 4 points
            'search': { ranks: 1, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 }, // 2 points
            'sense_motive': { ranks: 1, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 }, // 2 points
            // Total: 15 + 14 = 29/30 points used
            
            // Other class skills (available but unused)
            'knowledge_arcana': { ranks: 0, class_skill: true, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'knowledge_history': { ranks: 0, class_skill: true, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'knowledge_planes': { ranks: 0, class_skill: true, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'diplomacy': { ranks: 0, class_skill: true, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'spellcraft': { ranks: 0, class_skill: true, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'profession': { ranks: 0, class_skill: true, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            
            // Cross-class skills (unused but available for untrained use)
            'balance': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'bluff': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'climb': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'escape_artist': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'hide': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'jump': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'move_silently': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'ride': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'survival': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 },
            'use_rope': { ranks: 0, class_skill: false, misc: 0, item_bonus: 0, race_bonus: 0, feat_bonus: 0 }
          },
          
          // כסף - התחל עם קצת כסף
          money: {
            gold: 0,
            silver: 0,
            copper: 0,
            platinum: 0
          },
          money_history: [], // ← הוסף היסטוריית עסקאות
          
          spells: [
            {
              id: 1,
              name: "ריפוי קל",
              level: 1,
              school: "נקרומנסי",
              components: "V, S",
              casting_time: "1 פעולה",
              range: "מגע",
              duration: "מיידי",
              description: "מרפא 1ק8+1/רמה (עד +5)"
            },
            {
              id: 2,
              name: "ברכה",
              level: 1,
              school: "קסם",
              components: "V, S, M",
              casting_time: "1 פעולה",
              range: "50 רגל",
              duration: "1 דק'/רמה",
              description: "+1 התקפה ושמירה מפחד לבעלי ברית"
            },
            {
              id: 3,
              name: "אור",
              level: 0,
              school: "הטעיה",
              components: "V, M",
              casting_time: "1 פעולה",
              range: "מגע",
              duration: "10 דק'/רמה",
              description: "מאיר כמו לפיד"
            }
          ],
          
          // לחשים לרמה 2 Cleric
          spell_slots: {
            0: { current: 4, max: 4 }, // Orisons
            1: { current: 3, max: 3 }, // 1st level spells
            2: { current: 0, max: 0 }, // לא זמין עדיין
            3: { current: 0, max: 0 },
            4: { current: 0, max: 0 },
            5: { current: 0, max: 0 },
            6: { current: 0, max: 0 },
            7: { current: 0, max: 0 },
            8: { current: 0, max: 0 },
            9: { current: 0, max: 0 }
          },
          
          spell_casting_ability: "wisdom", // ← תוקן: Cleric משתמש ב-Wisdom
          spell_save_dc: 15,
          spell_attack_bonus: 7,
          
          notes: "",
          backstory: `🌟 נארה — בת הנשימה הראשונה

כהנתו של אסגראת | השריד האחרון לשושלת דרקונית אבודה

⸻

אף אחד לא ראה דרקון כבר אלפי שנים.
הסיפורים עברו לאגדות, האגדות הפכו לשירים, והשירים? — לילדים, לפני השינה.

אבל נארה יודעת.
היא לא זוכרת מתי הבינה את זה לראשונה, אבל תמיד הרגישה שהעולם סביב משדר לה אמת שונה — אמת בוערת, ישנה, אך חיה...`,
          
          personality_traits: "עיני אדומות עמוקות עם גחלים בוערות, תנועות קלות ומדויקות, קול עמוק עם הדהוד דרקוני קל.",
          ideals: "איזון בין יצירה והרס, בין האש שמחממת לאש ששורפת. החיפוש אחר האמת על מוצאה הדרקוני.",
          bonds: "הקמע של אמה - תכשיט פשוט שדופק כמו לב. הקשר לאסגראת, אל הדרקונים. חיפוש אחר שרידים נוספים מהשושלת.",
          flaws: "פחד מאובדן שליטה על כוחותיה. נטייה להתבודדות כשהלחץ עולה. קושי לבטוח באחרים לגמרי.",
          
          languages: ["משותף", "דרקונית", "שמימית"],
          features: [
            { 
              name: "נשימת אש", 
              description: "פעם ביום יכולה לנשוף חרוטו של אש באורך 30 רגל. DC 13 Reflex save או 2d6 נזק אש." 
            },
            { 
              name: "עמידות לאש", 
              description: "התנגדות 5 לנזק אש. מקבלת פחות נזק מהתקפות מבוססות אש." 
            },
            {
              name: "ראיית לילה",
              description: "יכולה לראות בחושך מוחלט עד 60 רגל כאילו היה אור עמום."
            },
            {
              name: "חושים חדים", 
              description: "+2 בונוס גזעי למיומנויות Listen ו-Spot."
            }
          ],
          journal_entries: []
        });
      }

      // Ensure all required fields exist
      if (!characterData.spells || !characterData.spell_slots) {
        characterData = {
          ...characterData,
          spells: characterData.spells || [
            { id: 1, name: "ריפוי קל", level: 1, school: "נקרומנסי", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "מיידי", description: "מרפא 1ק8+1/רמה (עד +5)" },
            { id: 2, name: "ברכה", level: 1, school: "קסם", components: "V, S, M", casting_time: "1 פעולה", range: "50 רגל", duration: "1 דק'/רמה", description: "+1 התקפה ושמירה מפחד לבעלי ברית" },
            { id: 3, name: "אור", level: 0, school: "הטעיה", components: "V, M", casting_time: "1 פעולה", range: "מגע", duration: "10 דק'/רמה", description: "מאיר כמו לפיד" }
          ],
          spell_slots: characterData.spell_slots || {
            0: { current: 4, max: 4 }, 1: { current: 3, max: 3 }, 2: { current: 0, max: 0 }, 3: { current: 0, max: 0 }, 4: { current: 0, max: 0 }, 5: { current: 0, max: 0 }, 6: { current: 0, max: 0 }, 7: { current: 0, max: 0 }, 8: { current: 0, max: 0 }, 9: { current: 0, max: 0 }
          },
          spell_casting_ability: characterData.spell_casting_ability || "wisdom",
          spell_save_dc: characterData.spell_save_dc || 15,
          spell_attack_bonus: characterData.spell_attack_bonus || 7,
          journal_entries: characterData.journal_entries || [],
          
          // ודא שיש לך את כל השדות החדשים
          level: characterData.level || 2,
          hit_points_current: characterData.hit_points_current ?? characterData.hit_points_base ?? 19,
          hit_points_wounds: characterData.hit_points_wounds || 0,
          hit_points_temporary: characterData.hit_points_temporary || 0,
          skills: characterData.skills || {},
          saving_throws: characterData.saving_throws || {
            fortitude: { base: 2, magic: 0, misc: 0 },
            reflex: { base: 0, magic: 0, misc: 0 },
            will: { base: 2, magic: 0, misc: 0 }
          },
          money_history: characterData.money_history || []
        };
        
        // Save the updated character data
        await Character.update(characterData.id, characterData);
      }

      setCharacter(characterData);

    } catch (error) {
      console.error("שגיאה בטעינת הדמות:", error);
    }
    setLoading(false);
  };

  const updateCharacter = (field, value) => {
    setCharacter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAbility = (abilityName, field, value) => {
    setCharacter(prev => ({
      ...prev,
      [abilityName]: {
        ...prev[abilityName],
        [field]: parseInt(value) || 0
      }
    }));
  };

  const saveCharacter = async () => {
    if (character && character.id) {
      await Character.update(character.id, character);
    }
  };

  // Auto-save character changes
  useEffect(() => {
    if (character && character.id) {
      const timeoutId = setTimeout(() => {
        saveCharacter();
      }, 1000); // Save after 1 second of no changes

      return () => clearTimeout(timeoutId);
    }
  }, [character]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory-200 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <Flame className="w-8 h-8 text-coral-400 animate-pulse" />
          <span className="text-xl font-semibold text-bordeaux-400">טוען דף דמות...</span>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-ivory-200 flex items-center justify-center">
        <Card className="w-96 bg-ivory-100 border-coral-400">
          <CardContent className="p-6 text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-coral-400" />
            <p className="text-lg text-bordeaux-400">לא נמצאה דמות</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-ivory-300">
      <header className="sticky top-0 z-50 w-full border-b border-bordeaux-200/50 bg-gradient-to-r from-bordeaux-200 via-soft-pink-100 to-ivory-100 text-stone-800">
        <div className="container flex h-32 items-center justify-between">
          <div>
            {/* Removed global edit button */}
          </div>
          <div className="flex items-center gap-6 text-right">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">{character.name}</h1>
              <div className="text-lg text-stone-600">
                {character.race} &bull; {character.class} &bull; רמה {character.level}
              </div>
            </div>
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-coral-300 to-warm-gold-300 shadow-lg">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-bordeaux-300 text-sm font-bold text-white">
                {character.level || 1}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-1">
          <Tabs defaultValue="stats" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid h-12 w-full grid-cols-5 items-center rounded-none border-b border-stone-200 bg-transparent p-0">
              <TabsTrigger
                value="background"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:-mb-px data-[state=active]:border-b-coral-400 data-[state=active]:bg-ivory-100 data-[state=active]:text-coral-400 data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                <BookUser className="mr-2 h-4 w-4" />
                רקע
              </TabsTrigger>
              <TabsTrigger
                value="journal"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:-mb-px data-[state=active]:border-b-coral-400 data-[state=active]:bg-ivory-100 data-[state=active]:text-coral-400 data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                יומן מסע
              </TabsTrigger>
              <TabsTrigger
                value="spells"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:-mb-px data-[state=active]:border-b-coral-400 data-[state=active]:bg-ivory-100 data-[state=active]:text-coral-400 data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                <ScrollText className="mr-2 h-4 w-4" />
                לחשים
              </TabsTrigger>
              <TabsTrigger
                value="equipment"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:-mb-px data-[state=active]:border-b-coral-400 data-[state=active]:bg-ivory-100 data-[state=active]:text-coral-400 data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                <Shield className="mr-2 h-4 w-4" />
                ציוד
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:-mb-px data-[state=active]:border-b-coral-400 data-[state=active]:bg-ivory-100 data-[state=active]:text-coral-400 data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                <Swords className="mr-2 h-4 w-4" />
                מאפיינים
              </TabsTrigger>
            </TabsList>
            <TabsContent value="stats" className="mt-2">
              <CharacterStats 
                character={character}
                updateCharacter={updateCharacter}
                updateAbility={updateAbility}
              />
            </TabsContent>
            <TabsContent value="equipment" className="mt-2">
              <CharacterEquipment 
                character={character}
                updateCharacter={updateCharacter}
              />
            </TabsContent>
            <TabsContent value="spells" className="mt-2">
              <CharacterSpells 
                character={character}
                updateCharacter={updateCharacter}
              />
            </TabsContent>
            <TabsContent value="background" className="mt-2">
              <CharacterBackground 
                character={character}
                updateCharacter={updateCharacter}
              />
            </TabsContent>
            <TabsContent value="journal" className="mt-2">
              <CharacterJournal 
                character={character}
                updateCharacter={updateCharacter}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}