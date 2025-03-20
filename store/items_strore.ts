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
import {getChancePercent} from '@/constants/helpers';

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

interface ConsumableType<
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
}

interface TreasureRewards {
	potions?: {
		healPotions?: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE;
			chance: number;
			count: number;
		};
		buffPotions?: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF;
			chance: number;
			count: number;
		};
	};
	currency?: {
		name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.GOLD;
		chance: number;
		count: number;
	};
}

interface GoldTreasureRewards {
	potions: {
		healPotions: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE;
			chance: number;
			count: number;
		};
		buffPotions: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF;
			chance: number;
			count: number;
		};
	};
	currency: {
		name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.GOLD;
		chance: number;
		count: number;
	};
	armor: {
		name: INVENTORY_ITEM_ARMOR_SUBTYPE;
		chance: number;
		count: number;
	};
	weapon: {
		name: INVENTORY_ITEM_WEAPON_SUBTYPE;
		chance: number;
		count: number;
	};
}

interface MonsterRewards {
	currency: {
		name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.FANG_MONSTERS;
		chance: number;
		count: number;
	};
	keys: {
		name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS.TREASURE;
		chance: number;
		count: number;
	};
	armor: {
		name: INVENTORY_ITEM_ARMOR_SUBTYPE;
		chance: number;
		count: number;
	};
	weapon: {
		name: INVENTORY_ITEM_WEAPON_SUBTYPE;
		chance: number;
		count: number;
	};
}

interface BossRewards {
	potions: {
		healPotions: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE;
			chance: number;
			count: number;
		};
		buffPotions: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF;
			chance: number;
			count: number;
		};
	};
	keys: {
		dungeonKeys: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS.DUNGEON;
			chance: number;
			count: number;
		};
		treasueKeys: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS.TREASURE;
			chance: number;
			count: number;
		};
	};
	currency: {
		name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.FANG_MONSTERS;
		chance: number;
		count: number;
	};
	armor: {
		name: INVENTORY_ITEM_ARMOR_SUBTYPE;
		chance: number;
		count: number;
	};
	weapon: {
		name: INVENTORY_ITEM_WEAPON_SUBTYPE;
		chance: number;
		count: number;
	};
}

interface DungeonRewards {
	potions: {
		healPotions: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE;
			chance: number;
			count: number;
		};
		buffPotions: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF;
			chance: number;
			count: number;
		};
		escapePotions: {
			name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.ESCAPE_CHARACTER;
			chance: number;
			count: number;
		};
	};
	keys: {
		name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS.TREASURE;
		chance: number;
		count: number;
	};
	crystal: {
		name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL;
		chance: number;
		count: number;
	};
	currency: {
		name: INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.FANG_MONSTERS;
		chance: number;
		count: number;
	};
	armor: {
		name: INVENTORY_ITEM_ARMOR_SUBTYPE;
		chance: number;
		count: number;
	};
	weapon: {
		name: INVENTORY_ITEM_WEAPON_SUBTYPE;
		chance: number;
		count: number;
	};
}

type RewardAllTypes =
	| TreasureRewards
	| GoldTreasureRewards
	| MonsterRewards
	| BossRewards
	| DungeonRewards;

interface ItemsStoreInterface {
	weapons: WeaponType[];
	armors: ArmorType[];
	consumbles: ConsumableType[];
	rewardFindTreasure: [];
	getReward: (variant: REWARD_VARIANT) => RewardAllTypes[];
}

const CHANCE_PERCENT = {
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
};

export const useItemsStore = create<ItemsStoreInterface>()(
	persist(
		(set, get) => ({
			weapons: WEAPON as WeaponType[],
			armors: ARMOR as ArmorType[],
			consumbles: CONSUMBLES as ConsumableType[],
			rewardFindTreasure: [],
			getReward: (variant) => {
				const reward: RewardAllTypes[] = [];
				switch (variant) {
					case REWARD_VARIANT.TREASURE:
						const treasureReward = [];
						if (getChancePercent(REWARD.treasure.potions.healPotions.chance)) {
							const healPotions = get().consumbles.filter(
								(element) =>
									element.subType ===
									INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE,
							);

							treasureReward.push(...healPotions);
						}
						if (getChancePercent(REWARD.treasure.potions.buffPotions.chance)) {
							const buffPotions = get().consumbles.filter(
								(element) =>
									element.subType ===
									INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.BUFF_CHARACTER,
							);
							treasureReward.push(...buffPotions);
						}

						if (getChancePercent(REWARD.treasure.currency.chance)) {
							const currency = get().consumbles.filter(
								(element) =>
									element.subType ===
									INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY.GOLD,
							);
							treasureReward.push(...currency);
						}
						return [...treasureReward];
						break;
					case REWARD_VARIANT.GOLD_TREASURE:
						break;
					case REWARD_VARIANT.MONSTER:
						break;
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
