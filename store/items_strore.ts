import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export interface ItemsStoreInterface {
	weaponItems: [];
	armorItems: [];
	consumblesItems: [];
}

export const useEnemyStore = create<ItemsStoreInterface>()(
	persist(
		(set, get) => ({
			weaponItems: [],
			armorItems: [],
			consumblesItems: [],
		}),
		{
			name: 'items-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
