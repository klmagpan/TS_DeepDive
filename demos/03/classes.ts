class Account {
	protected balance: number; // protected: Can only be accessed by subclasses

	constructor(initialBalance: number) {
		this.balance = initialBalance;
	}

	public getBalance(): number {
		return this.balance;
	}

	public deposit(amount: number): void {
		if (amount > 0) {
			this.balance += amount;
			console.log(`Deposited ${amount}. New balance ${this.balance}`);
	
		}
	}

	protected withdraw(amount: number): boolean { // Protected b/c want to control how it's used in subclasses
		if (amount > 0 && this.balance >= amount) {
			this.balance -= amount;
			console.log(`Withdrawn ${amount}. New Balance ${this.balance}`);
			return true;
		}

		console.log("Withdrawal failed. Insuffieicient funds.");
		return false;
	}

}

class CheckingAccount extends Account {
	private transactionLimit: number = 1000;

	constructor(initialBalance: number) {
		super(initialBalance);
	}

	public withdraw (amount: number): boolean { // Override withdraw method to add transaction limit check
		if (amount > this.transactionLimit) {
			console.log(`Transaction limit exceeded. Limit: ${this.transactionLimit}`);
			return false;
		}
		return super.withdraw(amount);
	}
}

class SavingsAccount extends Account {
	private interestRate: number;

	constructor(initialBalance: number, interestRate: number) {
		super(initialBalance);
		this.interestRate = interestRate;
	}

	public addInterest(): void {
		const interest = this.balance * this.interestRate;
		this.deposit(interest);
		console.log(`Interest added: ${interest}`);
	}
}

class Bank {
	private accounts: Account[] = [];

	public addAccount(account: Account): void {
		this.accounts.push(account);
	}

	public getTotalBalance(): number {
		return this.accounts.reduce((sum,account) => sum + account.getBalance(), 0)
	}
}

const checkings = new CheckingAccount(1000);
const savings = new SavingsAccount(5000, 0.05);

checkings.deposit(500);
checkings.withdraw(200);
checkings.withdraw(2000); // Fail due to transaction limit

savings.deposit(1000);
savings.addInterest();

const bank = new Bank();
bank.addAccount(checkings);
bank.addAccount(savings);