<template>
  <div class="page-content page-container" id="page-content">
    <div class="padding">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">--- 📑 Awesome Todos list ---</h4>
              <span>Today: {{ today }}</span>

              <div class="list-wrapper">
                <ul class="d-flex flex-column todo-list">
                  <li
                    v-for="(todo, index) in todos"
                    :key="index"
                    :class="{ completed: todo.is_finished }"
                    @click.prevent
                  >
                    <todo-item :todo="todo" />
                  </li>
                </ul>
              </div>

              <div class="add-items d-flex">
                <input
                  type="text"
                  class="form-control todo-list-input"
                  placeholder="What do you need to do today?"
                  v-model="text"
                  @keyup.enter="onAddTodo"
                  required
                />
                <button class="add btn btn-primary font-weight-bold todo-list-add-btn" @click="onAddTodo">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
import moment from "moment";
import TodoItem from "./TodoItem";

export default {
  name: "TodosList",
  components: {
    TodoItem
  },
  data() {
    return {
      text: ""
    };
  },
  computed: {
    ...mapGetters({
      todos: "getTodos"
    }),
    today() {
      return moment().format("DD-MM-YYYY");
    }
  },
  mounted() {
    this.setTodos();
  },
  methods: {
    ...mapActions(["setTodos", "addTodo"]),
    onAddTodo() {
      if (this.text.trim().length == 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Todo can not empty!"
        });

        return false;
      }

      const todo = {
        text: this.text,
        descriptions: "",
        day: this.today,
        is_finished: false
      };
      this.addTodo(todo);
      this.text = "";
    }
  }
};
</script>

<style></style>
