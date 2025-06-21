import React, { useState, useEffect } from "react";
import { Character } from "@/entities/Character";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Flame, 
  Crown,
  User,
  Pencil,
  Swords,
  Shield,
  ScrollText,
  BookUser
} from "lucide-react";

import CharacterStats from "../components/character/CharacterStats";
import CharacterSpells from "../components/character/CharacterSpells"; 
import CharacterEquipment from "../components/character/CharacterEquipment";
import CharacterBackground from "../components/character/CharacterBackground";

export default function CharacterSheet() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("stats");

  useEffect(() => {
    loadCharacter();
  }, []);

  const loadCharacter = async () => {
    try {
      const characters = await Character.list();
      if (characters.length > 0) {
        setCharacter(characters[0]);
      } else {
        const naraData = await Character.create({
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
          spells: [],
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
          ]
        });
        setCharacter(naraData);
      }
    } catch (error) {
      console.error("שגיאה בטעינת הדמות:", error);
    }
    setLoading(false);
  };

  const saveCharacter = async () => {
    if (character && character.id) {
      await Character.update(character.id, character);
      setEditing(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <Flame className="w-8 h-8 text-red-500 animate-pulse" />
          <span className="text-xl font-semibold text-gray-200">טוען דף דמות...</span>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="w-96 bg-gray-800 border-red-700">
          <CardContent className="p-6 text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <p className="text-lg text-gray-300">לא נמצאה דמות</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-rose-900 via-stone-800 to-black text-stone-200">
        <div className="container flex h-32 items-center justify-between">
          <div>
            <Button variant="ghost" size="icon" onClick={() => setEditing(!editing)}>
              <Pencil className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">{character.name}</h1>
              <div className="text-lg text-stone-300">
                {character.race} &bull; {character.class}
              </div>
            </div>
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-lg">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-red-800">
                {character.level}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-white">
        <div className="container py-1">
          <Tabs defaultValue="stats" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid h-12 w-full grid-cols-4 items-center rounded-none border-b border-stone-200 bg-transparent p-0">
              <TabsTrigger
                value="background"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:-mb-px data-[state=active]:border-b-rose-700 data-[state=active]:bg-stone-100 data-[state=active]:text-rose-700 data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                <BookUser className="mr-2 h-4 w-4" />
                רקע
              </TabsTrigger>
              <TabsTrigger
                value="spells"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:-mb-px data-[state=active]:border-b-rose-700 data-[state=active]:bg-stone-100 data-[state=active]:text-rose-700 data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                <ScrollText className="mr-2 h-4 w-4" />
                לחשים
              </TabsTrigger>
              <TabsTrigger
                value="equipment"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:-mb-px data-[state=active]:border-b-rose-700 data-[state=active]:bg-stone-100 data-[state=active]:text-rose-700 data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                <Shield className="mr-2 h-4 w-4" />
                ציוד
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:-mb-px data-[state=active]:border-b-rose-700 data-[state=active]:bg-stone-100 data-[state=active]:text-rose-700 data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                <Swords className="mr-2 h-4 w-4" />
                מאפיינים
              </TabsTrigger>
            </TabsList>
            <TabsContent value="stats" className="mt-2">
              <CharacterStats 
                character={character}
                editing={editing}
                updateCharacter={updateCharacter}
                updateAbility={updateAbility}
              />
            </TabsContent>
            <TabsContent value="equipment" className="mt-2">
              <CharacterEquipment 
                character={character}
                editing={editing}
                updateCharacter={updateCharacter}
              />
            </TabsContent>
            <TabsContent value="spells" className="mt-2">
              <CharacterSpells 
                character={character}
                editing={editing}
                updateCharacter={updateCharacter}
              />
            </TabsContent>
            <TabsContent value="background" className="mt-2">
              <CharacterBackground 
                character={character}
                editing={editing}
                updateCharacter={updateCharacter}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}