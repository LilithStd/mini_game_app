import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStoryStore} from './story_store';
import {useCharacterStore} from './character_store';
import {useEnemyStore} from './enemy_store';
import {useLocationStore} from './location_store';
import {GLOBAL_APP_PATH} from '@/constants/global_path';
import {Href} from 'expo-router';
export type AppPath = (typeof GLOBAL_APP_PATH)[keyof typeof GLOBAL_APP_PATH];

export interface GlobalStoreInterface {
	newGame: boolean;
	currentState: Href;
	setNewGame: () => void;
	setContinueGame: () => void;
	setCurrentState: (currentState: Href) => void;
}

export const useGlobalStore = create<GlobalStoreInterface>()(
	persist(
		(set, get) => ({
			newGame: true,
			currentState: GLOBAL_APP_PATH.MAIN,
			setNewGame: () => {
				set({
					newGame: true,
					currentState: GLOBAL_APP_PATH.MAIN,
				});
				useStoryStore.getState().setDefaultState();
				useCharacterStore.getState().setDefaultState();
				useEnemyStore.getState().setDefaultState();
				useLocationStore.getState().setDefaultState();
			},
			setContinueGame: () => {
				set({newGame: false});
			},
			setCurrentState: (currentState) => {
				set({currentState: currentState});
			},
		}),
		{
			name: 'global-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
