var Home = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.stores.EntryStore.getAllEntries();
    },

    render: function () {
        return (
            <div>
                <p>This is the home page</p>
                <h2>All Entries</h2>
                {this.state.entries.map(function(entry){
                    return <EntryItem key={entry.id} entry={entry} />
                })}
                <h2>All Labels</h2>
                <LabelList />
            </div>
        );
    }
});
