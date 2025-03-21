import {
	INVENTORY_ITEM_CONSUMBLES_TYPE,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS,
} from '@/store/character_store';

const statsPotions = [
	// Attack Buff Potions
	{
		id: 'potion_attack_001',
		name: 'Small Attack Potion',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.POTION,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.ATTACK_BUFF,
		description: 'Усиливает атаку на короткое время.',
		stats: {
			attack: 20,
			defense: 0,
			evasion: 0,
			healPotion: 0,
		},
	},
	{
		id: 'potion_attack_002',
		name: 'Big Attack Potion',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.POTION,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.ATTACK_BUFF,
		description: 'Значительно увеличивает атаку.',
		stats: {
			attack: 40,
			defense: 0,
			evasion: 0,
			healPotion: 0,
		},
	},

	// Defense Buff Potions
	{
		id: 'potion_defense_001',
		name: 'Small Defense Potion',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.POTION,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.DEFENSE_BUFF,
		description: 'Небольшое усиление защиты.',
		stats: {
			attack: 0,
			defense: 30,
			evasion: 0,
			healPotion: 0,
		},
	},
	{
		id: 'potion_defense_002',
		name: 'Big Defense Potion',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.POTION,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.DEFENSE_BUFF,
		description: 'Существенно увеличивает защиту.',
		stats: {
			attack: 0,
			defense: 60,
			evasion: 0,
			healPotion: 0,
		},
	},

	// Evasion Buff Potions
	{
		id: 'potion_evasion_001',
		name: 'Small Evasion Potion',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.POTION,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.EVASION_BUFF,
		description: 'Немного увеличивает уклонение.',
		stats: {
			attack: 0,
			defense: 0,
			evasion: 4,
			healPotion: 0,
		},
	},
	{
		id: 'potion_evasion_002',
		name: 'Big Evasion Potion',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.POTION,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.EVASION_BUFF,
		description: 'Существенно повышает уклонение.',
		stats: {
			attack: 0,
			defense: 0,
			evasion: 8,
			healPotion: 0,
		},
	},
];

const healPotions = [
	{
		id: 'potion_heal_001',
		name: 'Small Healing Potion',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.POTION,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE,
		description: 'Восстанавливает небольшое количество здоровья.',
		stats: {
			attack: 0,
			defense: 0,
			evasion: 0,
			healPotion: 100,
		},
	},
	{
		id: 'potion_heal_002',
		name: 'Big Healing Potion',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.POTION,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE,
		description: 'Восстанавливает большое количество здоровья.',
		stats: {
			attack: 0,
			defense: 0,
			evasion: 0,
			healPotion: 200,
		},
	},
];

const keys = [
	{
		id: 'key_001',
		name: 'Treasure Key',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.KEY,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS.TREASURE,
		description: 'Открывает сундук с сокровищами.',
	},
	{
		id: 'key_002',
		name: 'Door Key',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.KEY,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS.DOOR,
		description: 'Открывает запертую дверь.',
	},
	{
		id: 'key_003',
		name: 'Dungeon Key',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.KEY,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS.DUNGEON,
		description: 'Позволяет войти в подземелье.',
	},
];

const currency = [
	{
		id: 'currency_001',
		name: 'Gold',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.CURRENCY,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.GOLD,
		description: 'Основная валюта в мире.',
	},
	{
		id: 'currency_002',
		name: 'Fang of Monsters',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.CURRENCY,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.FANG_MONSTERS,
		description: 'Трофеи, оставленные поверженными монстрами.',
	},
];

const crystals = [
	{
		id: 'crystal_001',
		name: 'Crystal of Growth',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.CRYSTAL,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL.CHARACTER_UP,
		description: 'Используется для повышения уровня персонажа.',
	},
	{
		id: 'crystal_002',
		name: 'Crystal of Enhancement',
		type: INVENTORY_ITEM_CONSUMBLES_TYPE.CRYSTAL,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL.ITEM_UP,
		description: 'Усиливает характеристики экипировки.',
	},
];

export const CONSUMBLES = [
	...statsPotions,
	...healPotions,
	...keys,
	...currency,
	...crystals,
];
