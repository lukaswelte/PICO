var PureRenderMixin = React.addons.PureRenderMixin;
var Test = React.createClass({
    mixins: [PureRenderMixin],
	
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
