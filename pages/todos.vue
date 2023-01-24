<template>
	<v-container>
		<v-text-field v-model="newTask" label="What are you working on?" solo @keydown.enter="create">
			<template v-slot:append>
				<v-fade-transition>
					<v-icon v-if="newTask" @click="create">
						mdi-plus-circle
					</v-icon>
				</v-fade-transition>
			</template>
		</v-text-field>
		<h2 class="text-h4 success--text pl-4">
			Tasks:&nbsp;
			<v-fade-transition leave-absolute>
				<span :key="`tasks-${todos.length}`">
					{{ todos.length }}
				</span>
			</v-fade-transition>
		</h2>

		<v-divider class="mt-4"></v-divider>

		<v-row class="my-1" align="center">
			<strong class="mx-4 info--text text--darken-2">
				Remaining: {{ remainingTasks }}
			</strong>

			<v-divider vertical></v-divider>

			<strong class="mx-4 success--text text--darken-2">
				Completed: {{ completedTodos }}
			</strong>

			<v-spacer></v-spacer>

			<v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
		</v-row>

		<v-divider class="mb-4"></v-divider>

		<v-card v-if="todos && todos.length > 0">
			<v-slide-y-transition class="py-0" group tag="v-list">
				<template v-for="(task, i) in todos">
					<v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

					<v-list-item :key="`${i}-${task.title}`">
						<v-list-item-action>
							<v-checkbox value :input-value="task.done" @change="toggle(task)" :color="task.done && 'grey' || 'primary'">
								<template v-slot:label>
									<div :class="task.done && 'grey--text' || 'primary--text'" class="ml-4"
										v-text="task.title"></div>
								</template>
							</v-checkbox>
						</v-list-item-action>

						<v-spacer></v-spacer>

						<v-scroll-x-transition>
							<v-icon v-if="task.done" color="success">
								mdi-check
							</v-icon>
						</v-scroll-x-transition>
					</v-list-item>
				</template>
			</v-slide-y-transition>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		newTask: null,
	}),
	computed: {
		todos() {
			return this.$store.getters.getTodos || []
		},
		completedTodos() {
			return this.todos.filter(task => task.done).length
		},
		progress() {
			return this.completedTodos / this.todos.length * 100
		},
		remainingTasks() {
			return this.todos.length - this.completedTodos
		},
	},
	methods: {
		create() {
			const todo = {
				createdAt: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
				id: self.crypto.randomUUID(),
				done: false,
				title: this.newTask
			}
			this.$store.commit("add", todo)

			this.newTask = null
		},
		toggle(todo) {
			this.$store.commit("toggle", todo)

		}
	},
}
</script>

<style>

</style>