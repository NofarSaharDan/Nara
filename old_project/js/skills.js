document.addEventListener("DOMContentLoaded", () => {
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
    { id: "knowledge_dungeoneering", name: "ידע (מבוכים)", keyAbility: "INT" },
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

  let characterAbilities = {};
  let skillData = {};

  const skillsTbody = document.getElementById("skills-tbody");

  function loadData() {
    const savedAbilities = JSON.parse(localStorage.getItem("abilities")) || {};
    Object.keys(savedAbilities).forEach((key) => {
      characterAbilities[key] = savedAbilities[key];
    });

    const savedSkills = JSON.parse(localStorage.getItem("skills"));

    if (!savedSkills) {
      skills.forEach((skill) => {
        skillData[skill.id] = naraDefaultSkills[skill.id] || {
          ranks: 0,
          miscMod: 0,
          isClassSkill: false,
        };
      });
      saveData(); // Save defaults for next time
    } else {
      skills.forEach((skill) => {
        skillData[skill.id] = savedSkills[skill.id] || {
          ranks: 0,
          miscMod: 0,
          isClassSkill: false,
        };
      });
    }
  }

  function saveData() {
    localStorage.setItem("skills", JSON.stringify(skillData));
  }

  function getAbilityModifier(abilityScore) {
    return Math.floor((abilityScore - 10) / 2);
  }

  function getLevelFromXP(xp) {
    if (xp >= 190000) return 20;
    if (xp >= 171000) return 19;
    if (xp >= 153000) return 18;
    if (xp >= 136000) return 17;
    if (xp >= 120000) return 16;
    if (xp >= 105000) return 15;
    if (xp >= 91000) return 14;
    if (xp >= 78000) return 13;
    if (xp >= 66000) return 12;
    if (xp >= 55000) return 11;
    if (xp >= 45000) return 10;
    if (xp >= 36000) return 9;
    if (xp >= 28000) return 8;
    if (xp >= 21000) return 7;
    if (xp >= 15000) return 6;
    if (xp >= 10000) return 5;
    if (xp >= 6000) return 4;
    if (xp >= 3000) return 3;
    if (xp >= 1000) return 2;
    return 1;
  }

  function renderSkills() {
    skillsTbody.innerHTML = "";
    const level = getLevelFromXP(characterAbilities.totalXP || 0);

    skills.forEach((skillInfo) => {
      const row = document.createElement("tr");
      const data = skillData[skillInfo.id];
      const abilityScore =
        characterAbilities[skillInfo.keyAbility.toLowerCase()]?.total || 10;
      const abilityMod = getAbilityModifier(abilityScore);

      const totalMod = (data.ranks || 0) + abilityMod + (data.miscMod || 0);

      const maxRanks = data.isClassSkill
        ? level + 3
        : Math.floor((level + 3) / 2);

      row.innerHTML = `
                <td class="col-class-skill"><input type="checkbox" data-skill-id="${
                  skillInfo.id
                }" ${data.isClassSkill ? "checked" : ""}></td>
                <td class="col-skill-name">${skillInfo.name}</td>
                <td class="col-key-ability">${skillInfo.keyAbility}</td>
                <td class="col-total-mod"><input type="text" value="${totalMod}" readonly></td>
                <td class="col-ability-mod"><input type="text" value="${abilityMod}" readonly></td>
                <td class="col-ranks"><input type="number" data-skill-id="${
                  skillInfo.id
                }" value="${data.ranks}" min="0" max="${maxRanks}"></td>
                <td class="col-misc-mod"><input type="number" data-skill-id="${
                  skillInfo.id
                }" value="${data.miscMod}"></td>
            `;

      skillsTbody.appendChild(row);
    });

    addEventListeners();
  }

  function addEventListeners() {
    skillsTbody.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        const skillId = e.target.dataset.skillId;
        const field = e.target.closest("td").classList.contains("col-ranks")
          ? "ranks"
          : "miscMod";
        skillData[skillId][field] = Number(e.target.value);
        saveData();
        renderSkills();
      });
    });

    skillsTbody.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        const skillId = e.target.dataset.skillId;
        skillData[skillId].isClassSkill = e.target.checked;
        saveData();
        renderSkills();
      });
    });
  }

  loadData();
  renderSkills();
});
