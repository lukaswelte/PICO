var SearchEntry = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        var fetchedEntries = flux.stores.EntryStore.getAllEntries().entries;
        var fetchedEntriesLabels = fetchedEntries.map(function(entry) {
            return entry.labels.map(function(label) {
                return label;
            });
        });
        return {
            entries: fetchedEntries,
            suggestedEntries: fetchedEntries,
            availableLabels: fetchedEntriesLabels,
            selectedLabels: []
        };
    },

    handleOnLabelsChanged: function(newLabels) {
        var selectedLabels = newLabels;

        var matchingEntries = this.state.suggestedEntries.filter(function(entry){

            //are all selectedLabels part of the entry
            return selectedLabels.map(function(selectedLabel) {
                //label is in entry.labels
                entry.labels.filter(function(label) {
                    return selectedLabel.name == label.name;
                })
            });
        });

        var matchingEntriesLabels = matchingEntries.map(function(entry) {
            return entry.labels.map(function(label) {
                return label.name;
            });
        });

        this.setState({
            suggestedEntries: matchingEntries,
            availableLabels: matchingEntriesLabels,
            selectedLabels: selectedLabels
        });

    },

    handleInputChange: function(event) {
        var input = event.target.value;

        //compute the suggestions based on the title and the context of an entry
        var matchingEntries = this.state.entries.filter(function(entry) {
            var matchingLabels = entry.labels.filter(function(label){return !label.name.search(input);});
            return !entry.title.search(input)|| !entry.context.search(input) || matchingLabels.length > 0;
        });

        var matchingEntriesLabels = matchingEntries.map(function(entry) {
            return entry.labels.map(function(label) {
                return label.name;
            });
        });

        this.setState({
            currentInput: input,
            suggestedEntries: matchingEntries,
            availableLabels: matchingEntriesLabels
        });
    },

    render: function () {
        var searchResult = this.state.suggestedEntries.map(function(entry){
            return <EntryItem key={entry.id} entry={entry} />
        });

        return (
            <div>
                <div className = "row">
                    <div className = "col-md-3">
                        <LabelAutocomplete availableLabels={Immutable.Set(this.state.availableLabels)} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(this.state.selectedLabels)} />
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

