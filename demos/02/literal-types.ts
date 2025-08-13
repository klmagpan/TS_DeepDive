/* Literal Types */
const greeting: "Hello" = "Hello"

const luckyNumber: 7 = 7

const isTrue: true = true

type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6
const roll: DiveRoll = 4
const invalidRoll: DiceRoll = 9 // Try to add another type and it results to an error

type Direction = "North" | "South" | "East" | "West"

function move(direction: Direction) {
	console.log(`Moving ${direction}`)
}

move("North");
move("Up"); // invalid, which will cause an error