import { Character } from "@/entities/Character";
import { XpLog } from "@/entities/XpLog";

export class CharacterService {
  // Character Management
  static async createCharacter(characterData) {
    return await Character.create(characterData);
  }

  static async getCharacter(id) {
    return await Character.findById(id);
  }

  static async updateCharacter(id, updateData) {
    return await Character.update(id, updateData);
  }

  static async deleteCharacter(id) {
    return await Character.delete(id);
  }

  // Experience Points Management
  static async addExperiencePoints(
    characterId,
    amount,
    reason = "הוספת נקודות ניסיון"
  ) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.addExperiencePoints(character, amount);
    await Character.update(characterId, updatedCharacter);

    // Log the XP change
    await XpLog.create({
      characterId: characterId,
      amount: amount,
      date: new Date().toISOString(),
      reason: reason,
    });

    return updatedCharacter;
  }

  static async getExperienceHistory(characterId) {
    return await XpLog.filter({ characterId }, "-date");
  }

  // Money Management
  static async addMoney(characterId, amount) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.addMoney(character, amount);
    return await Character.update(characterId, updatedCharacter);
  }

  // Language Management
  static async addLanguage(characterId, language) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.addLanguage(character, language);
    return await Character.update(characterId, updatedCharacter);
  }

  static async removeLanguage(characterId, language) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.removeLanguage(character, language);
    return await Character.update(characterId, updatedCharacter);
  }

  // Equipment Management
  static async addWeapon(characterId, weapon) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.addWeapon(character, weapon);
    return await Character.update(characterId, updatedCharacter);
  }

  static async removeWeapon(characterId, weaponId) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.removeWeapon(character, weaponId);
    return await Character.update(characterId, updatedCharacter);
  }

  static async addEquipment(characterId, equipment) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.addEquipment(character, equipment);
    return await Character.update(characterId, updatedCharacter);
  }

  static async removeEquipment(characterId, equipmentId) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.removeEquipment(character, equipmentId);
    return await Character.update(characterId, updatedCharacter);
  }

  // Journal Management
  static async addJournalEntry(characterId, entry) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.addJournalEntry(character, entry);
    return await Character.update(characterId, updatedCharacter);
  }

  static async removeJournalEntry(characterId, entryId) {
    const character = await Character.findById(characterId);
    if (!character) throw new Error("Character not found");

    const updatedCharacter = Character.removeJournalEntry(character, entryId);
    return await Character.update(characterId, updatedCharacter);
  }

  // Character Calculations
  static getCharacterCalculations(character) {
    return {
      abilityModifiers: {
        strength: Character.getAbilityModifier(character.strength),
        dexterity: Character.getAbilityModifier(character.dexterity),
        constitution: Character.getAbilityModifier(character.constitution),
        intelligence: Character.getAbilityModifier(character.intelligence),
        wisdom: Character.getAbilityModifier(character.wisdom),
        charisma: Character.getAbilityModifier(character.charisma),
      },
      totalAC: Character.calculateTotalAC(character),
      currentHitPoints: Character.getCurrentHitPoints(character),
      totalGoldValue: Character.calculateTotalGoldValue(character),
      spellSaveDC: Character.getSpellSaveDC(character),
      spellAttackBonus: Character.getSpellAttackBonus(character),
      savingThrows: {
        fortitude: Character.getSavingThrow(character, "fortitude"),
        reflex: Character.getSavingThrow(character, "reflex"),
        will: Character.getSavingThrow(character, "will"),
      },
    };
  }

  // Validation
  static validateCharacter(character) {
    const errors = [];

    if (!character.name) errors.push("Name is required");
    if (!character.race) errors.push("Race is required");
    if (!character.class) errors.push("Class is required");
    if (character.level < 1 || character.level > 20)
      errors.push("Level must be between 1 and 20");

    // Validate ability scores
    const abilities = [
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
    ];
    abilities.forEach((ability) => {
      const total = Character.calculateAbilityTotal(character[ability]);
      if (total < 3 || total > 18) {
        errors.push(`${ability} total must be between 3 and 18`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
