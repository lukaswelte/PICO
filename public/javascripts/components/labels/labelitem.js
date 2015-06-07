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
            removeButton = <button onClick={this.handleOnRemove} className="button-icon"><span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
        }

        return(
            <div onClick={this.props.onClick} className="padding-top-0-5em padding-bottom-0-5em">
                <span className="label-name">{label.name}</span> {removeButton}
            </div>
        );
    }
});
