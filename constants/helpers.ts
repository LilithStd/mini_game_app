import {GLOBAL_APP_PATH} from './global_path';

export const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getChancePercent = (percent: number): boolean => {
	return Math.random() * 100 < percent;
};

export function getRandomEnumValue<T extends Record<string, string | number>>(
	enumObj: T,
): T[keyof T] {
	const values = Object.values(enumObj) as T[keyof T][];
	return values[Math.floor(Math.random() * values.length)];
}

export const getValidPath = (
	path: string,
): keyof typeof GLOBAL_APP_PATH | null => {
	const validPaths = Object.keys(GLOBAL_APP_PATH) as Array<
		keyof typeof GLOBAL_APP_PATH
	>;
	const foundPath = validPaths.find((key) => GLOBAL_APP_PATH[key] === path);
	return foundPath || null;
};
