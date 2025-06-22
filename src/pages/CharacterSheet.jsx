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
          alignment: "טוב כאוטי",
          experience_points: 0,
          hit_points_base: 10,
          hit_dice: "1d8",
          ac_components: { armor: 3, shield: 1, natural: 4, magic: 0, misc: 0 },
          initiative: 4,
          speed: 30,
          base_attack_bonus: 0,
          proficiency_bonus: 2,
          strength: { base: 19, racial: 8, items: 0, misc: 0 },
          dexterity: { base: 18, racial: 0, items: 0, misc: 0 },
          constitution: { base: 18, racial: 2, items: 0, misc: 0 },
          intelligence: { base: 13, racial: 2, items: 0, misc: 0 },
          wisdom: { base: 20, racial: 0, items: 0, misc: 0 },
          charisma: { base: 17, racial: 2, items: 0, misc: 0 },
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
          spell_slots: {
            0: { current: 4, max: 4 },
            1: { current: 3, max: 3 },
            2: { current: 2, max: 2 },
            3: { current: 1, max: 1 },
            4: { current: 0, max: 0 },
            5: { current: 0, max: 0 },
            6: { current: 0, max: 0 },
            7: { current: 0, max: 0 },
            8: { current: 0, max: 0 },
            9: { current: 0, max: 0 }
          },
          spell_casting_ability: "תבונה",
          spell_save_dc: 15,
          spell_attack_bonus: 7,
          notes: "",
          backstory: "🌟 נארה — בת הנשימה הראשונה...",
          personality_traits: "עיני אדומות עמוקות עם גחלים בוערות...",
          ideals: "איזון בין יצירה והרס...",
          bonds: "הקמע של אמה...",
          flaws: "פחד מאובדן...",
          languages: ["משותף", "דרקונית", "שמימית"],
          features: [
            { name: "נשימת אש", description: "פעם ביום..." },
            { name: "עמידות לאש", description: "התנגדות לנזק אש." }
          ],
          journal_entries: []
        });
      }

      // Ensure spells and spell_slots exist
      if (!characterData.spells || !characterData.spell_slots) {
        characterData = {
          ...characterData,
          spells: characterData.spells || [
            { id: 1, name: "ריפוי קל", level: 1, school: "נקרומנסי", components: "V, S", casting_time: "1 פעולה", range: "מגע", duration: "מיידי", description: "מרפא 1ק8+1/רמה (עד +5)" },
            { id: 2, name: "ברכה", level: 1, school: "קסם", components: "V, S, M", casting_time: "1 פעולה", range: "50 רגל", duration: "1 דק'/רמה", description: "+1 התקפה ושמירה מפחד לבעלי ברית" },
            { id: 3, name: "אור", level: 0, school: "הטעיה", components: "V, M", casting_time: "1 פעולה", range: "מגע", duration: "10 דק'/רמה", description: "מאיר כמו לפיד" }
          ],
          spell_slots: characterData.spell_slots || {
            0: { current: 4, max: 4 }, 1: { current: 3, max: 3 }, 2: { current: 2, max: 2 }, 3: { current: 1, max: 1 }, 4: { current: 0, max: 0 }, 5: { current: 0, max: 0 }, 6: { current: 0, max: 0 }, 7: { current: 0, max: 0 }, 8: { current: 0, max: 0 }, 9: { current: 0, max: 0 }
          },
          spell_casting_ability: characterData.spell_casting_ability || "תבונה",
          spell_save_dc: characterData.spell_save_dc || 15,
          spell_attack_bonus: characterData.spell_attack_bonus || 7,
          journal_entries: characterData.journal_entries || []
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
                {character.race} &bull; {character.class}
              </div>
            </div>
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-coral-300 to-warm-gold-300 shadow-lg">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-bordeaux-300 text-sm font-bold text-white">
                {character.level}
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