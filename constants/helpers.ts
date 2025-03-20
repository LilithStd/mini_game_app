export const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getChancePercent = (percent: number): boolean => {
	return Math.random() * 100 < percent;
};
