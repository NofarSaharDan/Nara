const clericSpells = [
  // Level 0 (Orisons)
  {
    name: "Create Water",
    level: 0,
    source: "Core",
    description: "Creates 2 gallons/level of pure water.",
  },
  {
    name: "Cure Minor Wounds",
    level: 0,
    source: "Core",
    description: "Cures 1 point of damage.",
  },
  {
    name: "Detect Magic",
    level: 0,
    source: "Core",
    description: "Detects spells and magic items within 60 ft.",
  },
  {
    name: "Detect Poison",
    level: 0,
    source: "Core",
    description: "Detects poison in one creature or object.",
  },
  {
    name: "Guidance",
    level: 0,
    source: "Core",
    description: "+1 on one attack roll, saving throw, or skill check.",
  },
  {
    name: "Inflict Minor Wounds",
    level: 0,
    source: "Core",
    description: "Touch attack, 1 point of damage.",
  },
  {
    name: "Light",
    level: 0,
    source: "Core",
    description: "Object shines like a torch.",
  },
  {
    name: "Mending",
    level: 0,
    source: "Core",
    description: "Makes minor repairs on an object.",
  },
  {
    name: "Purify Food and Drink",
    level: 0,
    source: "Core",
    description: "Purifies 1 cu. ft./level of food or water.",
  },
  {
    name: "Read Magic",
    level: 0,
    source: "Core",
    description: "Read scrolls and spellbooks.",
  },
  {
    name: "Resistance",
    level: 0,
    source: "Core",
    description: "Subject gains +1 on saving throws.",
  },
  {
    name: "Virtue",
    level: 0,
    source: "Core",
    description: "Subject gains 1 temporary hp.",
  },

  // Level 1
  {
    name: "Bane",
    level: 1,
    source: "Core",
    description: "Enemies take –1 on attack rolls and saves against fear.",
  },
  {
    name: "Bless",
    level: 1,
    source: "Core",
    description: "Allies gain +1 on attack rolls and saves against fear.",
  },
  {
    name: "Bless Water",
    level: 1,
    source: "Core",
    description: "Makes holy water.",
  },
  {
    name: "Cause Fear",
    level: 1,
    source: "Core",
    description: "One creature of 5 HD or less flees for 1d4 rounds.",
  },
  {
    name: "Command",
    level: 1,
    source: "Core",
    description: "One subject obeys selected command for 1 round.",
  },
  {
    name: "Comprehend Languages",
    level: 1,
    source: "Core",
    description: "You understand all spoken and written languages.",
  },
  {
    name: "Cure Light Wounds",
    level: 1,
    source: "Core",
    description: "Cures 1d8 damage +1/level (max +5).",
  },
  {
    name: "Curse Water",
    level: 1,
    source: "Core",
    description: "Makes unholy water.",
  },
  {
    name: "Deathwatch",
    level: 1,
    source: "Core",
    description: "Reveals how near death subjects within 30 ft. are.",
  },
  {
    name: "Detect Chaos/Evil/Good/Law",
    level: 1,
    source: "Core",
    description: "Reveals creatures, spells, or objects of selected alignment.",
  },
  {
    name: "Detect Undead",
    level: 1,
    source: "Core",
    description: "Reveals undead within 60 ft.",
  },
  {
    name: "Divine Favor",
    level: 1,
    source: "Core",
    description: "You gain +1 per three levels on attack and damage rolls.",
  },
  {
    name: "Doom",
    level: 1,
    source: "Core",
    description:
      "One subject takes –2 on attack rolls, damage rolls, saves, and checks.",
  },
  {
    name: "Endure Elements",
    level: 1,
    source: "Core",
    description: "Exist comfortably in hot or cold environments.",
  },
  {
    name: "Entropic Shield",
    level: 1,
    source: "Core",
    description: "Ranged attacks against you have 20% miss chance.",
  },
  {
    name: "Hide from Undead",
    level: 1,
    source: "Core",
    description: "Undead can't perceive one subject/level.",
  },
  {
    name: "Inflict Light Wounds",
    level: 1,
    source: "Core",
    description: "Touch deals 1d8 damage +1/level (max +5).",
  },
  {
    name: "Magic Stone",
    level: 1,
    source: "Core",
    description: "Three stones gain +1 on attack, deal 1d6 +1 damage.",
  },
  {
    name: "Magic Weapon",
    level: 1,
    source: "Core",
    description: "Weapon gains +1 bonus.",
  },
  {
    name: "Obscuring Mist",
    level: 1,
    source: "Core",
    description: "Fog surrounds you.",
  },
  {
    name: "Protection from Chaos/Evil/Good/Law",
    level: 1,
    source: "Core",
    description:
      "+2 to AC and saves, counter mind control, hedge out elementals and outsiders.",
  },
  {
    name: "Remove Fear",
    level: 1,
    source: "Core",
    description:
      "Suppresses fear or gives +4 on saves against fear for one subject + one per four levels.",
  },
  {
    name: "Sanctuary",
    level: 1,
    source: "Core",
    description: "Opponents can't attack you, and you can't attack.",
  },
  {
    name: "Shield of Faith",
    level: 1,
    source: "Core",
    description: "Aura grants +2 or higher deflection bonus.",
  },
  {
    name: "Summon Monster I",
    level: 1,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
  },

  // Level 2
  {
    name: "Aid",
    level: 2,
    source: "Core",
    description:
      "+1 on attack rolls and saves against fear, 1d8 temporary hp +1/level (max +10).",
  },
  {
    name: "Align Weapon",
    level: 2,
    source: "Core",
    description: "Weapon becomes good, evil, lawful, or chaotic.",
  },
  {
    name: "Augury",
    level: 2,
    source: "Core",
    description: "Learns whether an action will be good or bad.",
  },
  {
    name: "Bear's Endurance",
    level: 2,
    source: "Core",
    description: "Subject gains +4 to Con for 1 min./level.",
  },
  {
    name: "Bull's Strength",
    level: 2,
    source: "Core",
    description: "Subject gains +4 to Str for 1 min./level.",
  },
  {
    name: "Calm Emotions",
    level: 2,
    source: "Core",
    description: "Calms creatures, negating emotion effects.",
  },
  {
    name: "Consecrate",
    level: 2,
    source: "Core",
    description: "Fills area with positive energy, making undead weaker.",
  },
  {
    name: "Cure Moderate Wounds",
    level: 2,
    source: "Core",
    description: "Cures 2d8 damage +1/level (max +10).",
  },
  {
    name: "Darkness",
    level: 2,
    source: "Core",
    description: "20-ft. radius of supernatural shadow.",
  },
  {
    name: "Death Knell",
    level: 2,
    source: "Core",
    description:
      "Kills dying creature; you gain 1d8 temporary hp, +2 to Str, and +1 level.",
  },
  {
    name: "Delay Poison",
    level: 2,
    source: "Core",
    description: "Stops poison from harming subject for 1 hour/level.",
  },
  {
    name: "Desecrate",
    level: 2,
    source: "Core",
    description: "Fills area with negative energy, making undead stronger.",
  },
  {
    name: "Eagle's Splendor",
    level: 2,
    source: "Core",
    description: "Subject gains +4 to Cha for 1 min./level.",
  },
  {
    name: "Enthrall",
    level: 2,
    source: "Core",
    description: "Captivates all within 100 ft. + 10 ft./level.",
  },
  {
    name: "Find Traps",
    level: 2,
    source: "Core",
    description: "Notice traps as a rogue does.",
  },
  {
    name: "Gentle Repose",
    level: 2,
    source: "Core",
    description: "Preserves one corpse.",
  },
  {
    name: "Hold Person",
    level: 2,
    source: "Core",
    description: "Paralyzes one humanoid for 1 round/level.",
  },
  {
    name: "Inflict Moderate Wounds",
    level: 2,
    source: "Core",
    description: "Touch attack, 2d8 damage +1/level (max +10).",
  },
  {
    name: "Make Whole",
    level: 2,
    source: "Core",
    description: "Repairs an object.",
  },
  {
    name: "Owl's Wisdom",
    level: 2,
    source: "Core",
    description: "Subject gains +4 to Wis for 1 min./level.",
  },
  {
    name: "Remove Paralysis",
    level: 2,
    source: "Core",
    description: "Frees one or more creatures from paralysis or slow effect.",
  },
  {
    name: "Resist Energy",
    level: 2,
    source: "Core",
    description:
      "Ignores 10 (or more) points of damage/attack from specified energy type.",
  },
  {
    name: "Restoration, Lesser",
    level: 2,
    source: "Core",
    description:
      "Dispels magical ability penalty or repairs 1d4 ability damage.",
  },
  {
    name: "Shatter",
    level: 2,
    source: "Core",
    description: "Sonic vibration damages objects or crystalline creatures.",
  },
  {
    name: "Shield Other",
    level: 2,
    source: "Core",
    description: "You take half of subject's damage.",
  },
  {
    name: "Silence",
    level: 2,
    source: "Core",
    description: "Negates sound in 15-ft. radius.",
  },
  {
    name: "Sound Burst",
    level: 2,
    source: "Core",
    description: "Deals 1d8 sonic damage to subjects; may stun them.",
  },
  {
    name: "Spiritual Weapon",
    level: 2,
    source: "Core",
    description: "Magic weapon attacks on its own.",
  },
  {
    name: "Status",
    level: 2,
    source: "Core",
    description: "Monitors condition, position of allies.",
  },
  {
    name: "Summon Monster II",
    level: 2,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
  },
  {
    name: "Undetectable Alignment",
    level: 2,
    source: "Core",
    description: "Conceals alignment for 24 hours.",
  },
  {
    name: "Zone of Truth",
    level: 2,
    source: "Core",
    description: "Subjects within range cannot lie.",
  },

  // Level 3
  {
    name: "Animate Dead",
    level: 3,
    source: "Core",
    description: "Creates undead skeletons and zombies.",
  },
  {
    name: "Bestow Curse",
    level: 3,
    source: "Core",
    description:
      "–6 to an ability score; –4 on attack rolls, saves, and checks; or 50% chance of losing each action.",
  },
  {
    name: "Blindness/Deafness",
    level: 3,
    source: "Core",
    description: "Makes subject blinded or deafened.",
  },
  {
    name: "Contagion",
    level: 3,
    source: "Core",
    description: "Infects subject with chosen disease.",
  },
  {
    name: "Continual Flame",
    level: 3,
    source: "Core",
    description: "Makes a permanent, heatless torch.",
  },
  {
    name: "Create Food and Water",
    level: 3,
    source: "Core",
    description: "Feeds three humans (or one horse)/level.",
  },
  {
    name: "Cure Serious Wounds",
    level: 3,
    source: "Core",
    description: "Cures 3d8 damage +1/level (max +15).",
  },
  {
    name: "Daylight",
    level: 3,
    source: "Core",
    description: "60-ft. radius of bright light.",
  },
  {
    name: "Deeper Darkness",
    level: 3,
    source: "Core",
    description: "Object sheds supernatural shadow in 60-ft. radius.",
  },
  {
    name: "Dispel Magic",
    level: 3,
    source: "Core",
    description: "Cancels spells and magical effects.",
  },
  {
    name: "Glyph of Warding",
    level: 3,
    source: "Core",
    description: "Inscription harms those who pass it.",
  },
  {
    name: "Helping Hand",
    level: 3,
    source: "Core",
    description: "Ghostly hand leads subject to you.",
  },
  {
    name: "Inflict Serious Wounds",
    level: 3,
    source: "Core",
    description: "Touch attack, 3d8 damage +1/level (max +15).",
  },
  {
    name: "Invisibility Purge",
    level: 3,
    source: "Core",
    description: "Dispels invisibility within 5 ft./level.",
  },
  {
    name: "Locate Object",
    level: 3,
    source: "Core",
    description: "Senses direction toward object (specific or type).",
  },
  {
    name: "Magic Circle against Chaos/Evil/Good/Law",
    level: 3,
    source: "Core",
    description: "As protection spells, but 10-ft. radius and 10 min./level.",
  },
  {
    name: "Magic Vestment",
    level: 3,
    source: "Core",
    description: "Armor or shield gains +1 enhancement per four levels.",
  },
  {
    name: "Meld into Stone",
    level: 3,
    source: "Core",
    description: "You and your gear merge with stone.",
  },
  {
    name: "Obscure Object",
    level: 3,
    source: "Core",
    description: "Masks object against scrying.",
  },
  {
    name: "Prayer",
    level: 3,
    source: "Core",
    description: "Allies +1 bonus on most rolls, enemies –1 penalty.",
  },
  {
    name: "Protection from Energy",
    level: 3,
    source: "Core",
    description: "Absorb 12 points/level of damage from one kind of energy.",
  },
  {
    name: "Remove Blindness/Deafness",
    level: 3,
    source: "Core",
    description: "Cures normal or magical conditions.",
  },
  {
    name: "Remove Curse",
    level: 3,
    source: "Core",
    description: "Frees object or person from curse.",
  },
  {
    name: "Remove Disease",
    level: 3,
    source: "Core",
    description: "Cures all diseases affecting subject.",
  },
  {
    name: "Searing Light",
    level: 3,
    source: "Core",
    description: "Ray deals 1d8/two levels damage, more against undead.",
  },
  {
    name: "Speak with Dead",
    level: 3,
    source: "Core",
    description: "Corpse answers one question/two levels.",
  },
  {
    name: "Stone Shape",
    level: 3,
    source: "Core",
    description: "Sculpts stone into any shape.",
  },
  {
    name: "Summon Monster III",
    level: 3,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
  },
  {
    name: "Water Breathing",
    level: 3,
    source: "Core",
    description: "Subjects can breathe underwater.",
  },
  {
    name: "Water Walk",
    level: 3,
    source: "Core",
    description: "Subject treads on water as if solid.",
  },
  {
    name: "Wind Wall",
    level: 3,
    source: "Core",
    description: "Deflects arrows, smaller creatures, and gases.",
  },
  {
    name: "Vigor",
    level: 3,
    source: "CD",
    description: "As lesser vigor, but 2 hp/round (max 25 rounds).",
  },

  // Level 4
  {
    name: "Air Walk",
    level: 4,
    source: "Core",
    description:
      "Subject treads on air as if solid (climb at 45-degree angle).",
  },
  {
    name: "Control Water",
    level: 4,
    source: "Core",
    description: "Raises or lowers bodies of water.",
  },
  {
    name: "Cure Critical Wounds",
    level: 4,
    source: "Core",
    description: "Cures 4d8 damage +1/level (max +20).",
  },
  {
    name: "Death Ward",
    level: 4,
    source: "Core",
    description: "Grants immunity to death spells and negative energy effects.",
  },
  {
    name: "Dimensional Anchor",
    level: 4,
    source: "Core",
    description: "Bars extradimensional movement.",
  },
  {
    name: "Discern Lies",
    level: 4,
    source: "Core",
    description: "Reveals deliberate falsehoods.",
  },
  {
    name: "Dismissal",
    level: 4,
    source: "Core",
    description: "Forces a creature to return to native plane.",
  },
  {
    name: "Divination",
    level: 4,
    source: "Core",
    description: "Provides useful advice for specific proposed actions.",
  },
  {
    name: "Divine Power",
    level: 4,
    source: "Core",
    description: "You gain attack bonus, +6 to Str, and 1 hp/level.",
  },
  {
    name: "Freedom of Movement",
    level: 4,
    source: "Core",
    description: "Subject moves normally despite impediments.",
  },
  {
    name: "Giant Vermin",
    level: 4,
    source: "Core",
    description: "Turns centipedes, scorpions, or spiders into giant vermin.",
  },
  {
    name: "Imbue with Spell Ability",
    level: 4,
    source: "Core",
    description: "Transfer spells to subject.",
  },
  {
    name: "Inflict Critical Wounds",
    level: 4,
    source: "Core",
    description: "Touch attack, 4d8 damage +1/level (max +20).",
  },
  {
    name: "Magic Weapon, Greater",
    level: 4,
    source: "Core",
    description: "+1 bonus/four levels (max +5).",
  },
  {
    name: "Neutralize Poison",
    level: 4,
    source: "Core",
    description:
      "Immunizes subject against poison, detoxifies venom in or on subject.",
  },
  {
    name: "Planar Ally, Lesser",
    level: 4,
    source: "Core",
    description: "Exchange services with a 6 HD extraplanar creature.",
  },
  {
    name: "Poison",
    level: 4,
    source: "Core",
    description: "Touch deals 1d10 Con damage, repeats in 1 min.",
  },
  {
    name: "Repel Vermin",
    level: 4,
    source: "Core",
    description: "Insects, spiders, and other vermin stay 10 ft. away.",
  },
  {
    name: "Restoration",
    level: 4,
    source: "Core",
    description: "Restores level and ability score drains.",
  },
  {
    name: "Sending",
    level: 4,
    source: "Core",
    description: "Delivers short message anywhere, instantly.",
  },
  {
    name: "Spell Immunity",
    level: 4,
    source: "Core",
    description: "Subject is immune to one spell per four levels.",
  },
  {
    name: "Summon Monster IV",
    level: 4,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
  },
  {
    name: "Tongues",
    level: 4,
    source: "Core",
    description: "Speak any language.",
  },
  {
    name: "Recitation",
    level: 4,
    source: "CD",
    description:
      "Your allies get bonus on attacks and saves, and your foes get penalties.",
  },

  // Level 5
  {
    name: "Atonement",
    level: 5,
    source: "Core",
    description: "Removes burden of misdeeds from subject.",
  },
  {
    name: "Break Enchantment",
    level: 5,
    source: "Core",
    description:
      "Frees subjects from enchantments, alterations, curses, and petrification.",
  },
  {
    name: "Command, Greater",
    level: 5,
    source: "Core",
    description: "As command, but affects one subject/level.",
  },
  {
    name: "Commune",
    level: 5,
    source: "Core",
    description: "Deity answers one yes-or-no question/level.",
  },
  {
    name: "Cure Light Wounds, Mass",
    level: 5,
    source: "Core",
    description: "Cures 1d8 damage +1/level for many creatures.",
  },
  {
    name: "Dispel Chaos/Evil/Good/Law",
    level: 5,
    source: "Core",
    description: "+4 bonus against attacks.",
  },
  {
    name: "Disrupting Weapon",
    level: 5,
    source: "Core",
    description: "Melee weapon destroys undead.",
  },
  {
    name: "Flame Strike",
    level: 5,
    source: "Core",
    description: "Smite foes with divine fire (1d6/level damage).",
  },
  {
    name: "Hallow",
    level: 5,
    source: "Core",
    description: "Designates location as holy.",
  },
  {
    name: "Inflict Light Wounds, Mass",
    level: 5,
    source: "Core",
    description: "Deals 1d8 damage +1/level to many creatures.",
  },
  {
    name: "Insect Plague",
    level: 5,
    source: "Core",
    description: "Locust swarms attack creatures.",
  },
  {
    name: "Mark of Justice",
    level: 5,
    source: "Core",
    description: "Designates action that will trigger curse on subject.",
  },
  {
    name: "Plane Shift",
    level: 5,
    source: "Core",
    description: "As many as eight subjects travel to another plane.",
  },
  {
    name: "Raise Dead",
    level: 5,
    source: "Core",
    description:
      "Restores life to subject who died as long as one day/level ago.",
  },
  {
    name: "Righteous Might",
    level: 5,
    source: "Core",
    description: "Your size increases, and you gain combat bonuses.",
  },
  {
    name: "Scrying",
    level: 5,
    source: "Core",
    description: "Spies on subject from a distance.",
  },
  {
    name: "Slay Living",
    level: 5,
    source: "Core",
    description: "Touch attack kills subject.",
  },
  {
    name: "Spell Resistance",
    level: 5,
    source: "Core",
    description: "Subject gains SR 12 + level.",
  },
  {
    name: "Summon Monster V",
    level: 5,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
  },
  {
    name: "Symbol of Pain",
    level: 5,
    source: "Core",
    description: "Triggered rune wracks nearby creatures with pain.",
  },
  {
    name: "Symbol of Sleep",
    level: 5,
    source: "Core",
    description: "Triggered rune puts nearby creatures into catatonic slumber.",
  },
  {
    name: "True Seeing",
    level: 5,
    source: "Core",
    description: "Lets you see all things as they really are.",
  },
  {
    name: "Unhallow",
    level: 5,
    source: "Core",
    description: "Designates location as unholy.",
  },
  {
    name: "Wall of Stone",
    level: 5,
    source: "Core",
    description: "Creates a stone wall that can be shaped.",
  },
  {
    name: "Vigor, Greater",
    level: 5,
    source: "CD",
    description: "As lesser vigor, but 4 hp/round.",
  },

  // Level 6
  {
    name: "Animate Objects",
    level: 6,
    source: "Core",
    description: "Objects attack your foes.",
  },
  {
    name: "Antilife Shell",
    level: 6,
    source: "Core",
    description: "10-ft. field hedges out living creatures.",
  },
  {
    name: "Banishment",
    level: 6,
    source: "Core",
    description: "Banishes 2 HD/level of extraplanar creatures.",
  },
  {
    name: "Bear's Endurance, Mass",
    level: 6,
    source: "Core",
    description: "As bear's endurance, affects one subject/ level.",
  },
  {
    name: "Blade Barrier",
    level: 6,
    source: "Core",
    description: "Wall of blades deals 1d6/level damage.",
  },
  {
    name: "Bull's Strength, Mass",
    level: 6,
    source: "Core",
    description: "As bull's strength, affects one subject/level.",
  },
  {
    name: "Create Undead",
    level: 6,
    source: "Core",
    description: "Create ghouls, ghasts, mummies, or mohrgs.",
  },
  {
    name: "Cure Moderate Wounds, Mass",
    level: 6,
    source: "Core",
    description: "Cures 2d8 damage +1/level for many creatures.",
  },
  {
    name: "Dispel Magic, Greater",
    level: 6,
    source: "Core",
    description: "As dispel magic, but up to +20 on check.",
  },
  {
    name: "Eagle's Splendor, Mass",
    level: 6,
    source: "Core",
    description: "As eagle's splendor, affects one subject/level.",
  },
  {
    name: "Find the Path",
    level: 6,
    source: "Core",
    description: "Shows most direct way to a location.",
  },
  {
    name: "Forbiddance",
    level: 6,
    source: "Core",
    description:
      "Blocks planar travel, damages creatures of different alignment.",
  },
  {
    name: "Geas/Quest",
    level: 6,
    source: "Core",
    description: "As lesser geas, plus it affects any creature.",
  },
  {
    name: "Glyph of Warding, Greater",
    level: 6,
    source: "Core",
    description:
      "As glyph of warding, but up to 10d8 damage or 6th-level spell.",
  },
  {
    name: "Harm",
    level: 6,
    source: "Core",
    description: "Deals 10 points/level damage to target.",
  },
  {
    name: "Heal",
    level: 6,
    source: "Core",
    description:
      "Cures 10 points/level of damage, all diseases and mental conditions.",
  },
  {
    name: "Heroes' Feast",
    level: 6,
    source: "Core",
    description: "Food for one creature/level cures and grants combat bonuses.",
  },
  {
    name: "Inflict Moderate Wounds, Mass",
    level: 6,
    source: "Core",
    description: "Deals 2d8 damage +1/level to many creatures.",
  },
  {
    name: "Owl's Wisdom, Mass",
    level: 6,
    source: "Core",
    description: "As owl's wisdom, affects one subject/level.",
  },
  {
    name: "Planar Ally",
    level: 6,
    source: "Core",
    description: "As lesser planar ally, but up to 12 HD.",
  },
  {
    name: "Summon Monster VI",
    level: 6,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
  },
  {
    name: "Symbol of Fear",
    level: 6,
    source: "Core",
    description: "Triggered rune panics nearby creatures.",
  },
  {
    name: "Symbol of Persuasion",
    level: 6,
    source: "Core",
    description: "Triggered rune charms nearby creatures.",
  },
  {
    name: "Undeath to Death",
    level: 6,
    source: "Core",
    description: "Destroys 1d4 HD/level undead (max 20d4).",
  },
  {
    name: "Wind Walk",
    level: 6,
    source: "Core",
    description: "You and your allies turn vaporous and travel fast.",
  },
  {
    name: "Word of Recall",
    level: 6,
    source: "Core",
    description: "Teleports you back to designated place.",
  },
  {
    name: "Visage of the Deity",
    level: 6,
    source: "CD",
    description:
      "As lesser visage of the deity, but you become celestial or fiendish.",
  },

  // Level 7
  {
    name: "Blasphemy",
    level: 7,
    source: "Core",
    description: "Kills, paralyzes, weakens, or dazes nonevil subjects.",
  },
  {
    name: "Control Weather",
    level: 7,
    source: "Core",
    description: "Changes weather in local area.",
  },
  {
    name: "Cure Serious Wounds, Mass",
    level: 7,
    source: "Core",
    description: "Cures 3d8 damage +1/level for many creatures.",
  },
  {
    name: "Destruction",
    level: 7,
    source: "Core",
    description: "Kills subject and destroys remains.",
  },
  {
    name: "Dictum",
    level: 7,
    source: "Core",
    description: "Kills, paralyzes, slows, or deafens nonlawful subjects.",
  },
  {
    name: "Ethereal Jaunt",
    level: 7,
    source: "Core",
    description: "You become ethereal for 1 round/level.",
  },
  {
    name: "Holy Word",
    level: 7,
    source: "Core",
    description: "Kills, paralyzes, blinds, or deafens nongood subjects.",
  },
  {
    name: "Inflict Serious Wounds, Mass",
    level: 7,
    source: "Core",
    description: "Deals 3d8 damage +1/level to many creatures.",
  },
  {
    name: "Refuge",
    level: 7,
    source: "Core",
    description: "Alters item to transport its possessor to you.",
  },
  {
    name: "Regenerate",
    level: 7,
    source: "Core",
    description:
      "Subject's severed limbs grow back, cures 4d8 damage +1/level (max +35).",
  },
  {
    name: "Repulsion",
    level: 7,
    source: "Core",
    description: "Creatures can't approach you.",
  },
  {
    name: "Restoration, Greater",
    level: 7,
    source: "Core",
    description: "As restoration, plus restores all levels and ability scores.",
  },
  {
    name: "Resurrection",
    level: 7,
    source: "Core",
    description: "Fully restore dead subject.",
  },
  {
    name: "Scrying, Greater",
    level: 7,
    source: "Core",
    description: "As scrying, but faster and longer.",
  },
  {
    name: "Summon Monster VII",
    level: 7,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
  },
  {
    name: "Symbol of Stunning",
    level: 7,
    source: "Core",
    description: "Triggered rune stuns nearby creatures.",
  },
  {
    name: "Symbol of Weakness",
    level: 7,
    source: "Core",
    description: "Triggered rune weakens nearby creatures.",
  },
  {
    name: "Word of Chaos",
    level: 7,
    source: "Core",
    description: "Kills, confuses, stuns, or deafens nonchaotic subjects.",
  },
  {
    name: "Righteous Wrath of the Faithful",
    level: 7,
    source: "CD",
    description:
      "Your allies get bonuses, especially if they worship your deity.",
  },

  // Level 8
  {
    name: "Antimagic Field",
    level: 8,
    source: "Core",
    description: "Negates magic within 10 ft.",
  },
  {
    name: "Cloak of Chaos",
    level: 8,
    source: "Core",
    description: "+4 to AC, +4 resistance, and SR 25 against lawful spells.",
  },
  {
    name: "Create Greater Undead",
    level: 8,
    source: "Core",
    description: "Create shadows, wraiths, spectres, or devourers.",
  },
  {
    name: "Cure Critical Wounds, Mass",
    level: 8,
    source: "Core",
    description: "Cures 4d8 damage +1/level for many creatures.",
  },
  {
    name: "Dimensional Lock",
    level: 8,
    source: "Core",
    description:
      "Teleportation and interplanar travel blocked for one day/level.",
  },
  {
    name: "Discern Location",
    level: 8,
    source: "Core",
    description: "Reveals exact location of creature or object.",
  },
  {
    name: "Earthquake",
    level: 8,
    source: "Core",
    description: "Intense tremor shakes 5-ft./level radius.",
  },
  {
    name: "Fire Storm",
    level: 8,
    source: "Core",
    description: "Deals 1d6/level fire damage.",
  },
  {
    name: "Holy Aura",
    level: 8,
    source: "Core",
    description: "+4 to AC, +4 resistance, and SR 25 against evil spells.",
  },
  {
    name: "Inflict Critical Wounds, Mass",
    level: 8,
    source: "Core",
    description: "Deals 4d8 damage +1/level to many creatures.",
  },
  {
    name: "Planar Ally, Greater",
    level: 8,
    source: "Core",
    description: "As lesser planar ally, but up to 18 HD.",
  },
  {
    name: "Shield of Law",
    level: 8,
    source: "Core",
    description: "+4 to AC, +4 resistance, and SR 25 against chaotic spells.",
  },
  {
    name: "Spell Immunity, Greater",
    level: 8,
    source: "Core",
    description: "As spell immunity, but up to 8th-level spells.",
  },
  {
    name: "Summon Monster VIII",
    level: 8,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
  },
  {
    name: "Symbol of Death",
    level: 8,
    source: "Core",
    description: "Triggered rune slays nearby creatures.",
  },
  {
    name: "Symbol of Insanity",
    level: 8,
    source: "Core",
    description: "Triggered rune renders nearby creatures insane.",
  },
  {
    name: "Unholy Aura",
    level: 8,
    source: "Core",
    description: "+4 to AC, +4 resistance, and SR 25 against good spells.",
  },
  {
    name: "Brain Spider",
    level: 8,
    source: "CD",
    description: "Eavesdrop on thoughts of up to eight other creatures.",
  },
  {
    name: "Stormrage",
    level: 8,
    source: "CD",
    description: "You can fly and fire lightning from your eyes.",
  },

  // Level 9
  {
    name: "Astral Projection",
    level: 9,
    source: "Core",
    description: "Projects you and companions onto Astral Plane.",
  },
  {
    name: "Energy Drain",
    level: 9,
    source: "Core",
    description: "Subject gains 2d4 negative levels.",
  },
  {
    name: "Etherealness",
    level: 9,
    source: "Core",
    description: "Travel to Ethereal Plane with companions.",
  },
  {
    name: "Gate",
    level: 9,
    source: "Core",
    description: "Connects two planes for travel or summoning.",
  },
  {
    name: "Heal, Mass",
    level: 9,
    source: "Core",
    description: "As heal, but with several subjects.",
  },
  {
    name: "Implosion",
    level: 9,
    source: "Core",
    description: "Kills one creature/round.",
  },
  {
    name: "Miracle",
    level: 9,
    source: "Core",
    description: "Requests a deity's intercession.",
  },
  {
    name: "Soul Bind",
    level: 9,
    source: "Core",
    description: "Traps newly dead soul to prevent resurrection.",
  },
  {
    name: "Storm of Vengeance",
    level: 9,
    source: "Core",
    description: "Storm rains acid, lightning, and hail.",
  },
  {
    name: "Summon Monster IX",
    level: 9,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
  },
  {
    name: "True Resurrection",
    level: 9,
    source: "Core",
    description: "As resurrection, plus remains aren't needed.",
  },
  {
    name: "Visage of the Deity, Greater",
    level: 9,
    source: "CD",
    description:
      "As lesser visage of the deity, but you become half-celestial or half-fiendish.",
  },
  {
    name: "Summon Elemental Monolith",
    level: 9,
    source: "CAr",
    description: "You summon a tremendously powerful elemental.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const spellListContainer = document.getElementById("spell-list");
  const filterContainer = document.getElementById("spell-level-filters");

  const populateSpells = (spells) => {
    spellListContainer.innerHTML = "";
    spells.forEach((spell) => {
      const spellElement = document.createElement("div");
      spellElement.classList.add("spell-card");
      spellElement.innerHTML = `
        <h3>${spell.name} <i>(${spell.source || "N/A"})</i></h3>
        <p><strong>Level:</strong> ${spell.level}</p>
        <p>${spell.description}</p>
      `;
      spellListContainer.appendChild(spellElement);
    });
  };

  const setupFilters = () => {
    const levels = [...new Set(clericSpells.map((s) => s.level))].sort(
      (a, b) => a - b
    );

    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.classList.add("active");
    allButton.addEventListener("click", (e) => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      populateSpells(clericSpells);
    });
    filterContainer.appendChild(allButton);

    levels.forEach((level) => {
      const button = document.createElement("button");
      button.textContent = `Level ${level}`;
      button.classList.add("filter-btn");
      button.addEventListener("click", (e) => {
        document
          .querySelectorAll("#spell-level-filters button")
          .forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");
        const filteredSpells = clericSpells.filter(
          (spell) => spell.level === level
        );
        populateSpells(filteredSpells);
      });
      filterContainer.appendChild(button);
    });
  };

  setupFilters();
  populateSpells(clericSpells);
});
