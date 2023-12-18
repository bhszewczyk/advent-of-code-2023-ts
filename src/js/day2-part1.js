import { textDay2 } from './day2-input.js';
import { testingGames } from './day2-testInput.js';

const lines = textDay2.split('\n');

//check if game with 12 red cubes, 13 green cubes, and 14 blue cubes is possible
const finalGame = {
	red: 12,
	green: 13,
	blue: 14,
};

const regex = /\d+/g;

const sumOfIds = lines.reduce((prevSum, currLine) => {
	const indexIdEnd = currLine.indexOf(':');
	const gameNameAndNumber = currLine.substring(0, indexIdEnd);
	const oneRoundOfGames = currLine.substring(indexIdEnd + 2);
	const game = oneRoundOfGames.split('; ');
	let possible = true;
	game.forEach((currGame) => {
		const minigame = currGame.split(',');

		if (!possible) {
			return;
		}
		minigame.forEach((cube) => {
			if (cube.includes('red')) {
				const redCubes = parseInt(cube.match(regex));
				if (redCubes > finalGame.red) {
					possible = false;
				}
			}
			if (cube.includes('green')) {
				const greenCubes = parseInt(cube.match(regex));
				if (greenCubes > finalGame.green) {
					possible = false;
				}
			}
			if (cube.includes('blue')) {
				const blueCubes = parseInt(cube.match(regex));
				if (blueCubes > finalGame.blue) {
					possible = false;
				}
			}
		});
	});

	if (possible) {
		const gameId = gameNameAndNumber.replace('Game ', '');
		return prevSum + parseInt(gameId);
	}

	return prevSum;
}, 0);

console.log(sumOfIds);
