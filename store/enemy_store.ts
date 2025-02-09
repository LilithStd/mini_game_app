import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
type EnemyType = {
	name: string;
	model: string;
	level: number;
};

export interface CharacterStoreInterface {
	enemy: EnemyType;
}

const default_enemy = {
	name: '',
	model: '',
	level: 1,
};

// Zustand-хранилище
export const useCharacterStore = create<CharacterStoreInterface>()(
	persist(
		(set, get) => ({
			enemy: default_enemy,
		}),
		{
			name: 'enemy-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
