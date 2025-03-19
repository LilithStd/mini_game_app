import {
	INVENTORY_ITEM_TYPE,
	INVENTORY_ITEM_WEAPON_SUBTYPE,
} from '@/store/character_store';

const swords = [
	// Swords
	{
		id: 'sword_001',
		name: 'Iron Blade',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SWORD,
		description: 'Прочный железный меч.',
		stats: {
			attack: 25,
			accuracy: 3,
			criticalRate: 7,
			criticalDamage: 45,
			atribute: 'None',
			itemSkill: 'Blade Slash',
		},
	},
	{
		id: 'sword_002',
		name: 'Steel Longsword',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SWORD,
		description: 'Длинный меч из стали.',
		stats: {
			attack: 28,
			accuracy: 4,
			criticalRate: 9,
			criticalDamage: 56,
			atribute: 'None',
			itemSkill: 'none',
		},
	},
	{
		id: 'sword_003',
		name: "Knight's Sword",
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SWORD,
		description: 'Клинок для настоящего рыцаря.',
		stats: {
			attack: 30,
			accuracy: 5,
			criticalRate: 10,
			criticalDamage: 60,
			atribute: 'Holy',
			itemSkill: 'Holy Strike',
		},
	},
	{
		id: 'sword_004',
		name: 'Flame Saber',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SWORD,
		description: 'Обжигающий сабельный клинок.',
		stats: {
			attack: 27,
			accuracy: 4,
			criticalRate: 8,
			criticalDamage: 50,
			atribute: 'Fire',
			itemSkill: 'Flame Slash',
		},
	},
	{
		id: 'sword_005',
		name: 'Shadow Fang',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SWORD,
		description: 'Темный клинок с кровавой историей.',
		stats: {
			attack: 29,
			accuracy: 3,
			criticalRate: 9,
			criticalDamage: 55,
			atribute: 'Dark',
			itemSkill: 'Dark Slice',
		},
	},
];

const spears = [
	// Spears
	{
		id: 'spear_001',
		name: 'Wooden Pike',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SPEAR,
		description: 'Простое деревянное копье.',
		stats: {
			attack: 20,
			accuracy: 4,
			criticalRate: 6,
			criticalDamage: 40,
			atribute: 'None',
			itemSkill: 'none',
		},
	},
	{
		id: 'spear_002',
		name: 'Steel Lance',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SPEAR,
		description: 'Прочная стальная пика.',
		stats: {
			attack: 24,
			accuracy: 5,
			criticalRate: 8,
			criticalDamage: 48,
			atribute: 'None',
			itemSkill: 'Piercing Thrust',
		},
	},
	{
		id: 'spear_003',
		name: 'Dragon Spear',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SPEAR,
		description: 'Копье, способное пронзить дракона.',
		stats: {
			attack: 30,
			accuracy: 5,
			criticalRate: 10,
			criticalDamage: 60,
			atribute: 'Dragon',
			itemSkill: 'Dragon Piercer',
		},
	},
	{
		id: 'spear_004',
		name: 'Storm Javelin',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SPEAR,
		description: 'Копье, несущее силу шторма.',
		stats: {
			attack: 26,
			accuracy: 4,
			criticalRate: 7,
			criticalDamage: 52,
			atribute: 'Thunder',
			itemSkill: 'Lightning Thrust',
		},
	},
	{
		id: 'spear_005',
		name: 'Abyss Spear',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SPEAR,
		description: 'Темное копье из бездны.',
		stats: {
			attack: 28,
			accuracy: 3,
			criticalRate: 9,
			criticalDamage: 54,
			atribute: 'Dark',
			itemSkill: 'Dark Impale',
		},
	},
];

const bows = [
	{
		id: 'bow_001',
		name: 'Hunting Bow',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BOW,
		description: 'Простой охотничий лук.',
		stats: {
			attack: 18,
			accuracy: 5,
			criticalRate: 8,
			criticalDamage: 36,
			atribute: 'None',
			itemSkill: 'none',
		},
	},
	{
		id: 'bow_002',
		name: 'Recurve Bow',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BOW,
		description: 'Изогнутый лук для меткой стрельбы.',
		stats: {
			attack: 22,
			accuracy: 5,
			criticalRate: 9,
			criticalDamage: 44,
			atribute: 'None',
			itemSkill: 'Piercing Arrow',
		},
	},
	{
		id: 'bow_003',
		name: 'Elven Longbow',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BOW,
		description: 'Лук эльфийского мастера.',
		stats: {
			attack: 28,
			accuracy: 5,
			criticalRate: 10,
			criticalDamage: 56,
			atribute: 'Wind',
			itemSkill: 'Wind Shot',
		},
	},
	{
		id: 'bow_004',
		name: 'Inferno Bow',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BOW,
		description: 'Лук, пылающий огнем.',
		stats: {
			attack: 26,
			accuracy: 4,
			criticalRate: 9,
			criticalDamage: 50,
			atribute: 'Fire',
			itemSkill: 'Flame Arrow',
		},
	},
	{
		id: 'bow_005',
		name: 'Shadow Bow',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BOW,
		description: 'Лук, скрывающийся в тенях.',
		stats: {
			attack: 24,
			accuracy: 4,
			criticalRate: 8,
			criticalDamage: 48,
			atribute: 'Dark',
			itemSkill: 'Dark Shot',
		},
	},
];

const blunts = [
	// Blunt Weapons
	{
		id: 'blunt_001',
		name: 'Wooden Club',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BLUNT,
		description: 'Простая дубинка для ближнего боя.',
		stats: {
			attack: 20,
			accuracy: 3,
			criticalRate: 6,
			criticalDamage: 40,
			atribute: 'None',
			itemSkill: 'none',
		},
	},
	{
		id: 'blunt_002',
		name: 'Iron Mace',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BLUNT,
		description: 'Железная булава для рыцарей.',
		stats: {
			attack: 25,
			accuracy: 4,
			criticalRate: 7,
			criticalDamage: 50,
			atribute: 'None',
			itemSkill: 'Heavy Swing',
		},
	},
	{
		id: 'blunt_003',
		name: 'Holy Warhammer',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BLUNT,
		description: 'Боевой молот паладинов.',
		stats: {
			attack: 30,
			accuracy: 4,
			criticalRate: 9,
			criticalDamage: 60,
			atribute: 'Holy',
			itemSkill: 'Divine Smite',
		},
	},
	{
		id: 'blunt_004',
		name: 'Thunder Maul',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BLUNT,
		description: 'Молот, наполненный силой молнии.',
		stats: {
			attack: 28,
			accuracy: 3,
			criticalRate: 8,
			criticalDamage: 55,
			atribute: 'Thunder',
			itemSkill: 'Thunder Strike',
		},
	},
	{
		id: 'blunt_005',
		name: 'Abyss Crusher',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BLUNT,
		description: 'Темная булава разрушительной силы.',
		stats: {
			attack: 27,
			accuracy: 3,
			criticalRate: 8,
			criticalDamage: 54,
			atribute: 'Dark',
			itemSkill: 'Dark Smash',
		},
	},
];

const axes = [
	// Axes
	{
		id: 'axe_001',
		name: 'Battle Axe',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.AXE,
		description: 'Тяжелый боевой топор.',
		stats: {
			attack: 24,
			accuracy: 3,
			criticalRate: 7,
			criticalDamage: 48,
			atribute: 'None',
			itemSkill: 'none',
		},
	},
	{
		id: 'axe_002',
		name: 'Double-Edged Axe',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.AXE,
		description: 'Топор с двумя лезвиями для мощных атак.',
		stats: {
			attack: 28,
			accuracy: 3,
			criticalRate: 8,
			criticalDamage: 56,
			atribute: 'None',
			itemSkill: 'Berserk Swing',
		},
	},
	{
		id: 'axe_003',
		name: 'Infernal Cleaver',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.AXE,
		description: 'Огненный топор, разрубающий доспехи.',
		stats: {
			attack: 30,
			accuracy: 4,
			criticalRate: 9,
			criticalDamage: 60,
			atribute: 'Fire',
			itemSkill: 'Infernal Slash',
		},
	},
	{
		id: 'axe_004',
		name: 'Frostbite Axe',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.AXE,
		description: 'Топор, покрытый ледяной коркой.',
		stats: {
			attack: 26,
			accuracy: 3,
			criticalRate: 8,
			criticalDamage: 52,
			atribute: 'Ice',
			itemSkill: 'Frozen Strike',
		},
	},
	{
		id: 'axe_005',
		name: 'Titan Slayer',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.AXE,
		description: 'Гигантский топор для охоты на титанов.',
		stats: {
			attack: 29,
			accuracy: 3,
			criticalRate: 8,
			criticalDamage: 58,
			atribute: 'None',
			itemSkill: "Titan's Wrath",
		},
	},
];

const staffs = [
	// Staffs
	{
		id: 'staff_001',
		name: 'Apprentice Staff',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.STAFF,
		description: 'Простой посох ученика мага.',
		stats: {
			attack: 15,
			accuracy: 5,
			criticalRate: 7,
			criticalDamage: 30,
			atribute: 'None',
			itemSkill: 'none',
		},
	},
	{
		id: 'staff_002',
		name: 'Sage’s Rod',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.STAFF,
		description: 'Посох мудрого мага.',
		stats: {
			attack: 20,
			accuracy: 5,
			criticalRate: 8,
			criticalDamage: 40,
			atribute: 'None',
			itemSkill: 'Arcane Blast',
		},
	},
	{
		id: 'staff_003',
		name: 'Stormcaller Staff',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.STAFF,
		description: 'Посох, заряженный энергией молний.',
		stats: {
			attack: 22,
			accuracy: 5,
			criticalRate: 9,
			criticalDamage: 44,
			atribute: 'Thunder',
			itemSkill: 'Lightning Surge',
		},
	},
	{
		id: 'staff_004',
		name: 'Frozen Orb Staff',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.STAFF,
		description: 'Посох, наполненный льдом.',
		stats: {
			attack: 21,
			accuracy: 5,
			criticalRate: 8,
			criticalDamage: 42,
			atribute: 'Ice',
			itemSkill: 'Frost Nova',
		},
	},
	{
		id: 'staff_005',
		name: 'Celestial Scepter',
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.STAFF,
		description: 'Магический скипетр небесных сил.',
		stats: {
			attack: 25,
			accuracy: 5,
			criticalRate: 9,
			criticalDamage: 50,
			atribute: 'Holy',
			itemSkill: 'Divine Light',
		},
	},
];

export const WEAPON = [
	...swords,
	...spears,
	...bows,
	...blunts,
	...axes,
	...staffs,
];
