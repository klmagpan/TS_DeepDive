// Infers: function(x: string): string
["a", "b", "c"]. map(x => x.toUpperCase());

// Type inferences in Generic Functions
function identity<T>(arg: T): T {
	return arg;
}

let output = identity("myString");