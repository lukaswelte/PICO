var LabelItem = React.createClass({

    propTypes: {
        label: React.PropTypes.object.isRequired,
        onRemove: React.PropTypes.func,
        onClick: React.PropTypes.func
    },

    render: function() {
        var label = this.props.label;

        var removeButton = "";
        if (this.props.onRemove) {
            removeButton = <button onClick={this.props.onRemove}>X</button>
        }

        return(
            <div onClick={this.props.onClick}>
                {label.name} {removeButton}
            </div>
        );
    }
});
