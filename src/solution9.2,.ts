const parseInput = (input: string): number[][] => {
	const values = input
		.split('\n')
		.map((line) => line.split(' '))
		.map((line) => line.map((string) => parseInt(string)));

	return values;
};

const getFisrtValue = (array: number[]) => {
	let history = array;
	let savedHistory = [];

	do {
		savedHistory.push(history);
		history = history.map((number, i) => {
			if (i < history.length) {
				return history[i + 1] - number;
			}
		});
		history = history.filter((num) => !isNaN(num));
	} while (
		// Array.from(new Set(history)).length >= 1 &&
		Array.from(new Set(history)).some((num) => num !== 0)
	);

	let value = 0;

	for (let i = savedHistory.length - 1; i >= 0; i--) {
		// const pierwsza = savedHistory[i][0];
		value = savedHistory[i][0] - value;
	}

	return value;
};

export const solution9part2 = (input: string) => {
	const values = parseInput(input);

	const result = values.reduce((prev, curr): number => {
		return (prev += getFisrtValue(curr));
	}, 0);

	return result;
};
