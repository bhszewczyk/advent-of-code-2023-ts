import { input } from './day1-input.js';
const testingInput = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

const sum = input.reduce((prev, curr) => {
	const regex = /\d/g;
	// const lastDigitTegex = /\d+/$;

	const digitsFound = curr.match(regex);
	const numberOfDigitsFound = digitsFound.length;

	const firstDigit = digitsFound[0];
	const lastDigit = digitsFound[numberOfDigitsFound - 1];

	const number = firstDigit + lastDigit;
	return prev + parseInt(number);
}, 0);

console.log(sum);
