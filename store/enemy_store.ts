import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCATIONS_GROUP} from './location_store';

interface EnemyTypePull {
	name: string;
	model: number;
}

interface EnemyType extends EnemyTypePull {
	level: number;
}

interface EnemyContentType extends EnemyTypePull {
	locations: string[];
}

const ENEMY_CONTENT = [
	{
		name: 'enemy_name_0',
		model: require('../assets/enemy/enemy_0.png'),
		locations: [LOCATIONS_GROUP.FOREST],
	},
	{
		name: 'enemy_name_1',
		model: require('../assets/enemy/enemy_1.png'),
		locations: [LOCATIONS_GROUP.FOREST],
	},
	{
		name: 'enemy_name_2',
		model: require('../assets/enemy/enemy_2.png'),
		locations: [LOCATIONS_GROUP.SWAMP],
	},
	{
		name: 'enemy_name_3',
		model: require('../assets/enemy/enemy_3.png'),
		locations: [LOCATIONS_GROUP.FOREST],
	},
	{
		name: 'enemy_name_4',
		model: require('../assets/enemy/enemy_4.png'),
		locations: [LOCATIONS_GROUP.FOREST, LOCATIONS_GROUP.SWAMP],
	},
	{
		name: 'enemy_name_5',
		model: require('../assets/enemy/enemy_5.png'),
		locations: [LOCATIONS_GROUP.SWAMP],
	},
	{
		name: 'enemy_name_6',
		model: require('../assets/enemy/enemy_6.png'),
		locations: [LOCATIONS_GROUP.FOREST, LOCATIONS_GROUP.SWAMP],
	},
	{
		name: 'enemy_name_7',
		model: require('../assets/enemy/enemy_7.png'),
		locations: [LOCATIONS_GROUP.FOREST],
	},
	{
		name: 'enemy_name_8',
		model: require('../assets/enemy/enemy_8.png'),
		locations: [LOCATIONS_GROUP.SWAMP],
	},
];

export interface EnemyStoreInterface {
	defaultState: true;
	enemyPull: EnemyContentType[];
	setDefaultState: () => void;
	getEnemyPullForLocations: (location: string) => EnemyTypePull[];
}

const default_enemy = {
	name: '',
	model: '',
	level: 1,
};

// Zustand-хранилище
export const useEnemyStore = create<EnemyStoreInterface>()(
	persist(
		(set, get) => ({
			defaultState: true,
			enemyPull: ENEMY_CONTENT,
			setDefaultState: () => {
				set({
					defaultState: true,
					enemyPull: ENEMY_CONTENT,
				});
			},
			getEnemyPullForLocations: (location) => {
				return get().enemyPull.filter((item) =>
					item.locations.some((locations) => locations === location),
				);
			},
		}),
		{
			name: 'enemy-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
