import { day3input } from './day3-input.js';

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const lines = day3input.split('\n');

let sum = 0;

lines.forEach((line, lineIndex) => {
	[...line].forEach((chara, indexChara) => {
		const gear = { index: null, numbers: [] };
		if (chara === '*') {
			// console.log(lineIndex, indexChara);
			gear.index = { row: lineIndex, column: indexChara };
		} else {
			return;
		}

		const surrouding = [
			{ row: lineIndex - 1, column: indexChara - 1 },
			{ row: lineIndex - 1, column: indexChara },
			{ row: lineIndex - 1, column: indexChara + 1 },
			{ row: lineIndex, column: indexChara - 1 },
			{ row: lineIndex, column: indexChara + 1 },
			{ row: lineIndex + 1, column: indexChara - 1 },
			{ row: lineIndex + 1, column: indexChara },
			{ row: lineIndex + 1, column: indexChara + 1 },
		];

		surrouding.forEach((neighbour) => {
			const { column, row } = neighbour;
			if (
				row >= 0 &&
				column >= 0 &&
				row < lines.length &&
				column < line.length
			) {
				const currentChara = lines[row][column];
				if (currentChara && currentChara.match(/\d/)) {
					let currentColumn = column;
					let startingColumn;
					while (lines[row][currentColumn].match(/\d/) && currentColumn > 0) {
						currentColumn--;
						startingColumn = currentColumn;
					}

					const cutString = lines[row].slice(startingColumn);
					const num = /(\d)+/.exec(cutString, startingColumn);

					gear.numbers.push(parseInt(num[0]));
				}
			}
		});
		const uniqueGearNumbers = [...new Set(gear.numbers)];
		if (uniqueGearNumbers.length === 2) {
			const power = uniqueGearNumbers[0] * [uniqueGearNumbers[1]];
			sum += power;
		}
	});
});

console.log(sum);
