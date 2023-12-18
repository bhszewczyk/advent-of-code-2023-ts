type ProcessingRange = {
	start: number;
	end: number;
};

type RuleInput = number[];

type Rule = {
	ruleStart: number;
	ruleEnd: number;
	shift: number;
};

const extractSeedsAndRules = (input: string): [number[][], number[][]] => {
	const lines: string[] = input.replace('seeds: ', '').split('\n');
	const inputArrayLines = lines
		.map((line) => {
			while (line !== '') return line.match(/\d+/g);
		})
		.filter((line) => line !== undefined);

	const seeds = [...inputArrayLines[0]].map((seed) => parseInt(seed));

	const seedPairs = seeds
		.map((seed, i) => {
			if (i % 2 == 0) {
				return [seed, seeds[i + 1]];
			}
		})
		.filter((arr) => arr !== undefined);

	const rules = inputArrayLines
		.splice(2)
		.map((rule) => (rule ? rule.map((item) => parseInt(item)) : null));

	rules.push(null);

	return [seedPairs, rules];
};

export const solution5part2 = (input: string) => {
	const [seedPairs, rules] = extractSeedsAndRules(input);
	const startingSeedsRanges = seedPairs.map((seed) => getStartingRange(seed));

	let ruleApplied: ProcessingRange[] = [];

	const finalRanges = rules.reduce(
		(currentSeedValues, rule): ProcessingRange[] => {
			if (!rule) {
				currentSeedValues = [...ruleApplied, ...currentSeedValues];
				console.log(currentSeedValues.length);
				console.log(currentSeedValues);
				ruleApplied = [];
				return currentSeedValues;
			}
			const { ruleStart, ruleEnd, shift } = getRule(rule);

			const result = compareRanges(currentSeedValues, {
				start: ruleStart,
				end: ruleEnd,
			});

			const ruleOutcomes = result.processedRange?.map((range) => {
				return { start: range.start + shift, end: range.end + shift };
			});

			ruleApplied.push(...ruleOutcomes);

			return [...result.leftovers];
		},
		startingSeedsRanges
	);

	const lowest = finalRanges.reduce((currLowest: number, range) => {
		return Math.min(currLowest, range.start);
	}, finalRanges[0].start);

	return lowest;
};

const getStartingRange = (arr: number[]) => {
	return {
		start: arr[0],
		end: arr[0] + arr[1] - 1,
	};
};

const compareRanges = (
	seedRanges: ProcessingRange[],
	ruleRange: ProcessingRange
): {
	processedRange: ProcessingRange[];
	leftovers: ProcessingRange[];
} => {
	const { start: ruleStart, end: ruleEnd } = ruleRange;
	let leftovers: ProcessingRange[] = [];
	let processedRange: ProcessingRange[] = [];

	seedRanges.forEach((seedRange) => {
		const { start, end } = seedRange;
		if (end < ruleStart || start > ruleEnd) {
			leftovers.push(seedRange);
			return { processedRange: [], leftovers };
		}
		if (start >= ruleStart) {
			if (end <= ruleEnd) {
				processedRange.push(seedRange);
			} else {
				processedRange.push({ start, end: ruleEnd });
				leftovers.push({ start: ruleEnd + 1, end: end });
			}
		} else {
			if (end > ruleEnd) {
				leftovers.push({ start, end: ruleStart - 1 });
				leftovers.push({ start: ruleEnd + 1, end });
				processedRange.push({ start: ruleStart, end: ruleEnd });
			} else {
				leftovers.push({ start, end: ruleStart - 1 });
				processedRange.push({ start: ruleStart, end });
			}
		}
	});
	return { processedRange, leftovers };
};

const getRule = (rule: RuleInput): Rule => {
	const [destination, source, length] = rule;
	const ruleEnd = source + length - 1;
	const shift = destination - source;

	return {
		ruleStart: source,
		ruleEnd,
		shift,
	};
};
