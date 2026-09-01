import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { EnemyStats, EnemyType, BossType } from '../enemy/enemy_store_types';
import { getRandomEnumValue } from '@/constants/helpers';

interface CharacterStats {
	level: number;
	attack: number;
	defense: number;
	accuracy: number;
	criticalRate: number;
	criticalDamage: number;
	evasion: number;
	reduceCriticalDamage: number;
	atribute: string;
	resistAtribute: string;
	itemsSkills: string[];
	healPoints: number;
	death: boolean;
}

// interface EnemyStats {
// 	level: number;
// 	attack: number;
// 	defense: number;
// 	accuracy: number;
// 	criticalRate: number;
// 	criticalDamage: number;
// 	evasion: number;
// 	reduceCriticalDamage: number;
// 	atribute: string;
// 	resistAtribute: string;
// 	healPoints: number;
// 	expirience: number;
// 	death: boolean;
// }

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

const DEFENSE_MULTIPLIER = 1.5;


export enum STATUS_BATTLE_SCREEN {
	DEFAULT = 'default',
	BOSS_BATTLE = 'boss_battle',
	MONSTER_BATTLE = 'monster_battle',
	STORY_BATTLE = 'story_battle',
}

export interface BattleStoreInterface {
	battleStatus: STATUS_BATTLE_SCREEN;
	character: CharacterStats;
	isActiveTurn: boolean;
	enemy: EnemyType | BossType;
	totalDamage: {
		character: number;
		enemy: number;
	};
	phaseBattle:PHASE_STATUS;
	attack:() => void;
	defense:() => void;
	escape:() => void;
	enemyAttack: (type: ENEMY_ACTION_TYPE) => void;
	setCharacterStats: (stats: CharacterStats) => void;
	setEnemyStats: (stats: EnemyType | BossType) => void;
	setBattleStatus: (status: STATUS_BATTLE_SCREEN) => void;
	setDefaultState: () => void;
	currentBuffAndDebuff: {
		character: string[];
		enemy: string[];
	};
	setCurrentBuffAndDebuff: (status: string) => void;
	// updateCharacterStats: (
	// 	updateRequest: {
	// 		updateCurrentStats: UPDATE_STATS;
	// 		incomingStatus: INCOMING_STATUS;
	// 	},
	// 	updateValue: number | CharacterStats,
	// ) => void;
	// updateEnemyStats: (
	// 	updateRequest: UPDATE_STATS,
	// 	updateValue: number | EnemyType | BossType,
	// ) => void;
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
	DEFAULT = 'default',
}

export enum ACTIONS {
	ATTACK = 'attack',
	DEFENSE = 'defense',
	STAND = 'stand',
	ITEMS = 'items',
	RETREAT = 'retreat',
	// DEFAULT = 'default',
}

const defaultValues: CharacterStats = {
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
	healPoints: 100,
	death: false,
};
const defaultValuesEnemy: EnemyType = {
	name: '',
	model: 0,
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
		healPoints: 100,
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
			phaseBattle: PHASE_STATUS.DEFAULT,
			isActiveTurn: false,
			character: {...defaultValues},
			enemy: {...defaultValuesEnemy},
			setCharacterStats: (stats) => set({character: stats}),
			setEnemyStats: (stats) => set({enemy: stats}),
			currentBuffAndDebuff: {
				character: [],
				enemy: [],
			},
			attack: () => {
				const { phaseBattle, enemy, character } = get();
				set({ phaseBattle: PHASE_STATUS.PLAYER_TURN });
				if (phaseBattle !== PHASE_STATUS .PLAYER_TURN) return;
				
				const newHP = Math.max(
					0,
					enemy.stats.healPoints - character.attack
				);

				set({
					enemy: {
						...enemy,
						stats: {
							...enemy.stats,
							healPoints: newHP,
							death: newHP <= 0,
						}
					},
					totalDamage: {
						...get().totalDamage,
						character: get().totalDamage.character + (character.attack - newHP > 0 ? character.attack - newHP : 0),
					},
					phaseBattle: newHP <= 0
						? PHASE_STATUS.DEFAULT
						: PHASE_STATUS.ENEMY_TURN
				});

				console.log(`Enemy HP after attack: ${newHP}`);
			},
			defense: () => {
				const { phaseBattle, character } = get();

				if (phaseBattle !== PHASE_STATUS.PLAYER_TURN) return;

				const newDefense = character.defense * DEFENSE_MULTIPLIER;

				set({
					character: {
						...character,
						defense: newDefense,
					}
				});
			},
			escape: () => {},
			enemyAttack: (type) => {
				const { phaseBattle } = get();
				if (phaseBattle !== PHASE_STATUS.ENEMY_TURN) return;
				const action = getRandomEnumValue(ENEMY_ACTION_TYPE);
				const enemyActionType = type ?? action;
				
				switch (enemyActionType) {
					case ENEMY_ACTION_TYPE.ATTACK:
						const { enemy, character } = get();
						const newHP = Math.max(
							0,
							character.healPoints - enemy.stats.attack
						);

						set({
							character: {
								...character,
								healPoints: newHP,
								death: newHP <= 0,
							},
							phaseBattle: newHP <= 0
								? PHASE_STATUS.DEFAULT
								: PHASE_STATUS.PLAYER_TURN
						});
						set({
							totalDamage: {
								...get().totalDamage,
								enemy: get().totalDamage.enemy + (enemy.stats.attack - newHP > 0 ? enemy.stats.attack - newHP : 0),
							},
						});
						break;
						case ENEMY_ACTION_TYPE.DEFENSE:
							// Implement enemy defense logic here
						break;
						case ENEMY_ACTION_TYPE.EVADE:
							// Implement enemy evasion logic here
						break;
						case ENEMY_ACTION_TYPE.ESCAPE:
							// Implement enemy escape logic here
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
				// set({
				// 	character: {...defaultValues},
				// 	enemy: {...defaultValuesEnemy},
				// 	phaseBattle: PHASE_STATUS.DEFAULT,
				// 	totalDamage: 0,
				// });
			},
			// initialParameters: {
			// 	character: defaultValues,
			// 	enemy: defaultValuesEnemy,
			// },
			// updateCharacterStats: (updateRequest, updateValue) => {
			// 	// set((state) => {
			// 	// 	const updatedCharacter = {...state.character};
			// 	// 	let newState = {...state};
			// 	// 	let shouldUpdateTurn = false;

			// 	// 	switch (updateRequest.updateCurrentStats) {
			// 	// 		case UPDATE_STATS.ATTACK:
			// 	// 			if (updateRequest.incomingStatus !== INCOMING_STATUS.ATTACK) {
			// 	// 				updatedCharacter.attack += updateValue as number;
			// 	// 				shouldUpdateTurn = true;
			// 	// 			} else {
			// 	// 				shouldUpdateTurn = true;
			// 	// 			}
			// 	// 			break;

			// 	// 		case UPDATE_STATS.DEFENSE:
			// 	// 			updatedCharacter.defense = updateValue as number;
			// 	// 			break;

			// 	// 		case UPDATE_STATS.HP:
			// 	// 			const value = updateValue as number;

			// 	// 			if (updateRequest.incomingStatus === INCOMING_STATUS.ATTACK) {
			// 	// 				updatedCharacter.healPoints = Math.max(
			// 	// 					0,
			// 	// 					updatedCharacter.healPoints - value,
			// 	// 				);
			// 	// 				shouldUpdateTurn = true;

			// 	// 				if (updatedCharacter.healPoints <= 0) {
			// 	// 					updatedCharacter.death = true;
			// 	// 					newState.currentTargetToMove = CURRENT_TARGET_TO_MOVE.DEFAULT;
			// 	// 				}
			// 	// 			} else if (
			// 	// 				updateRequest.incomingStatus === INCOMING_STATUS.ITEM
			// 	// 			) {
			// 	// 				const maxHp = state.initialParameters.character.healPoints;
			// 	// 				updatedCharacter.healPoints = Math.min(
			// 	// 					updatedCharacter.healPoints + value,
			// 	// 					maxHp,
			// 	// 				);
			// 	// 				shouldUpdateTurn = true;
			// 	// 			}
			// 	// 			break;

			// 	// 		case UPDATE_STATS.LEVEL:
			// 	// 			updatedCharacter.level = updateValue as number;
			// 	// 			break;

			// 	// 		case UPDATE_STATS.ALL:
			// 	// 			return {
			// 	// 				...state,
			// 	// 				character: updateValue as CharacterStats,
			// 	// 				initialParameters: {
			// 	// 					...state.initialParameters,
			// 	// 					character: updateValue as CharacterStats,
			// 	// 				},
			// 	// 			};

			// 	// 		default:
			// 	// 			console.warn(
			// 	// 				`Неподдерживаемый запрос обновления: ${updateRequest}`,
			// 	// 			);
			// 	// 			return state;
			// 	// 	}

			// 	// 	newState.character = updatedCharacter;

			// 	// 	if (shouldUpdateTurn) {
			// 	// 		newState.currentTargetToMove =
			// 	// 			updateRequest.incomingStatus === INCOMING_STATUS.ATTACK
			// 	// 				? CURRENT_TARGET_TO_MOVE.CHARACTER
			// 	// 				: CURRENT_TARGET_TO_MOVE.ENEMY;
			// 	// 	}

			// 	// 	return newState;
			// 	// });
			// },

			// updateEnemyStats: (updateRequest, updateValue) => {
			// 	// set((state) => {
			// 	// 	const updatedEnemy = {...state.enemy};

			// 	// 	switch (updateRequest) {
			// 	// 		case UPDATE_STATS.ATTACK:
			// 	// 			updatedEnemy.attack = updateValue as number;
			// 	// 			set({currentTargetToMove: CURRENT_TARGET_TO_MOVE.CHARACTER});
			// 	// 			break;
			// 	// 		case UPDATE_STATS.DEFENSE:
			// 	// 			updatedEnemy.defense = updateValue as number;
			// 	// 			break;
			// 	// 		case UPDATE_STATS.HP:
			// 	// 			const value = updateValue as number;
			// 	// 			if (value >= updatedEnemy.healPoints) {
			// 	// 				updatedEnemy.healPoints = 0;
			// 	// 				updatedEnemy.death = true;
			// 	// 				get().setDefaultState();
			// 	// 			} else {
			// 	// 				updatedEnemy.healPoints -= value;
			// 	// 				set({currentTargetToMove: CURRENT_TARGET_TO_MOVE.ENEMY});
			// 	// 			}

			// 	// 			break;
			// 	// 		case UPDATE_STATS.LEVEL:
			// 	// 			updatedEnemy.level = updateValue as number;
			// 	// 			break;
			// 	// 		case UPDATE_STATS.ALL:
			// 	// 			return {
			// 	// 				enemy: updateValue as EnemyStats,
			// 	// 				initialParameters: {
			// 	// 					...state.initialParameters,
			// 	// 					enemy: updateValue as EnemyStats,
			// 	// 				},
			// 	// 			};
			// 	// 		default:
			// 	// 			console.warn(
			// 	// 				`Неподдерживаемый запрос обновления: ${updateRequest}`,
			// 	// 			);
			// 	// 	}

			// 	// 	return {enemy: updatedEnemy};
			// 	// });
			// },
		}),
		{
			name: 'battle-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
