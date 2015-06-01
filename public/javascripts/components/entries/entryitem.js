var EntryItem = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        entry: React.PropTypes.object.isRequired
    },

    render: function() {
        var entry = this.props.entry;

        return(
            <div>
                <a href={entry.url}><h2>{entry.title}</h2></a>
                <div><Link to="showEntry" params={{id: entry.id}}>Show Detail</Link></div>
                <div>
                    {entry.context}
                </div>
            </div>
        );
    }
});
