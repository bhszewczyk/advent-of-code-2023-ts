import { input } from './day1-input.js';

const testingInput = [
	'two1nine',
	'eightwothree',
	'abcone2threexyz',
	'xtwone3four',
	'4nineeightseven2',
	'zoneight234',
	'7pqrstsixteen',
	'twone',
	'seven',
];

const replacedInput = input.map((string) => {
	const newString = string
		.replaceAll('one', 'o1e')
		.replaceAll('two', 't2o')
		.replaceAll('three', 't3e')
		.replaceAll('four', 'f4r')
		.replaceAll('five', 'f5e')
		.replaceAll('six', 's6x')
		.replaceAll('seven', 's7n')
		.replaceAll('eight', 'e8t')
		.replaceAll('nine', 'n9e');

	return newString;
});

const sum = replacedInput.reduce((prev, curr) => {
	const regex = /\d/g;

	const digitsFound = curr.match(regex);
	const numberOfDigitsFound = digitsFound.length;

	const firstDigit = digitsFound[0];
	const lastDigit = digitsFound[numberOfDigitsFound - 1];

	const number = firstDigit + lastDigit;
	console.log(number);
	return prev + parseInt(number);
}, 0);

console.log(sum);

// below doesn't work
// const possibleDigitsInLetters = [
// 	'one',
// 	'two',
// 	'three',
// 	'four',
// 	'five',
// 	'six',
// 	'seven',
// 	'eight',
// 	'nine',
// ];
// const digitsInLettersJoined = possibleDigitsInLetters.join('|');

// const regex = new RegExp(`(?=(\\d|${digitsInLettersJoined}))`, 'g');

// const sum = testingInput.reduce((prev, curr) => {
// 	const startDigits = curr.match(firstRegex);
// 	const endDigits = curr.match(regex);

// 	let firstDigit = startDigits[0];
// 	let lastDigit = endDigits[0];

// 	if (possibleDigitsInLetters.includes(firstDigit)) {
// 		firstDigit = possibleDigitsInLetters.indexOf(firstDigit) + 1;
// 	}

// 	if (possibleDigitsInLetters.includes(lastDigit)) {
// 		lastDigit = possibleDigitsInLetters.indexOf(lastDigit) + 1;
// 	}
// 	console.log(firstDigit, lastDigit);

// 	const number = `${firstDigit}${lastDigit}`;
// 	console.log(prev, number);
// 	return prev + parseInt(number);
// }, 0);

// console.log(sum)
