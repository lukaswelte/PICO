var CreateEntry = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            entry: flux.stores.EntryStore.getEntryToCreate()
        };
    },

    render: function() {
        return (
            <div>
                <EntryForm entry={this.state.entry}/>
            </div>
        );
    }
});
