import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type EnemyType = {
	name: string;
	model: string;
	level: number;
};

const ENEMY_CONTENT = [
	{
		name: 'enemy_name_0',
		model: require('../assets/enemy/enemy_0.png'),
	},
	{
		name: 'enemy_name_1',
		model: require('../assets/enemy/enemy_1.png'),
	},
	{
		name: 'enemy_name_2',
		model: require('../assets/enemy/enemy_2.png'),
	},
	{
		name: 'enemy_name_3',
		model: require('../assets/enemy/enemy_3.png'),
	},
	{
		name: 'enemy_name_4',
		model: require('../assets/enemy/enemy_4.png'),
	},
	{
		name: 'enemy_name_5',
		model: require('../assets/enemy/enemy_5.png'),
	},
	{
		name: 'enemy_name_6',
		model: require('../assets/enemy/enemy_6.png'),
	},
	{
		name: 'enemy_name_7',
		model: require('../assets/enemy/enemy_7.png'),
	},
];

export interface EnemyStoreInterface {
	enemy: EnemyType;
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
			enemy: default_enemy,
		}),
		{
			name: 'enemy-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
