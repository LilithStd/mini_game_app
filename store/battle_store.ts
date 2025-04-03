import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface EnemyStats {
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
	healPoints: number;
	expirience: number;
	death: boolean;
}

export enum INCOMING_STATUS {
	ATTACK = 'attack',
	ITEM = 'item',
	// DEFAULT = 'default',
}

export interface BattleStoreInterface {
	character: CharacterStats;
	enemy: EnemyStats;
	currentTargetToMove: CURRENT_TARGET_TO_MOVE;
	totalDamage: number;
	setDefaultState: () => void;
	initialParameters: {
		character: CharacterStats;
		enemy: EnemyStats;
	};
	updateCharacterStats: (
		updateRequest: {
			updateCurrentStats: UPDATE_STATS;
			incomingStatus: INCOMING_STATUS;
		},
		updateValue: number | CharacterStats,
	) => void;
	updateEnemyStats: (
		updateRequest: UPDATE_STATS,
		updateValue: number | EnemyStats,
	) => void;
}

export enum UPDATE_STATS {
	ATTACK = 'attack',
	DEFENSE = 'defense',
	HP = 'healPoints',
	LEVEL = 'level',
	ALL = 'all',
}

export enum CURRENT_TARGET_TO_MOVE {
	CHARACTER = 'character',
	ENEMY = 'enemy',
	DEFAULT = 'default',
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
	healPoints: 0,
	death: false,
};
const defaultValuesEnemy: EnemyStats = {
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

export const useBattleStore = create<BattleStoreInterface>()(
	persist(
		(set, get) => ({
			totalDamage: 0,
			currentTargetToMove: CURRENT_TARGET_TO_MOVE.DEFAULT,
			character: {...defaultValues},
			enemy: {...defaultValuesEnemy},
			setDefaultState: () => {
				set({
					character: {...defaultValues},
					enemy: {...defaultValuesEnemy},
					currentTargetToMove: CURRENT_TARGET_TO_MOVE.DEFAULT,
					totalDamage: 0,
				});
			},
			initialParameters: {
				character: defaultValues,
				enemy: defaultValuesEnemy,
			},
			updateCharacterStats: (updateRequest, updateValue) => {
				set((state) => {
					const updatedCharacter = {...state.character};
					let newState = {...state};
					let shouldUpdateTurn = false;

					switch (updateRequest.updateCurrentStats) {
						case UPDATE_STATS.ATTACK:
							updatedCharacter.attack = updateValue as number;
							shouldUpdateTurn = true;
							break;

						case UPDATE_STATS.DEFENSE:
							updatedCharacter.defense = updateValue as number;
							break;

						case UPDATE_STATS.HP:
							const value = updateValue as number;

							if (updateRequest.incomingStatus === INCOMING_STATUS.ATTACK) {
								updatedCharacter.healPoints = Math.max(
									0,
									updatedCharacter.healPoints - value,
								);
								shouldUpdateTurn = true;

								if (updatedCharacter.healPoints <= 0) {
									updatedCharacter.death = true;
									newState.currentTargetToMove = CURRENT_TARGET_TO_MOVE.DEFAULT;
								}
							} else if (
								updateRequest.incomingStatus === INCOMING_STATUS.ITEM
							) {
								const maxHp = state.initialParameters.character.healPoints;
								updatedCharacter.healPoints = Math.min(
									updatedCharacter.healPoints + value,
									maxHp,
								);
								shouldUpdateTurn = true;
							}
							break;

						case UPDATE_STATS.LEVEL:
							updatedCharacter.level = updateValue as number;
							break;

						case UPDATE_STATS.ALL:
							return {
								...state,
								character: updateValue as CharacterStats,
								initialParameters: {
									...state.initialParameters,
									character: updateValue as CharacterStats,
								},
							};

						default:
							console.warn(
								`Неподдерживаемый запрос обновления: ${updateRequest}`,
							);
							return state;
					}

					newState.character = updatedCharacter;

					if (shouldUpdateTurn) {
						newState.currentTargetToMove =
							updateRequest.incomingStatus === INCOMING_STATUS.ATTACK
								? CURRENT_TARGET_TO_MOVE.CHARACTER
								: CURRENT_TARGET_TO_MOVE.ENEMY;
					}

					return newState;
				});
			},

			updateEnemyStats: (updateRequest, updateValue) => {
				set((state) => {
					const updatedEnemy = {...state.enemy};

					switch (updateRequest) {
						case UPDATE_STATS.ATTACK:
							updatedEnemy.attack = updateValue as number;
							set({currentTargetToMove: CURRENT_TARGET_TO_MOVE.CHARACTER});
							break;
						case UPDATE_STATS.DEFENSE:
							updatedEnemy.defense = updateValue as number;
							break;
						case UPDATE_STATS.HP:
							const value = updateValue as number;
							if (value >= updatedEnemy.healPoints) {
								updatedEnemy.healPoints = 0;
								updatedEnemy.death = true;
								get().setDefaultState();
							} else {
								updatedEnemy.healPoints -= value;
								set({currentTargetToMove: CURRENT_TARGET_TO_MOVE.ENEMY});
							}

							break;
						case UPDATE_STATS.LEVEL:
							updatedEnemy.level = updateValue as number;
							break;
						case UPDATE_STATS.ALL:
							return {
								enemy: updateValue as EnemyStats,
								initialParameters: {
									...state.initialParameters,
									enemy: updateValue as EnemyStats,
								},
							};
						default:
							console.warn(
								`Неподдерживаемый запрос обновления: ${updateRequest}`,
							);
					}

					return {enemy: updatedEnemy};
				});
			},
		}),
		{
			name: 'battle-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
