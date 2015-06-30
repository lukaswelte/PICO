var SearchEntry = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        var fetchedEntries = flux.stores.EntryStore.getAllEntries().entries;
        return {
            entries: fetchedEntries,
            selectedLabels: [],
            currentInput: ""
        };
    },

    getLabelsFromEntries: function(entries) {
        var arrayOfArrays = entries.map(function(entry) {
            return entry.labels;
        });

        var fetchedEntriesLabels = [];
        for (i = 0; i < arrayOfArrays.length; i++) {

          //go through each label
          var labelsArray = arrayOfArrays[i];
          for (j = 0; j < labelsArray.length; j++) {
            var label = labelsArray[j];

            //only add the label if it does not already exist
            var isPart =  fetchedEntriesLabels.filter(function(addedLabel) {
                return label.name == addedLabel.name;
            });
            if (isPart.length == 0) {
              fetchedEntriesLabels.push(label);
            }
          }
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
        var lowerCaseInput = input.toLowerCase();
        var matchingEntries = this.state.entries.filter(function(entry) {
            var matchingLabels = entry.labels.filter(function(label) {
              return label.name.toLowerCase().search(input) != -1;
            });

            var contextMatches = false;
            if (entry.context != null) {
                contextMatches = entry.context.toLowerCase().search(lowerCaseInput) != -1;
            }

            var searchMatchInTitle = entry.title.toLowerCase().search(lowerCaseInput) != -1;
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
            return <div className="col-md-3 margin-top-25pt">
                     <EntryItem key={entry.id} entry={entry} />
                   </div>
        });

        /* The available labels shouldn't contain the labels which are already selected labels */
        var filteredAvailableLabels = availableLabels.filter( function(label) {
            var isPartOfSelectedLabel = this.state.selectedLabels.filter(function(selectedLabel) {
              return selectedLabel.name == label.name;
            });
            return isPartOfSelectedLabel.length == 0;
        }.bind(this));

        var availableLabelsList = filteredAvailableLabels.map(function(label){
            return <div>
                      <LabelItem key={label.name} onClick={this.handleOnLabelClick.bind(this, label)} label={label} />
                   </div>
        }.bind(this));


        return (
            <div style={{"marginLeft": "10pt", "marginRight": "10pt"}}>
                <div className="row">
                    <div className="col-md-3">
                        <LabelAutocomplete availableLabels={Immutable.Set(filteredAvailableLabels)} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(this.state.selectedLabels)}  disableCreationOfLabels={true} />
                        <hr />
                        {availableLabelsList}
                    </div>
                    <div className="col-md-9">
                        <div>
                            <input value={this.state.currentInput} onChange={this.handleInputChange} placeholder="Search for a term that matches in the title or context of your entries" />
                        </div>
                        <div className="row">
                            {searchResult.size == 0 ? <div className="col-md-3 margin-top-25pt">No entries found.</div> : searchResult}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});
