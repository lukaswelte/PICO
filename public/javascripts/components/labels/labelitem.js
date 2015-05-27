var LabelItem = React.createClass({
    mixins: [FluxMixin],

    render: function() {
        return(
            <div>
                {this.props.name}
            </div>
        );
    }
});
