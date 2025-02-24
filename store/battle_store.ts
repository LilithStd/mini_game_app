import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Stats {
	level: number;
	attack: number;
	defense: number;
	healPoints: number;
}

export interface BattleStoreInterface {
	character: Stats;
	enemy: Stats;
	total_damage: number;
	updateCharacterStats: (
		updateRequest: UPDATE_CHARACTER_STATS,
		updateValue: number | Stats,
	) => void;
	updateEnemyStats: (
		updateRequest: UPDATE_CHARACTER_STATS,
		updateValue: number | Stats,
	) => void;
}

export enum UPDATE_CHARACTER_STATS {
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
	healPoints: 0,
};

export const useBattleStore = create<BattleStoreInterface>()(
	persist(
		(set, get) => ({
			total_damage: 0,
			character: {...defaultValues},
			enemy: {...defaultValues},

			updateCharacterStats: (updateRequest, updateValue) => {
				set((state) => {
					const updatedCharacter = {...state.character};

					switch (updateRequest) {
						case UPDATE_CHARACTER_STATS.ATTACK:
							updatedCharacter.attack = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.DEFENSE:
							updatedCharacter.defense = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.HP:
							updatedCharacter.healPoints = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.LEVEL:
							updatedCharacter.level = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.ALL:
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
						case UPDATE_CHARACTER_STATS.ATTACK:
							updatedEnemy.attack = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.DEFENSE:
							updatedEnemy.defense = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.HP:
							updatedEnemy.healPoints = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.LEVEL:
							updatedEnemy.level = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.ALL:
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
