
<style scoped lang="less">

  .todo {
    text-align: left;

    .content {
      display: inline;
      &.editing {
        display: none;
      }

      &.done {
        text-decoration-line: line-through;
      }
    }

    input.edit {
      display: none;
      &.editing {        
        display: inline-block;
      }
    }

    button.remove {
      float: right;
      border:none;
      background-color: transparent;
      top: 0;
      right: 10px;
      bottom: 0;
      width: 20px;
      height: 20px;
      margin: auto 0;
      font-size: 20px;
      color: #cc9a9a;
      transition: color 0.2s ease-out;

      &:hover {
        color: #af5b5e;
      }
    }
  }

</style>

<template>
  <div class="todo" @dblclick="editTodo(todo)">
    <div :class="{ content: true, editing, done: todo.done }">
      <input type="checkbox" v-model="todo.done" :class="todo.done">
      {{todo.content}}    
    </div>
    <input type="text" :class="{ edit: true, editing }" 
          v-model="todo.content"
          v-todo-focus="editing"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)">
    <button class="remove" @click="removeTodo(todo)">x</button>
  </div>
</template>

<script>
  export default {
    name: 'TodoItem',
    props: {
      todo: {
        type: Object,
        required: true
      },
      editing: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      editTodo: function(todo) {
        this.$emit('edit-todo', todo);
      },
      removeTodo: function(todo) {
        this.$emit('remove-todo', todo);
      },
      cancelEdit: function(todo) {
        this.$emit('cancel-edit', todo);
      },
      doneEdit: function(todo) {
        this.$emit('done-edit', todo);
      }   
    },
    // from TodoMVC
    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
      'todo-focus': function (el, binding) {
        if (binding.value) {
          el.focus();
        }
      }
    }
  };
</script>
