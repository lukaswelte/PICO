var SearchEntry = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        var fetchedEntries = flux.stores.EntryStore.getAllEntries().entries;
        return {
            entries: fetchedEntries,
            suggestedEntries: fetchedEntries,
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

        var labels = this.state.suggestedEntries.labels;

        return (
            <div>
                <div className = "row">
                    <div className = "col-md-3">
                        <LabelAutocomplete availableLabels={labels} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(this.state.suggestedEntries.labels)} />
                        <LabelList />
                    </div>
                    <div className = "col-md-9">
                        <div>
                            <input value={this.state.currentInput} onChange={this.handleInputChange} placeholder="Search for a term that matches in the title or context of your entries"/>
                        </div>
                        <div>
                            {searchResult}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

