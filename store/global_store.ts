import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GlobalStoreInterface {}

export const useGlobalStore = create<GlobalStoreInterface>()(
	persist((set, get) => ({}), {
		name: 'global-storage',
		storage: createJSONStorage(() => AsyncStorage),
	}),
);
