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

const symbols = ['+', '&', '/', '%', '#', '$', '*', '=', '-', '@'];
const lines = day3input.split('\n');

let sum = 0;

lines.forEach((line, lineIndex) => {
	let partNum = '';
	let end = false;
	let validPartNum = false;

	[...line].forEach((chara, indexChara) => {
		let valid = false;
		if (end) {
			partNum = '';
			end = false;
			validPartNum = false;
		}
		if (chara !== '.') {
			valid = true;
		}

		let surrouding = {
			field1: null,
			field2: null,
			field3: null,
			field4: null,
			field6: null,
			field7: null,
			field8: null,
			field9: null,
		};

		if (![...symbols].includes(chara)) {
			if (lineIndex > 0) {
				if (indexChara > 0) {
					surrouding.field1 = [...lines[lineIndex - 1]][indexChara - 1];
				}
				surrouding.field2 = [...lines[lineIndex - 1]][indexChara];
				if (indexChara < line.length)
					surrouding.field3 = [...lines[lineIndex - 1]][indexChara + 1];
			}
			if (indexChara > 0) {
				surrouding.field4 = [...lines[lineIndex]][indexChara - 1];
			}
			if (indexChara < line.length) {
				surrouding.field6 = [...lines[lineIndex]][indexChara + 1];
			}

			if (lineIndex < lines.length - 1) {
				if (indexChara > 0) {
					surrouding.field7 = [...lines[lineIndex + 1]][indexChara - 1];
				}
				surrouding.field8 = [...lines[lineIndex + 1]][indexChara];
				if (indexChara < line.length) {
					surrouding.field9 = [...lines[lineIndex + 1]][indexChara + 1];
				}
			}

			if (chara && valid) {
				partNum += chara;
			}

			if (
				chara !== '.' &&
				!symbols.includes(chara) &&
				(surrouding.field6 === '.' ||
					indexChara === line.length - 1 ||
					symbols.includes(surrouding.field6))
			) {
				end = true;
			}

			if (!validPartNum & valid) {
				validPartNum = Object.values(surrouding).some((value) =>
					symbols.includes(value)
				);
			}
		}

		if (end && !isNaN(parseInt(chara)) && validPartNum) {
			sum += parseInt(partNum);
		}
	});
});

console.log(sum);
