<template>
  <div class="page-content page-container" id="page-content">
    <div class="padding">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <router-link to="/"><h4 class="card-title">--- 📑 Awesome Todos list ---</h4></router-link>

              <div class="form-wrapper" v-if="todo">
                <div class="m-t-1">
                  <label class="m-b-0 c-6b705c"><i class="fa fa-pencil"></i> Todo</label>
                  <input
                    type="text"
                    class="form-control todo-list-input"
                    placeholder="What do you need to do today?"
                    v-model="todo.text"
                    @keyup.enter="handleUpdateTodo"
                  />
                </div>

                <div class="m-t-1">
                  <label class="m-b-0 c-6b705c"><i class="fa fa-code"></i> Descriptions</label>
                  <textarea
                    rows="3"
                    class="form-control todo-list-input"
                    placeholder="Describe what you gonna do?"
                    v-model="todo.descriptions"
                  />
                </div>

                <div class="m-t-1">
                  <label class="m-b-0 c-6b705c"><i class="fa fa-calendar-o"></i> Date</label>
                  <input type="date" class="form-control todo-list-input" placeholder="Today?" v-model="todo.day" />
                </div>

                <div class="m-t-1">
                  <label class="m-b-0 c-6b705c"><i class="fa fa-tasks"></i> Status</label>
                  <select class="form-control form-select todo-list-input" v-model="todo.is_finished">
                    <option class="progressing" :value="false">Progressing</option>
                    <option class="finished" :value="true">Finished</option>
                  </select>
                </div>

                <div class="m-t-1 d-flex justify-content-end">
                  <button class="add btn btn-primary font-weight-bold todo-list-add-btn" @click="handleUpdateTodo">
                    Save
                  </button>
                </div>
              </div>
              <div v-else>
                😥 Oops! Todo not found!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "TodoItem",
  props: {
    id: String
  },
  computed: {
    ...mapGetters({
      todoOld: "getTodo"
    }),
    todo() {
      return this.$store.getters.getTodoById(this.id);
    }
  },
  methods: {
    ...mapActions(["setTodo", "updateTodo"]),
    async handleUpdateTodo() {
      if (this.todo.text.trim() == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Text field is required!"
        });

        return false;
      }

      if (this.todo.day.trim() == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Date field is required!"
        });

        return false;
      }

      if (this.todo.is_finished == undefined) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Status field is required!"
        });

        return false;
      }

      const checker = await this.updateTodo(this.todo);
      if (checker) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Updated todo!"
        });
      }
    }
  },
  mounted() {
    this.setTodo(this.id);
  }
};
</script>

<style scoped>
.c-6b705c {
  color: #6b705c;
}
.form-control {
  line-height: 1.3;
}
.btn-sm {
  padding: 0.25rem 0.5rem;
}
</style>
