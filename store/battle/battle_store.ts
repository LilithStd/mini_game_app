import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { EnemyStats, EnemyType, BossType } from '../enemy/enemy_store_types';
import { getRandomEnumValue } from '@/constants/helpers';
import { CharacterStats } from '../character_store';
import { MultilanguageType } from '@/constants/global_types';
const Character_Default_Preview = require('../../assets/character/character_00_preview.jpg');
const ENEMY_DEFAULT_ICON = require('../../assets/enemy/icons/type_enemy_icon.png');
const BOSS_DEFAULT_ICON = require('../../assets/enemy/icons/type_boss_icon.png');

export enum INCOMING_STATUS {
	ATTACK = 'attack',
	ITEM = 'item',
	// DEFAULT = 'default',
}

export enum ENEMY_ACTION_TYPE {
	ATTACK = 'attack',
	DEFENSE = 'defense',
	EVADE = 'evade',
	ESCAPE = 'escape',
	SKILL = 'skill',
	// DEFAULT = 'default',
}

enum ACTOR_ACTIONS {
	ATTACK = 'attack',
	DEFENSE = 'defense',
	ESCAPE = 'escape',
	SKILL = 'skill',
	ITEM = 'item',
	STAND = 'stand'
}

enum ACTOR {
	PLAYER = 'player',
	ENEMY = 'enemy'
}

type EnemyActionsMultilanguage = {
	en: string;
	lv: string;
	ru: string;
}

const ENEMY_ACTIONS = {
	[ENEMY_ACTION_TYPE.ATTACK]: {
		title: ENEMY_ACTION_TYPE.ATTACK,
		content:{
			en: 'Enemy after small thinking decides to attack',
			lv: 'Pēc īsas pārdomu brīža ienaidnieks nolemj uzbrukt.',
			ru: 'Враг, после недолгих раздумий, решает атаковать.'
		}
	},
	[ENEMY_ACTION_TYPE.DEFENSE]: {
		title: ENEMY_ACTION_TYPE.DEFENSE,
		content: {
			en: 'Enemy decides to defend',
			lv: 'Ienaidnieks nolemj aizstāvēt.',
			ru: 'Враг решает защищаться.'
		}
	},

}


const DEFENSE_MULTIPLIER = 1.5;
const ESCAPE_MULTIPLIER = 0.5;
const EVADE_MULTIPLIER = 0.7;


export enum STATUS_BATTLE_SCREEN {
	DEFAULT = 'default',
	BOSS_BATTLE = 'boss_battle',
	MONSTER_BATTLE = 'monster_battle',
	STORY_BATTLE = 'story_battle',
}

export enum UPDATE_STATS {
	ATTACK = 'attack',
	DEFENSE = 'defense',
	HP = 'healPoints',
	LEVEL = 'level',
	ALL = 'all',
}

export enum PHASE_STATUS {
	PLAYER_TURN = 'player_turn',
	ENEMY_TURN = 'enemy_turn',
	PLAYER_ACTION = 'player_action',
	ENEMY_ACTION = 'enemy_action',
	DEFAULT = 'default',
	PLAYER_LOSE = 'lose',
	PLAYER_WIN = 'win'
}

export enum ACTIONS {
	ATTACK = 'attack',
	DEFENSE = 'defense',
	STAND = 'stand',
	ITEMS = 'items',
	RETREAT = 'retreat',
	// DEFAULT = 'default',
}

type BattleActions = {
	actor: ACTOR;
	type: ACTOR_ACTIONS;
};

export interface BattleStoreInterface {
	battleStatus: STATUS_BATTLE_SCREEN;
	character: CharacterStats;
	battleMessages: BattleActions | null;
	isActiveTurn: boolean;
	isInitialized: boolean;
	enemy: EnemyType | BossType;
	totalDamage: {
		character: number;
		enemy: number;
	};
	phaseBattle:PHASE_STATUS;
	attack:() => void;
	defense:() => void;
	escape:() => void;
	startBattle: (character: CharacterStats, enemy: EnemyType | BossType) => void;
	setPhaseBattle: (phase: PHASE_STATUS) => void;
	enemyTurnActions: MultilanguageType | null;
	enemyActions: (type: ENEMY_ACTION_TYPE) => void;
	setCharacterStats: (stats: CharacterStats) => void;
	setEnemyStats: (stats: EnemyType | BossType) => void;
	setBattleStatus: (status: STATUS_BATTLE_SCREEN) => void;
	setDefaultState: () => void;
	currentBuffAndDebuff: {
		character: string[];
		enemy: string[];
	};
	setCurrentBuffAndDebuff: (status: string) => void;
}



const defaultValues: CharacterStats = {
	name: 'default_character',
	model: 0,
	preview: Character_Default_Preview,
	stats: {
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
		itemsSkills: [],
		healPoints: { current: 100, max: 100 },
		death: false,
		expirience: 0,
		totalDamage: 0
	}
};
const defaultValuesEnemy: EnemyType = {
	name: 'default_enemy',
	model: 0,
	icon: ENEMY_DEFAULT_ICON,
	stats: {
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
		healPoints: { current: 100, max: 100 },
		death: false,
	},
};

export const useBattleStore = create<BattleStoreInterface>()(
	persist(
		(set, get) => ({
			battleStatus: STATUS_BATTLE_SCREEN.DEFAULT,
			totalDamage: {
				character: 0,
				enemy: 0,
			},
			isInitialized: false,
			phaseBattle: PHASE_STATUS.DEFAULT,
			isActiveTurn: false,
			character: {...defaultValues},
			enemy: {...defaultValuesEnemy},
			battleMessages: null,
			startBattle: (character, enemy) => {
				set({
					character: character,
					enemy: enemy,
					phaseBattle: PHASE_STATUS.PLAYER_TURN,
					isInitialized: true,
				});
			},
			setPhaseBattle: (phase) => set({phaseBattle: phase}),
			setCharacterStats: (stats) => set({character: stats}),
			enemyTurnActions: null,
			setEnemyStats: (stats) => set({enemy: stats}),
			currentBuffAndDebuff: {
				character: [],
				enemy: [],
			},
			attack: () => {
				const { phaseBattle, enemy, character, totalDamage } = get();

				if (phaseBattle !== PHASE_STATUS.PLAYER_TURN) return;
				
				const currentHP = enemy.stats.healPoints.current;

				const newHP = Math.max(
					0,
					currentHP - character.stats.attack
				);

				const actualDamage = currentHP - newHP;

				set({
					enemy: {
						...enemy,
						stats: {
							...enemy.stats,
							healPoints: {
								...enemy.stats.healPoints,
								current: newHP,
							},
							death: newHP <= 0,
						}
					},

					totalDamage: {
						...totalDamage,
						character: totalDamage.character + actualDamage,
					},

					phaseBattle: newHP <= 0
						? PHASE_STATUS.DEFAULT
						: PHASE_STATUS.ENEMY_TURN
				});

				if (newHP <= 0) return;

				setTimeout(() => {
					get().enemyActions(ENEMY_ACTION_TYPE.ATTACK);
				}, 700);
			},
			defense: () => {
				const { phaseBattle, character } = get();

				if (phaseBattle !== PHASE_STATUS.PLAYER_TURN) return;

				const newDefense = character.stats.defense * DEFENSE_MULTIPLIER;

				set({
					character: {
						...character,
						stats: {
							...character.stats,
							defense: newDefense,
						},
					}
				});
			},
			escape: () => {},
			enemyActions: (type) => {
				const { phaseBattle, enemy, character, totalDamage } = get();

				if (phaseBattle !== PHASE_STATUS.ENEMY_TURN) return;
				if(character.stats.healPoints.current <= 0) {
					set({
						phaseBattle: PHASE_STATUS.PLAYER_LOSE,
					});
					return;
				};
				const enemyActionType =
					type ?? getRandomEnumValue(ENEMY_ACTION_TYPE);
				switch (enemyActionType) {
					case ENEMY_ACTION_TYPE.ATTACK: {
					const newHP = Math.max(
						0,
						character.stats.healPoints.current - enemy.stats.attack
					);

					const actualDamage =
						character.stats.healPoints.current - newHP;

					set({
						character: {
							...character,
							stats: {
								...character.stats,
								healPoints: {
									...character.stats.healPoints,
									current: newHP,
								},
								death: newHP <= 0,
							},
						},

						totalDamage: {
							...totalDamage,
							enemy: totalDamage.enemy + actualDamage,
						},

						phaseBattle: newHP <= 0
							? PHASE_STATUS.PLAYER_WIN
							: PHASE_STATUS.PLAYER_TURN,
					});
					break;
					
				
				}
					case ENEMY_ACTION_TYPE.DEFENSE: {
						const newDefense = enemy.stats.defense * DEFENSE_MULTIPLIER;
						set({
							enemy: {
								...enemy,
								stats: {
									...enemy.stats,
									defense: newDefense,
								},
							},
						});
					}
					break;
					case ENEMY_ACTION_TYPE.ESCAPE:{
						set({
							phaseBattle: PHASE_STATUS.DEFAULT,
						});
					}
					break;
					case ENEMY_ACTION_TYPE.EVADE:{
						const newEvade = enemy.stats.evasion * EVADE_MULTIPLIER;
						set({
							enemy: {
								...enemy,
								stats: {
									...enemy.stats,
									evasion: newEvade,
								},
							},
						});
					}
					break;
					case ENEMY_ACTION_TYPE.SKILL:{

					}
					break;

				}
			},
			setBattleStatus: (status) => {
				if (get().battleStatus !== status) {
					set({battleStatus: status});
				}
			},
			setCurrentBuffAndDebuff: (status) => {},
			setDefaultState: () => {
				AsyncStorage.removeItem('battle-storage').then(() => {
					console.log('battle store reset');
				});
				set({
					character: {...defaultValues},
					enemy: {...defaultValuesEnemy},
					phaseBattle: PHASE_STATUS.DEFAULT,
					totalDamage: {
						character: 0,
						enemy: 0,
					},
				});
			},
		}),
		{
			name: 'battle-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
