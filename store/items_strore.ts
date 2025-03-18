import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {
	INVENTORY_ITEM_ARMOR_SUBTYPE,
	INVENTORY_ITEM_CONSUMBLES_SUBTYPE,
	INVENTORY_ITEM_TYPE,
	INVENTORY_ITEM_WEAPON_SUBTYPE,
} from './character_store';
import {weapons} from '@/constants/store/items/weapons';

export const rewards = [
	{
		id: '0',
		name: 'Золотая монета',
		value: 10,
		type: INVENTORY_ITEM_TYPE.CONSUMBLES,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE.CURRENCY,
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
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE.POTION,
	},
	{
		id: '3',
		name: 'Редкий кристалл',
		value: 2,
		type: INVENTORY_ITEM_TYPE.CONSUMBLES,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE.CRYSTAL,
	},
	{
		id: '4',
		name: 'Ключ от сундука',
		value: 1,
		type: INVENTORY_ITEM_TYPE.CONSUMBLES,
		subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE.KEY,
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

interface WeaponType {
	id: string;
	name: string;
	type: string;
	subType: string;
	description: string;
	stats: {
		attack: number;
		accuracy: number;
		criticalRate: number;
		criticalDamage: number;
		atribute: string;
		itemSkill: string;
	};
}

export interface ItemsStoreInterface {
	weaponItems: WeaponType[];
	armorItems: [];
	consumblesItems: [];
	rewardFindTreasure: [];
}

export const useEnemyStore = create<ItemsStoreInterface>()(
	persist(
		(set, get) => ({
			weaponItems: weapons,
			armorItems: [],
			consumblesItems: [],
			rewardFindTreasure: [],
		}),
		{
			name: 'items-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
