type Race = {
	time: number;
	toBeat: number;
};

const retrieveRaceFromInput = (input: string): Race => {
	const lines = input.split('\n');
	const times = lines[0].match(/\d+/g);
	const distances = lines[1].match(/\d+/g);

	const time = parseInt(times.join(''));
	const distance = parseInt(distances.join(''));

	return { time, toBeat: distance };
};

export const solution6part2 = (input: string): number => {
	const { time, toBeat } = retrieveRaceFromInput(input);

	// record should be hold x (time - hold) =>
	// record = (- hold)^2 + hold x time - toBeat = 0
	// ax^2 + bx = c = 0
	// from aboce: a = 1, b = time, c = toBeat

	// delta = b^2 - 4ac
	const delta = Math.pow(time, 2) - 4 * toBeat;

	// x1 => (-b - sqrt(delta)) / 2a
	const x1 = (-time - Math.sqrt(delta)) / 2;

	// x12 => (-b + sqrt(delta)) / 2a
	const x2 = (-time + Math.sqrt(delta)) / 2;

	// we need to exceed toBeat, so Math.ceil
	return Math.ceil(x2 - x1);
};
