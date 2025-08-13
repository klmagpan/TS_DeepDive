try {
	throw new Error("Oops!");
} catch (error) {
	console.error("An error ocurred:", error);
}

// Custom Error Types
class NetworkError extends Error {
	constructor(public stateCode:number, message:string) {
		super(message);
		this.name = "NetworkError"
	}
}

class ValidationError extends Error {
	constructor(public field:string, message:string) {
		super(message);
		this.name = "ValidationError"
	}
}

// try {
// 	await someRiskyFunction();
// } catch (error) {
// 	if (error instanceof NetworkError) {
// 		console.error(`Network error ${error.statusCode}`)
// 	}
// }