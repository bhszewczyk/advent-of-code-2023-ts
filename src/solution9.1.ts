const parseInput = (input: string): number[][] => {
	const values = input
		.split('\n')
		.map((line) => line.split(' '))
		.map((line) => line.map((string) => parseInt(string)));

	return values;
};

const getDistinction = (array: number[]) => {
	let history = array;
	let sum = 0;

	do {
		sum += history[history.length - 1];
		history = history.map((number, i) => {
			if (i < history.length) {
				return history[i + 1] - number;
			}
		});
		history = history.filter((num) => !isNaN(num));
	} while (Array.from(new Set(history)).length >= 1);

	return sum;
};

export const solution9part1 = (input: string) => {
	const values = parseInput(input);

	const result = values.reduce((prev, curr): number => {
		return (prev += getDistinction(curr));
	}, 0);

	return result;
};
