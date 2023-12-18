type Race = {
	time: number;
	toBeat: number;
};

const getRaces = (input: string): Race[] => {
	const lines = input.split('\n');
	const times = lines[0].match(/\d+/g);
	const distances = lines[1].match(/\d+/g);

	const races = times.map((time, i) => {
		return { time: parseInt(time), toBeat: parseInt(distances[i]) };
	});

	return races;
};

const getNumberOfOptionsToWin = (race: Race) => {
	const { time, toBeat } = race;
	let options = 0;
	for (let i = 0; i <= time; i++) {
		if (i * (time - i) > toBeat) {
			options += 1;
		}
	}

	return options;
};

export const solution6part1 = (input: string): number => {
	const races = getRaces(input);

	const optionMultiplication = races.reduce((currResult, race): number => {
		const result = getNumberOfOptionsToWin(race);

		if (currResult === 0) {
			return result;
		}

		return currResult * result;
	}, 0);

	return optionMultiplication;
};
