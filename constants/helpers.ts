export const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getChancePercent = (percent: number): boolean => {
	return Math.random() * 100 < percent;
};

export function getRandomEnumValue<T extends Record<string, string | number>>(
	enumObj: T,
): T[keyof T] {
	const values = Object.values(enumObj) as T[keyof T][]; // Получаем массив значений enum
	return values[Math.floor(Math.random() * values.length)];
}
