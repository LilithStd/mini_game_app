import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
type CharacterType = {
	name: string;
	model: string;
	level: number;
};

export interface CharacterStoreInterface {
	character: CharacterType;
}
const default_character = {
	name: '',
	model: '',
	level: 1,
};
// Zustand-хранилище
export const useCharacterStore = create<CharacterStoreInterface>()(
	persist(
		(set, get) => ({
			character: default_character,
		}),
		{
			name: 'character-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
