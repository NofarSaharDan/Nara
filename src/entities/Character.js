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
}
