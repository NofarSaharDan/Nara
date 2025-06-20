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

  let characterAbilities = {};
  let skillData = {};

  const skillsTbody = document.getElementById("skills-tbody");

  function loadData() {
    const savedAbilities = JSON.parse(localStorage.getItem("abilities")) || {};
    Object.keys(savedAbilities).forEach((key) => {
      characterAbilities[key] = savedAbilities[key];
    });

    const savedSkills = JSON.parse(localStorage.getItem("skills")) || {};
    skills.forEach((skill) => {
      skillData[skill.id] = savedSkills[skill.id] || {
        ranks: 0,
        miscMod: 0,
        isClassSkill: false,
      };
    });
  }

  function saveData() {
    localStorage.setItem("skills", JSON.stringify(skillData));
  }

  function getAbilityModifier(abilityScore) {
    return Math.floor((abilityScore - 10) / 2);
  }

  function renderSkills() {
    skillsTbody.innerHTML = "";
    skills.forEach((skillInfo) => {
      const row = document.createElement("tr");
      const data = skillData[skillInfo.id];
      const abilityScore =
        characterAbilities[skillInfo.keyAbility.toLowerCase()]?.total || 10;
      const abilityMod = getAbilityModifier(abilityScore);

      // Cross-class skill ranks are halved
      const maxRanks = data.isClassSkill
        ? (characterAbilities.level || 0) + 3
        : ((characterAbilities.level || 0) + 3) / 2;
      const effectiveRanks = data.isClassSkill ? data.ranks : data.ranks / 2;

      const totalMod = Math.floor(effectiveRanks) + abilityMod + data.miscMod;

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
                }" value="${data.ranks}" max="${Math.floor(maxRanks)}"></td>
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
