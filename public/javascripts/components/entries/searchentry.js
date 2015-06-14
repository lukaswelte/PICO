var SearchEntry = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        var fetchedEntries = flux.stores.EntryStore.getAllEntries().entries;
        return {
            entries: fetchedEntries,
            suggestedEntries: fetchedEntries
        };
    },

    handleInputChange: function(event) {
        var input = event.target.value;

        //compute the suggestions based on the title and the context of an entry
        var matchingEntries = this.state.entries.filter(function(entry) {
            return !entry.title.search(input)|| !entry.context.search(input);
        });

        this.setState({
            currentInput: input,
            suggestedEntries: matchingEntries
        });
    },

    render: function () {
        var searchResult = this.state.suggestedEntries.map(function(entry){
            return <EntryItem key={entry.id} entry={entry} />
        });
        return (
            <div>
                <div>
                    <input value={this.state.currentInput} onChange={this.handleInputChange} placeholder="Search for an entry"/>
                </div>
                <div>
                    {searchResult}
                </div>
            </div>
        );
    }

});

