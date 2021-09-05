import { createStore } from "vuex";
import TodoService from "../services/TodoService";

export default createStore({
  state: {
    todos: []
  },
  getters: {
    getTodos(state) {
      return state.todos;
    }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    TOGGLE_STATUS(state, id) {
      state.todos.forEach((todo) => {
        if (todo.id == id) todo.is_finished = !todo.is_finished;
      });
    },
    QUICK_REMOVE(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    }
  },
  actions: {
    async setTodos(context) {
      const todos = await TodoService.getTodos();
      context.commit("SET_TODOS", todos);
    },
    async toggleStatus(context, todo) {
      const checked = await TodoService.toggleStatus(todo);
      if (checked) {
        context.commit("TOGGLE_STATUS", todo.id);
      }
    },
    async quickRemove(context, todo) {
      const checked = await TodoService.quickRemove(todo);
      if (checked) {
        context.commit("QUICK_REMOVE", todo.id);
      }
    },
    async addTodo(context, todo) {
      const insertedTodo = await TodoService.addTodo(todo);
      if (insertedTodo != undefined) {
        context.commit("ADD_TODO", insertedTodo[0]);
      }
    }
  },
  modules: {}
});
