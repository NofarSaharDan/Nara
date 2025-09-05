import React, { useState, useEffect } from "react";
import { XpLog } from "@/entities/XpLog";
import { Character } from "@/entities/Character";
import { skills } from "@/data/skills";

// Import the new card components
import StatsCard from "./cards/StatsCard";
import SavingThrowsCard from "./cards/SavingThrowsCard";
import CombatCard from "./cards/CombatCard";
import HitPointsCard from "./cards/HitPointsCard";
import AttacksCard from "./cards/AttacksCard";
import MoneyCard from "./cards/MoneyCard";
import ExperienceCard from "./cards/ExperienceCard";
import SkillsCard from "./cards/SkillsCard";

export default function CharacterStats({ character, updateCharacter }) {
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
    return (ability.base || 0) + (ability.racial || 0) + (ability.items || 0) + (ability.misc || 0) + (ability.magic || 0);
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

  const updateAbility = (abilityName, updatedValues) => {
    updateCharacter(abilityName, {
      ...character[abilityName],
      ...updatedValues
    });
  };

  const getSkillTotal = (skill) => {
    return Character.getSkillTotal(character, skill);
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
      console.log('🛡️ updateAcComponent called:', component, '=', value);
      const updatedComponents = {
        ...(character.ac_components || {}),
        [component]: parseInt(value) || 0
      };
      console.log('🛡️ Updated AC components:', updatedComponents);
      updateCharacter("ac_components", updatedComponents);
    };

  // NEW: Add functions for speed and initiative
  const updateSpeed = (speedInFeet) => {
    updateCharacter("speed", parseInt(speedInFeet) || 20);
  };

  const updateInitiativeBonus = (bonus) => {
    updateCharacter("initiative_bonus", parseInt(bonus) || 0);
  };

  const totalGoldValue = (character.money?.gold || 0) + (character.money?.silver || 0) / 10 + (character.money?.copper || 0) / 100 + (character.money?.platinum || 0) * 10;

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      {/* Column 1: Core Stats */}
      <div className="space-y-4">
        <StatsCard 
          abilities={abilities}
          character={character}
          updateAbility={updateAbility}
          calculateTotal={calculateTotal}
          getModifier={getModifier}
          formatModifier={formatModifier}
        />
        <SavingThrowsCard 
  character={character}
  getSavingThrow={getSavingThrow}
  getModifier={getModifier}
  updateSavingThrow={updateSavingThrow}
  updateCharacter={updateCharacter} // Add this
  formatModifier={formatModifier}
/>
      </div>

      {/* Column 2: Combat & Wealth */}
      <div className="space-y-4">
      <CombatCard 
  character={character}
  getModifier={getModifier}
  updateAcComponent={updateAcComponent}
  updateSpeed={updateSpeed}
  updateInitiativeBonus={updateInitiativeBonus}
  updateCharacter={updateCharacter} // Add this
  totalAC={totalAC}
  formatModifier={formatModifier}
/>
<HitPointsCard 
  character={character}
  updateCharacter={updateCharacter}
  getModifier={getModifier} // Add this
/>
        <AttacksCard />
        <MoneyCard 
  character={character}
  totalGoldValue={totalGoldValue}
  updateCharacter={updateCharacter} // Add this - remove the old money props
/>
      </div>

      {/* Column 3: Skills & XP & Notes */}
      <div className="space-y-4">
        <ExperienceCard 
          character={character}
          xpHistory={xpHistory}
          xpToAdd={xpToAdd}
          setXpToAdd={setXpToAdd}
          handleAddXp={handleAddXp}
        />
        <SkillsCard 
          skills={skills}
          character={character}
          getSkillTotal={getSkillTotal}
          updateSkill={updateSkill}
        />
      </div>
    </div>
  );
}