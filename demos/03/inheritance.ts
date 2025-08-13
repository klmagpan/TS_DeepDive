// Inheritance Example 1: Classes
class Animal {
	move() {
	  console.log("Moving...")
	}
  }
  
  class Dog extends Animal { // Uses extends keyword
	bark() {
	  console.log("Woof!")
	}
  }

  const myDog = new Dog();
  myDog.move();
  myDog.bark();

// Inheritance Example 2: Interfaces
interface Printable {
	print(): void;
}

class Doc implements Printable {
	print() {
		console.log("Printable document...")
	}
}
  