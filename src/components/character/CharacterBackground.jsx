import React from "react";

// Import the new card components
import BasicInfoCard from "./cards/BasicInfoCard";
import LanguagesCard from "./cards/LanguagesCard";
import SpecialFeaturesCard from "./cards/SpecialFeaturesCard";
import PersonalityTraitsCard from "./cards/PersonalityTraitsCard";
import IdealsCard from "./cards/IdealsCard";
import BondsCard from "./cards/BondsCard";
import FlawsCard from "./cards/FlawsCard";
import BackstoryCard from "./cards/BackstoryCard";

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
        <BasicInfoCard character={character} editing={editing} updateCharacter={updateCharacter} />
        <LanguagesCard character={character} editing={editing} addLanguage={addLanguage} removeLanguage={removeLanguage} />
        <SpecialFeaturesCard character={character} />
      </div>

      {/* Character Details */}
      <div className="space-y-6">
        <PersonalityTraitsCard character={character} editing={editing} updateCharacter={updateCharacter} />
        <IdealsCard character={character} editing={editing} updateCharacter={updateCharacter} />
        <BondsCard character={character} editing={editing} updateCharacter={updateCharacter} />
        <FlawsCard character={character} editing={editing} updateCharacter={updateCharacter} />
      </div>

      {/* Backstory - Full Width */}
      <BackstoryCard character={character} editing={editing} updateCharacter={updateCharacter} />
    </div>
  );
} 