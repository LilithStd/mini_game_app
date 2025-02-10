import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Character = {
	CHARACTER_1: require('../assets/character/character_0'),
	CHARACTER_2: require('../assets/character/character_1'),
	CHARACTER_3: require('../assets/character/character_2'),
};

type Character_Type = {
	name: string;
	model: number | null;
	level: number;
};

export enum UPDATE_CHARACTER_STATS {
	NAME = 'name',
	MODEL = 'model',
	LEVEL = 'level',
	ALL = 'all',
}

export interface CharacterStoreInterface {
	character_stats: Character_Type;
	updateCharacter: <K extends UPDATE_CHARACTER_STATS>(
		key: K,
		value: K extends UPDATE_CHARACTER_STATS.ALL
			? Partial<Character_Type>
			: K extends keyof Character_Type
			? Character_Type[K]
			: never,
	) => void;
}

export const useCharacterStore = create<CharacterStoreInterface>()(
	persist(
		(set, get) => ({
			character_stats: {
				name: '',
				model: null,
				level: 1,
			},
			updateCharacter: (key, value) => {
				switch (key) {
					case UPDATE_CHARACTER_STATS.NAME:
						set({
							character_stats: {
								...get().character_stats,
								name: value as string,
							},
						});
						break;
					case UPDATE_CHARACTER_STATS.MODEL:
						set({
							character_stats: {
								...get().character_stats,
								model: value as number | null,
							},
						});
						break;
					case UPDATE_CHARACTER_STATS.LEVEL:
						set({
							character_stats: {
								...get().character_stats,
								level: value as number,
							},
						});
						break;
					case UPDATE_CHARACTER_STATS.ALL:
						set({
							character_stats: {
								...get().character_stats,
								...(value as Partial<Character_Type>),
							},
						});
						break;
					default:
						const _exhaustiveCheck: never = key;
						return _exhaustiveCheck;
				}
			},
		}),
		{
			name: 'character-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
