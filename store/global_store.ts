import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStoryStore} from './story_store';
import {useCharacterStore} from './character_store';
import {useEnemyStore} from './enemy_store';
import {useLocationStore} from './location_store';

export interface GlobalStoreInterface {
	newGame: boolean;
	setNewGame: () => void;
	setContinueGame: () => void;
}

export const useGlobalStore = create<GlobalStoreInterface>()(
	persist(
		(set, get) => ({
			newGame: true,
			setNewGame: () => {
				set({newGame: true});
				useStoryStore.getState().setDefaultState();
				useCharacterStore.getState().setDefaultState();
				useEnemyStore.getState().setDefaultState();
				useLocationStore.getState().setDefaultState();
			},
			setContinueGame: () => {
				set({newGame: false});
			},
		}),
		{
			name: 'global-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
