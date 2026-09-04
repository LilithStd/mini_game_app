import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { EnemyStats, EnemyType, BossType } from '../enemy/enemy_store_types';
import { getRandomEnumValue } from '@/constants/helpers';

interface CharacterStats {
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
	itemsSkills: string[];
	healPoints: { 
		current: number; 
		max: number; 
	};
	death: boolean;
}

// interface EnemyStats {
// 	level: number;
// 	attack: number;
// 	defense: number;
// 	accuracy: number;
// 	criticalRate: number;
// 	criticalDamage: number;
// 	evasion: number;
// 	reduceCriticalDamage: number;
// 	atribute: string;
// 	resistAtribute: string;
// 	healPoints: number;
// 	expirience: number;
// 	death: boolean;
// }

export enum INCOMING_STATUS {
	ATTACK = 'attack',
	ITEM = 'item',
	// DEFAULT = 'default',
}

export enum ENEMY_ACTION_TYPE {
	ATTACK = 'attack',
	DEFENSE = 'defense',
	EVADE = 'evade',
	ESCAPE = 'escape',
	SKILL = 'skill',
	// DEFAULT = 'default',
}

const DEFENSE_MULTIPLIER = 1.5;


export enum STATUS_BATTLE_SCREEN {
	DEFAULT = 'default',
	BOSS_BATTLE = 'boss_battle',
	MONSTER_BATTLE = 'monster_battle',
	STORY_BATTLE = 'story_battle',
}

export interface BattleStoreInterface {
	battleStatus: STATUS_BATTLE_SCREEN;
	character: CharacterStats;
	isActiveTurn: boolean;
	isInitialized: boolean;
	enemy: EnemyType | BossType;
	totalDamage: {
		character: number;
		enemy: number;
	};
	phaseBattle:PHASE_STATUS;
	attack:() => void;
	defense:() => void;
	escape:() => void;
	startBattle: (character: CharacterStats, enemy: EnemyType | BossType) => void;
	setPhaseBattle: (phase: PHASE_STATUS) => void;
	enemyAttack: (type: ENEMY_ACTION_TYPE) => void;
	setCharacterStats: (stats: CharacterStats) => void;
	setEnemyStats: (stats: EnemyType | BossType) => void;
	setBattleStatus: (status: STATUS_BATTLE_SCREEN) => void;
	setDefaultState: () => void;
	currentBuffAndDebuff: {
		character: string[];
		enemy: string[];
	};
	setCurrentBuffAndDebuff: (status: string) => void;
	// updateCharacterStats: (
	// 	updateRequest: {
	// 		updateCurrentStats: UPDATE_STATS;
	// 		incomingStatus: INCOMING_STATUS;
	// 	},
	// 	updateValue: number | CharacterStats,
	// ) => void;
	// updateEnemyStats: (
	// 	updateRequest: UPDATE_STATS,
	// 	updateValue: number | EnemyType | BossType,
	// ) => void;
}

export enum UPDATE_STATS {
	ATTACK = 'attack',
	DEFENSE = 'defense',
	HP = 'healPoints',
	LEVEL = 'level',
	ALL = 'all',
}

export enum PHASE_STATUS {
	PLAYER_TURN = 'player_turn',
	ENEMY_TURN = 'enemy_turn',
	PLAYER_ACTION = 'player_action',
	ENEMY_ACTION = 'enemy_action',
	DEFAULT = 'default',
}

export enum ACTIONS {
	ATTACK = 'attack',
	DEFENSE = 'defense',
	STAND = 'stand',
	ITEMS = 'items',
	RETREAT = 'retreat',
	// DEFAULT = 'default',
}

const defaultValues: CharacterStats = {
	level: 1,
	attack: 0,
	defense: 0,
	accuracy: 0,
	criticalRate: 0,
	criticalDamage: 0,
	evasion: 0,
	reduceCriticalDamage: 0,
	atribute: '',
	resistAtribute: '',
	itemsSkills: [],
	healPoints: { current: 100, max: 100 },
	death: false,
};
const defaultValuesEnemy: EnemyType = {
	name: 'default_enemy',
	model: 0,
	stats: {
		level: 1,
		attack: 0,
		defense: 0,
		accuracy: 0,
		criticalRate: 0,
		criticalDamage: 0,
		evasion: 0,
		reduceCriticalDamage: 0,
		atribute: '',
		resistAtribute: '',
		expirience: 0,
		healPoints: { current: 100, max: 100 },
		death: false,
	},
};

export const useBattleStore = create<BattleStoreInterface>()(
	persist(
		(set, get) => ({
			battleStatus: STATUS_BATTLE_SCREEN.DEFAULT,
			totalDamage: {
				character: 0,
				enemy: 0,
			},
			isInitialized: false,
			phaseBattle: PHASE_STATUS.DEFAULT,
			isActiveTurn: false,
			character: {...defaultValues},
			enemy: {...defaultValuesEnemy},
			startBattle: (character, enemy) => {
				set({
					character: character,
					enemy: enemy,
					phaseBattle: PHASE_STATUS.PLAYER_TURN,
					isInitialized: true,
				});
			},
			setPhaseBattle: (phase) => set({phaseBattle: phase}),
			setCharacterStats: (stats) => set({character: stats}),
			setEnemyStats: (stats) => set({enemy: stats}),
			currentBuffAndDebuff: {
				character: [],
				enemy: [],
			},
			attack: () => {
				const { phaseBattle, enemy, character } = get();
				if (phaseBattle !== PHASE_STATUS .PLAYER_TURN) return;

				const newHP = Math.max(
					0,
					enemy.stats.healPoints.current - character.attack
				);

				set({
					enemy: {
						...enemy,
						stats: {
							...enemy.stats,
							healPoints: { current: newHP, max: enemy.stats.healPoints.max },
							death: newHP <= 0,
						}
					},
					totalDamage: {
						...get().totalDamage,
						character: get().totalDamage.character + (character.attack - newHP > 0 ? character.attack - newHP : 0),
					},
					phaseBattle: newHP <= 0
						? PHASE_STATUS.DEFAULT
						: PHASE_STATUS.ENEMY_TURN
				});
				if (newHP <= 0) return;

				setTimeout(() => {
				get().enemyAttack(ENEMY_ACTION_TYPE.ATTACK);

			}, 700);

				console.log(`Enemy HP after attack: ${newHP}`);
			},
			defense: () => {
				const { phaseBattle, character } = get();

				if (phaseBattle !== PHASE_STATUS.PLAYER_TURN) return;

				const newDefense = character.defense * DEFENSE_MULTIPLIER;

				set({
					character: {
						...character,
						defense: newDefense,
					}
				});
			},
			escape: () => {},
			enemyAttack: (type) => {
				const { phaseBattle } = get();
				if (phaseBattle !== PHASE_STATUS.ENEMY_TURN) return;
				const action = getRandomEnumValue(ENEMY_ACTION_TYPE);
				const enemyActionType = type ?? action;
				
				switch (enemyActionType) {
					case ENEMY_ACTION_TYPE.ATTACK:
						const { enemy, character } = get();
						const newHP = Math.max(
							0,
							character.healPoints.current - enemy.stats.attack
						);

						set({
							character: {
								...character,
								healPoints: { current: newHP, max: character.healPoints.max },
								death: newHP <= 0,
							},
							phaseBattle: newHP <= 0
								? PHASE_STATUS.DEFAULT
								: PHASE_STATUS.PLAYER_TURN
						});
						set({
							totalDamage: {
								...get().totalDamage,
								enemy: get().totalDamage.enemy + (enemy.stats.attack - newHP > 0 ? enemy.stats.attack - newHP : 0),
							},
						});
						break;
						case ENEMY_ACTION_TYPE.DEFENSE:
							// Implement enemy defense logic here
						break;
						case ENEMY_ACTION_TYPE.EVADE:
							// Implement enemy evasion logic here
						break;
						case ENEMY_ACTION_TYPE.ESCAPE:
							// Implement enemy escape logic here
						break;
				}
			},
			setBattleStatus: (status) => {
				if (get().battleStatus !== status) {
					set({battleStatus: status});
				}
			},
			setCurrentBuffAndDebuff: (status) => {},
			setDefaultState: () => {
				AsyncStorage.removeItem('battle-storage').then(() => {
					console.log('battle store reset');
				});
				set({
					character: {...defaultValues},
					enemy: {...defaultValuesEnemy},
					phaseBattle: PHASE_STATUS.DEFAULT,
					totalDamage: {
						character: 0,
						enemy: 0,
					},
				});
			},
		}),
		{
			name: 'battle-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
