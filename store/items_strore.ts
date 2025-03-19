import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {
	INVENTORY_ITEM_ARMOR_SUBTYPE,
	INVENTORY_ITEM_CONSUMBLES_TYPE,
	INVENTORY_ITEM_TYPE,
	INVENTORY_ITEM_WEAPON_SUBTYPE,
} from './character_store';
import {WEAPON} from '@/constants/store/items/weapons';
import {ARMOR} from '@/constants/store/items/armors';
import {CONSUMBLES} from '@/constants/store/items/consumbles';

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

// Расходники
interface Stats {
	attack?: number;
	defense?: number;
	evasion?: number;
	healPotion?: number;
}

interface ConsumableType
	extends BaseItemsType<
		INVENTORY_ITEM_TYPE.CONSUMBLES,
		INVENTORY_ITEM_CONSUMBLES_TYPE
	> {
	stats?: Stats;
}

export interface ItemsStoreInterface {
	weapons: WeaponType[];
	armors: ArmorType[];
	consumbles: ConsumableType[];
	rewardFindTreasure: [];
}

export const useItemsStore = create<ItemsStoreInterface>()(
	persist(
		(set, get) => ({
			weapons: WEAPON as WeaponType[],
			armors: ARMOR as ArmorType[],
			consumbles: [],
			rewardFindTreasure: [],
		}),
		{
			name: 'items-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
