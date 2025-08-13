function identity<T>(arg: T): T {
	return arg;
}

const output1 = identity<string>("Hello, generics!");
const output2 = identity<number>(42);

// Equivalent

const output3 = identity("Hello, generics!");
const output4 = identity(42);