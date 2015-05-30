var LabelItem = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        label: React.PropTypes.object.isRequired,
        onRemove: React.PropTypes.func.isRequired
    },

    render: function() {
        var label = this.props.label;

        var removeButton = "";
        if (this.props.onRemove) {
            removeButton = <button onClick={this.props.onRemove}>X</button>
        }

        return(
            <div>
                {label.name} {removeButton}
            </div>
        );
    }
});
