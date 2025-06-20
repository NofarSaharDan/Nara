document.addEventListener("DOMContentLoaded", () => {
  const xpInput = document.getElementById("xp-input");
  const levelDisplay = document.getElementById("character-level");

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

  function updateLevel() {
    const currentXp = parseInt(xpInput.value, 10) || 0;
    const newLevel = calculateLevel(currentXp);
    levelDisplay.textContent = newLevel;
  }

  xpInput.addEventListener("input", updateLevel);

  // Initial calculation on page load
  updateLevel();

  // Ability Score Calculation
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

  if (abilitiesTable) {
    initializeAbilities();
  }
});
