var ShowEntry = React.createClass ({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

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
                <p>Das ist die Show Entry Seite.</p>
                {/* Fetches the details of an entry */}
                <EntryDetail entry={this.state.entry} />
            </div>
        );
    }


});
