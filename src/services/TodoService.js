import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fgczckfbozcbofwksqcz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDE3NDgzOSwiZXhwIjoxOTQ1NzUwODM5fQ.8efUxDeZZe4nOTWFSU7ZZsml6Tqi00Y-XMt_vQat7mo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  async getTodos() {
    let { data, error, status } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });
    if (error && status !== 406) {
      console.log("Error while fetching todos: ", error);
      return null;
    }

    return data;
  },
  async toggleStatus(todo) {
    const { error, status } = await supabase
      .from("todos")
      .update({ is_finished: !todo.is_finished })
      .eq("id", todo.id);
    if (error && status !== 406) {
      console.log("Error while toggling status: ", error);
      return false;
    }

    return true;
  },
  async quickRemove(todo) {
    const { error, status } = await supabase
      .from("todos")
      .delete()
      .eq("id", todo.id);
    if (error && status !== 406) {
      console.log("Error while removing todo: ", error);
      return false;
    }

    return true;
  },
  async addTodo(todo) {
    const { data, error, status } = await supabase.from("todos").insert([
      {
        text: todo.text,
        descriptions: todo.descriptions,
        day: todo.day,
        is_finished: todo.is_finished
      }
    ]);
    if (error && status !== 406) {
      return false;
    }

    return data;
  },
  getDatabase() {
    return supabase;
  }
};
