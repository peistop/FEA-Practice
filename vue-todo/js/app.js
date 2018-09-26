var filter = {
    'all': function(todos) {
        return todos;
    },
    'active': function(todos) {
        return todos.filter(todo => {
            return !todo.completed;
        })
    },
    'completed': function(todos) {
        return todos.filter(todo => {
            return todo.completed;
        })

    }
};

var app = new Vue({
    el: '.app',
    data: {
        todos: todoStorage.fetch(),
        newTodo: '',
        visibility: 'all'
    },
    // watch todos change for localstorage persistence
    watch: {
        todos: {
            handler: todoStorage.save
        }
    },
    computed: {
        filterTodos: function() {
            console.log(this.visibility);
            return filter[this.visibility](this.todos);
        },
        remaining: function() {
            return this.todos.length;
        },
        allDone: {
            get: function () {
                return this.remaining === 0;
            },
            // Don't use arrow functinos on an instance property or callback,
            // As arrow functions are bound to the parent context, this will 
            // be the Vue instance as you'd expect.
            set: function (value) {
                
                this.todos.forEach(todo => {
                    todo.completed = value;            
                });
            }
        }
    },
    methods: {
        addTodo: function() {
            var value = this.newTodo;
            if (!value) {
                return;
            }
            this.todos.push({content: value, completed: false});
            this.newTodo = '';

        },
        removeTodo: function(todo) {
            var index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        }
    }
});