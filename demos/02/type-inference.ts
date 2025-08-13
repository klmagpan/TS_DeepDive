let productName = "Laptop";
let quantity = 5;
let isInStock = true;

// Infers that...
// let products: {
//     name: string;
//     price: number;
// }[]
let products = [
	{name: "Laptop", price: 1000 },
	{name: "Mouse", price: 25 },
	{name: "Laptop", price: 100 },
]

// Infers that..
// : "Laptop", price: 100 },
// function getTotal(products: {
//     price: number;
// }[]): number
function getTotal(products: {price : number}[]) {
	return products.reduce((total, product) => total + product.price, 0);
}

