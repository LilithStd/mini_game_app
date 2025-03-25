import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Stats {
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
	healPoints: number;
	death: boolean;
}

export interface BattleStoreInterface {
	character: Stats;
	enemy: EnemyStats;
	total_damage: number;
	updateCharacterStats: (
		updateRequest: UPDATE_STATS,
		updateValue: number | Stats,
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

const defaultValues: Stats = {
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
	healPoints: 0,
	death: false,
};

export const useBattleStore = create<BattleStoreInterface>()(
	persist(
		(set, get) => ({
			total_damage: 0,
			character: {...defaultValues},
			enemy: {...defaultValuesEnemy},
			updateCharacterStats: (updateRequest, updateValue) => {
				set((state) => {
					const updatedCharacter = {...state.character};

					switch (updateRequest) {
						case UPDATE_STATS.ATTACK:
							updatedCharacter.attack = updateValue as number;
							break;
						case UPDATE_STATS.DEFENSE:
							updatedCharacter.defense = updateValue as number;
							break;
						case UPDATE_STATS.HP:
							updatedCharacter.healPoints = updateValue as number;
							break;
						case UPDATE_STATS.LEVEL:
							updatedCharacter.level = updateValue as number;
							break;
						case UPDATE_STATS.ALL:
							return {character: updateValue as Stats};
						default:
							console.warn(
								`Неподдерживаемый запрос обновления: ${updateRequest}`,
							);
					}

					return {character: updatedCharacter};
				});
			},

			updateEnemyStats: (updateRequest, updateValue) => {
				set((state) => {
					const updatedEnemy = {...state.enemy};

					switch (updateRequest) {
						case UPDATE_STATS.ATTACK:
							updatedEnemy.attack = updateValue as number;
							break;
						case UPDATE_STATS.DEFENSE:
							updatedEnemy.defense = updateValue as number;
							break;
						case UPDATE_STATS.HP:
							const value = updateValue as number;
							if (value >= updatedEnemy.healPoints) {
								updatedEnemy.death = true;
								updatedEnemy.healPoints = 0;
							} else {
								updatedEnemy.healPoints -= value;
							}

							break;
						case UPDATE_STATS.LEVEL:
							updatedEnemy.level = updateValue as number;
							break;
						case UPDATE_STATS.ALL:
							return {enemy: updateValue as Stats};
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
