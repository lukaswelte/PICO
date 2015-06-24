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

    handleOnLabelsChanged: function(newLabels) {
        var selectedLabels = newLabels;

    },

    handleInputChange: function(event) {
        var input = event.target.value;

        //compute the suggestions based on the title and the context of an entry
        var matchingEntries = this.state.entries.filter(function(entry) {
            var matchingLabels = entry.labels.filter(function(label){return !label.name.search(input);});
            return !entry.title.search(input)|| !entry.context.search(input) || matchingLabels.length > 0;
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
        {/*var labels = this.state.suggestedEntries.labels.toSet().merge(entry.labels);*/}

        return (
            <div>
                <div className = "row">
                    <div className = "col-md-3">
                        {/* Ich denke das funktioniert nicht, weil ich von mehreren entries labels möchte, das heißt ich müsste da erstmal mapen*/}
                        <LabelAutocomplete availableLabels={labels} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(this.state.suggestedEntries.labels)} />
                        {/*<LabelAutocomplete availableLabels={labels} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(entry.labels)} />*/}
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

