import { createStore } from "vuex";
import TodoService from "../services/TodoService";

export default createStore({
  state: {
    todos: [],
    todo: {}
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
    getTodoById: (state) => (id) => {
      const todo = state.todos.find((todo) => todo.id == id);
      if (!todo) {
        return state.todo;
      }
      return todo;
    }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    SET_TODO(state, todo) {
      state.todo = todo;
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
    },
    UPDATE_TODO(state, newTodo) {
      state.todos.forEach((todo) => {
        if (todo.id == newTodo.id) {
          todo.text = newTodo.text;
          todo.descriptions = newTodo.descriptions;
          todo.day = newTodo.day;
          todo.is_finished = newTodo.is_finished;
        }
      });
    }
  },
  actions: {
    async setTodos(context) {
      const todos = await TodoService.getTodos();
      context.commit("SET_TODOS", todos);
    },
    async setTodo(context, id) {
      const todo = await TodoService.getTodo(id);
      context.commit("SET_TODO", todo[0]);
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
    },
    async updateTodo(context, todo) {
      const updatedTodo = await TodoService.updateTodo(todo);
      if (updatedTodo != undefined) {
        context.commit("UPDATE_TODO", updatedTodo[0]);

        return "updated";
      }
    }
  },
  modules: {}
});
