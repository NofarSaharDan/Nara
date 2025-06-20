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
    armor: document.querySelector('input[name="ac-armor"]'),
    shield: document.querySelector('input[name="ac-shield"]'),
    dex: document.querySelector('input[name="ac-dex"]'),
    natural: document.querySelector('input[name="ac-natural"]'),
    magic: document.querySelector('input[name="ac-magic"]'),
    misc: document.querySelector('input[name="ac-misc"]'),
  };

  function updateAC() {
    if (!abilities.dex) return;

    const armor = parseInt(acInputs.armor.value, 10) || 0;
    const shield = parseInt(acInputs.shield.value, 10) || 0;
    const natural = parseInt(acInputs.natural.value, 10) || 0;
    const magic = parseInt(acInputs.magic.value, 10) || 0;
    const misc = parseInt(acInputs.misc.value, 10) || 0;
    const dexMod = abilities.dex.mod;

    acInputs.dex.value = dexMod >= 0 ? `+${dexMod}` : dexMod;

    const totalAc = 10 + armor + shield + dexMod + natural + magic + misc;
    acInputs.total.value = totalAc;
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
      if (input && input.name !== "ac-total" && input.name !== "ac-dex") {
        input.addEventListener("input", updateAC);
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
  }

  initializeCharacterSheet();
});
