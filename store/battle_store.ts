import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BattleStoreInterface {
	total_damage: number;
}

// Zustand-хранилище
export const useBattleStore = create<BattleStoreInterface>()(
	persist(
		(set, get) => ({
			total_damage: 0,
		}),
		{
			name: 'battle-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
