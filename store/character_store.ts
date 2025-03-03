import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Character_Default = require('../assets/character/character_8.png');

const Character = {
	CHARACTER_1: require('../assets/character/character_1.png'),
	CHARACTER_2: require('../assets/character/character_2.png'),
	CHARACTER_3: require('../assets/character/character_3.png'),
};

const count_character_in_pull = 3;

export type Character_Pull_Type = {
	name: string;
	model: number;
};

const Character_Pull: Character_Pull_Type[] = [
	{
		name: 'character_name_1',
		model: require('../assets/character/character_5.png'),
	},
	{
		name: 'character_name_2',
		model: require('../assets/character/character_1.png'),
	},
	{
		name: 'character_name_1',
		model: require('../assets/character/character_2.png'),
	},
];

export type Character_Type = {
	name: string;
	model: number;
	level: number;
};

export enum UPDATE_CHARACTER_STATS {
	NAME = 'name',
	MODEL = 'model',
	LEVEL = 'level',
	ALL = 'all',
}

// Обратите внимание, что типы параметров updateCharacter можно уточнить
// Например, можно использовать объединённые типы или перегрузки, но для простоты здесь применяем тип any для второго параметра.
export interface CharacterStoreInterface {
	default_state: boolean;
	character_pull: Character_Pull_Type[];
	character_name: string;
	character_model: number;
	character_level: number;
	update_character: (
		update_request: string,
		updated_value: string | number | null | Character_Pull_Type, // можно заменить на более точное объединение типов
	) => void;
	setDefaultState: () => void;
	choose_character_pull: () => Character_Pull_Type[];
}

export const useCharacterStore = create<CharacterStoreInterface>()(
	persist(
		(set, get) => ({
			default_state: true,
			character_pull: Character_Pull,
			character_name: '',
			character_level: 1,
			character_model: 0,
			choose_character_pull: () => {
				if (count_character_in_pull > Character_Pull.length) {
					throw new Error(
						'Запрашиваемое количество элементов превышает размер исходного массива.',
					);
				}

				const arrayCopy = [...Character_Pull];

				// Fisher-Yates Shuffle (перемешивание за O(n))
				for (let i = arrayCopy.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
				}

				return arrayCopy.slice(0, count_character_in_pull);
			},
			setDefaultState: () => {
				set({
					default_state: true,
					character_name: '',
					character_level: 1,
					character_model: 0,
					character_pull: [],
				});
			},
			update_character: (update_request, updated_value) => {
				switch (update_request) {
					case UPDATE_CHARACTER_STATS.NAME:
						// Обновляем только имя персонажа
						set({character_name: updated_value as string});
						break;
					case UPDATE_CHARACTER_STATS.MODEL:
						// Обновляем модель персонажа
						set({character_model: updated_value as number});
						break;
					case UPDATE_CHARACTER_STATS.LEVEL:
						// Обновляем уровень персонажа
						set({character_level: updated_value as number});
						break;
					case UPDATE_CHARACTER_STATS.ALL:
						// Обновляем все характеристики сразу.
						// Ожидается, что updated_value имеет тип Character_Type
						const {name, model, level} = updated_value as Character_Type;
						set({
							character_name: name,
							character_model: model,
							// character_level: level,
							default_state: false,
						});
						break;
					default:
						console.warn(
							`Неподдерживаемый запрос обновления: ${update_request}`,
						);
				}
			},
		}),
		{
			name: 'character-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
