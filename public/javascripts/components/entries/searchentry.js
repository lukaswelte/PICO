var SearchEntry = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        var fetchedEntries = flux.stores.EntryStore.getAllEntries().entries;
        var entriesArray = fetchedEntries.toArray();
        var fetchedEntriesLabels = this.getLabelsFromEntries(entriesArray);
        return {
            entries: fetchedEntries,
            suggestedEntries: fetchedEntries,
            availableLabels: fetchedEntriesLabels,
            selectedLabels: []
        };
    },

    getLabelsFromEntries: function(entries) {
        var arrayOfArrays = entries.map(function(entry) {
            return entry.labels;
        });

        var fetchedEntriesLabels = [];
        for (i = 0; i < arrayOfArrays.length; i++) {
            fetchedEntriesLabels = fetchedEntriesLabels.concat(arrayOfArrays[i]);
        }

        return fetchedEntriesLabels;
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

        var matchingEntriesLabels = this.getLabelsFromEntries(matchingEntries.toArray());

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

            var contextMatches = false;
            if (entry.context != null) {
                contextMatches = !entry.context.search(input);
            }

            var searchMatchInTitle = !entry.title.search(input);
            return searchMatchInTitle || contextMatches || matchingLabels.length > 0;
        });

        var matchingEntriesLabels = this.getLabelsFromEntries(matchingEntries.toArray());

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
        var availableLabelsList = this.state.availableLabels.map(function(label){
            return <LabelItem key={label.name} label={label}/>
        });

        return (
            <div>
                <div className = "row">
                    <div className = "col-md-3">
                        <LabelAutocomplete availableLabels={Immutable.Set(this.state.availableLabels)} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(this.state.selectedLabels)}  disableCreationOfLabels={true} />
                        {availableLabelsList}
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
