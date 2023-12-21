const parseInput = (rawInput: string) => {
	const instructions = rawInput.split('\n')[0];
	const nodes = rawInput
		.split('\n')
		.slice(2)
		.map((line) => {
			return {
				element: line.slice(0, 3),
				L: line.slice(7, 10),
				R: line.slice(12, 15),
			};
		});

	return { instructions, nodes };
};

export const solution8part2 = (input: string) => {
	const { instructions, nodes } = parseInput(input);
	const instructionsCount = instructions.length;
	let currentNodes = nodes.filter((node) => node.element[2] === 'A');

	// console.log(instructions.length);

	const stepsForEachNode = currentNodes
		.map((element) => {
			let currNode = element;
			let steps = 0;
			let i = 0;
			while (steps === 0) {
				const direction = instructions[i % instructionsCount];
				const currElement = currNode[direction];
				if (currElement[2] === 'Z') {
					return i + 1;
				} else {
					currNode = nodes.find((node) => node.element === currElement);
					i += 1;
					continue;
				}
			}

			return steps;
		})
		.sort((a, b) => a - b);

	console.log(stepsForEachNode);

	const nnw = stepsForEachNode.reduce((prev, curr): number => {
		if (!prev) {
			return curr;
		}

		return getLcm(prev, curr);
	});

	return nnw;
};

// get greatest common divisor
const getGcd = (a: number, b: number): number => {
	return b === 0 ? a : getGcd(b, a % b);
};

// get lowest common multiple
const getLcm = (a: number, b: number) => {
	return (a * b) / getGcd(a, b);
};
