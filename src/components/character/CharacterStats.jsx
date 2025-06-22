import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { XpLog } from "@/entities/XpLog";
import { Character } from "@/entities/Character";

// Import the new card components
import StatsCard from "./cards/StatsCard";
import SavingThrowsCard from "./cards/SavingThrowsCard";
import CombatCard from "./cards/CombatCard";
import HitPointsCard from "./cards/HitPointsCard";
import AttacksCard from "./cards/AttacksCard";
import MoneyCard from "./cards/MoneyCard";
import ExperienceCard from "./cards/ExperienceCard";
import SkillsCard from "./cards/SkillsCard";

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
        <StatsCard 
          abilities={abilities}
          character={character}
          editing={editing}
          updateAbility={updateAbility}
          calculateTotal={calculateTotal}
          getModifier={getModifier}
          formatModifier={formatModifier}
        />
        <SavingThrowsCard 
          character={character}
          editing={editing}
          getSavingThrow={getSavingThrow}
          getModifier={getModifier}
          updateSavingThrow={updateSavingThrow}
          formatModifier={formatModifier}
        />
      </div>

      {/* Column 2: Combat & Wealth */}
      <div className="space-y-4">
        <CombatCard 
          character={character}
          editing={editing}
          getModifier={getModifier}
          updateAcComponent={updateAcComponent}
          totalAC={totalAC}
          formatModifier={formatModifier}
        />
        <HitPointsCard 
          character={character}
          editing={editing}
          updateCharacter={updateCharacter}
        />
        <AttacksCard />
        <MoneyCard 
          character={character}
          editing={editing}
          totalGoldValue={totalGoldValue}
          moneyChangeAmount={moneyChangeAmount}
          setMoneyChangeAmount={setMoneyChangeAmount}
          handleMoneyChange={handleMoneyChange}
        />
      </div>

      {/* Column 3: Skills & XP & Notes */}
      <div className="space-y-4">
        <ExperienceCard 
          character={character}
          editing={editing}
          xpHistory={xpHistory}
          xpToAdd={xpToAdd}
          setXpToAdd={setXpToAdd}
          handleAddXp={handleAddXp}
        />
        <SkillsCard 
          skills={skills}
          character={character}
          editing={editing}
          getSkillTotal={getSkillTotal}
          updateSkill={updateSkill}
        />
      </div>
    </div>
  );
} 