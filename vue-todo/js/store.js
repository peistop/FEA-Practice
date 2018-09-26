
// anonymous function
// Ref: http://shenyun23-4.blogspot.com/2015/10/javascript-function.html
((exports) => {

    'use strict'

    var STORAGE_KEY = 'todo-vuejs';

    exports.todoStorage = {
        fetch: () => {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        },
        save: (todos) => {
            return localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    };
})(window);