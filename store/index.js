export const state = () => ({
	todos: JSON.parse(localStorage.getItem('todos')) || []
})

export const getters = {
	getTodos(state) {
		return state.todos || []
	}
}

export const mutations = {
	add(state, payload) {
		if (!state.todos.some((el) => el.id === payload.id)) {
			console.log('payload', payload)
			state.todos.push(payload)
			localStorage.setItem("todos", JSON.stringify(state.todos))
			return true
		} else return false
	},
	delete(state, payload) {
		state.todos.filter(ele => ele.id !== payload.id)
	},
	toggle(state, todo) {
		todo.done = !todo.done
		state.todos = state.todos.map(el => el.id === todo.id ? todo : el)
		localStorage.setItem("todos", JSON.stringify(state.todos))
	}
}

export const actions = {
	// async fetchCounter({ state }) {
	// 	// make request
	// 	const res = { data: 10 };
	// 	state.counter = res.data;
	// 	return res.data;
	// }
}