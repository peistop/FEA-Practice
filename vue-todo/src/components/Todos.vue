<style scoped lang="less">
  .todos {
    background-color:#FFF;
    padding:20px 20px 10px 20px;
    margin-top:30px;

    h1 {
      margin:0;
      padding-bottom:20px;
      text-align:center;
    }

    .form-control{
      margin-bottom: 20px;
    }

    li {
      padding:10px 0;
      background:#fff;
      border:none;
      border-bottom:1px solid #ddd;      
      &:last-child {
        border-bottom:none;
      }
    }

  }

</style>

<template>
  <div class="todos">
    <h1>TODOs</h1>
    <input type="text" class="form-control" placeholder="Enter todo." v-on:keyup.enter="addTodo" v-model="newTodo">
    <ul class="list-unstyled">
      <li v-for='todo in todos' :key="todo.id">
        <todo-item :todo="todo" :editing="todo === editTodoItem"
          @edit-todo="editTodo(todo)"
          @remove-todo="removeTodo(todo)"
          @done-edit="doneEdit(todo)"
          @cancel-edit="cancelEdit(todo)"></todo-item>        
      </li>
    </ul> 
  </div>
</template>

<script>
  import TodoItem from './TodoItem.vue';
  import todoStore from '../todoStore';

  export default {
    name: 'Todos',
    components: {
      TodoItem
    },
    data() {
      return {
        todos: todoStore.fetch(),
        newTodo: '',
        editContentCache: '',
        editTodoItem: null,
      };
    },
    methods: {
      addTodo: function() {
        var value = this.newTodo;
        if (!value) {
          return;
        }
        this.todos.push({content: value, done: false});
        this.newTodo = '';
      },
      removeTodo: function(todo) {
        console.log("remove", todo)
        this.todos.splice(this.todos.indexOf(todo), 1);
      },
      editTodo: function(todo) {
        this.editContentCache = todo.content;
        this.editTodoItem = todo;
      },
      cancelEdit: function(todo) {
        console.log("cancel")
        this.editTodoItem = null;
        todo.content = this.editContentCache;
      },
      doneEdit: function(todo) {
        console.log("done")
        if (!this.editTodoItem) {
          return;
        }
        this.editTodoItem = null;
        todo.content = todo.content.trim();
        if (!todo.content) {
          this.removeTodo(todo);
        }
      },
    }
  };
</script>

