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
