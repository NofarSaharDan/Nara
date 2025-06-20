const clericSpells = [
  // Level 0 (Orisons)
  {
    name: "Create Water",
    name_he: "יצירת מים",
    level: 0,
    duration: "Instantaneous",
    description: "Creates 2 gallons/level of pure water.",
    description_he: "יוצר 2 גלונים/דרגה של מים טהורים.",
    full_description:
      "This spell generates wholesome, drinkable water, just like clean rain water. Water can be created in an area as small as will actually contain the liquid, or in an area three times as large—possibly creating a downpour or filling many small receptacles. This water disappears after 24 hours if not consumed.",
    full_description_he:
      "יוצר 2 גלונים של מים טהורים לכל דרגת לחש שלך. המים נוצרים במקום פתוח או במיכל. אם אין מספיק מקום, הלחש נכשל. המים שנוצרו נעלמים אם לא שותים אותם תוך 24 שעות.",
  },
  {
    name: "Cure Minor Wounds",
    name_he: "ריפוי פצעים קלים",
    level: 0,
    duration: "Instantaneous",
    description: "Cures 1 point of damage.",
    description_he: "מרפא נקודת נזק אחת.",
    full_description:
      "When laying your hand upon a living creature, you channel positive energy that cures 1 point of damage. Since undead are powered by negative energy, this spell deals damage to them instead. The spell has no effect on a creature that has only 1 hit point or is already at full hit points.",
    full_description_he:
      "כאשר אתה מניח את ידך על יצור פצוע, הלחש מרפא נקודת נזק אחת. הלחש אינו משפיע על יצורים ללא נזק, או על יצורים עם נזק מקסימלי.",
  },
  {
    name: "Detect Magic",
    name_he: "זיהוי קסם",
    level: 0,
    duration: "1 min./level",
    description: "Detects spells and magic items within 60 ft.",
    description_he: "מגלה לחשים וחפצים קסומים בטווח של 60 רגל.",
    full_description:
      "You detect magical auras. The amount of information revealed depends on how long you study a particular area or subject. You can detect the presence or absence of magical auras, the school of magic involved in the aura, and the spell's power relative to your level.",
    full_description_he:
      "אתה חוש את נוכחות הקסם בטווח של 60 רגל. הלחש יכול לזהות לחשים פעילים, חפצים קסומים, וקסם קבוע. אתה מקבל אינדיקציה כללית לסוג הקסם (אבל לא לפרטים ספציפיים).",
  },
  {
    name: "Detect Poison",
    name_he: "זיהוי רעל",
    level: 0,
    duration: "Instantaneous",
    description: "Detects poison in one creature or object.",
    description_he: "מגלה רעל ביצור או חפץ אחד.",
    full_description:
      "You determine whether a creature or object bears a poison or any other magical or natural substance that is primarily injurious. The spell does not provide information about the type of poison or its effects, only its presence or absence.",
    full_description_he:
      "אתה יכול לזהות רעל ביצור אחד או בחפץ אחד בטווח של 5 רגל. הלחש מגלה נוכחות של רעל, אבל לא את סוג הרעל הספציפי או את עוצמתו.",
  },
  {
    name: "Guidance",
    name_he: "הכוונה",
    level: 0,
    duration: "1 minute or until discharged",
    description: "+1 on one attack roll, saving throw, or skill check.",
    description_he: "+1 לגלגול התקפה, הצלת הצלה או בדיקת מיומנות אחת.",
    full_description:
      "This spell imbues the subject with a touch of divine guidance. The creature gets a +1 competence bonus on a single attack roll, saving throw, or skill check. It must choose to use the bonus before making the roll to which it applies.",
    full_description_he:
      "אתה מעניק השראה אלוהית לנושא אחד, המקבל תוספת של +1 לגלגול התקפה, הצלת הצלה, או בדיקת מיומנות אחת. התוספת חלה על הפעולה הבאה שהנושא מבצע תוך דקה אחת.",
  },
  {
    name: "Inflict Minor Wounds",
    name_he: "גרימת פצעים קלים",
    level: 0,
    duration: "Instantaneous",
    description: "Touch attack, 1 point of damage.",
    description_he: "התקפת מגע, גורם נקודת נזק אחת.",
    full_description:
      "When laying your hand upon a creature, you channel negative energy that deals 1 point of damage. Since undead are powered by negative energy, this spell cures such a creature of a like amount of damage, rather than harming it.",
    full_description_he:
      "כאשר אתה נוגע ביצור, הלחש גורם נקודת נזק אחת. התקפת המגע עוקפת שריון רגיל, אבל לא מגן קסום. אם ההתקפה מחטיאה, הלחש מתבזבז ללא השפעה.",
  },
  {
    name: "Light",
    name_he: "אור",
    level: 0,
    duration: "10 min./level",
    description: "Object shines like a torch.",
    description_he: "חפץ זוהר כמו לפיד.",
    full_description:
      "This spell causes an object to glow like a torch, shedding bright light in a 20-foot radius (and dim light for an additional 20 feet) from the point you touch. The effect is immobile, but it can be cast on a movable object. Light taken into an area of magical darkness does not function.",
    full_description_he:
      "חפץ אחד שאתה נוגע בו זוהר כמו לפיד, מפיץ אור בהיר בטווח של 20 רגל ואור מעומעם בטווח נוסף של 20 רגל. הלחש יכול להפוך אור קיים לחושך, או להחזיר אור שנחסם על ידי לחש חושך.",
  },
  {
    name: "Mending",
    name_he: "תיקון",
    level: 0,
    duration: "Instantaneous",
    description: "Makes minor repairs on an object.",
    description_he: "מתקן נזק קל בחפץ.",
    full_description:
      "This spell repairs damaged objects, restoring 1d4 points of damage to the object. If the object has the broken condition, this condition is removed if the object is restored to at least half its original hit points. All of the pieces of an object must be present for this spell to function.",
    full_description_he:
      "הלחש מתקן נזק קל בחפץ אחד. הוא יכול לתקן שבר באורך של עד רגל אחת, חור בקוטר של עד 2 אינץ', או נזק דומה. הלחש אינו יכול לתקן חפצים קסומים, נשק, או שריון.",
  },
  {
    name: "Purify Food and Drink",
    name_he: "טיהור אוכל ושתייה",
    level: 0,
    duration: "Instantaneous",
    description: "Purifies 1 cu. ft./level of food or water.",
    description_he: "מטהר 1 רגל מעוקב/דרגה של אוכל או מים.",
    full_description:
      "This spell makes spoiled, rotten, diseased, poisonous, or otherwise contaminated food and water pure and suitable for eating and drinking. This spell does not prevent subsequent natural decay or spoilage. Unholy water and similar food and drink of significance are spoiled by purify food and drink, but the spell has no effect on creatures of any type nor upon magic potions.",
    full_description_he:
      "הלחש מטהר אוכל או מים מכל רעל, מחלה, או זיהום אחר. הוא משפיע על 1 רגל מעוקב של חומר לכל דרגת לחש שלך. אוכל או מים שכבר נצרכו אינם מושפעים.",
  },
  {
    name: "Read Magic",
    name_he: "קריאת קסם",
    level: 0,
    duration: "10 min./level",
    description: "Read scrolls and spellbooks.",
    description_he: "קורא מגילות וספרי לחשים.",
    full_description:
      "By means of read magic, you can decipher magical inscriptions on objects—books, scrolls, weapons, and the like—that would otherwise be unintelligible. This deciphering does not normally invoke the magic contained in the writing, although it may do so in the case of a cursed scroll.",
    full_description_he:
      "הלחש מאפשר לך לקרוא כתב קסום, כולל מגילות וספרי לחשים. ללא לחש זה, כתב קסום נראה כסימנים חסרי משמעות. הלחש אינו מעניק הבנה של הלחש עצמו, רק את היכולת לקרוא אותו.",
  },
  {
    name: "Resistance",
    name_he: "התנגדות",
    level: 0,
    duration: "1 minute",
    description: "Subject gains +1 on saving throws.",
    description_he: "הנושא מקבל +1 להצלת הצלה.",
    full_description:
      "You imbue the subject with magical energy that protects it from harm, giving it a +1 resistance bonus on saves. Resistance can be made permanent with a permanency spell.",
    full_description_he:
      "הנושא מקבל תוספת של +1 לכל הצלות ההצלה שלו. התוספת נמשכת דקה אחת לכל דרגת לחש שלך. הלחש אינו מצטבר עם עצמו או עם לחשים דומים אחרים.",
  },
  {
    name: "Virtue",
    name_he: "סגולה",
    level: 0,
    duration: "1 minute",
    description: "Subject gains 1 temporary hp.",
    description_he: "הנושא מקבל נקודת חיים זמנית אחת.",
    full_description:
      "With a touch, you infuse a creature with a tiny surge of life, granting the subject 1 temporary hit point. These temporary hit points are lost first when the subject takes damage. They cannot be healed, and temporary hit points from this spell do not stack with themselves.",
    full_description_he:
      "הנושא מקבל נקודת חיים זמנית אחת. נקודות החיים הזמניות נעלמות כאשר הלחש מסתיים (דקה אחת לכל דרגת לחש). אם הנושא מאבד נקודות חיים זמניות, הוא אינו סובל נזק אמיתי עד שהן נגמרות.",
  },

  // Level 1
  {
    name: "Bane",
    name_he: "קללה",
    level: 1,
    duration: "1 min./level",
    description: "Enemies take –1 on attack rolls and saves against fear.",
    description_he: "אויבים מקבלים -1 לגלגולי התקפה והצלה נגד פחד.",
    full_description:
      "Bane fills your enemies with fear and doubt. Each affected creature takes a –1 penalty on attack rolls and a –1 penalty on saving throws against fear effects. Bane counters and dispels bless.",
    full_description_he:
      "הלחש מפחית את רוחם של אויבים בטווח של 50 רגל. כל אויב בטווח מקבל עונש של -1 לגלגולי התקפה ולהצלות נגד פחד. הלחש משך דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Bless",
    name_he: "ברכה",
    level: 1,
    duration: "1 min./level",
    description: "Allies gain +1 on attack rolls and saves against fear.",
    description_he: "בני ברית מקבלים +1 לגלגולי התקפה והצלה נגד פחד.",
    full_description:
      "Bless fills your allies with courage. Each affected creature gains a +1 morale bonus on attack rolls and on saving throws against fear effects. Bless counters and dispels bane.",
    full_description_he:
      "הלחש מעלה את רוחם של בני ברית בטווח של 50 רגל. כל בן ברית בטווח מקבל תוספת של +1 לגלגולי התקפה ולהצלות נגד פחד. הלחש משך דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Bless Water",
    name_he: "קידוש מים",
    level: 1,
    duration: "Instantaneous",
    description: "Makes holy water.",
    description_he: "יוצר מים קדושים.",
    full_description:
      "This transmutation imbues a flask (1 pint) of water with positive energy, turning it into holy water. Holy water damages undead creatures and evil outsiders almost as if it were acid. A flask of holy water can be thrown as a splash weapon.",
    full_description_he:
      "הלחש הופך עד 3 גלונים של מים רגילים למים קדושים. המים הקדושים גורמים נזק לאל-מתים ויצורים רשעים. אם המים הקדושים נשפכים על יצור רשע, הם גורמים 2ק4 נזק. המים נשארים קדושים עד שהם נצרכים או מתאדים.",
  },
  {
    name: "Cause Fear",
    name_he: "גרימת פחד",
    level: 1,
    duration: "1d4 rounds or 1 round; see text",
    description: "One creature of 5 HD or less flees for 1d4 rounds.",
    description_he: "יצור אחד עם 5 קוביות פגיעה או פחות בורח ל-1ק4 סיבובים.",
    full_description:
      "The affected creature becomes frightened. If the subject succeeds on a Will save, it is shaken for 1 round. Creatures with 6 or more HD are immune to this effect. Cause fear counters and dispels remove fear.",
    full_description_he:
      "הלחש גורם פחד עז ביצור אחד עם 5 קוביות פגיעה או פחות. היצור הפחדן בורח מהמקום במשך 1ק4 סיבובים. אם היצור לא יכול לברוח, הוא רועד מפחד ומקבל עונש של -2 לכל פעולותיו.",
  },
  {
    name: "Command",
    name_he: "פקודה",
    level: 1,
    duration: "1 round",
    description: "One subject obeys selected command for 1 round.",
    description_he: "נושא אחד מציית לפקודה שנבחרה למשך סיבוב אחד.",
    full_description:
      "You give the subject a single command, which it obeys to the best of its ability at its earliest opportunity. You may select from the following options: Approach, Drop, Fall, Flee, Halt, or any other one-word command.",
    full_description_he:
      "הלחש מאפשר לך לתת פקודה פשוטה ליצור אחד בטווח של 60 רגל. הפקודות האפשריות הן: 'בוא', 'לך', 'נפול', 'עמוד', או 'שכח'. היצור מציית לפקודה במשך סיבוב אחד, ואז חוזר להתנהגות רגילה.",
  },
  {
    name: "Comprehend Languages",
    name_he: "הבנת שפות",
    level: 1,
    duration: "10 min./level",
    description: "You understand all spoken and written languages.",
    description_he: "אתה מבין את כל השפות המדוברות והכתובות.",
    full_description:
      "You can understand the spoken words of creatures or read otherwise incomprehensible written messages. In either case, you must touch the creature or the writing. The ability to read does not necessarily impart insight into the material, merely its literal meaning.",
    full_description_he:
      "הלחש מעניק לך הבנה של כל השפות המדוברות והכתובות שאתה שומע או רואה. אתה יכול לקרוא כתב קסום, אבל לא להבין לחשים. הלחש אינו מאפשר לך לדבר או לכתוב בשפות אלה.",
  },
  {
    name: "Cure Light Wounds",
    name_he: "ריפוי פצעים קלים",
    level: 1,
    duration: "Instantaneous",
    description: "Cures 1d8 damage +1/level (max +5).",
    description_he: "מרפא 1ק8 נזק +1/דרגה (מקסימום +5).",
    full_description:
      "When laying your hand upon a living creature, you channel positive energy that cures 1d8 points of damage +1 point per caster level (maximum +5). Since undead are powered by negative energy, this spell deals damage to them instead.",
    full_description_he:
      "כאשר אתה מניח את ידך על יצור פצוע, הלחש מרפא 1ק8 נקודות נזק +1 לכל דרגת לחש שלך (מקסימום +5). הלחש אינו משפיע על יצורים ללא נזק, או על יצורים עם נזק מקסימלי.",
  },
  {
    name: "Curse Water",
    name_he: "קללת מים",
    level: 1,
    duration: "Instantaneous",
    description: "Makes unholy water.",
    description_he: "יוצר מים טמאים.",
    full_description:
      "This transmutation imbues a flask (1 pint) of water with negative energy, turning it into unholy water. Unholy water damages good creatures and good outsiders almost as if it were acid. A flask of unholy water can be thrown as a splash weapon.",
    full_description_he:
      "הלחש הופך עד 3 גלונים של מים רגילים למים טמאים. המים הטמאים גורמים נזק ליצורים טובים ויצורים קדושים. אם המים הטמאים נשפכים על יצור טוב, הם גורמים 2ק4 נזק. המים נשארים טמאים עד שהם נצרכים או מתאדים.",
  },
  {
    name: "Deathwatch",
    name_he: "צפיית מוות",
    level: 1,
    duration: "1 min./level",
    description: "Reveals how near death subjects within 30 ft. are.",
    description_he: "מגלה עד כמה קרובים למוות יצורים בטווח 30 רגל.",
    full_description:
      "Using the foul sight granted by the powers of unlife, you can determine the condition of creatures near death within the spell's range. You automatically know if each creature within the area is dead, fragile (alive and wounded, with 3 or fewer hit points left), fighting off death (alive with 4 or more hit points), healthy, undead, or neither alive nor dead (such as a construct).",
    full_description_he:
      "הלחש מאפשר לך לראות את מצב החיים של כל היצורים בטווח של 30 רגל. אתה יכול לזהות יצורים בריאים, פצועים, גוססים, או מתים. הלחש נמשך דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Detect Chaos/Evil/Good/Law",
    name_he: "זיהוי תוהו/רשע/טוב/חוק",
    level: 1,
    duration: "1 min./level",
    description: "Reveals creatures, spells, or objects of selected alignment.",
    description_he: "מגלה יצורים, לחשים או חפצים בעלי נטייה שנבחרה.",
    full_description:
      "You can detect the presence of chaos, evil, good, or law. The amount of information revealed depends on how long you study a particular area or subject. You can detect the presence or absence of the chosen alignment, the number of auras, and the power of the most powerful aura present.",
    full_description_he:
      "הלחש מאפשר לך לזהות יצורים, לחשים, או חפצים בעלי נטייה ספציפית (תוהו, רשע, טוב, או חוק) בטווח של 60 רגל. אתה מקבל אינדיקציה כללית לעוצמת הנטייה, אבל לא לפרטים ספציפיים.",
  },
  {
    name: "Detect Undead",
    name_he: "זיהוי אל-מתים",
    level: 1,
    duration: "1 min./level",
    description: "Reveals undead within 60 ft.",
    description_he: "מגלה אל-מתים בטווח 60 רגל.",
    full_description:
      "You can detect the presence of undead. The amount of information revealed depends on how long you study a particular area or subject. You can detect the presence or absence of undead, the number of undead, and the power of the most powerful undead present.",
    full_description_he:
      "הלחש מאפשר לך לזהות אל-מתים בטווח של 60 רגל. אתה מקבל אינדיקציה כללית למיקום האל-מתים ולעוצמתם. הלחש נמשך דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Divine Favor",
    name_he: "חסד אלוהי",
    level: 1,
    duration: "1 minute",
    description: "You gain +1 per three levels on attack and damage rolls.",
    description_he: "אתה מקבל +1 לכל שלוש דרגות לגלגולי התקפה ונזק.",
    full_description:
      "Calling upon the strength and wisdom of a deity, you gain a +1 luck bonus on attack and weapon damage rolls for every three caster levels you have (at least +1, maximum +6). The bonus doesn't apply to spell damage.",
    full_description_he:
      "הלחש מעניק לך ברכה אלוהית בקרב. אתה מקבל תוספת של +1 לכל שלוש דרגות לחש שלך (מינימום +1) לגלגולי התקפה ולגלגולי נזק. הלחש נמשך דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Doom",
    name_he: "אבדון",
    level: 1,
    duration: "1 min./level",
    description:
      "One subject takes –2 on attack rolls, damage rolls, saves, and checks.",
    description_he: "נושא אחד מקבל -2 לגלגולי התקפה, נזק, הצלות ובדיקות.",
    full_description:
      "This spell fills a single subject with a feeling of horrible dread that causes it to become shaken. A shaken character takes a –2 penalty on attack rolls, saving throws, skill checks, and ability checks. Doom counters and dispels bless.",
    full_description_he:
      "הלחש מטיל קללה על יצור אחד בטווח של 30 רגל. היצור המאוקלל מקבל עונש של -2 לכל גלגולי ההתקפה, גלגולי הנזק, הצלות, ובדיקות מיומנות. הקללה נמשכת דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Endure Elements",
    name_he: "הגנה מהיסודות",
    level: 1,
    duration: "24 hours",
    description: "Exist comfortably in hot or cold environments.",
    description_he: "קיום נוח בסביבות חמות או קרות.",
    full_description:
      "A creature protected by endure elements suffers no harm from being in a hot or cold environment. It can exist comfortably in conditions between –50 and 140 degrees Fahrenheit without having to make Fortitude saves. The creature's equipment is likewise protected.",
    full_description_he:
      "הלחש מגן על הנושא מפני טמפרטורות קיצוניות. הנושא יכול לשרוד בנוחות בטמפרטורות בין -50 ל-140 מעלות פרנהייט. הלחש אינו מגן מפני נזק אש או קור ישיר, רק מפני תנאי מזג אוויר קיצוניים.",
  },
  {
    name: "Entropic Shield",
    name_he: "מגן אנטרופי",
    level: 1,
    duration: "1 min./level",
    description: "Ranged attacks against you have 20% miss chance.",
    description_he: "להתקפות מטווח יש 20% סיכוי להחטיא אותך.",
    full_description:
      "A magical field appears around you, glowing with a chaotic blast of multicolored hues. This field deflects incoming arrows, rays, and other ranged attacks. Each ranged attack directed at you for which the attacker must make an attack roll has a 20% miss chance (similar to the effects of concealment).",
    full_description_he:
      "הלחש יוצר שדה אנטרופי סביבך שמעוות את המרחב. לכל התקפה מטווח נגדך יש סיכוי של 20% להחטיא, ללא קשר למיומנות התוקף. הלחש נמשך דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Hide from Undead",
    name_he: "הסתרה מאל-מתים",
    level: 1,
    duration: "10 min./level",
    description: "Undead can't perceive one subject/level.",
    description_he: "אל-מתים אינם יכולים להבחין בנושא אחד לכל דרגה.",
    full_description:
      "Undead cannot see, hear, or smell creatures warded by this spell. Even extraordinary or supernatural sensory capabilities, such as blindsense, blindsight, scent, and tremorsense, cannot detect or locate warded creatures. Nonintelligent undead creatures are automatically affected and act as though the warded creatures are not there.",
    full_description_he:
      "הלחש מסתיר עד נושא אחד לכל דרגת לחש שלך מפני אל-מתים. האל-מתים לא יכולים לראות, לשמוע, או לחוש את הנושאים המוסתרים. אם הנושאים תוקפים או משתמשים בקסם, ההסתרה מתבטלת.",
  },
  {
    name: "Inflict Light Wounds",
    name_he: "גרימת פצעים קלים",
    level: 1,
    duration: "Instantaneous",
    description: "Touch deals 1d8 damage +1/level (max +5).",
    description_he: "מגע גורם 1ק8 נזק +1/דרגה (מקסימום +5).",
    full_description:
      "When laying your hand upon a creature, you channel negative energy that deals 1d8 points of damage +1 point per caster level (maximum +5). Since undead are powered by negative energy, this spell cures such a creature of a like amount of damage, rather than harming it.",
    full_description_he:
      "כאשר אתה נוגע ביצור, הלחש גורם 1ק8 נקודות נזק +1 לכל דרגת לחש שלך (מקסימום +5). התקפת המגע עוקפת שריון רגיל, אבל לא מגן קסום. אם ההתקפה מחטיאה, הלחש מתבזבז ללא השפעה.",
  },
  {
    name: "Magic Stone",
    name_he: "אבן קסומה",
    level: 1,
    duration: "30 minutes or until discharged",
    description: "Three stones gain +1 on attack, deal 1d6 +1 damage.",
    description_he: "שלוש אבנים מקבלות +1 להתקפה, גורמות 1ק6+1 נזק.",
    full_description:
      "You transmute as many as three pebbles, which can be no larger than sling bullets, so that they strike with great force when thrown or slung. If hurled, they have a range increment of 20 feet. If slung, treat them as sling bullets (range increment 50 feet). The spell gives them a +1 enhancement bonus on attack and damage rolls.",
    full_description_he:
      "הלחש הופך עד שלוש אבנים רגילות לאבנים קסומות. האבנים הקסומות מקבלות +1 לגלגולי התקפה וגורמות 1ק6+1 נזק. האבנים נשארות קסומות עד שהם נורות או שהלחש מסתיים (דקה אחת לכל דרגת לחש).",
  },
  {
    name: "Magic Weapon",
    name_he: "נשק קסום",
    level: 1,
    duration: "1 min./level",
    description: "Weapon gains +1 bonus.",
    description_he: "הנשק מקבל תוספת +1.",
    full_description:
      "This spell causes a weapon to glow with a pale blue radiance. The weapon is treated as a magic weapon with a +1 enhancement bonus on attack and damage rolls. (The enhancement bonus doesn't stack with an existing enhancement bonus on the weapon.)",
    full_description_he:
      "הלחש מעניק תוספת של +1 לנשק אחד שאתה נוגע בו. התוספת חלה על גלגולי התקפה וגלגולי נזק. הלחש נמשך דקה אחת לכל דרגת לחש שלך. הלחש אינו מצטבר עם עצמו או עם לחשים דומים אחרים.",
  },
  {
    name: "Obscuring Mist",
    name_he: "ערפל מסתיר",
    level: 1,
    duration: "1 min./level",
    description: "Fog surrounds you.",
    description_he: "ערפל מקיף אותך.",
    full_description:
      "A misty vapor arises around you. It is stationary once created. The vapor obscures all sight, including darkvision, beyond 5 feet. A creature 5 feet away has concealment (attacks have a 20% miss chance). Creatures farther away have total concealment (50% miss chance, and the attacker cannot use sight to locate the target).",
    full_description:
      "You transmute as many as three pebbles, which can be no larger than sling bullets, so that they strike with great force when thrown or slung. If hurled, they have a range increment of 20 feet. If slung, treat them as sling bullets (range increment 50 feet). The spell gives them a +1 enhancement bonus on attack and damage rolls.",
    full_description_he:
      "הלחש הופך עד שלוש אבנים רגילות לאבנים קסומות. האבנים הקסומות מקבלות +1 לגלגולי התקפה וגורמות 1ק6+1 נזק. האבנים נשארות קסומות עד שהם נורות או שהלחש מסתיים (דקה אחת לכל דרגת לחש).",
  },
  {
    name: "Magic Weapon",
    name_he: "נשק קסום",
    level: 1,
    source: "Core",
    description: "Weapon gains +1 bonus.",
    description_he: "הנשק מקבל תוספת +1.",
    full_description:
      "This spell causes a weapon to glow with a pale blue radiance. The weapon is treated as a magic weapon with a +1 enhancement bonus on attack and damage rolls. (The enhancement bonus doesn't stack with an existing enhancement bonus on the weapon.)",
    full_description_he:
      "הלחש מעניק תוספת של +1 לנשק אחד שאתה נוגע בו. התוספת חלה על גלגולי התקפה וגלגולי נזק. הלחש נמשך דקה אחת לכל דרגת לחש שלך. הלחש אינו מצטבר עם עצמו או עם לחשים דומים אחרים.",
  },
  {
    name: "Obscuring Mist",
    name_he: "ערפל מסתיר",
    level: 1,
    source: "Core",
    description: "Fog surrounds you.",
    description_he: "ערפל מקיף אותך.",
    full_description:
      "A misty vapor arises around you. It is stationary once created. The vapor obscures all sight, including darkvision, beyond 5 feet. A creature 5 feet away has concealment (attacks have a 20% miss chance). Creatures farther away have total concealment (50% miss chance, and the attacker cannot use sight to locate the target).",
    full_description_he:
      "הלחש יוצר ערפל צפוף שמקיף אותך בטווח של 20 רגל. הערפל מספק הסתרה מלאה לכל יצור בתוכו, ומפחית את הטווח של התקפות מטווח ל-5 רגל. הערפל נמשך דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Protection from Chaos/Evil/Good/Law",
    name_he: "הגנה מתוהו/רשע/טוב/חוק",
    level: 1,
    source: "Core",
    description:
      "+2 to AC and saves, counter mind control, hedge out elementals and outsiders.",
    description_he: "+2 לדרק והצלות, מונע שליטה מנטלית, חוסם יסודנים ונוכרים.",
    full_description:
      "This spell wards a creature from attacks by evil creatures, from mental control, and from summoned creatures. It creates a magical barrier around the subject at a distance of 1 foot. The barrier moves with the subject and has three major effects. First, the subject gains a +2 deflection bonus to AC and a +2 resistance bonus on saves. Second, the subject is immune to any new attempts to possess or exercise mental control over the subject. Third, the spell prevents bodily contact by evil summoned creatures.",
    full_description_he:
      "הלחש יוצר מגן קסום שמגן על הנושא מפני יצורים בעלי נטייה ספציפית. הנושא מקבל +2 לדרק ולהצלות נגד התקפות מיצורים בעלי הנטייה הנגדית. הלחש גם מונע שליטה מנטלית ומונע מיסודנים ונוכרים לגשת לנושא.",
  },
  {
    name: "Remove Fear",
    name_he: "הסרת פחד",
    level: 1,
    source: "Core",
    description:
      "Suppresses fear or gives +4 on saves against fear for one subject + one per four levels.",
    description_he:
      "מדכא פחד או מעניק +4 להצלה נגד פחד לנושא אחד + אחד לכל 4 דרגות.",
    full_description:
      "You instill courage in the subject, suppressing fear effects and granting a +4 morale bonus on saving throws against fear effects for 10 minutes. If the subject is under the influence of fear effects when receiving the spell, those effects are suppressed for the duration of the spell. Remove fear counters and dispels cause fear.",
    full_description_he:
      "הלחש מדכא פחד קיים או מעניק חסינות זמנית מפני פחד. הוא משפיע על נושא אחד + נושא נוסף לכל 4 דרגות לחש שלך. הנושאים מקבלים +4 להצלות נגד פחד, והפחד הקיים מתבטל.",
  },
  {
    name: "Sanctuary",
    name_he: "מקדש",
    level: 1,
    source: "Core",
    description: "Opponents can't attack you, and you can't attack.",
    description_he: "יריבים אינם יכולים לתקוף אותך, ואתה לא יכול לתקוף.",
    full_description:
      "Any opponent attempting to directly attack the warded creature, even with a targeted spell, must attempt a Will save. If the save succeeds, the opponent can attack normally and is unaffected by that casting of the spell. If the save fails, the opponent can't follow through with the attack, that part of its action is lost, and it can't directly attack the warded creature for the duration of the spell.",
    full_description_he:
      "הלחש יוצר מגן קסום שמגן עליך מפני התקפות. יריבים חייבים לעבור הצלת רצון כדי לתקוף אותך. אם אתה תוקף, המגן מתבטל. הלחש נמשך דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Shield of Faith",
    name_he: "מגן אמונה",
    level: 1,
    source: "Core",
    description: "Aura grants +2 or higher deflection bonus.",
    description_he: "הילה מעניקה תוספת הסחה של +2 או יותר.",
    full_description:
      "This spell creates a shimmering, magical field around the target that protects it from attacks, granting it a +2 deflection bonus to AC, with an additional +1 to the bonus for every six levels you have (maximum +5 deflection bonus at 18th level).",
    full_description_he:
      "הלחש יוצר הילה קסומה שמגנה על הנושא. ההילה מעניקה תוספת הסחה של +2 לדרק, או +3 אם הנושא בדרגה 6 ומעלה, או +4 אם הנושא בדרגה 12 ומעלה. הלחש נמשך דקה אחת לכל דרגת לחש שלך.",
  },
  {
    name: "Summon Monster I",
    name_he: "זימון מפלצת I",
    level: 1,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
    description_he: "מזמן יצור חוץ-ממדי להילחם עבורך.",
    full_description:
      "This spell summons an extraplanar creature (typically an outsider, elemental, or magical beast native to another plane). It appears where you designate and acts immediately, on your turn. It attacks your opponents to the best of its ability. If you can communicate with the creature, you can direct it not to attack, to attack particular enemies, or to perform other actions.",
    full_description_he:
      "הלחש מזמן יצור חוץ-ממדי שיופיע במקום קרוב ויילחם עבורך. היצור נשאר עד 6 סיבובים או עד שהוא נהרג. היצור מציית לפקודותיך, אבל אם לא תן פקודות, הוא יגן על עצמו ויתקוף אויבים קרובים.",
  },

  // Level 2
  {
    name: "Aid",
    level: 2,
    source: "Core",
    description:
      "+1 on attack rolls and saves against fear, 1d8 temporary hp +1/level (max +10).",
    full_description:
      "Aid grants the target a +1 morale bonus on attack rolls and saves against fear effects, plus temporary hit points equal to 1d8 + caster level (maximum +10). The temporary hit points go away at the end of the spell's duration.",
  },
  {
    name: "Align Weapon",
    level: 2,
    source: "Core",
    description: "Weapon becomes good, evil, lawful, or chaotic.",
    full_description:
      "Align weapon makes a weapon chaotic, evil, good, or lawful, as you choose. A weapon that is aligned can harm creatures that have damage reduction, as if it were a weapon of that alignment. The spell has no effect on a weapon that already has an alignment.",
  },
  {
    name: "Augury",
    level: 2,
    source: "Core",
    description: "Learns whether an action will be good or bad.",
    full_description:
      "An augury can tell you whether a particular action will bring good or bad results for you in the immediate future. The base chance for receiving a meaningful reply is 70% + 1% per caster level, to a maximum of 90%; this roll is made secretly by the DM. A question may be so straightforward that a successful result is automatic, or so vague as to have no chance of success.",
  },
  {
    name: "Bear's Endurance",
    level: 2,
    source: "Core",
    description: "Subject gains +4 to Con for 1 min./level.",
    full_description:
      "The affected creature gains greater vitality and stamina. The spell grants the subject a +4 enhancement bonus to Constitution, which adds the usual benefits to hit points, Fortitude saves, Constitution checks, and so forth.",
  },
  {
    name: "Bull's Strength",
    level: 2,
    source: "Core",
    description: "Subject gains +4 to Str for 1 min./level.",
    full_description:
      "The subject becomes stronger. The spell grants a +4 enhancement bonus to Strength, adding the usual benefits to melee attack rolls, melee damage rolls, and other uses of the Strength modifier.",
  },
  {
    name: "Calm Emotions",
    level: 2,
    source: "Core",
    description: "Calms creatures, negating emotion effects.",
    full_description:
      "This spell calms agitated creatures. You have no control over the affected creatures, but calm emotions can stop raging creatures from fighting or angry ones from attacking. If the subject fails its save, it remains where it is and takes no actions other than to pay attention to you for as long as you speak (up to 1 minute per caster level).",
  },
  {
    name: "Consecrate",
    level: 2,
    source: "Core",
    description: "Fills area with positive energy, making undead weaker.",
    full_description:
      "This spell blesses an area with positive energy. Each Charisma check made to turn undead within this area gains a +3 sacred bonus. Every undead creature entering a consecrated area suffers minor disruption, giving it a -1 penalty on attack rolls, damage rolls, and saves. Undead cannot be created within or summoned into a consecrated area.",
  },
  {
    name: "Cure Moderate Wounds",
    level: 2,
    source: "Core",
    description: "Cures 2d8 damage +1/level (max +10).",
    full_description:
      "When laying your hand upon a living creature, you channel positive energy that cures 2d8 points of damage +1 point per caster level (maximum +10). Since undead are powered by negative energy, this spell deals damage to them instead.",
  },
  {
    name: "Darkness",
    level: 2,
    source: "Core",
    description: "20-ft. radius of supernatural shadow.",
    full_description:
      "This spell causes an object to radiate shadowy illumination out to a 20-foot radius. This illumination causes the area of the spell to be treated as shadowy illumination. A creature with darkvision can see in an area of shadowy illumination without penalty. Normal creatures (without darkvision) take penalties on Spot and Search checks in areas of shadowy illumination.",
  },
  {
    name: "Death Knell",
    level: 2,
    source: "Core",
    description:
      "Kills dying creature; you gain 1d8 temporary hp, +2 to Str, and +1 level.",
    full_description:
      "You draw the life force from a dying creature. You can cast this spell on a living creature with -1 or fewer hit points, or on a creature that has been dead for less than 1 round. If the subject fails its saving throw, it dies, and you gain 1d8 temporary hit points and a +2 enhancement bonus to Strength. Additionally, your effective caster level goes up by +1, improving spell effects dependent on caster level.",
  },
  {
    name: "Delay Poison",
    level: 2,
    source: "Core",
    description: "Stops poison from harming subject for 1 hour/level.",
    full_description:
      "The subject becomes temporarily immune to poison. Any poison in its system or any poison to which it is exposed during the spell's duration does not affect the subject until the spell's duration has expired. Delay poison does not cure any damage that poison may have already done.",
  },
  {
    name: "Desecrate",
    level: 2,
    source: "Core",
    description: "Fills area with negative energy, making undead stronger.",
    full_description:
      "This spell imbues an area with negative energy. Each Charisma check made to turn undead within this area takes a -3 profane penalty. Every undead creature entering a desecrated area gains a +1 profane bonus on attack rolls, damage rolls, and saves. Undead cannot be turned within a desecrated area.",
  },
  {
    name: "Eagle's Splendor",
    level: 2,
    source: "Core",
    description: "Subject gains +4 to Cha for 1 min./level.",
    full_description:
      "The transmuted creature becomes more poised, articulate, and personally forceful. The spell grants a +4 enhancement bonus to Charisma, adding the usual benefits to Charisma-based skill checks and other uses of the Charisma modifier.",
  },
  {
    name: "Enthrall",
    level: 2,
    source: "Core",
    description: "Captivates all within 100 ft. + 10 ft./level.",
    full_description:
      "If you have the attention of a group of creatures, you can use this spell to hold them spellbound. To cast the spell, you must speak or sing without interruption for 1 full round. Thereafter, you must make a Perform (oratory or sing) check to successfully use this spell. A Perform check that fails by 4 or less means that the spell duration is halved. A Perform check that fails by 5 or more means that the spell doesn't work at all.",
  },
  {
    name: "Find Traps",
    level: 2,
    source: "Core",
    description: "Notice traps as a rogue does.",
    full_description:
      "You gain intuitive insight into the workings of traps. You can use the Search skill to detect traps just as a rogue can when employing the trapfinding ability. You gain a +2 insight bonus on Search checks made to find traps while the spell is in effect. You can use the Disable Device skill to disarm magic traps. You can't use this spell to find traps in an area that is the subject of an illusion (glamer) effect.",
  },
  {
    name: "Gentle Repose",
    level: 2,
    source: "Core",
    description: "Preserves one corpse.",
    full_description:
      "You preserve the remains of a dead creature so that they do not decay. Doing so effectively extends the time limit on raising that creature from the dead (see raise dead). Days spent under the influence of this spell don't count against the time limit. Additionally, this spell makes transporting a fallen comrade more pleasant.",
  },
  {
    name: "Hold Person",
    level: 2,
    source: "Core",
    description: "Paralyzes one humanoid for 1 round/level.",
    full_description:
      "The subject becomes paralyzed and freezes in place. It is aware and breathes normally but cannot take any actions, even speech. Each round on its turn, the subject may attempt a new saving throw to end the effect. This is a full-round action that does not provoke attacks of opportunity.",
  },
  {
    name: "Inflict Moderate Wounds",
    level: 2,
    source: "Core",
    description: "Touch attack, 2d8 damage +1/level (max +10).",
    full_description:
      "When laying your hand upon a creature, you channel negative energy that deals 2d8 points of damage +1 point per caster level (maximum +10). Since undead are powered by negative energy, this spell cures such a creature of a like amount of damage, rather than harming it.",
  },
  {
    name: "Make Whole",
    level: 2,
    source: "Core",
    description: "Repairs an object.",
    full_description:
      "This spell functions like mending, except that make whole can completely repair an object made of any substance, even one with multiple breaks, to be as strong as new. The spell does not restore the magical properties of any damaged magical item or create new material to replace what was lost.",
  },
  {
    name: "Owl's Wisdom",
    level: 2,
    source: "Core",
    description: "Subject gains +4 to Wis for 1 min./level.",
    full_description:
      "The transmuted creature becomes wiser. The spell grants a +4 enhancement bonus to Wisdom, adding the usual benefits to Wisdom-related skill checks and Will saves.",
  },
  {
    name: "Remove Paralysis",
    level: 2,
    source: "Core",
    description: "Frees one or more creatures from paralysis or slow effect.",
    full_description:
      "You can free one or more creatures from the effects of any temporary paralysis or related magic, including spells and effects that cause a creature to gain the staggered condition. If the spell is cast on one target, you receive a +4 bonus on your caster level check to overcome that target's spell resistance (if any).",
  },
  {
    name: "Resist Energy",
    level: 2,
    source: "Core",
    description:
      "Ignores 10 (or more) points of damage/attack from specified energy type.",
    full_description:
      "This abjuration grants a creature limited protection from damage of whichever one of five energy types you select: acid, cold, electricity, fire, or sonic. The subject gains energy resistance 10 against the chosen energy type, which means that each time the creature is subjected to such damage (whether from a natural or magical source), that damage is reduced by 10 points before being applied to the creature's hit points.",
  },
  {
    name: "Restoration, Lesser",
    level: 2,
    source: "Core",
    description:
      "Dispels magical ability penalty or repairs 1d4 ability damage.",
    full_description:
      "Lesser restoration dispels any magical effects reducing one of the subject's ability scores or cures 1d4 points of temporary ability damage to one of the subject's ability scores. It also eliminates any fatigue suffered by the character, and improves an exhausted condition to fatigued.",
  },
  {
    name: "Shatter",
    level: 2,
    source: "Core",
    description: "Sonic vibration damages objects or crystalline creatures.",
    full_description:
      "Shatter creates a loud, ringing noise that breaks brittle, nonmagical objects; sunders a single solid, nonmagical object; or damages a crystalline creature. Used as an area attack, shatter destroys nonmagical objects of crystal, glass, ceramic, or porcelain. All such objects within a 5-foot radius of the point of origin are smashed into dozens of pieces by the effect.",
  },
  {
    name: "Shield Other",
    level: 2,
    source: "Core",
    description: "You take half of subject's damage.",
    full_description:
      "This spell wards the subject and creates a mystic connection between you and the subject so that some of the harm done to the subject is transferred to you. The subject gains a +1 deflection bonus to AC and a +1 resistance bonus on saves. Additionally, the subject takes only half damage from all wounds and attacks (including that dealt by special abilities) that deal hit point damage. The amount of damage not taken by the warded creature is taken by you.",
  },
  {
    name: "Silence",
    level: 2,
    source: "Core",
    description: "Negates sound in 15-ft. radius.",
    full_description:
      "Upon the casting of this spell, complete silence prevails in the affected area. All sound is stopped: Conversation is impossible, spells with verbal components cannot be cast, and no noise whatsoever issues from, enters, or passes through the area. The spell can be cast on a point in space, but the effect is stationary unless cast on a mobile object.",
  },
  {
    name: "Sound Burst",
    level: 2,
    source: "Core",
    description: "Deals 1d8 sonic damage to subjects; may stun them.",
    full_description:
      "You blast an area with a tremendous cacophony. Every creature in the affected area takes 1d8 points of sonic damage and must succeed on a Fortitude save to avoid being stunned for 1 round. Creatures that cannot hear are not stunned but are still damaged.",
  },
  {
    name: "Spiritual Weapon",
    level: 2,
    source: "Core",
    description: "Magic weapon attacks on its own.",
    full_description:
      "A weapon made of pure force springs into existence and attacks opponents at your direction. The weapon takes the shape of a weapon most favored by your deity. The weapon strikes the opponent you designate, starting with one attack in the round when you cast the spell and continuing each round thereafter on your turn. It uses your base attack bonus (possibly allowing it multiple attacks per round in subsequent rounds) plus your Wisdom modifier as its attack bonus.",
  },
  {
    name: "Status",
    level: 2,
    source: "Core",
    description: "Monitors condition, position of allies.",
    full_description:
      "When you need to keep track of comrades who may get separated, status allows you to mentally monitor their relative positions and general condition. You are aware of direction and distance to the creatures and any conditions affecting them: unharmed, wounded, disabled, staggered, unconscious, dying, nauseated, panicked, stunned, poisoned, diseased, confused, or the like.",
  },
  {
    name: "Summon Monster II",
    level: 2,
    source: "Core",
    description: "Calls extraplanar creature to fight for you.",
    full_description:
      "This spell summons an extraplanar creature (typically an outsider, elemental, or magical beast native to another plane). It appears where you designate and acts immediately, on your turn. It attacks your opponents to the best of its ability. If you can communicate with the creature, you can direct it not to attack, to attack particular enemies, or to perform other actions.",
  },
  {
    name: "Undetectable Alignment",
    level: 2,
    source: "Core",
    description: "Conceals alignment for 24 hours.",
    full_description:
      "An undetectable alignment spell conceals the alignment of an object or a creature from all forms of divination used for such purposes. The spell does not prevent the use of detect magic for other purposes, such as detecting a magic item on the person of the individual affected by undetectable alignment.",
  },
  {
    name: "Zone of Truth",
    level: 2,
    source: "Core",
    description: "Subjects within range cannot lie.",
    full_description:
      "Creatures within the emanation area (or those who enter it) can't speak any deliberate and intentional lies. Each potentially affected creature is allowed a save to avoid the effects when the spell is cast or when the creature first enters the emanation area. Affected creatures are aware of this enchantment. Therefore, they may avoid answering questions to which they would normally respond with a lie, or they may be evasive as long as they remain within the boundaries of the truth.",
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

      const hasFullDescription =
        spell.full_description_he || spell.full_description;
      const shortDesc = spell.description_he || spell.description;
      const fullDesc =
        spell.full_description_he || spell.full_description || shortDesc;

      spellElement.innerHTML = `
        <h3>${spell.name_he || spell.name} <i>(${
        spell.source || "N/A"
      })</i></h3>
        <p><strong>דרגה:</strong> ${spell.level}</p>
        <p class="short-description">${shortDesc}</p>
        ${
          hasFullDescription
            ? `
          <button class="expand-btn" onclick="toggleDescription(this)">הצג תיאור מלא</button>
          <p class="full-description" style="display: none;">${fullDesc}</p>
        `
            : ""
        }
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

  // Add toggle function to global scope
  window.toggleDescription = function (button) {
    const fullDesc = button.nextElementSibling;
    const shortDesc = button.previousElementSibling;

    if (fullDesc.style.display === "none") {
      fullDesc.style.display = "block";
      shortDesc.style.display = "none";
      button.textContent = "הצג תיאור קצר";
    } else {
      fullDesc.style.display = "none";
      shortDesc.style.display = "block";
      button.textContent = "הצג תיאור מלא";
    }
  };
});
