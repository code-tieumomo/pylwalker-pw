<template>
  <div class="form-check">
    <label class="form-check-label" @dblclick.self="toggleStatus(todo)">
      <input class="checkbox" type="checkbox" :checked="todo.is_finished" />
      {{ todo.text }}
      <i class="input-helper"></i>
    </label>
  </div>
  <i class="remove mdi mdi-close-circle-outline" @click.stop.prevent="onTodoDetail(todo)"></i>
  <i class="remove mdi mdi-close-circle-outline" @click.stop.prevent="onQuickRemove(todo)"></i>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Todo",
  props: {
    todo: Object
  },
  methods: {
    ...mapActions(["toggleStatus", "quickRemove"]),
    onQuickRemove(todo) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, remove it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.quickRemove(todo);
        }
      });
    },
    onTodoDetail(todo) {
      this.$router.push({
        name: "todo-detail",
        params: {
          id: todo.id
        }
      });
    }
  }
};
</script>

<style></style>
