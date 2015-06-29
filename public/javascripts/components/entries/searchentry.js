var SearchEntry = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        var fetchedEntries = flux.stores.EntryStore.getAllEntries().entries;
        return {
            entries: fetchedEntries,
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
        var selectedLabels = newLabels.toJS();

        this.setState({
            selectedLabels: selectedLabels
        });

    },

    handleInputChange: function(event) {
        var input = event.target.value;

        this.setState({
            currentInput: input
        });
    },

    handleOnLabelClick: function(label) {
        console.log("HALLO?!");
        var newSelectedLabels = this.state.selectedLabels;
        newSelectedLabels.push(label);

        this.setState({
            selectedLabels: newSelectedLabels
        });
    },

    render: function () {
        /** filtering **/
        //compute the suggestions based on the title and the context of an entry
        var input = this.state.currentInput;
        var matchingEntries = this.state.entries.filter(function(entry) {
            var matchingLabels = entry.labels.filter(function(label){return !label.name.search(input);});

            var contextMatches = false;
            if (entry.context != null) {
                contextMatches = !entry.context.search(input);
            }

            var searchMatchInTitle = !entry.title.search(input);
            return searchMatchInTitle || contextMatches || matchingLabels.length > 0;
        });

        //filter entries if labels exist
        var selectedLabels = this.state.selectedLabels;
        matchingEntries = matchingEntries.filter(function(entry) {

            var labelsPartOfSelectedLabels = entry.labels.filter(function(label){
                var isPart =  selectedLabels.filter(function(selectedLabel) {
                    return label.name == selectedLabel.name;
                });
                return isPart.length > 0;
            });

            return labelsPartOfSelectedLabels.length == selectedLabels.length;
        });

        var availableLabels = this.getLabelsFromEntries(matchingEntries.toArray());

        /** filtering end **/


        var searchResult = matchingEntries.map(function(entry){
            return <EntryItem key={entry.id} entry={entry} />
        });

        /* The available labels shouldn't contain the labels which are already selected labels */
        var filteredAvailableLabels = availableLabels.filter( function(label) {
            var toRemove = this.state.selectedLabels;
            return toRemove.indexOf(label) < 0;
        }.bind(this));

        var availableLabelsList = filteredAvailableLabels.map(function(label){
            return <LabelItem key={label.name} onClick={this.handleOnLabelClick.bind(this, label)} label={label}/>
        }.bind(this));


        return (
            <div>
                <div className = "row">
                    <div className = "col-md-3">
                        <LabelAutocomplete availableLabels={Immutable.Set(availableLabels)} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(this.state.selectedLabels)}  disableCreationOfLabels={true} />
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
