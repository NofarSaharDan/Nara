//src/entities/Character.js
import { v4 as uuidv4 } from "uuid";

const a = localStorage.getItem("characters");
const CHARACTER_COLLECTION =
  Object.keys(a || {}).length > 0 ? JSON.parse(a) : [];

export class Character {
  static async create(characterData) {
    const newCharacter = {
      id: uuidv4(),
      ...characterData,
      createdAt: new Date().toISOString(),
    };
    CHARACTER_COLLECTION.push(newCharacter);
    localStorage.setItem("characters", JSON.stringify(CHARACTER_COLLECTION));
    return newCharacter;
  }

  static async list() {
    return CHARACTER_COLLECTION;
  }

  static async findById(id) {
    return CHARACTER_COLLECTION.find((char) => char.id === id);
  }

  static async update(id, updateData) {
    const characterIndex = CHARACTER_COLLECTION.findIndex(
      (char) => char.id === id
    );
    if (characterIndex > -1) {
      CHARACTER_COLLECTION[characterIndex] = {
        ...CHARACTER_COLLECTION[characterIndex],
        ...updateData,
      };
      localStorage.setItem("characters", JSON.stringify(CHARACTER_COLLECTION));
      return CHARACTER_COLLECTION[characterIndex];
    }
    return null;
  }

  static async delete(id) {
    const characterIndex = CHARACTER_COLLECTION.findIndex(
      (char) => char.id === id
    );
    if (characterIndex > -1) {
      const deletedCharacter = CHARACTER_COLLECTION.splice(characterIndex, 1);
      localStorage.setItem("characters", JSON.stringify(CHARACTER_COLLECTION));
      return deletedCharacter;
    }
    return null;
  }

  // Business Logic Methods
  static calculateAbilityTotal(ability) {
    if (!ability) return 10;
    return (
      (ability.base || 0) +
      (ability.racial || 0) +
      (ability.items || 0) +
      (ability.misc || 0)
    );
  }

  static getAbilityModifier(ability) {
    const total = this.calculateAbilityTotal(ability);
    return Math.floor((total - 10) / 2);
  }

  static formatModifier(modifier) {
    return modifier >= 0 ? `+${modifier}` : modifier.toString();
  }

  static calculateTotalAC(character) {
    return (
      10 +
      this.getAbilityModifier(character.dexterity) +
      (character.ac_components?.armor || 0) +
      (character.ac_components?.shield || 0) +
      (character.ac_components?.natural || 0) +
      (character.ac_components?.magic || 0) +
      (character.ac_components?.misc || 0)
    );
  }

  static getSavingThrow(character, saveType) {
    const save = character.saving_throws?.[saveType];
    if (!save) return 0;

    let abilityMod = 0;
    if (saveType === "fortitude")
      abilityMod = this.getAbilityModifier(character.constitution);
    if (saveType === "reflex")
      abilityMod = this.getAbilityModifier(character.dexterity);
    if (saveType === "will")
      abilityMod = this.getAbilityModifier(character.wisdom);

    return (save.base || 0) + abilityMod + (save.magic || 0) + (save.misc || 0);
  }

  static getSkillTotal(character, skill) {
    const skillData = character.skills?.[skill.key] || {};
    const abilityMod = this.getAbilityModifier(character[skill.ability]);
    const ranks = skillData.ranks || 0;
    const misc = skillData.misc || 0;

    // Class skill bonus: +3 if it's a class skill AND has at least 1 rank
    const isClassSkill =
      skill.classes?.cleric || skillData.class_skill || false;
    const classSkillBonus = isClassSkill && ranks >= 1 ? 3 : 0;

    const itemBonus = skillData.item_bonus || 0;
    const raceBonus = skillData.race_bonus || 0;
    const featBonus = skillData.feat_bonus || 0;
    const synergyBonus = this.calculateSynergyBonus(character, skill.key);
    const armorCheckPenalty = skill.armorCheckPenalty
      ? this.getArmorCheckPenalty(character)
      : 0;

    return (
      abilityMod +
      ranks +
      misc +
      classSkillBonus +
      itemBonus +
      raceBonus +
      featBonus +
      synergyBonus -
      armorCheckPenalty
    );
  }

  static calculateSynergyBonus(character, skillKey) {
    // Define skill synergies inline for now to avoid import issues
    const skillSynergies = {
      bluff: [
        { skill: "diplomacy", bonus: 2, condition: "5+ ranks" },
        {
          skill: "disguise",
          bonus: 2,
          condition: "5+ ranks when acting in character",
        },
        { skill: "sleight_of_hand", bonus: 2, condition: "5+ ranks" },
      ],
      climb: [{ skill: "jump", bonus: 2, condition: "5+ ranks" }],
      jump: [{ skill: "tumble", bonus: 2, condition: "5+ ranks" }],
      knowledge_arcana: [
        { skill: "spellcraft", bonus: 2, condition: "5+ ranks" },
      ],
      knowledge_local: [
        { skill: "gather_information", bonus: 2, condition: "5+ ranks" },
      ],
      knowledge_nobility: [
        { skill: "diplomacy", bonus: 2, condition: "5+ ranks" },
      ],
      sense_motive: [{ skill: "diplomacy", bonus: 2, condition: "5+ ranks" }],
      spellcraft: [
        { skill: "use_magic_device", bonus: 2, condition: "5+ ranks" },
      ],
      tumble: [
        { skill: "balance", bonus: 2, condition: "5+ ranks" },
        { skill: "jump", bonus: 2, condition: "5+ ranks" },
      ],
      use_rope: [
        {
          skill: "climb",
          bonus: 2,
          condition: "5+ ranks when climbing with rope",
        },
        {
          skill: "escape_artist",
          bonus: 2,
          condition: "5+ ranks when binding someone",
        },
      ],
    };

    let synergyBonus = 0;

    // Check if any skills provide synergy bonus to this skill
    Object.entries(skillSynergies).forEach(([sourceSkillKey, synergies]) => {
      const sourceSkillRanks = character.skills?.[sourceSkillKey]?.ranks || 0;
      if (sourceSkillRanks >= 5) {
        synergies.forEach((synergy) => {
          if (synergy.skill === skillKey) {
            synergyBonus += synergy.bonus;
          }
        });
      }
    });

    return synergyBonus;
  }

  static getArmorCheckPenalty(character) {
    // Calculate armor check penalty from equipped armor and shield
    const armorPenalty = character.ac_components?.armor_check_penalty || 0;
    const shieldPenalty = character.ac_components?.shield_check_penalty || 0;
    return Math.abs(armorPenalty) + Math.abs(shieldPenalty);
  }

  static getMaxSkillRanks(character, skill) {
    const characterLevel = character.level || 1;
    const skillData = character.skills?.[skill.key] || {};
    const isClassSkill =
      skill.classes?.cleric || skillData.class_skill || false;

    if (isClassSkill) {
      return characterLevel + 3; // Class skills: character level + 3
    } else {
      return Math.floor((characterLevel + 3) / 2); // Cross-class skills: (character level + 3) / 2
    }
  }

  static canUseSkillUntrained(skill, ranks) {
    if (skill.trainedOnly && ranks === 0) {
      return false;
    }
    return true;
  }

  static getSkillPointsPerLevel(character) {
    const intMod = this.getAbilityModifier(character.intelligence);
    const baseSkillPoints = character.class_skill_points || 2; // Default to 2 if not specified
    const raceBonus = character.race_skill_points || 0;

    return Math.max(1, baseSkillPoints + intMod + raceBonus);
  }

  static getTotalSkillPointsSpent(character, allSkillsData = []) {
    if (!character.skills) return 0;

    return Object.entries(character.skills).reduce(
      (total, [skillKey, skillData]) => {
        const ranks = skillData.ranks || 0;
        if (ranks === 0) return total;

        // Find skill definition to check if it's a class skill
        const skillDefinition = allSkillsData.find(
          (skill) => skill.key === skillKey
        );
        const isClassSkill =
          skillDefinition?.classes?.cleric || skillData.class_skill || false;

        if (isClassSkill) {
          return total + ranks; // Class skills cost 1 point per rank
        } else {
          return total + ranks * 2; // Cross-class skills cost 2 points per rank
        }
      },
      0
    );
  }

  static getAvailableSkillPoints(character, allSkillsData = []) {
    const characterLevel = character.level || 1;
    const skillPointsPerLevel = this.getSkillPointsPerLevel(character);
    const totalSkillPoints = skillPointsPerLevel * characterLevel;
    const spentSkillPoints = this.getTotalSkillPointsSpent(
      character,
      allSkillsData
    );

    return totalSkillPoints - spentSkillPoints;
  }

  static calculateTotalGoldValue(character) {
    return (
      (character.money?.gold || 0) +
      (character.money?.silver || 0) / 10 +
      (character.money?.copper || 0) / 100 +
      (character.money?.platinum || 0) * 10
    );
  }

  static getCurrentHitPoints(character) {
    return (
      (character.hit_points_base || 0) - (character.hit_points_wounds || 0)
    );
  }

  static getSpellSaveDC(character) {
    const castingAbility = character.spell_casting_ability;
    const abilityMod = this.getAbilityModifier(character[castingAbility]);
    return 10 + abilityMod + (character.proficiency_bonus || 0);
  }

  static getSpellAttackBonus(character) {
    const castingAbility = character.spell_casting_ability;
    const abilityMod = this.getAbilityModifier(character[castingAbility]);
    return abilityMod + (character.proficiency_bonus || 0);
  }

  static addExperiencePoints(character, amount) {
    const newTotal = (character.experience_points || 0) + amount;
    return { ...character, experience_points: newTotal };
  }

  static addMoney(character, amount) {
    const {
      gold = 0,
      silver = 0,
      copper = 0,
      platinum = 0,
    } = character.money || {};
    const currentTotal = gold + silver / 10 + copper / 100 + platinum * 10;
    const newTotal = Math.max(0, currentTotal + amount);

    let remaining = newTotal;
    const newPlatinum = Math.floor(remaining / 10);
    remaining -= newPlatinum * 10;
    const newGold = Math.floor(remaining);
    remaining -= newGold;
    const newSilver = Math.floor(remaining * 10);
    remaining -= newSilver / 10;
    const newCopper = Math.round(remaining * 100);

    return {
      ...character,
      money: {
        ...(character.money || {}),
        gold: newGold,
        silver: newSilver,
        copper: newCopper,
        platinum: newPlatinum,
      },
    };
  }

  static addLanguage(character, language) {
    const currentLanguages = character.languages || [];
    if (!currentLanguages.includes(language)) {
      return {
        ...character,
        languages: [...currentLanguages, language],
      };
    }
    return character;
  }

  static removeLanguage(character, language) {
    const currentLanguages = character.languages || [];
    return {
      ...character,
      languages: currentLanguages.filter((lang) => lang !== language),
    };
  }

  static addWeapon(character, weapon) {
    const updatedWeapons = [
      ...(character.weapons || []),
      { ...weapon, id: Date.now() },
    ];
    return { ...character, weapons: updatedWeapons };
  }

  static removeWeapon(character, weaponId) {
    const updatedWeapons =
      character.weapons?.filter((weapon) => weapon.id !== weaponId) || [];
    return { ...character, weapons: updatedWeapons };
  }

  static addEquipment(character, equipment) {
    const updatedEquipment = [
      ...(character.equipment || []),
      { ...equipment, id: Date.now() },
    ];
    return { ...character, equipment: updatedEquipment };
  }

  static removeEquipment(character, equipmentId) {
    const updatedEquipment =
      character.equipment?.filter((item) => item.id !== equipmentId) || [];
    return { ...character, equipment: updatedEquipment };
  }

  static addJournalEntry(character, entry) {
    const updatedEntries = [
      ...(character.journal_entries || []),
      { ...entry, id: Date.now(), date: new Date().toISOString() },
    ];
    return { ...character, journal_entries: updatedEntries };
  }

  static removeJournalEntry(character, entryId) {
    const updatedEntries =
      character.journal_entries?.filter((entry) => entry.id !== entryId) || [];
    return { ...character, journal_entries: updatedEntries };
  }
}
