import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Character_Default = require('../assets/character/character_00.jpg');
const Character_Default_Preview = require('../assets/character/character_00_preview.jpg');

const Character = {
	CHARACTER_1: require('../assets/character/character_00.jpg'),
	CHARACTER_2: require('../assets/character/character_01.jpg'),
	CHARACTER_3: require('../assets/character/character_02.jpg'),
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
		model: require('../assets/character/character_00.jpg'),
		preview: require('../assets/character/character_00_preview.jpg'),
		stats:{
			level: 1,
			attack: 8,
			defense: 10,
			accuracy: 2,
			criticalRate: 5,
			criticalDamage: 10,
			evasion: 0,
			reduceCriticalDamage: 20,
			atribute: 'none',
			resistAtribute: '',
			itemsSkills: [],
			healPoints: { current: 100, max: 100 },
			expirience: 0,
			totalDamage: 0,
			death: false,
		}
		
	},
	{
		name: 'character_name_1 - Warrior',
		model: require('../assets/character/character_01.jpg'),
		preview: require('../assets/character/character_01_preview.jpg'),
		stats:{
			level: 1,
			attack: 10,
			defense: 8,
			accuracy: 4,
			criticalRate: 5,
			criticalDamage: 10,
			evasion: 4,
			reduceCriticalDamage: 40,
			atribute: 'fire',
			resistAtribute: '',
			itemsSkills: [],
			healPoints: { current: 120, max: 120 },
			expirience: 0,
			totalDamage: 0,
			death: false,
		}
	},
	{
		name: 'character_name_2 - Mage',
		model: require('../assets/character/character_02.jpg'),
		preview: require('../assets/character/character_02_preview.jpg'),
		stats:{
			level: 1,
			attack: 12,
			defense: 6,
			accuracy: 3,
			criticalRate: 10,
			criticalDamage: 10,
			evasion: 0,
			reduceCriticalDamage: 40,
			atribute: 'ice',
			resistAtribute: '',
			itemsSkills: [],
			healPoints: { current: 80, max: 80 },
			expirience: 0,
			totalDamage: 0,
			death: false,
		}
	},
];

export type Character_Type = {
	name: string;
	model: number;
	level: number;
};

export type CharacterInventoryType = {
	id: string;
	name: string;
	count: number;
};

export enum INVENTORY_ITEM_TYPE {
	WEAPON = 'weapon',
	ARMOR = 'armor',
	CONSUMBLES = 'consumables',
}

export enum INVENTORY_ITEM_ARMOR_SUBTYPE {
	HELMET = 'helmet',
	BODY = 'body',
	BOOTS = 'boots',
}

export enum INVENTORY_ITEM_ARMOR_TYPE {
	HEAVY = 'heavy',
	LIGHT = 'light',
	ROBE = 'robe',
}

export enum INVENTORY_ITEM_WEAPON_SUBTYPE {
	SWORD = 'sword',
	SPEAR = 'spear',
	BOW = 'bow',
	BLUNT = 'blunt',
	AXE = 'axe',
	STAFF = 'staff',
}

// export enum INVENTORY_ITEM_WEAPON_SUBTYPE {
// 	ONE_HAND = 'one_hand',
// 	DOUBLE_HANDS = 'double_hands',
// }

export enum INVENTORY_ITEM_CONSUMBLES_TYPE {
	POTION = 'potion',
	CURRENCY = 'currency',
	KEY = 'key',
	CRYSTAL = 'crystal',
}

export enum INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF {
	ATTACK_BUFF = 'attack_buff',
	DEFENSE_BUFF = 'defense_buff',
	EVASION_BUFF = 'evasion_buff',
}

export enum INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS {
	TREASURE = 'treasure',
	DOOR = 'door',
	DUNGEON = 'dungeon',
}
export enum INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS {
	HEAL_RESTORE = 'heal_restore',
	BUFF_CHARACTER = 'buff_character',
	ESCAPE_CHARACTER = 'escape_character',
}
export enum INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY {
	GOLD = 'gold',
	FANG_MONSTERS = 'fang_monsters',
}

export enum INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL {
	CHARACTER_UP = 'character_up',
	ITEM_UP = 'item_up',
}

export type CharacterStats = {
	name: string;
	model: number;
	preview: number;
	stats:{
		level: number;
		attack: number;
		defense: number;
		accuracy: number;
		criticalRate: number;
		criticalDamage: number;
		evasion: number;
		itemsSkills: string[];
		reduceCriticalDamage: number;
		atribute: string;
		resistAtribute: string;
		expirience: number;
		healPoints: { current: number; max: number; };
		totalDamage: number;	
		death: boolean;
	}
};

const CharacterEquipDefault = {
	weapon: {
		name: '',
		stats: {
			attack: 0,
			accuracy: 0,
			criticalRate: 0,
			criticalDamage: 0,
			atribute: '',
			itemSkill: '',
		},
	},
	armor: {
		body: {
			name: '',
			stats: {
				defense: 0,
				evasion: 0,
				reduceCriticalDamage: 0,
				resistAtribute: '',
				itemSkill: '',
			},
		},
		helmet: {
			name: '',
			stats: {
				defense: 0,
				evasion: 0,
				reduceCriticalDamage: 0,
				resistAtribute: '',
				itemSkill: '',
			},
		},
		boots: {
			name: '',
			stats: {
				defense: 0,
				evasion: 0,
				reduceCriticalDamage: 0,
				resistAtribute: '',
				itemSkill: '',
			},
		},
	},
};

export type CharacterEquip = {
	weapon: {
		name: string;
		stats: {
			attack: number;
			accuracy: number;
			criticalRate: number;
			criticalDamage: number;
			atribute: string;
			itemSkill: string;
		};
	};
	armor: {
		body: {
			name: string;
			stats: {
				defense: number;
				evasion: number;
				reduceCriticalDamage: number;
				resistAtribute: string;
				itemSkill: string;
			};
		};
		helmet: {
			name: string;
			stats: {
				defense: number;
				evasion: number;
				reduceCriticalDamage: number;
				resistAtribute: string;
				itemSkill: string;
			};
		};
		boots: {
			name: string;
			stats: {
				defense: number;
				evasion: number;
				reduceCriticalDamage: number;
				resistAtribute: string;
				itemSkill: string;
			};
		};
	};
};

const CharacterDefaultStats = {
	name: 'default_character',
	model: Character_Default,
	preview: Character_Default_Preview,
	stats: {
		level: 1,
		attack: 10,
		defense: 0,
		accuracy: 0,
		criticalRate: 0,
		criticalDamage: 0,
		evasion: 0,
		reduceCriticalDamage: 0,
		atribute: 'none',
		resistAtribute: '',
		itemsSkills: [],
		healPoints: { current: 100, max: 100 },
		expirience: 0,
		totalDamage: 0,
		death: false,
	},
};

export enum UPDATE_CHARACTER_STATS {
	NAME = 'name',
	MODEL = 'model',
	LEVEL = 'level',
	ATTACK = 'attack',
	DEFENSE = 'defense',
	ACCURACY = 'accuracy',
	EVASION = 'evasion',
	CRITICAL_RATE = 'criticalRate',
	CRITICAL_DAMAGE = 'criticalDamage',
	REDUCE_CRITICAL_DAMAGE = 'reduceCriticalDamage',
	ATRIBUTE = 'atribute',
	RESIST_ATRIBUTE = 'resistAtribute',
	ITEM_SKILL = 'itemSkill',
	HEAL_POINTS = 'healPoints',
	EXPIRIENCE = 'expirience',
	TOTAL_DAMAGE = 'totalDamage',
	DEATH = 'death',
	ALL = 'all',
}

export type UpdateItemStats = {
	attack?: number;
	defense?: number;
	accuracy?: number;
	criticalRate?: number;
	criticalDamage?: number;
	evasion?: number;
	reduceCriticalDamage?: number;
	resistAtribute?: string;
	healPoints?: { current: number; max: number; };
};

export interface CharacterStoreInterface {
	default_state: boolean;
	character_pull: CharacterStats[];
	characterStats: CharacterStats;
	characterInventory: CharacterInventoryType[];
	characterEquip: CharacterEquip;
	characterEquipUpdate: (
		updateEquipRequest: string,
		updateEquipItem: {id: string; name: string; stats: UpdateItemStats},
	) => void;
	characterInventoryUpdate: (item: CharacterInventoryType[]) => void;
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
			characterStats: CharacterDefaultStats,
			characterInventory: [],
			characterEquip: CharacterEquipDefault,
			characterEquipUpdate: (updateEquipRequest, updateEquipItem) =>
				set((state) => {
					const updatedCharacterEquip = {...state.characterEquip};
					switch (updateEquipRequest) {
						case INVENTORY_ITEM_TYPE.WEAPON:
							{
								const isEquipped =
									updatedCharacterEquip.weapon.name === updateEquipItem.name;

								// Сбрасываем или устанавливаем новый предмет
								updatedCharacterEquip.weapon.name = isEquipped
									? ''
									: updateEquipItem.name;

								// Коэффициент для прибавления или вычитания характеристик
								const multiplier = isEquipped ? -1 : 1;

								// Обновление характеристик
								Object.entries(updateEquipItem.stats).forEach(
									([key, value]) => {
										const statValue =
											typeof value === 'number' ? value * multiplier : 0;
										get().updateCharacterStats(
											key as UPDATE_CHARACTER_STATS,
											statValue,
										);
									},
								);
							}
							// if (updatedCharacterEquip.weapon.name === updateEquipItem.name) {
							// 	updatedCharacterEquip.weapon.name = '';
							// } else {
							// 	updatedCharacterEquip.weapon.name = updateEquipItem.name;
							// }
							break;
						case INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET:
							{
								const isEquipped =
									updatedCharacterEquip.armor.helmet.name ===
									updateEquipItem.name;

								// Сбрасываем или устанавливаем новый предмет
								updatedCharacterEquip.armor.helmet.name = isEquipped
									? ''
									: updateEquipItem.name;

								// Коэффициент для прибавления или вычитания характеристик
								const multiplier = isEquipped ? -1 : 1;

								// Обновление характеристик
								Object.entries(updateEquipItem.stats).forEach(
									([key, value]) => {
										const statValue =
											typeof value === 'number' ? value * multiplier : 0;
										get().updateCharacterStats(
											key as UPDATE_CHARACTER_STATS,
											statValue,
										);
									},
								);
							}
							// if (
							// 	updatedCharacterEquip.armor.helmet.name === updateEquipItem.name
							// ) {
							// 	updatedCharacterEquip.armor.helmet.name = '';
							// 	get().updateCharacterStats(
							// 		UPDATE_CHARACTER_STATS.DEFENSE,
							// 		updateEquipItem.stats.defense
							// 			? -updateEquipItem.stats.defense
							// 			: 0,
							// 	);
							// } else {
							// 	updatedCharacterEquip.armor.helmet.name = updateEquipItem.name;
							// 	get().updateCharacterStats(
							// 		UPDATE_CHARACTER_STATS.DEFENSE,
							// 		updateEquipItem.stats.defense
							// 			? updateEquipItem.stats.defense
							// 			: 0,
							// 	);
							// }
							break;

						case INVENTORY_ITEM_ARMOR_SUBTYPE.BODY:
							{
								const isEquipped =
									updatedCharacterEquip.armor.body.name ===
									updateEquipItem.name;

								// Сбрасываем или устанавливаем новый предмет
								updatedCharacterEquip.armor.body.name = isEquipped
									? ''
									: updateEquipItem.name;

								// Коэффициент для прибавления или вычитания характеристик
								const multiplier = isEquipped ? -1 : 1;

								// Обновление характеристик
								Object.entries(updateEquipItem.stats).forEach(
									([key, value]) => {
										const statValue =
											typeof value === 'number' ? value * multiplier : 0;
										get().updateCharacterStats(
											key as UPDATE_CHARACTER_STATS,
											statValue,
										);
									},
								);
							}
							// if (
							// 	updatedCharacterEquip.armor.body.name === updateEquipItem.name
							// ) {
							// 	updatedCharacterEquip.armor.body.name = '';
							// 	get().updateCharacterStats(
							// 		UPDATE_CHARACTER_STATS.DEFENSE,
							// 		updateEquipItem.stats.defense
							// 			? -updateEquipItem.stats.defense
							// 			: 0,
							// 	);
							// } else {
							// 	updatedCharacterEquip.armor.body.name = updateEquipItem.name;
							// 	get().updateCharacterStats(
							// 		UPDATE_CHARACTER_STATS.DEFENSE,
							// 		updateEquipItem.stats.defense
							// 			? updateEquipItem.stats.defense
							// 			: 0,
							// 	);
							// }

							break;

						case INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS: {
							const isEquipped =
								updatedCharacterEquip.armor.boots.name === updateEquipItem.name;

							// Сбрасываем или устанавливаем новый предмет
							updatedCharacterEquip.armor.boots.name = isEquipped
								? ''
								: updateEquipItem.name;

							// Коэффициент для прибавления или вычитания характеристик
							const multiplier = isEquipped ? -1 : 1;

							// Обновление характеристик
							Object.entries(updateEquipItem.stats).forEach(([key, value]) => {
								const statValue =
									typeof value === 'number' ? value * multiplier : 0;
								get().updateCharacterStats(
									key as UPDATE_CHARACTER_STATS,
									statValue,
								);
							});

							break;
						}

						default:
							console.warn(
								`Неподдерживаемый запрос обновления: ${updateEquipRequest}`,
							);
					}
					return {characterEquip: updatedCharacterEquip};
				}),
			characterInventoryUpdate: (items: CharacterInventoryType[]) =>
				set((state) => {
					const updatedInventory = [...state.characterInventory];

					items.forEach((item) => {
						const existingItem = updatedInventory.find(
							(element) => element.name === item.name,
						);

						if (existingItem) {
							// Если предмет уже есть, обновляем его количество
							existingItem.count += item.count;
						} else {
							// Если предмета нет, добавляем его в инвентарь
							updatedInventory.push(item);
						}
					});

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
					character_pull: Character_Pull,
					characterStats: CharacterDefaultStats,
					characterInventory: [],
					characterEquip: CharacterEquipDefault,
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
							updatedCharacter.stats.level = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.ATTACK:
							updatedCharacter.stats.attack =
								(updatedCharacter.stats.attack || 0) + (updateValue as number);
							break;
						case UPDATE_CHARACTER_STATS.DEFENSE:
							updatedCharacter.stats.defense =
								(updatedCharacter.stats.defense || 0) + (updateValue as number);
							break;
						case UPDATE_CHARACTER_STATS.ACCURACY:
							updatedCharacter.stats.accuracy =
								(updatedCharacter.stats.accuracy || 0) + (updateValue as number);
							break;
						case UPDATE_CHARACTER_STATS.CRITICAL_RATE:
							updatedCharacter.stats.criticalRate =
								(updatedCharacter.stats.criticalRate || 0) + (updateValue as number);
							break;
						case UPDATE_CHARACTER_STATS.CRITICAL_DAMAGE:
							updatedCharacter.stats.criticalDamage =
								(updatedCharacter.stats.criticalDamage || 0) +
								(updateValue as number);
							break;
						case UPDATE_CHARACTER_STATS.EVASION:
							updatedCharacter.stats.evasion =
								(updatedCharacter.stats.evasion || 0) + (updateValue as number);
							break;
						case UPDATE_CHARACTER_STATS.REDUCE_CRITICAL_DAMAGE:
							updatedCharacter.stats.reduceCriticalDamage =
								(updatedCharacter.stats.reduceCriticalDamage || 0) +
								(updateValue as number);
							break;
						case UPDATE_CHARACTER_STATS.ITEM_SKILL:
							const element = updateValue as string;
							updatedCharacter.stats.itemsSkills =
								updatedCharacter.stats.itemsSkills.includes(element)
									? updatedCharacter.stats.itemsSkills.filter(
											(skill) => skill !== element,
									  ) // Remove item skill if already present
									: [...updatedCharacter.stats.itemsSkills, element]; // Add item skill if not present
							break;
						case UPDATE_CHARACTER_STATS.ATRIBUTE:
							updatedCharacter.stats.atribute = updateValue as string;
							break;
						case UPDATE_CHARACTER_STATS.RESIST_ATRIBUTE:
							updatedCharacter.stats.resistAtribute = updateValue as string;
							break;
						case UPDATE_CHARACTER_STATS.HEAL_POINTS:
							updatedCharacter.stats.healPoints =
								{
									current: (updatedCharacter.stats.healPoints?.current || 0) + (updateValue as number),
									max: updatedCharacter.stats.healPoints?.max || 0,
								};
							break;
						case UPDATE_CHARACTER_STATS.EXPIRIENCE:
							// Ensure you're adding experience properly and leveling up
							let incomeExp = updateValue as number;
							let currentLevel = updatedCharacter.stats.level;
							let currentExp = updatedCharacter.stats.expirience;

							const maxLevel = Math.max(...LEVELS.map((lvl) => lvl.level));
							while (incomeExp > 0 && currentLevel < maxLevel) {
								const foundLevel = LEVELS.find(
									(lvl) => lvl.level === currentLevel,
								);
								if (!foundLevel) break;

								const requiredExp = foundLevel.experience;

								if (currentExp + incomeExp >= requiredExp) {
									incomeExp -= requiredExp - currentExp;
									currentLevel += 1;
									currentExp = 0;
								} else {
									currentExp += incomeExp;
									incomeExp = 0;
								}
							}

							if (currentLevel === maxLevel) {
								const maxExp =
									LEVELS.find((lvl) => lvl.level === maxLevel)?.experience || 0;
								currentExp = Math.min(currentExp + incomeExp, maxExp);
							}

							updatedCharacter.stats.level = currentLevel;
							updatedCharacter.stats.expirience = currentExp;
							break;
						case UPDATE_CHARACTER_STATS.TOTAL_DAMAGE:
							updatedCharacter.stats.totalDamage = updateValue as number;
							break;
						case UPDATE_CHARACTER_STATS.DEATH:
							updatedCharacter.stats.death = updateValue as boolean;
							break;
						case UPDATE_CHARACTER_STATS.ALL:
							return {characterStats: { ...updateValue as CharacterStats, stats: { ...updateValue as CharacterStats }.stats }};
						default:
							console.warn(`Unsupported update request: ${updateRequest}`);
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
