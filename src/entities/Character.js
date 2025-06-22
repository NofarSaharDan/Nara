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
    const abilityMod = this.getAbilityModifier(character[skill.ability]);
    const ranks = character.skills?.[skill.key]?.ranks || 0;
    const misc = character.skills?.[skill.key]?.misc || 0;
    const classSkillBonus =
      character.skills?.[skill.key]?.class_skill && ranks >= 1 ? 3 : 0;
    return abilityMod + ranks + misc + classSkillBonus;
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
