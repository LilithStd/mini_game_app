import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { EnemyStats, EnemyType, BossType } from '../enemy/enemy_store_types';
import { getRandomEnumValue } from '@/constants/helpers';
import { CharacterStats } from '../character_store';
import { MultilanguageType } from '@/constants/global_types';
import { LANGUAGE } from '../global_store';
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
	STAND = 'stand',
	WAIT = 'wait'
}

enum ACTOR {
	PLAYER = 'player',
	ENEMY = 'enemy'
}

const ACTOR_NAME = {
	en: {
		[ACTOR.PLAYER]: 'Player',
		[ACTOR.ENEMY]: 'Enemy'
	},
	lv: {
		[ACTOR.PLAYER]: 'Spēlētājs',
		[ACTOR.ENEMY]: 'Ienaidnieks'
	},
	ru: {
		[ACTOR.PLAYER]: 'Игрок',
		[ACTOR.ENEMY]: 'Враг'
	}
}

type EnemyActionsMultilanguage = {
	en: string;
	lv: string;
	ru: string;
}

export const ENEMY_ACTIONS = {
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

export const ACTOR_ACTIONS_TEMPLATE = (actor: ACTOR, currentLanguage: LANGUAGE) => ({
	[ACTOR_ACTIONS.ATTACK]: {
		title: ACTOR_ACTIONS.ATTACK,
		content: {
			en: `${ACTOR_NAME[currentLanguage][actor]} decides to attack`,
			lv: `${ACTOR_NAME[currentLanguage][actor]} nolemj uzbrukt.`,
			ru: `${ACTOR_NAME[currentLanguage][actor]} решает атаковать.`
		}
	},
	[ACTOR_ACTIONS.DEFENSE]: {
		title: ACTOR_ACTIONS.DEFENSE,
		content: {
			en: `${ACTOR_NAME[currentLanguage][actor]} decides to defend`,
			lv: `${ACTOR_NAME[currentLanguage][actor]} nolemj aizstāvēt.`,
			ru: `${ACTOR_NAME[currentLanguage][actor]} решает защищаться.`
		}
	},
	[ACTOR_ACTIONS.ESCAPE]: {
		title: ACTOR_ACTIONS.ESCAPE,
		content: {
			en: `${ACTOR_NAME[currentLanguage][actor]} attempts to escape`,
			lv: `${ACTOR_NAME[currentLanguage][actor]} mēģina bēgt.`,
			ru: `${ACTOR_NAME[currentLanguage][actor]} пытается сбежать.`
		}
	},
	[ACTOR_ACTIONS.SKILL]: {
		title: ACTOR_ACTIONS.SKILL,
		content: {
			en: `${ACTOR_NAME[currentLanguage][actor]} uses a skill`,
			lv: `${ACTOR_NAME[currentLanguage][actor]} izmanto prasmi.`,
			ru: `${ACTOR_NAME[currentLanguage][actor]} использует навык.`
		}
	},
	[ACTOR_ACTIONS.ITEM]: {
		title: ACTOR_ACTIONS.ITEM,
		content: {
			en: `${ACTOR_NAME[currentLanguage][actor]} uses an item`,
			lv: `${ACTOR_NAME[currentLanguage][actor]} izmanto priekšmetu.`,
			ru: `${ACTOR_NAME[currentLanguage][actor]} использует предмет.`
		}
	},
	[ACTOR_ACTIONS.STAND]: {
		title: ACTOR_ACTIONS.STAND,
		content: {
			en: `${ACTOR_NAME[currentLanguage][actor]} stands still`,
			lv: `${ACTOR_NAME[currentLanguage][actor]} stāv uz vietas.`,
			ru: `${ACTOR_NAME[currentLanguage][actor]} стоит на месте.`
		}
	},
	[ACTOR_ACTIONS.WAIT]: {
		title: ACTOR_ACTIONS.WAIT,
		content: {
			en: `${ACTOR_NAME[currentLanguage][actor]} waits`,
			lv: `${ACTOR_NAME[currentLanguage][actor]} gaida.`,
			ru: `${ACTOR_NAME[currentLanguage][actor]} ждёт.`
		}
	}
});


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
	PLAYER_WIN = 'win',
	WAITING = 'waiting'
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
				
				set({
					battleMessages: {
						actor: ACTOR.PLAYER,
						type: ACTOR_ACTIONS.ATTACK,
					}
				});

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
					set({battleMessages: null})
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
				console.log('enemyActions called:', phaseBattle);
				setTimeout(() => {
					set({
					battleMessages: {
						actor: ACTOR.ENEMY,
						type: ACTOR_ACTIONS.WAIT,
					}
				});
				}, 700);
				
				return;
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
						set({
							battleMessages: {
								actor: ACTOR.ENEMY,
								type: ACTOR_ACTIONS.ATTACK,
							},
						});

						setTimeout(() => {
							// Проверяем, что всё ещё ход врага
							if (get().phaseBattle !== PHASE_STATUS.ENEMY_TURN) return;

							const { character, enemy, totalDamage } = get();

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

								battleMessages: null,

								phaseBattle: newHP <= 0
									? PHASE_STATUS.PLAYER_LOSE
									: PHASE_STATUS.PLAYER_TURN,
							});
						}, 700);
						// console.log('Enemy message in store:', get().battleMessages);
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
					battleMessages: null,
				});
			},
		}),
		{
			name: 'battle-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
