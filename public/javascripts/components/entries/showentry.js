var ShowEntry = React.createClass ({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore", "RouterStore")],

    contextTypes: {
        router: React.PropTypes.func
    },

    getStateFromFlux: function() {
        var params = this.context.router.getCurrentParams();
        var flux = this.getFlux();
        var entryID = parseInt(params.id);
        return {
            entry: flux.stores.EntryStore.getEntryById(entryID)
        };
    },

    render: function () {
        if (this.state.entry == null) {
            return (
                <div>
                    We have not found this entry.
                </div>
            );
        }

        return (
            <div>
                <p>This is the show entry page.</p>
                {/* Fetches the details of an entry */}
                <EntryDetail entry={this.state.entry} />
            </div>
        );
    }


});
