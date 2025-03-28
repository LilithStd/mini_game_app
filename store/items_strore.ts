import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {
	INVENTORY_ITEM_ARMOR_SUBTYPE,
	INVENTORY_ITEM_ARMOR_TYPE,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF,
	INVENTORY_ITEM_CONSUMBLES_TYPE,
	INVENTORY_ITEM_TYPE,
	INVENTORY_ITEM_WEAPON_SUBTYPE,
} from './character_store';
import {WEAPON} from '@/constants/store/items/weapons';
import {ARMOR} from '@/constants/store/items/armors';
import {CONSUMBLES} from '@/constants/store/items/consumbles';
import {getChancePercent, getRandomEnumValue} from '@/constants/helpers';

export const rewards = [
	{
		id: '0',
		name: 'Золотая монета',
		value: 10,
		type: INVENTORY_ITEM_TYPE.CONSUMBLES,
		subType: INVENTORY_ITEM_CONSUMBLES_TYPE.CURRENCY,
	},
	{
		id: '1',
		name: 'Меч героя',
		value: 1,
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SWORD,
	},
	{
		id: '2',
		name: 'Зелье здоровья',
		value: 5,
		type: INVENTORY_ITEM_TYPE.CONSUMBLES,
		subType: INVENTORY_ITEM_CONSUMBLES_TYPE.POTION,
	},
	{
		id: '3',
		name: 'Редкий кристалл',
		value: 2,
		type: INVENTORY_ITEM_TYPE.CONSUMBLES,
		subType: INVENTORY_ITEM_CONSUMBLES_TYPE.CRYSTAL,
	},
	{
		id: '4',
		name: 'Ключ от сундука',
		value: 1,
		type: INVENTORY_ITEM_TYPE.CONSUMBLES,
		subType: INVENTORY_ITEM_CONSUMBLES_TYPE.KEY,
	},
	{
		id: '5',
		name: 'Меч дракона',
		value: 1,
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SWORD,
	},
	{
		id: '6',
		name: 'Эльфийский лук',
		value: 1,
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BOW,
	},
	{
		id: '7',
		name: 'Копьё воина',
		value: 1,
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SPEAR,
	},
	{
		id: '8',
		name: 'Булава огра',
		value: 1,
		type: INVENTORY_ITEM_TYPE.WEAPON,
		subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BLUNT,
	},
	{
		id: '9',
		name: 'Шлем воина',
		value: 1,
		type: INVENTORY_ITEM_TYPE.ARMOR,
		subType: INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET,
	},
	{
		id: '10',
		name: 'Шлем варвара',
		value: 1,
		type: INVENTORY_ITEM_TYPE.ARMOR,
		subType: INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET,
	},
	{
		id: '11',
		name: 'Легкие ботинки',
		value: 1,
		type: INVENTORY_ITEM_TYPE.ARMOR,
		subType: INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS,
	},
	{
		id: '12',
		name: 'Кожанные сапоги',
		value: 1,
		type: INVENTORY_ITEM_TYPE.ARMOR,
		subType: INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS,
	},
	{
		id: '13',
		name: 'Броня рыцаря',
		value: 1,
		type: INVENTORY_ITEM_TYPE.ARMOR,
		subType: INVENTORY_ITEM_ARMOR_SUBTYPE.BODY,
	},
	{
		id: '14',
		name: 'Доспех воителя',
		value: 1,
		type: INVENTORY_ITEM_TYPE.ARMOR,
		subType: INVENTORY_ITEM_ARMOR_SUBTYPE.BODY,
	},
];

interface BaseItemsType<TType = string, TSubType = string> {
	id: string;
	name: string;
	type: TType; // Позволяет передавать конкретный ENUM типа
	subType: TSubType; // Позволяет передавать конкретный ENUM подтипа
	description: string;
}

// Оружие
interface WeaponType
	extends BaseItemsType<
		INVENTORY_ITEM_TYPE.WEAPON,
		INVENTORY_ITEM_WEAPON_SUBTYPE
	> {
	stats: {
		attack: number;
		accuracy: number;
		criticalRate: number;
		criticalDamage: number;
		atribute: string;
		itemSkill: string;
	};
}

// Броня
interface ArmorType
	extends BaseItemsType<
		INVENTORY_ITEM_TYPE.ARMOR,
		INVENTORY_ITEM_ARMOR_SUBTYPE
	> {
	stats: {
		defense: number;
		evasion: number;
		reduceCriticalDamage: number;
		resistAtribute: string;
		itemSkill: string;
	};
}

export interface ConsumableType<
	TSubType =
		| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF
		| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS
		| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS
		| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY
		| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL,
> extends BaseItemsType<INVENTORY_ITEM_CONSUMBLES_TYPE, TSubType> {
	stats?: {
		attack?: number;
		defense?: number;
		evasion?: number;
		healPotion?: number;
	};
}

export enum REWARD_VARIANT {
	TREASURE = 'treasure',
	GOLD_TREASURE = 'gold_treasure',
	DUNGEON = 'dungeon',
	MONSTER = 'monster',
	BOSS = 'boss',
	DEFAULT_NOTHNIG = 'default_nothing',
}

type AllTypesReward =
	| INVENTORY_ITEM_CONSUMBLES_TYPE
	| INVENTORY_ITEM_ARMOR_SUBTYPE
	| INVENTORY_ITEM_ARMOR_TYPE
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS
	| INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF
	| INVENTORY_ITEM_TYPE
	| INVENTORY_ITEM_WEAPON_SUBTYPE;

type RewardTypeReturn = {
	id: string;
	name: string;
	count: number;
};

interface ItemsStoreInterface {
	weapons: WeaponType[];
	armors: ArmorType[];
	consumbles: ConsumableType[];
	getReward: (variant: REWARD_VARIANT) => RewardTypeReturn[];
}

const CHANCE_PERCENT = {
	VERY_LOW: 10,
	LOW: 30,
	MEDIUM: 40,
	HIGH: 70,
};

const COUNT_ITEMS = {
	LOW: 1,
	HIGH: 2,
};

const COUNT_CURRENCY = {
	LOW: 1,
	MEDIUM: 10,
	HIGH: 20,
};

const REWARD = {
	treasure: {
		potions: {
			healPotions: {
				name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE,
				chance: CHANCE_PERCENT.LOW,
				count: COUNT_ITEMS.LOW,
			},
			buffPotions: {
				name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF,
				chance: CHANCE_PERCENT.LOW,
				count: COUNT_ITEMS.LOW,
			},
		},
		currency: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.GOLD,
			chance: CHANCE_PERCENT.MEDIUM,
			count: COUNT_CURRENCY.MEDIUM,
		},
	},
	monsters: {
		currency: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.FANG_MONSTERS,
			chance: CHANCE_PERCENT.LOW,
			count: COUNT_CURRENCY.MEDIUM,
		},
		keys: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS.TREASURE,
			chance: CHANCE_PERCENT.LOW,
			count: COUNT_ITEMS.LOW,
		},
		armor: {
			name: INVENTORY_ITEM_ARMOR_SUBTYPE,
			chance: CHANCE_PERCENT.VERY_LOW,
			count: COUNT_ITEMS.LOW,
		},
		weapon: {
			name: INVENTORY_ITEM_WEAPON_SUBTYPE,
			chance: CHANCE_PERCENT.VERY_LOW,
			count: COUNT_ITEMS.LOW,
		},
	},
};

export const useItemsStore = create<ItemsStoreInterface>()(
	persist(
		(set, get) => ({
			weapons: WEAPON as WeaponType[],
			armors: ARMOR as ArmorType[],
			consumbles: CONSUMBLES as ConsumableType[],
			getReward: (variant: REWARD_VARIANT): RewardTypeReturn[] => {
				const reward: RewardTypeReturn[] = [];
				switch (variant) {
					case REWARD_VARIANT.DEFAULT_NOTHNIG: {
						return [];
					}
					case REWARD_VARIANT.TREASURE: {
						const treasureReward: RewardTypeReturn[] = [];
						const consumables = get().consumbles; // Получаем инвентарь сразу

						// Проверка на выпадение лечебных зелий
						if (getChancePercent(REWARD.treasure.potions.healPotions.chance)) {
							const healPotions = consumables
								.filter(
									(item) =>
										item.subType ===
										INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE,
								)
								.map((item) => ({
									id: item.id,
									name: item.name as AllTypesReward,
									count: REWARD.treasure.potions.healPotions.count,
								}));

							treasureReward.push(...healPotions);
						}
						// Проверка на выпадение бафф-зелий
						if (getChancePercent(REWARD.treasure.potions.buffPotions.chance)) {
							const buffType = getRandomEnumValue(
								INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF,
							);
							const buffPotions = get().consumbles.filter(
								(element) => element.subType === buffType,
							);

							if (buffPotions.length > 0) {
								const randomBuffPotion =
									buffPotions[Math.floor(Math.random() * buffPotions.length)];
								treasureReward.push({
									id: randomBuffPotion.id,
									name: randomBuffPotion.name as AllTypesReward,
									count: REWARD.treasure.potions.buffPotions.count,
								});
							}
						}
						// Проверка на выпадение валюты
						if (getChancePercent(REWARD.treasure.currency.chance)) {
							const gold = consumables
								.filter(
									(item) =>
										item.subType ===
										INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.GOLD,
								)
								.map((item) => ({
									id: item.id,
									name: item.name as AllTypesReward,
									count: REWARD.treasure.currency.count,
								}));

							treasureReward.push(...gold);
						}
						return treasureReward;
					}

					case REWARD_VARIANT.GOLD_TREASURE:
						break;
					case REWARD_VARIANT.MONSTER:
						const monsterReward: RewardTypeReturn[] = [];
						const consumables = get().consumbles;
						const weapons = get().weapons;
						const armors = get().armors;
						if (getChancePercent(REWARD.monsters.weapon.chance)) {
							const weaponType = getRandomEnumValue(
								INVENTORY_ITEM_WEAPON_SUBTYPE,
							);
							const weapon = weapons.filter(
								(item) => item.subType === weaponType,
							);
							if (weapon.length > 0) {
								const randomWeapon =
									weapon[Math.floor(Math.random() * weapon.length)];
								monsterReward.push({
									id: randomWeapon.id,
									name: randomWeapon.name as AllTypesReward,
									count: REWARD.monsters.weapon.count,
								});
							}
						}
						if (getChancePercent(REWARD.monsters.armor.chance)) {
							const armorType = getRandomEnumValue(
								INVENTORY_ITEM_ARMOR_SUBTYPE,
							);
							const armor = armors.filter((item) => item.subType === armorType);
							if (armor.length > 0) {
								const randomArmor =
									armor[Math.floor(Math.random() * armor.length)];
								monsterReward.push({
									id: randomArmor.id,
									name: randomArmor.name as AllTypesReward,
									count: REWARD.monsters.armor.count,
								});
							}
						}

						if (getChancePercent(REWARD.monsters.keys.chance)) {
							const keys = consumables
								.filter(
									(item) =>
										item.subType ===
										INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS.TREASURE,
								)
								.map((item) => ({
									id: item.id,
									name: item.name as AllTypesReward,
									count: REWARD.monsters.keys.count,
								}));
							monsterReward.push(...keys);
						}
						if (getChancePercent(REWARD.monsters.currency.chance)) {
							const monsterFangs = consumables
								.filter(
									(item) =>
										item.subType ===
										INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.FANG_MONSTERS,
								)
								.map((item) => ({
									id: item.id,
									name: item.name as AllTypesReward,
									count: REWARD.monsters.currency.count,
								}));
							monsterReward.push(...monsterFangs);
						}
						return monsterReward;
					case REWARD_VARIANT.BOSS:
						break;
					case REWARD_VARIANT.DUNGEON:
						break;
					default:
						break;
				}

				return reward;
			},
		}),
		{
			name: 'items-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
