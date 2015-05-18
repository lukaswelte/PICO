var Test = React.createClass({
    mixins: [FluxMixin],

    getInitialState: function() {
        return {exampleTodo: {text: "Test", complete: false}};
    },

    render: function() {
        return(
            <div>
                <p>Ein kleiner Test {this.state.exampleTodo.text}</p>
            </div>
        );
    }
});
