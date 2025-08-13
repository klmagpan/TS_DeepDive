// Assert that someValue is a string
const someValue: any = "this is a string"
const strLength: number = (someValue as string).length

interface Task {
	id : number
	title: string
	completed: boolean
}

const fetchTasks = (): any => {
	return [
		{id: 1, title: "TypeScript", completed: false },
		{id: 2, title: "JavaScript", completed: true }
	]
}

const tasks = fetchTasks() as Task[]
console.log(tasks[0]. title) // TypeScript now knows this is a string

// const toggleTask = (taskID: number): void => {
// 	const task = tasks.find((t) => t.id === taskID) as Task
// 	task.completed = !task.completed
// }