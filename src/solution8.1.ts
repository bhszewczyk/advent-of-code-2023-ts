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

export const solution8part1 = (input: string) => {
	const { instructions, nodes } = parseInput(input);
	const instructionsCount = instructions.length;
	let currentNode = nodes.find((node) => node.element === 'AAA');
	let currElement;
	let steps = 0;
	let i = 0;

	// console.log(instructions.length);

	while (steps === 0) {
		const direction = instructions[i % instructionsCount];
		// console.log(direction);

		currElement = currentNode[direction];

		if (currElement === 'ZZZ') {
			steps = i + 1;
			break;
		} else {
			currentNode = nodes.find((node) => node.element === currElement);
			i += 1;
			continue;
		}
	}

	return steps;
};
