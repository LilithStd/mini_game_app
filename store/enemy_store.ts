import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCATIONS_GROUP} from './location_store';

interface EnemyTypeOld {
	name: string;
	model: number;
	preview: number;
	stats: EnemyStats;
}
interface EnemyType {
	name: string;
	model: number;
	stats: EnemyStats;
}

interface BossType {
	name: string;
	model: number;
	stage: BOSS_STAGE;
	stats: BossStats;
}

export const enum BOSS_STAGE {
	DEFAULT = 'DEFAULT',
	FIRST = 'FIRST',
	SECOND = 'SECOND',
	THIRD = 'THIRD',
	FOURTH = 'FOURTH',
	FIVE = 'FIVE',
	FINISH = 'FINISH',
}

interface EnemyContentType extends EnemyTypeOld {
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

interface BossStats {
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

const bossStats = {
	level: 1,
	attack: 30,
	defense: 50,
	accuracy: 5,
	criticalRate: 3,
	criticalDamage: 42,
	evasion: 2,
	reduceCriticalDamage: 0,
	atribute: 'dark',
	resistAtribute: 'dark',
	healPoints: 500,
	expirience: 400,
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

const ENEMY_CONTENT_OLD = [
	{
		name: 'enemy_00',
		model: require('../assets/enemy/monsters/monster_00.jpg'),
		stats: defaultStats,
	},
	{
		name: 'enemy_01',
		model: require('../assets/enemy/monsters/monster_01.jpg'),
		stats: defaultStats,
	},
	{
		name: 'enemy_02',
		model: require('../assets/enemy/monsters/monster_02.jpg'),
		stats: defaultStats,
	},
	{
		name: 'enemy_03',
		model: require('../assets/enemy/monsters/monster_03.jpg'),
		stats: defaultStats,
	},
	{
		name: 'enemy_04',
		model: require('../assets/enemy/monsters/monster_04.jpg'),
		stats: defaultStats,
	},
	{
		name: 'enemy_05',
		model: require('../assets/enemy/monsters/monster_05.jpg'),
		stats: defaultStats,
	},
	{
		name: 'enemy_06',
		model: require('../assets/enemy/monsters/monster_06.jpg'),
		stats: defaultStats,
	},
];

const BOSS_CONTENT = [
	{
		name: 'first boss',
		model: require('../assets/enemy/boss/boss_00.jpg'),
		stats: bossStats,
		stage: BOSS_STAGE.FIRST,
	},
];

export interface EnemyStoreInterface {
	defaultState: true;
	enemyPull: EnemyType[];
	bossPull: BossType[];
	currentEnemy: EnemyType | BossType;
	getCurrentBoss: (stage: BOSS_STAGE) => BossType;
	setCurrentEnemy: (currentEnemy: EnemyType | BossType) => void;
	setDefaultState: () => void;
	getRandomEnemyForBattle: (location: string) => void;
	// getEnemyPullForLocations: (location: string) => EnemyTypeOld[];
}

const default_enemy = {
	name: '',
	model: 0,
	preview: 0,
	stats: defaultStats,
};

const default_boss = {
	name: '',
	model: 0,
	stage: BOSS_STAGE.DEFAULT,
	stats: defaultStats,
};

// Zustand-хранилище
export const useEnemyStore = create<EnemyStoreInterface>()(
	persist(
		(set, get) => ({
			defaultState: true,
			enemyPull: ENEMY_CONTENT,
			bossPull: BOSS_CONTENT,
			currentEnemy: default_enemy,
			getCurrentBoss: (stage) => {
				const currentBoss = get().bossPull.find((item) => item.stage === stage);

				return currentBoss ? currentBoss : default_boss;
			},

			setCurrentEnemy: (currentEnemy) => {
				set({currentEnemy: currentEnemy});
			},
			setDefaultState: () => {
				set({
					defaultState: true,
					enemyPull: ENEMY_CONTENT,
					currentEnemy: default_enemy,
					bossPull: BOSS_CONTENT,
				});
			},
			getRandomEnemyForBattle: (location) => {
				// const enemies = get().getEnemyPullForLocations(location);
				const enemies = get().enemyPull;
				if (enemies.length === 0) {
					return null; // Возвращаем null, если врагов нет
				}
				const currentEnemey =
					enemies[Math.floor(Math.random() * enemies.length)];
				get().setCurrentEnemy(currentEnemey);
			},
			// getEnemyPullForLocations: (location) => {
			// 	return get().enemyPull.filter((item) =>
			// 		item.locations.some((locations) => locations === location),
			// 	);
			// },
		}),
		{
			name: 'enemy-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
