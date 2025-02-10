import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GlobalStoreInterface {
	chapter: string;
	location: string;
}

export const useGlobalStore = create<GlobalStoreInterface>()(
	persist(
		(set, get) => ({
			chapter: 'origins',
			location: 'origins',
		}),
		{
			name: 'global-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
