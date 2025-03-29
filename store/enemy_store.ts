import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCATIONS_GROUP} from './location_store';

interface EnemyTypePull {
	name: string;
	model: number;
	preview: number;
	stats: EnemyStats;
}

interface EnemyType extends EnemyTypePull {
	level: number;
}

interface EnemyContentType extends EnemyTypePull {
	locations: string[];
}

interface EnemyStats {
	level: number;
	attack: number;
	defense: number;
	accuracy: number;
	criticalRate: number;
	criticalDamage: number;
	evasion: number;
	reduceCriticalDamage: number;
	atribute: string;
	resistAtribute: string;
	healPoints: number;
	expirience: number;
	death: boolean;
}

const defaultStats = {
	level: 1,
	attack: 21,
	defense: 36,
	accuracy: 5,
	criticalRate: 3,
	criticalDamage: 42,
	evasion: 2,
	reduceCriticalDamage: 0,
	atribute: 'dark',
	resistAtribute: 'dark',
	healPoints: 260,
	expirience: 140,
	death: false,
};

const ENEMY_CONTENT = [
	{
		name: 'enemy_name_0',
		model: require('../assets/enemy/enemy_0.png'),
		preview: require('../assets/enemy/preview/enemy_0_preview.png'),
		stats: defaultStats,
		locations: [LOCATIONS_GROUP.FOREST],
	},
	{
		name: 'enemy_name_1',
		model: require('../assets/enemy/enemy_1.png'),
		preview: require('../assets/enemy/preview/enemy_1_preview.png'),
		stats: defaultStats,
		locations: [LOCATIONS_GROUP.FOREST],
	},
	{
		name: 'enemy_name_2',
		model: require('../assets/enemy/enemy_2.png'),
		preview: require('../assets/enemy/preview/enemy_2_preview.png'),
		stats: defaultStats,
		locations: [LOCATIONS_GROUP.SWAMP],
	},
	{
		name: 'enemy_name_3',
		model: require('../assets/enemy/enemy_3.png'),
		preview: require('../assets/enemy/preview/enemy_3_preview.png'),
		stats: defaultStats,
		locations: [LOCATIONS_GROUP.FOREST],
	},
	{
		name: 'enemy_name_4',
		model: require('../assets/enemy/enemy_4.png'),
		locations: [LOCATIONS_GROUP.FOREST, LOCATIONS_GROUP.SWAMP],
		stats: defaultStats,
		preview: require('../assets/enemy/preview/enemy_4_preview.png'),
	},
	{
		name: 'enemy_name_5',
		model: require('../assets/enemy/enemy_5.png'),
		preview: require('../assets/enemy/preview/enemy_5_preview.png'),
		stats: defaultStats,
		locations: [LOCATIONS_GROUP.SWAMP],
	},
	{
		name: 'enemy_name_6',
		model: require('../assets/enemy/enemy_6.png'),
		preview: require('../assets/enemy/preview/enemy_6_preview.png'),
		stats: defaultStats,
		locations: [LOCATIONS_GROUP.FOREST, LOCATIONS_GROUP.SWAMP],
	},
	{
		name: 'enemy_name_7',
		model: require('../assets/enemy/enemy_7.png'),
		preview: require('../assets/enemy/preview/enemy_7_preview.png'),
		stats: defaultStats,
		locations: [LOCATIONS_GROUP.FOREST],
	},
];

export interface EnemyStoreInterface {
	defaultState: true;
	enemyPull: EnemyContentType[];
	currentEnemy: EnemyTypePull;
	setCurrentEnemy: (currentEnemy: EnemyTypePull) => void;
	setDefaultState: () => void;
	getRandomEnemyForBattle: (location: string) => void;
	getEnemyPullForLocations: (location: string) => EnemyTypePull[];
}

const default_enemy = {
	name: '',
	model: 0,
	preview: 0,
	stats: defaultStats,
};

// Zustand-хранилище
export const useEnemyStore = create<EnemyStoreInterface>()(
	persist(
		(set, get) => ({
			defaultState: true,
			enemyPull: ENEMY_CONTENT,
			currentEnemy: default_enemy,
			setCurrentEnemy: (currentEnemy) => {
				set({currentEnemy: currentEnemy});
			},
			setDefaultState: () => {
				set({
					defaultState: true,
					enemyPull: ENEMY_CONTENT,
				});
			},
			getRandomEnemyForBattle: (location) => {
				const enemies = get().getEnemyPullForLocations(location);
				if (enemies.length === 0) {
					return null; // Возвращаем null, если врагов нет
				}
				const currentEnemey =
					enemies[Math.floor(Math.random() * enemies.length)];
				get().setCurrentEnemy(currentEnemey);
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
