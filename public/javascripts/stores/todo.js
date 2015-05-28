var constants = {
    ADD_TODO: "ADD_TODO",
    TOGGLE_TODO: "TOGGLE_TODO",
    CLEAR_TODOS: "CLEAR_TODOS"
};

var TodoStore = Fluxxor.createStore({
    initialize: function() {
        this.todos = Immutable.Map();

        this.bindActions(
            constants.ADD_TODO, this.onAddTodo,
            constants.TOGGLE_TODO, this.onToggleTodo,
            constants.CLEAR_TODOS, this.onClearTodos
        );
    },

    onAddTodo: function(payload) {
        this.todos = this.todos.set(payload.text, {text: payload.text, complete: false});
        this.emit("change");
    },

    onToggleTodo: function(payload) {
        payload.todo.complete = !payload.todo.complete;
        this.emit("change");
    },

    onClearTodos: function() {
        //noinspection JSUnresolvedFunction
        this.todos = this.todos.filter(function(todo) {
            return !todo.complete;
        });
        this.emit("change");
    },

    getState: function() {
        return {
            todos: this.todos
        };
    }
});
