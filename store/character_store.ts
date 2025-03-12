import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Character_Default = require('../assets/character/character_8.png');

const Character = {
	CHARACTER_1: require('../assets/character/character_1.png'),
	CHARACTER_2: require('../assets/character/character_2.png'),
	CHARACTER_3: require('../assets/character/character_3.png'),
};

const LEVELS = [
	{level: 1, experience: 0, reward: 'none'},
	{level: 2, experience: 100, reward: 'small potion'},
	{level: 3, experience: 250, reward: 'medium potion'},
	{level: 4, experience: 500, reward: 'large potion'},
	{level: 5, experience: 1000, reward: 'bronze sword'},
	{level: 6, experience: 1800, reward: 'silver sword'},
	{level: 7, experience: 3000, reward: 'golden armor'},
	{level: 8, experience: 4500, reward: 'magic ring'},
	{level: 9, experience: 6500, reward: 'legendary scroll'},
	{level: 10, experience: 9000, reward: 'dragon slayer sword'},
];

const count_character_in_pull = 3;

// export type Character_Pull_Type = {
// 	name: string;
// 	model: number;
// };

const Character_Pull: CharacterStats[] = [
	{
		name: 'character_name_0 - Knight',
		model: require('../assets/character/character_7.png'),
		level: 1,
		attack: 8,
		defense: 10,
		healPoints: 100,
		expirience: 0,
		totalDamage: 0,
		death: false,
	},
	{
		name: 'character_name_1 - Warrior',
		model: require('../assets/character/character_1.png'),
		level: 1,
		attack: 10,
		defense: 8,
		healPoints: 120,
		expirience: 0,
		totalDamage: 0,
		death: false,
	},
	{
		name: 'character_name_2 - Mage',
		model: require('../assets/character/character_6.png'),
		level: 1,
		attack: 12,
		defense: 6,
		healPoints: 80,
		expirience: 0,
		totalDamage: 0,
		death: false,
	},
];

export type Character_Type = {
	name: string;
	model: number;
	level: number;
};

export type CharacterInventoryType = {
	name: string;
	value: number;
	type: string;
};

export enum INVENTORY_ITEM {
	WEAPON = 'weapon',
	ARMOR = 'armor',
	CONSUMBLES = 'consumables',
}

export type CharacterStats = {
	name: string;
	model: number;
	level: number;
	attack: number;
	defense: number;
	healPoints: number;
	expirience: number;
	totalDamage: number;
	death: boolean;
};

const Character_Default_Stats = {
	name: '',
	model: Character_Default,
	level: 0,
	attack: 0,
	defense: 0,
	healPoints: 0,
	expirience: 0,
	totalDamage: 0,
	death: false,
};

export enum UPDATE_CHARACTER_STATS {
	NAME = 'name',
	MODEL = 'model',
	LEVEL = 'level',
	ATTACK = 'attack',
	DEFENSE = 'defence',
	HEAL_POINTS = 'healPoints',
	EXPIRIENCE = 'expirience',
	TOTAL_DAMAGE = 'totalDamage',
	DEATH = 'death',
	ALL = 'all',
}

export interface CharacterStoreInterface {
	default_state: boolean;
	character_pull: CharacterStats[];
	characterStats: CharacterStats;
	characterInventory: CharacterInventoryType[];
	characterInventoryUpdate: (item: CharacterInventoryType) => void;
	updateCharacterStats: (
		updateRequest: UPDATE_CHARACTER_STATS,
		updateValue: string | number | boolean | CharacterStats,
	) => void;
	setDefaultState: () => void;
	choose_character_pull: () => CharacterStats[];
}

export const useCharacterStore = create<CharacterStoreInterface>()(
	persist(
		(set, get) => ({
			default_state: true,
			character_pull: Character_Pull,
			characterStats: Character_Default_Stats,
			characterInventory: [],
			characterInventoryUpdate: (item) =>
				set((state) => {
					const updatedInventory = state.characterInventory.map((element) => {
						if (
							element.name === item.name &&
							element.type === INVENTORY_ITEM.CONSUMBLES
						) {
							return {...element, value: element.value + item.value};
						}
						return element;
					});

					const itemExists = state.characterInventory.some(
						(element) =>
							element.name === item.name &&
							element.type === INVENTORY_ITEM.CONSUMBLES,
					);

					// Если элемент не найден, добавляем новый
					if (!itemExists) {
						updatedInventory.push(item);
					}

					return {characterInventory: updatedInventory};
				}),
			choose_character_pull: () => {
				if (count_character_in_pull > Character_Pull.length) {
					throw new Error(
						'Запрашиваемое количество элементов превышает размер исходного массива.',
					);
				}

				const arrayCopy = [...Character_Pull];

				// Fisher-Yates Shuffle (перемешивание за O(n))
				for (let i = arrayCopy.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
				}

				return arrayCopy.slice(0, count_character_in_pull);
			},
			setDefaultState: () => {
				set({
					default_state: true,
					character_pull: [],
				});
			},
			updateCharacterStats: (updateRequest, updateValue) => {
				set((state) => {
					const updatedCharacter = {...state.characterStats};

					switch (updateRequest) {
						case UPDATE_CHARACTER_STATS.NAME:
							updatedCharacter.name = updateValue as string;
							break;
						case UPDATE_CHARACTER_STATS.MODEL:
							updatedCharacter.model = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.LEVEL:
							updatedCharacter.level = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.ATTACK:
							updatedCharacter.attack = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.DEFENSE:
							updatedCharacter.defense = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.HEAL_POINTS:
							updatedCharacter.healPoints = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.EXPIRIENCE: {
							let incomeExp = updateValue as number;
							let currentLevel = get().characterStats.level;
							let currentExp = get().characterStats.expirience;

							// Находим максимальный уровень из LEVELS
							const maxLevel = Math.max(...LEVELS.map((lvl) => lvl.level));

							while (incomeExp > 0 && currentLevel < maxLevel) {
								const foundLevel = LEVELS.find(
									(lvl) => lvl.level === currentLevel,
								);

								if (!foundLevel) break; // Если уровень не найден, выходим из цикла

								const requiredExp = foundLevel.experience;

								if (currentExp + incomeExp >= requiredExp) {
									// Повышаем уровень
									incomeExp -= requiredExp - currentExp; // Вычитаем использованный опыт
									currentLevel += 1;
									currentExp = 0; // Опыт сбрасывается на 0 при повышении уровня
								} else {
									currentExp += incomeExp; // Если не хватает на уровень, просто добавляем опыт
									incomeExp = 0;
								}
							}

							// Если достигнут максимальный уровень, ограничиваем опыт
							if (currentLevel === maxLevel) {
								const maxExp =
									LEVELS.find((lvl) => lvl.level === maxLevel)?.experience || 0;
								currentExp = Math.min(currentExp + incomeExp, maxExp);
							}

							updatedCharacter.level = currentLevel;
							updatedCharacter.expirience = currentExp;

							break;
						}

						case UPDATE_CHARACTER_STATS.TOTAL_DAMAGE:
							updatedCharacter.totalDamage = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.DEATH:
							updatedCharacter.death = updateValue as boolean;
							break;
						case UPDATE_CHARACTER_STATS.ALL:
							return {characterStats: updateValue as CharacterStats};
						default:
							console.warn(
								`Неподдерживаемый запрос обновления: ${updateRequest}`,
							);
					}

					return {characterStats: updatedCharacter};
				});
			},
		}),
		{
			name: 'character-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
