import { BOSS_STAGE } from '../enemy_store';

export type EnemyType = {
	name: string;
	model: number;
	stats: EnemyStats;
}

export type EnemyStats =  {
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

export type BossType = {
	name: string;
	model: number;
	stage: BOSS_STAGE;
	stats: BossStats;
}

export type BossStats = {
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