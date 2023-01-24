<template>
	<!-- // Todos page  -->
	<v-container>
		<v-card class="pa-5 pa-md-8 mt-5">
			<v-form @submit.prevent="saveTodo" ref="form" v-model="valid">
				<v-row class="">
					<v-col cols="12">
						<v-text-field label="Title" placeholder="Fix this bug, call home, etc." v-model="todo.title"
							required :rules="[v => !!v || 'Title is required']">
						</v-text-field>
					</v-col>
					<v-col cols="12">
						<v-textarea name="input-7" cols="3" label="Description" placeholder="Add some details and instructions" v-model="todo.description">
						</v-textarea>
					</v-col>
					<v-col cols="12" sm="6">
						<v-chip-group v-model="todo.priority" active-class="red text--accent-4" mandatory>
							<!-- <v-chip>Ignore</v-chip> -->
							<v-chip>Low</v-chip>
							<v-chip>Medium</v-chip>
							<v-chip>High</v-chip>
						</v-chip-group>
					</v-col>
					<v-col cols="12" sm="6">
						<v-menu v-model="menu_open" :close-on-content-click="false" :nudge-right="40"
							transition="scale-transition" offset-y min-width="auto">
							<template v-slot:activator="{ on, attrs }">
								<v-text-field :value="formattedDate(todo.createdAt)" label="Date"
									prepend-icon="mdi-calendar" v-bind="attrs" v-on="on"></v-text-field>
							</template>
							<v-date-picker v-model="todo.createdAt" @input="menu_open = false"></v-date-picker>
						</v-menu>
					</v-col>
					<v-col>
						<v-btn color="primary" type="submit" block>Add Todo </v-btn>
					</v-col>
				</v-row>
			</v-form>
			<v-snackbar v-model="show_snackbar" :timeout="900">
				{{ toast_message }}
				<template v-slot:action="{ attrs }">
					<v-btn color="blue" text v-bind="attrs" @click="show_snackbar = false">
						Close
					</v-btn>
				</template>
			</v-snackbar>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		// page: "home"
		menu_open: false,
		valid: false,
		show_snackbar: false,
		toast_message: "",
		todo: {
			title: "",
			priority: "Medium"
		},
	}),
	methods: {
		saveTodo() {
			this.$refs.form.validate()
            if (this.valid) {
				this.$store.commit("add", this.todo)
				this.toast_message = "Task Added"
				this.showSnackBar = true
			} else {
				console.log('error', 'error')
			}
		},
		addTodo() {
			this.todo = {
				createdAt: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
				id: self.crypto.randomUUID(),
				done: false,
				...this.todo
			}
		},
		formattedDate(date) {
			return new Date(date).toDateString()
		},
	},
	mounted() {
		this.addTodo()
	}
}
</script>

<style>

</style>