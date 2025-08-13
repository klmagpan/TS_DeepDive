type Constructor = new (...args: any[]) => {};

function SayHelloMixIn<TBase extends Constructor>(Base: TBase) {
	return class extends Base {
		sayHello() {
			console.log('Hello from mixin!');
		}
	}
}

class Greeter {
	greet() {
		console.log(`Hello from Greeter!`);
	}
}

const GreeterWithHello = SayHelloMixIn(Greeter);
const greeter = new GreeterWithHello();
greeter.greet();
greeter.sayHello(); // New say hello method from mixin