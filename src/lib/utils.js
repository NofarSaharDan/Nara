import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Game-specific utilities
export const GameUtils = {
  // Dice rolling
  rollDice: (diceNotation) => {
    const match = diceNotation.match(/(\d+)d(\d+)/);
    if (!match) return 0;

    const [_, count, sides] = match;
    let total = 0;
    for (let i = 0; i < parseInt(count); i++) {
      total += Math.floor(Math.random() * parseInt(sides)) + 1;
    }
    return total;
  },

  // Experience points calculations
  getLevelFromXP: (xp) => {
    const levels = [
      0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000,
      66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000,
    ];
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i]) return i + 1;
    }
    return 1;
  },

  getXPForLevel: (level) => {
    const levels = [
      0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000,
      66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000,
    ];
    return levels[level - 1] || 0;
  },

  // Money conversion
  convertToCopper: (money) => {
    const { gold = 0, silver = 0, copper = 0, platinum = 0 } = money || {};
    return platinum * 1000 + gold * 100 + silver * 10 + copper;
  },

  convertFromCopper: (copperAmount) => {
    const platinum = Math.floor(copperAmount / 1000);
    const remaining = copperAmount % 1000;
    const gold = Math.floor(remaining / 100);
    const remaining2 = remaining % 100;
    const silver = Math.floor(remaining2 / 10);
    const copper = remaining2 % 10;

    return { platinum, gold, silver, copper };
  },

  // Damage type colors
  getDamageTypeColor: (damageType) => {
    const colors = {
      חותך: "bg-red-100 text-red-800 border-red-300",
      חודר: "bg-blue-100 text-blue-800 border-blue-300",
      מוחץ: "bg-stone-100 text-stone-800 border-stone-300",
      אש: "bg-orange-100 text-orange-800 border-orange-300",
      קרח: "bg-cyan-100 text-cyan-800 border-cyan-300",
      חשמל: "bg-yellow-100 text-yellow-800 border-yellow-300",
      רעל: "bg-green-100 text-green-800 border-green-300",
      נקרומנטי: "bg-gray-100 text-gray-800 border-gray-300",
    };
    return colors[damageType] || "bg-gray-100 text-gray-800 border-gray-300";
  },

  // Spell school colors
  getSpellSchoolColor: (school) => {
    const colors = {
      נקרומנסי: "bg-gray-100 text-gray-800 border-gray-300",
      קסם: "bg-purple-100 text-purple-800 border-purple-300",
      הטעיה: "bg-pink-100 text-pink-800 border-pink-300",
      הגנה: "bg-blue-100 text-blue-800 border-blue-300",
      חיזוק: "bg-green-100 text-green-800 border-green-300",
      "על טבעי": "bg-yellow-100 text-yellow-800 border-yellow-300",
      שינוי: "bg-orange-100 text-orange-800 border-orange-300",
      קריאה: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[school] || "bg-gray-100 text-gray-800 border-gray-300";
  },

  // Formatting utilities
  formatNumber: (num) => {
    return num >= 0 ? `+${num}` : num.toString();
  },

  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  // Validation utilities
  isValidAbilityScore: (score) => {
    return score >= 3 && score <= 18;
  },

  isValidLevel: (level) => {
    return level >= 1 && level <= 20;
  },

  // Array utilities
  removeFromArray: (array, item) => {
    return array.filter((element) => element !== item);
  },

  addToArrayIfNotExists: (array, item) => {
    return array.includes(item) ? array : [...array, item];
  },
};

// Constants
export const GAME_CONSTANTS = {
  MAX_LEVEL: 20,
  MIN_ABILITY_SCORE: 3,
  MAX_ABILITY_SCORE: 18,
  BASE_AC: 10,
  BASE_HP_DIE: "1d8",
  PROFICIENCY_BONUSES: [
    2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
  ],
  SPELL_LEVELS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  DAMAGE_TYPES: [
    "חותך",
    "חודר",
    "מוחץ",
    "אש",
    "קרח",
    "חשמל",
    "רעל",
    "נקרומנטי",
  ],
  SPELL_SCHOOLS: [
    "נקרומנסי",
    "קסם",
    "הטעיה",
    "הגנה",
    "חיזוק",
    "על טבעי",
    "שינוי",
    "קריאה",
  ],
};
