document.addEventListener("DOMContentLoaded", () => {
  const xpTotalDisplay = document.getElementById("total-xp-value");
  const xpAddInput = document.getElementById("xp-add-input");
  const addXpButton = document.getElementById("add-xp-button");
  const xpHistoryLog = document.getElementById("xp-history-log");
  const levelDisplay = document.getElementById("character-level");

  let totalXp = 0;
  let xpHistory = [];

  const xpToLevel = [
    0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000,
    78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000,
  ];

  function calculateLevel(xp) {
    if (xp < 0) xp = 0;
    let level = 1;
    for (let i = xpToLevel.length - 1; i >= 0; i--) {
      if (xp >= xpToLevel[i]) {
        level = i + 1;
        break;
      }
    }
    return level;
  }

  function updateLevel(xp) {
    const newLevel = calculateLevel(xp);
    levelDisplay.textContent = newLevel;
    updateBab(newLevel);
    updateSpells(newLevel);
  }

  function renderXpHistory() {
    if (!xpHistoryLog) return;
    xpHistoryLog.innerHTML = "";
    xpHistory
      .slice()
      .reverse()
      .forEach((item) => {
        const li = document.createElement("li");
        const date = new Date(item.date).toLocaleDateString("he-IL");
        li.innerHTML = `
            <span>+${item.amount} נק"נ</span>
            <span class="xp-date">${date}</span>
        `;
        xpHistoryLog.appendChild(li);
      });
  }

  function saveXpData() {
    localStorage.setItem("totalXp", totalXp);
    localStorage.setItem("xpHistory", JSON.stringify(xpHistory));
  }

  function loadXpData() {
    totalXp = parseInt(localStorage.getItem("totalXp"), 10) || 0;
    xpHistory = JSON.parse(localStorage.getItem("xpHistory")) || [];

    xpTotalDisplay.textContent = totalXp;
    updateLevel(totalXp);
    renderXpHistory();
  }

  function addXp() {
    const amountToAdd = parseInt(xpAddInput.value, 10);
    if (isNaN(amountToAdd) || amountToAdd <= 0) return;

    totalXp += amountToAdd;
    xpHistory.push({ amount: amountToAdd, date: new Date() });

    xpTotalDisplay.textContent = totalXp;
    xpAddInput.value = "";

    updateLevel(totalXp);
    renderXpHistory();
    saveXpData();
  }

  addXpButton.addEventListener("click", addXp);
  xpAddInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addXp();
    }
  });

  // Ability Score Calculation
  const abilities = {};
  const abilitiesTable = document.getElementById("abilities-tbody");

  function calculateAbilityScore(row) {
    const inputs = row.querySelectorAll('input[type="number"]');
    let total = 0;
    inputs.forEach((input) => {
      total += parseInt(input.value, 10) || 0;
    });

    const totalField = row.querySelector('input[name="total"]');
    const modField = row.querySelector('input[name="mod"]');

    totalField.value = total;

    const modifier = Math.floor((total - 10) / 2);
    modField.value = modifier >= 0 ? `+${modifier}` : modifier;

    const abilityName = row.dataset.ability;
    abilities[abilityName] = { mod: modifier, total: total };

    // After calculating an ability, update dependent sections
    updateAllCalculatedFields();
  }

  function initializeAbilities() {
    const rows = abilitiesTable.querySelectorAll("tr[data-ability]");
    rows.forEach((row) => {
      calculateAbilityScore(row);
      const inputs = row.querySelectorAll('input[type="number"]');
      inputs.forEach((input) => {
        input.addEventListener("input", () => calculateAbilityScore(row));
      });
    });
  }

  // AC Calculation
  const acInputs = {
    total: document.querySelector('input[name="ac-total"]'),
    dex: document.querySelector('input[name="ac-dex"]'),
    natural: document.querySelector('input[name="ac-natural"]'),
    magic: document.querySelector('input[name="ac-magic"]'),
    misc: document.querySelector('input[name="ac-misc"]'),
    armorDisplay: document.querySelector('input[name="ac-armor-display"]'),
    shieldDisplay: document.querySelector('input[name="ac-shield-display"]'),
  };

  function updateAC() {
    let acDetails = JSON.parse(localStorage.getItem("acDetails"));

    if (!acDetails) {
      acDetails = {
        "ac-armor": "3",
        "ac-shield": "1",
        "natural-armor-bonus-detail": "4",
      };
    }

    const dexMod = abilities.dex ? abilities.dex.mod : 0;
    const armorBonus = parseInt(acDetails["ac-armor"], 10) || 0;
    const shieldBonus = parseInt(acDetails["ac-shield"], 10) || 0;
    const naturalBonus =
      parseInt(acDetails["natural-armor-bonus-detail"], 10) || 0;
    const magicBonus = parseInt(acInputs.magic.value, 10) || 0;
    const miscBonus = parseInt(acInputs.misc.value, 10) || 0;

    const totalAC =
      10 +
      dexMod +
      armorBonus +
      shieldBonus +
      naturalBonus +
      magicBonus +
      miscBonus;

    if (acInputs.total) acInputs.total.value = totalAC;
    if (acInputs.dex) acInputs.dex.value = dexMod;
    if (acInputs.armorDisplay) acInputs.armorDisplay.value = armorBonus;
    if (acInputs.shieldDisplay) acInputs.shieldDisplay.value = shieldBonus;
    if (acInputs.natural) acInputs.natural.value = naturalBonus;
  }

  // Saves Calculation
  const savesTable = document.getElementById("saves-tbody");
  const saveAbilityMap = {
    fort: "con",
    ref: "dex",
    will: "wis",
  };

  function updateSave(row) {
    const saveName = row.dataset.save;
    const abilityName = saveAbilityMap[saveName];
    if (!abilities[abilityName]) return; // Check before abilities are ready

    const base =
      parseInt(row.querySelector('input[name="base"]').value, 10) || 0;
    const misc =
      parseInt(row.querySelector('input[name="misc"]').value, 10) || 0;
    const abilityMod = abilities[abilityName].mod;

    row.querySelector('input[name="mod"]').value =
      abilityMod >= 0 ? `+${abilityMod}` : abilityMod;
    row.querySelector('input[name="total"]').value = base + abilityMod + misc;
  }

  // Base Attack Bonus
  const babDisplay = document.getElementById("bab-value");
  const clericBab = [
    0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15,
  ];

  function getBabString(level) {
    if (level < 1) level = 1;
    if (level > 20) level = 20;

    const base = clericBab[level - 1];
    let babString = `+${base}`;
    let currentBab = base;

    // Add iterative attacks
    while (currentBab - 5 > 0) {
      currentBab -= 5;
      babString += ` / +${currentBab}`;
    }
    return babString;
  }

  function updateBab(level) {
    if (!babDisplay) return;
    babDisplay.textContent = getBabString(level);
  }

  // Spells Calculation
  const spellsTbody = document.getElementById("spells-tbody");
  // Spells per day for cleric levels 1-20, for spell levels 0-9
  const clericSpellsPerDay = [
    // Lvl 0  1  2  3  4  5  6  7  8  9
    [3, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Level 1
    [4, 2, 0, 0, 0, 0, 0, 0, 0, 0], // Level 2
    [4, 2, 1, 0, 0, 0, 0, 0, 0, 0], // Level 3
    [5, 3, 2, 0, 0, 0, 0, 0, 0, 0], // Level 4
    [5, 3, 2, 1, 0, 0, 0, 0, 0, 0], // Level 5
    [5, 3, 3, 2, 0, 0, 0, 0, 0, 0], // Level 6
    [6, 4, 3, 2, 1, 0, 0, 0, 0, 0], // Level 7
    [6, 4, 3, 3, 2, 0, 0, 0, 0, 0], // Level 8
    [6, 4, 4, 3, 2, 1, 0, 0, 0, 0], // Level 9
    [6, 4, 4, 3, 3, 2, 0, 0, 0, 0], // Level 10
    [6, 5, 4, 4, 3, 2, 1, 0, 0, 0], // Level 11
    [6, 5, 4, 4, 3, 3, 2, 0, 0, 0], // Level 12
    [6, 5, 5, 4, 4, 3, 2, 1, 0, 0], // Level 13
    [6, 5, 5, 4, 4, 3, 3, 2, 0, 0], // Level 14
    [6, 5, 5, 5, 4, 4, 3, 2, 1, 0], // Level 15
    [6, 5, 5, 5, 4, 4, 3, 3, 2, 0], // Level 16
    [6, 5, 5, 5, 5, 4, 4, 3, 2, 1], // Level 17
    [6, 5, 5, 5, 5, 4, 4, 3, 3, 2], // Level 18
    [6, 5, 5, 5, 5, 5, 4, 4, 3, 3], // Level 19
    [6, 5, 5, 5, 5, 5, 4, 4, 4, 4], // Level 20
  ];

  function updateSpells(clericLevel) {
    if (!abilities.wis || !spellsTbody) return;

    const wisMod = abilities.wis.mod;
    const spellsPerDay = clericSpellsPerDay[clericLevel - 1] || [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const rows = spellsTbody.querySelectorAll("tr[data-spell-level]");
    rows.forEach((row) => {
      const level = parseInt(row.dataset.spellLevel, 10);

      const base = spellsPerDay[level] || 0;

      let bonus = 0;
      if (level > 0 && wisMod >= level) {
        bonus = Math.floor((wisMod - level) / 4) + 1;
      }

      row.querySelector('input[name="spells-per-day"]').value = base;
      row.querySelector('input[name="bonus-spells"]').value =
        bonus > 0 ? bonus : 0;

      if (base === 0 && bonus === 0 && level > 0) {
        row.querySelector('input[name="save-dc"]').value = "-";
      } else {
        row.querySelector('input[name="save-dc"]').value = 10 + level + wisMod;
      }
    });
  }

  function populateSpellsTable() {
    if (!spellsTbody) return;
    for (let level = 0; level <= 9; level++) {
      const row = document.createElement("tr");
      row.dataset.spellLevel = level;
      row.innerHTML = `
            <td>${level}</td>
            <td><input type="text" name="spells-per-day" readonly></td>
            <td><input type="text" name="bonus-spells" readonly></td>
            <td><input type="text" name="save-dc" readonly></td>
            <td><input type="text" name="spells-known" class="spells-known-input"></td>
        `;
      spellsTbody.appendChild(row);
    }
  }

  // Central Update Function
  function updateAllCalculatedFields() {
    updateAC();
    const saveRows = savesTable.querySelectorAll(".stat-row-save");
    saveRows.forEach(updateSave);
    updateSpells(calculateLevel(totalXp));
  }

  // Initializer
  function initializeCharacterSheet() {
    loadXpData();
    initializeAbilities();

    Object.values(acInputs).forEach((input) => {
      if (input && (input.name === "ac-magic" || input.name === "ac-misc")) {
        input.addEventListener("input", updateAC);
      }
    });

    document.querySelectorAll(".clickable").forEach((item) => {
      item.addEventListener("click", () => {
        window.location.href = item.dataset.link;
      });
    });

    // Listen for changes from the details page
    window.addEventListener("storage", (e) => {
      if (e.key === "acDetails") {
        updateAC();
      }
    });

    const saveRows = document.querySelectorAll(".stat-row-save");
    saveRows.forEach((row) => {
      const inputs = row.querySelectorAll('input[type="number"]');
      inputs.forEach((input) => {
        input.addEventListener("input", () => updateSave(row));
      });
    });

    if (spellsTbody) {
      populateSpellsTable();
      // Initial spell update after abilities are loaded
      if (abilities.wis) {
        updateSpells(calculateLevel(totalXp));
      }
    }

    // Initial AC update
    updateAC();
  }

  function updateSkillsSummary() {
    const skills = [
      { id: "appraise", name: "הערכה", keyAbility: "INT" },
      { id: "balance", name: "שיווי משקל", keyAbility: "DEX" },
      { id: "bluff", name: "בלוף", keyAbility: "CHA" },
      { id: "climb", name: "טיפוס", keyAbility: "STR" },
      { id: "concentration", name: "ריכוז", keyAbility: "CON" },
      { id: "craft", name: "אומנות", keyAbility: "INT" },
      { id: "decipher_script", name: "פענוח כתב", keyAbility: "INT" },
      { id: "diplomacy", name: "דיפלומטיה", keyAbility: "CHA" },
      { id: "disable_device", name: "נטרול התקן", keyAbility: "INT" },
      { id: "disguise", name: "תחפושת", keyAbility: "CHA" },
      { id: "escape_artist", name: "אמנות הבריחה", keyAbility: "DEX" },
      { id: "forgery", name: "זיוף", keyAbility: "INT" },
      { id: "gather_information", name: "איסוף מידע", keyAbility: "CHA" },
      { id: "handle_animal", name: "טיפול בחיות", keyAbility: "CHA" },
      { id: "heal", name: "רפואה", keyAbility: "WIS" },
      { id: "hide", name: "התחבאות", keyAbility: "DEX" },
      { id: "intimidate", name: "הפחדה", keyAbility: "CHA" },
      { id: "jump", name: "קפיצה", keyAbility: "STR" },
      { id: "knowledge_arcana", name: "ידע (ארקנה)", keyAbility: "INT" },
      {
        id: "knowledge_architecture",
        name: "ידע (ארכיטקטורה)",
        keyAbility: "INT",
      },
      {
        id: "knowledge_dungeoneering",
        name: "ידע (מבוכים)",
        keyAbility: "INT",
      },
      { id: "knowledge_geography", name: "ידע (גאוגרפיה)", keyAbility: "INT" },
      { id: "knowledge_history", name: "ידע (היסטוריה)", keyAbility: "INT" },
      { id: "knowledge_local", name: "ידע (מקומי)", keyAbility: "INT" },
      { id: "knowledge_nature", name: "ידע (טבע)", keyAbility: "INT" },
      { id: "knowledge_nobility", name: "ידע (אצולה)", keyAbility: "INT" },
      { id: "knowledge_religion", name: "ידע (דת)", keyAbility: "INT" },
      { id: "knowledge_the_planes", name: "ידע (מישורים)", keyAbility: "INT" },
      { id: "listen", name: "האזנה", keyAbility: "WIS" },
      { id: "move_silently", name: "התגנבות", keyAbility: "DEX" },
      { id: "open_lock", name: "פריצת מנעולים", keyAbility: "DEX" },
      { id: "perform", name: "הופעה", keyAbility: "CHA" },
      { id: "profession", name: "מקצוע", keyAbility: "WIS" },
      { id: "ride", name: "רכיבה", keyAbility: "DEX" },
      { id: "search", name: "חיפוש", keyAbility: "INT" },
      { id: "sense_motive", name: "חישת מניע", keyAbility: "WIS" },
      { id: "sleight_of_hand", name: "זריזות ידיים", keyAbility: "DEX" },
      { id: "spellcraft", name: "אומנות הלחש", keyAbility: "INT" },
      { id: "spot", name: "הבחנה", keyAbility: "WIS" },
      { id: "survival", name: "הישרדות", keyAbility: "WIS" },
      { id: "swim", name: "שחיה", keyAbility: "STR" },
      { id: "tumble", name: "גלגול", keyAbility: "DEX" },
      { id: "use_magic_device", name: "שימוש בחפץ קסום", keyAbility: "CHA" },
      { id: "use_rope", name: "שימוש בחבל", keyAbility: "DEX" },
    ];

    const naraDefaultSkills = {
      concentration: { ranks: 5, miscMod: 0, isClassSkill: true },
      craft: { ranks: 2, miscMod: 0, isClassSkill: true },
      diplomacy: { ranks: 4, miscMod: 0, isClassSkill: true },
      heal: { ranks: 5, miscMod: 0, isClassSkill: true },
      knowledge_religion: { ranks: 2, miscMod: 0, isClassSkill: true },
      knowledge_the_planes: { ranks: 2, miscMod: 0, isClassSkill: true },
      profession: { ranks: 5, miscMod: 0, isClassSkill: true },
      spellcraft: { ranks: 5, miscMod: 0, isClassSkill: true },
      listen: { ranks: 2, miscMod: 0, isClassSkill: false },
      sense_motive: { ranks: 2, miscMod: 0, isClassSkill: false },
      spot: { ranks: 2, miscMod: 0, isClassSkill: false },
      survival: { ranks: 1, miscMod: 0, isClassSkill: false },
    };

    const savedSkills = JSON.parse(localStorage.getItem("skills"));
    const skillData = savedSkills || naraDefaultSkills;
    const container = document.getElementById("skills-summary-container");
    container.innerHTML = "";

    const trainedSkills = skills.filter((skillInfo) => {
      const data = skillData[skillInfo.id];
      return data && (data.ranks > 0 || data.isClassSkill);
    });

    if (trainedSkills.length === 0) {
      container.innerHTML = "<p>אין מיומנויות מאומנות.</p>";
      return;
    }

    let html = "<table>";
    trainedSkills.forEach((skillInfo) => {
      const data = skillData[skillInfo.id];
      const abilityScore =
        abilities[skillInfo.keyAbility.toLowerCase()]?.total || 10;
      const abilityMod = getAbilityModifier(abilityScore);
      const totalMod = (data.ranks || 0) + abilityMod + (data.miscMod || 0);

      html += `
            <tr>
                <td><strong>${skillInfo.name}</strong> (${
        skillInfo.keyAbility
      })</td>
                <td>${totalMod >= 0 ? "+" : ""}${totalMod}</td>
            </tr>
        `;
    });
    html += "</table>";
    container.innerHTML = html;
  }

  function setupEventListeners() {
    const abilityInputs = document.querySelectorAll('input[type="number"]');
    abilityInputs.forEach((input) => {
      input.addEventListener("input", () => {
        const row = input.closest("tr");
        if (row) {
          calculateAbilityScore(row);
        }
      });
    });
  }

  function updateAll() {
    updateAbilities();
    updateAC();
    updateSaves();
    updateSpells();
    updateBAB();
    updateSkillsSummary();
  }

  initializeCharacterSheet();
});
