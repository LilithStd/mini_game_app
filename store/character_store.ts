import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Character = {
	CHARACTER_1: require('../assets/character/character_5.png'),
	CHARACTER_2: require('../assets/character/character_1.png'),
	CHARACTER_3: require('../assets/character/character_2.png'),
};

type Character_Type = {
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
	character_name: string;
	character_model: number;
	character_level: number;
	updateCharacter: (
		update_request: string,
		updated_value: any, // можно заменить на более точное объединение типов
	) => void;
}

export const useCharacterStore = create<CharacterStoreInterface>()(
	persist(
		(set, get) => ({
			character_name: '',
			character_level: 1,
			character_model: Character.CHARACTER_2,
			updateCharacter: (update_request, updated_value) => {
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
							character_level: level,
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
