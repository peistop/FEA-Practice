const STORAGE_KEY = 'todo-vuejs';

export default {
    fetch: () => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },
    save: (todos) => {
        return localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};