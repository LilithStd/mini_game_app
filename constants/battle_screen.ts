import {
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF,
} from '@/store/character_store';

export const BATTLE_TYPE_PROPS = {
	MONSTER: 'MONSTER',
	BOSS: 'BOSS',
	DEFAULT: 'DEFAULT',
};

export const BUTTON_LIST = {
	HEALTH: 'health',
	ATTACK: 'attack',
	DEFENSE: 'defense',
	EVASION: 'evasion',
	CLOSE: 'close',
};
export const ACTIONS_LIST = {
	ATTACK: 'attack',
	DEFENSE: 'defense',
	STAND: 'stand',
	ITEMS: 'items',
	RETREAT: 'retreat',
};
export type ActionsTypes = {
	title: string;
	description: string;
};

export const VARIANTS_ITEMS = {
	HEALTH: 'active',
	ATTACK: 'attack',
	DEFENSE: 'defense',
	EVASION: 'evasion',
};

export const ACTIONS = {
	ATTACK: {
		title: 'attack',
		description: 'enemy attack you',
	},
	DEFENSE: {
		title: 'defense',
		description: 'enemy takes a defensive stance',
	},
	STAND: {
		title: 'stand',
		description: 'enemy looks at you with caution',
	},
	RETREAT: {
		title: 'retreat',
		description: 'enemy retreats',
	},
	NOTHING: {
		title: 'nothing',
		description: 'nothing',
	},
};

export const enum BATTLE_TYPE {
	MONSTER = 'MONSTER',
	BOSS = 'BOSS',
	DEFAULT = 'DEFAULT',
}

export const default_stats_character = {
	level: 1,
	attack: 0,
	defense: 0,
	accuracy: 0,
	criticalRate: 0,
	criticalDamage: 0,
	evasion: 0,
	reduceCriticalDamage: 0,
	atribute: 'none',
	resistAtribute: '',
	itemsSkills: [],
	healPoints: 0,
	death: false,
};
export const default_stats_enemy = {
	level: 1,
	attack: 0,
	defense: 0,
	accuracy: 0,
	criticalRate: 0,
	criticalDamage: 0,
	evasion: 0,
	reduceCriticalDamage: 0,
	atribute: '',
	resistAtribute: '',
	expirience: 0,
	healPoints: 0,
	death: false,
};

export type SubTypeItems =
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS;
