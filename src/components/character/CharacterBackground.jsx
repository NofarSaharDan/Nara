import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { 
  Book, 
  Heart, 
  Star, 
  Link, 
  AlertTriangle,
  MessageCircle,
  Globe,
  Sparkles,
  User,
  MessageSquare,
  Zap
} from "lucide-react";

export default function CharacterBackground({ character, editing, updateCharacter }) {
  const updateLanguages = (languages) => {
    updateCharacter("languages", languages);
  };

  const addLanguage = (language) => {
    const currentLanguages = character.languages || [];
    if (!currentLanguages.includes(language)) {
      updateLanguages([...currentLanguages, language]);
    }
  };

  const removeLanguage = (language) => {
    const currentLanguages = character.languages || [];
    updateLanguages(currentLanguages.filter(lang => lang !== language));
  };
  
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Main Character Info */}
      <div className="space-y-6">
        {/* Basic Info */}
        <Card className="shadow-lg">
          <CardHeader className="text-white bg-gradient-to-r from-[#f97315] to-[#f59d0b] rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              פרטי הדמות
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-amber-700">שם</Label>
                {editing ? (
                  <Input
                    value={character.name}
                    onChange={(e) => updateCharacter("name", e.target.value)}
                    className="border-amber-300"
                  />
                ) : (
                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <div className="font-semibold text-amber-800">{character.name}</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-amber-700">גזע</Label>
                {editing ? (
                  <Input
                    value={character.race}
                    onChange={(e) => updateCharacter("race", e.target.value)}
                    className="border-amber-300"
                  />
                ) : (
                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <div className="font-semibold text-amber-800">{character.race}</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-amber-700">מחלקה</Label>
                {editing ? (
                  <Input
                    value={character.class}
                    onChange={(e) => updateCharacter("class", e.target.value)}
                    className="border-amber-300"
                  />
                ) : (
                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <div className="font-semibold text-amber-800">{character.class}</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-amber-700">רמה</Label>
                {editing ? (
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={character.level}
                    onChange={(e) => updateCharacter("level", parseInt(e.target.value) || 1)}
                    className="border-amber-300"
                  />
                ) : (
                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <div className="font-semibold text-amber-800">{character.level}</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-amber-700">רקע</Label>
                {editing ? (
                  <Input
                    value={character.background}
                    onChange={(e) => updateCharacter("background", e.target.value)}
                    className="border-amber-300"
                  />
                ) : (
                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <div className="font-semibold text-amber-800">{character.background}</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-amber-700">יישור מוסרי</Label>
                {editing ? (
                  <Input
                    value={character.alignment}
                    onChange={(e) => updateCharacter("alignment", e.target.value)}
                    className="border-amber-300"
                  />
                ) : (
                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <div className="font-semibold text-amber-800">{character.alignment}</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card className="shadow-lg">
          <CardHeader className="card-header-background-languages">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              שפות
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {editing ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {character.languages?.map((language, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 border-blue-300 cursor-pointer hover:bg-blue-200"
                      onClick={() => removeLanguage(language)}
                    >
                      {language} ×
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="הוסף שפה חדשה..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      addLanguage(e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                  className="border-blue-300"
                />
                <p className="text-xs text-blue-600">לחץ Enter להוספת שפה, לחץ על שפה כדי להסיר</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {character.languages?.length > 0 ? (
                  character.languages.map((language, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 border-blue-300"
                    >
                      {language}
                    </Badge>
                  ))
                ) : (
                  <p className="text-blue-600">לא הוגדרו שפות</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Special Features */}
        <Card className="shadow-lg">
          <CardHeader className="card-header-background-features">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              תכונות מיוחדות
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ScrollArea className="h-48">
              <div className="space-y-3">
                {character.features?.length > 0 ? (
                  character.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-white rounded-lg border border-amber-200 shadow-sm"
                      whileHover={{ scale: 1.01 }}
                    >
                      <h4 className="font-bold text-amber-800 mb-1">{feature.name}</h4>
                      <p className="text-sm text-amber-600 leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-amber-600">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                    <p>אין תכונות מיוחדות</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Character Details */}
      <div className="space-y-6">
        {/* Personality Traits */}
        <Card className="shadow-lg">
          <CardHeader className="card-header-background-personality">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              תכונות אישיות
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {editing ? (
              <Textarea
                value={character.personality_traits || ""}
                onChange={(e) => updateCharacter("personality_traits", e.target.value)}
                placeholder="תאר את תכונות האישיות של הדמות..."
                rows={4}
                className="border-green-300"
              />
            ) : (
              <div className="p-4 bg-white rounded-lg border border-green-200 min-h-[100px]">
                <p className="text-green-700 leading-relaxed whitespace-pre-wrap">
                  {character.personality_traits || "לא הוגדרו תכונות אישיות"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ideals */}
        <Card className="shadow-lg">
          <CardHeader className="card-header-background-ideals">
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              אידיאלים
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {editing ? (
              <Textarea
                value={character.ideals || ""}
                onChange={(e) => updateCharacter("ideals", e.target.value)}
                placeholder="מה מניע את הדמות? מה האידיאלים שלה?"
                rows={3}
                className="border-yellow-300"
              />
            ) : (
              <div className="p-4 bg-white rounded-lg border border-yellow-200 min-h-[80px]">
                <p className="text-yellow-700 leading-relaxed whitespace-pre-wrap">
                  {character.ideals || "לא הוגדרו אידיאלים"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bonds */}
        <Card className="shadow-lg">
          <CardHeader className="card-header-background-bonds">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              קשרים
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {editing ? (
              <Textarea
                value={character.bonds || ""}
                onChange={(e) => updateCharacter("bonds", e.target.value)}
                placeholder="מי או מה חשוב לדמות? מה מחבר אותה לעולם?"
                rows={3}
                className="border-pink-300"
              />
            ) : (
              <div className="p-4 bg-white rounded-lg border border-pink-200 min-h-[80px]">
                <p className="text-pink-700 leading-relaxed whitespace-pre-wrap">
                  {character.bonds || "לא הוגדרו קשרים"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Flaws */}
        <Card className="shadow-lg">
          <CardHeader className="card-header-background-flaws">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              פגמים
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {editing ? (
              <Textarea
                value={character.flaws || ""}
                onChange={(e) => updateCharacter("flaws", e.target.value)}
                placeholder="מה החולשות והפחדים של הדמות?"
                rows={3}
                className="border-red-300"
              />
            ) : (
              <div className="p-4 bg-white rounded-lg border border-red-200 min-h-[80px]">
                <p className="text-red-700 leading-relaxed whitespace-pre-wrap">
                  {character.flaws || "לא הוגדרו חולשות"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Backstory - Full Width */}
      <Card className="lg:col-span-2 shadow-lg">
        <CardHeader className="text-white bg-gradient-to-r from-[#4b5462] to-[#64738a] rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Book className="w-5 h-5" />
            סיפור הרקע
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {editing ? (
            <Textarea
              value={character.backstory || ""}
              onChange={(e) => updateCharacter("backstory", e.target.value)}
              placeholder="ספר את סיפור חייה של הדמות..."
              rows={10}
              className="border-indigo-300"
            />
          ) : (
            <ScrollArea className="h-80">
              <div className="p-4 bg-white rounded-lg border border-indigo-200">
                <p className="text-indigo-700 leading-relaxed whitespace-pre-wrap text-sm">
                  {character.backstory || "לא הוגדר סיפור רקע"}
                </p>
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 