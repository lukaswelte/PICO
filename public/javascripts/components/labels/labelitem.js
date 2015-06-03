var LabelItem = React.createClass({

    propTypes: {
        label: React.PropTypes.object.isRequired,
        onRemove: React.PropTypes.func,
        onClick: React.PropTypes.func
    },

    handleOnRemove: function(event) {
        event.stopPropagation();
        if (this.props.onRemove) {
            this.props.onRemove();
        }
    },

    render: function() {
        var label = this.props.label;

        var removeButton = "";
        if (this.props.onRemove) {
            removeButton = <button onClick={this.handleOnRemove}>X</button>
        }

        return(
            <div onClick={this.props.onClick}>
                {label.name} {removeButton}
            </div>
        );
    }
});
