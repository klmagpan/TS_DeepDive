type PromiseTypes = [Promise<number>, Promise<string>, Promise<{key : string}>];

const promises: PromiseTypes = [
	Promise.resolve(1),
	Promise.resolve("hello"),
	Promise.resolve({key : "value"})
];

Promise.all<PromiseTypes>(promises).then(results => {
	const [num, str, obj] = results;
	console.log(num.toFixed(2));
	console.log(str.toUpperCase());
	console.log(obj.key);
})