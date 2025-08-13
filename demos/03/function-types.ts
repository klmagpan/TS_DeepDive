// Syntax Error
// Generic Function: takes an input of type T and returns a promise
// that resolves to type U
type AsyncOperation<T, U> = {input: T} => Promise<U>;

interface DataProcessor<T> {
	// Filters out null and undefined values from an array
	processData: (data: T[]) => T[]; 

	// asynchronously fetches data from a URL and returns it as a JSON array
	fetchData: AsyncOperation<string, T[]>;
}

// Define class that implements the DataProcessor interface
class StringProcessor<T> implements DataProcessor<T> {

	// Filters out null and undefined values from the input array
	processData(data: T[]): T[] {
		return data.filter(item => item !== null && item !== undefined);
	}

	// Uses the fetch API to make an HTTP request and pass the response as 
	async fetchData(url: string): Promise<T[]> {
		const response = await fetch(url);
		return response.json();
	}
}

const processor = new StringProcessor();
