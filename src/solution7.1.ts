const strength = [
	'A',
	'K',
	'Q',
	'J',
	'T',
	'9',
	'8',
	'7',
	'6',
	'5',
	'4',
	'3',
	'2',
];

type Hand = {
	cards: string[];
	bid: number;
	type?: number;
};

const parseInput = (rawInput: string) => {
	const hands = rawInput.split('\n').map((line) => line.split(' '));
	const cards = rawInput.split('\n').map((line) => line.split(' ')[0]);
	const bids = rawInput
		.split('\n')
		.map((line) => line.split(' ')[1])
		.map((num) => parseInt(num));

	const extractedHands = hands.map((hand, i) => {
		return { cards: Array.from(cards[i]), bid: bids[i] };
	});
	return extractedHands;
};

const getHandType = (hand: Hand) => {
	const uniqueCards: string[] = Array.from(new Set(hand.cards));

	if (uniqueCards.length === 1) {
		return 7;
	} else if (uniqueCards.length === 2) {
		const cardType1 = hand.cards.filter((card) => card === uniqueCards[0]);
		const cardType2 = hand.cards.filter((card) => card === uniqueCards[1]);

		if (cardType1.length === 4 || cardType2.length === 4) {
			return 6;
		} else {
			return 5;
		}
	} else if (uniqueCards.length === 3) {
		const cardType1 = hand.cards.filter((card) => card === uniqueCards[0]);
		const cardType2 = hand.cards.filter((card) => card === uniqueCards[1]);
		const cardType3 = hand.cards.filter((card) => card === uniqueCards[2]);

		if (
			cardType1.length === 3 ||
			cardType2.length === 3 ||
			cardType3.length === 3
		) {
			return 4;
		} else {
			return 3;
		}
	} else if (uniqueCards.length === 4) {
		return 2;
	} else if (uniqueCards.length === 5) {
		return 1;
	}
};

const compareHands = (hand1: string[], hand2: string[]) => {
	for (let i = 0; i < hand1.length; i++) {
		if (strength.indexOf(hand1[i]) === strength.indexOf(hand2[i])) {
			continue;
		} else if (strength.indexOf(hand1[i]) < strength.indexOf(hand2[i])) {
			return 1;
		} else {
			return -1;
		}
	}
};

export const solution7part1 = (input: string) => {
	const hands = parseInput(input);

	const handsWithTypes = hands.map((hand) => {
		return { ...hand, type: getHandType(hand) };
	});

	const sortedByType = handsWithTypes.sort((a, b) => {
		if (b.type - a.type === 0) {
			const higher = compareHands(a.cards, b.cards);
			return higher;
		} else {
			return a.type - b.type;
		}
	});

	const result = sortedByType.reduce((result, currHand, i) => {
		return (result += currHand.bid * (i + 1));
	}, 0);

	return result;
};
