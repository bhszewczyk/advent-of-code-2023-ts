import { textDay2 } from './day2-input.js';

const power = textDay2.split('\n').reduce((previousPower, currentLine) => {
	const [game, cubeSets] = currentLine.split(': ');
	const conditions = { red: 0, green: 0, blue: 0 };

	cubeSets.split('; ').forEach((cubeSet) => {
		cubeSet.split(', ').forEach((cubeDraw) => {
			const [stringNumber, color] = cubeDraw.split(' ');
			const number = parseInt(stringNumber);
			if (conditions[color] === 0) {
				conditions[color] = number;
			} else if (number > conditions[color]) {
				conditions[color] = number;
			} else {
				//skip
			}
			return { ...conditions };
		});
	});

	const currentPower = conditions.red * conditions.green * conditions.blue;
	return previousPower + currentPower;
}, 0);

console.log(power);
