import { day4input } from './day4-input.js';

const testInput = `Card   1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card   2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card   3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card   4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card   5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card   6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const lines = day4input.split('\n');

const instances = Array.from(Array(lines.length), () => [1]);

let sum = 0;
lines.forEach((line, lineIndex) => {
	const card = line.slice(10).split('|');
	const winningNumbers = card[0].split(' ').filter((number) => number !== '');
	const playerNumbers = card[1].split(' ').filter((number) => number !== '');
	// console.log(line);
	const wonNumbers = winningNumbers.filter((num) =>
		playerNumbers.includes(num)
	);

	const noOfCopies = wonNumbers.length;

	for (let i = 1; i <= noOfCopies; i++) {
		instances[lineIndex + i][0] += instances[lineIndex][0];
	}

	sum += instances[lineIndex][0];
});

console.log(sum);
