var SearchEntry = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.stores.EntryStore.getAllEntries();
    },

    handleKeyDown: function(e) {
        switch(e.keyCode) {
            case Keys.ENTER:
                e.preventDefault();
                this.handleSearch();
                break;
        }
    },

    handleSearch: function() {
        {/* change the entry list to those entries which contain the search term */}
    },

    render: function () {
        var entryList = this.state.entries.map(function(entry){
            return <EntryItem key={entry.id} entry={entry} />
        });
        return (
            <div>
                <div>
                    <input onKeyDown={this.handleKeyDown} placeholder="Search for an entry"/>
                </div>
                <div>
                    {entryList}
                </div>
            </div>
        );
    }

});

