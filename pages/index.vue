<template>
  <div class="">
    <!-- // home page  -->
    <v-container v-if="page === 'home'">
      <v-row>
        <v-col v-for="n in 3" :key="n" cols="6" md="3">
          <v-card height="200"></v-card>
        </v-col>
        <v-col cols="6" md="3" class="">
          <v-card height="200" class="align-center justify-center d-flex text-3xl display-2                            "
            @click="addTodo">
            <v-btn class="mx-2" fab dark color="primary">
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- // Todos page  -->
    <!-- <v-container v-if="page === 'todos'">

    </v-container> -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    page: "home"
  }),
  methods: {
        addTodo() {
            this.$router.push("add")
        },
        formattedDate(date) {
            return new Date(date).toDateString()
        },
        saveTodo() {
            this.$refs.form.validate()
            if (this.valid) {
                // this.todo_list.push(this.todo)
                // localStorage.setItem("todo_list", JSON.stringify(this.todo_list))
                // console.log(this.todo_list,"required");
                this.toast_message = "Task Added"
                this.showSnackBar = true
            } else {
                console.log("Error");
            }
            // this.todo = {}
        }
    }
}
</script>
