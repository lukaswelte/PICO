//Key Constants
const Keys = {
    ENTER: 13,
    TAB: 9,
    BACKSPACE: 8,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    ESCAPE: 27
};

var LabelAutocomplete = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        availableLabels: React.PropTypes.instanceOf(Immutable.Set),
        initialSelectedLabels: React.PropTypes.instanceOf(Immutable.Set),
        onLabelsChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            availableLabels: new Immutable.Set(),
            initialSelectedLabels: new Immutable.Set(),
            onLabelsChanged: function(){}
        };
    },

    getInitialState: function() {
        var selectedLabels = new Immutable.Set(this.props.initialSelectedLabels);

        return {
            currentInput: "",
            selectedLabels: selectedLabels,
            suggestedLabels: new Immutable.List()
        };
    },

    handleKeyDown: function(e) {
        switch(e.keyCode) {
            case Keys.ENTER:
                e.preventDefault();
                this.handleAddLabel(this.state.currentInput);
                break;
        }
    },

    handleInputChange: function(event) {
        var input = event.target.value;
        var matchingLabels = this.props.availableLabels.filter(function(label) {
            return label.name.toLowerCase().search(input.toLowerCase()) === 0;
        });

        this.setState({
            currentInput: input,
            suggestedLabels: matchingLabels.toList()
        });
    },

    handleAddLabel: function(labelName) {
        //check if a label with the same name is already selected
        var alreadyLabelWithNameSelected = this.state.selectedLabels.filter(function(label) {
            return label.get("name", "").toLowerCase() === labelName.toLowerCase();
        }).size > 0;
        if (!alreadyLabelWithNameSelected) {

            //there is no label with the same name so add the label
            var newLabel = new Immutable.Map({name: labelName});
            var selectedLabels = this.state.selectedLabels.add(newLabel);
            this.setState({currentInput: ""});
            this.changeLabels(selectedLabels);
        }
    },

    handleSuggestionClick: function(i, e) {
        var labelToAdd = this.state.suggestedLabels.get(i);
        if (labelToAdd) {
            this.handleAddLabel(labelToAdd.name);
        }
    },

    handleRemoveLabel: function(labelToRemove) {
        console.log("remove label: " + JSON.stringify(labelToRemove));
        var immutableLabelToRemove = new Immutable.Map(labelToRemove);
        var selectedLabels = this.state.selectedLabels.filterNot(function (label) {

            return immutableLabelToRemove.get("name") === label.get("name");
        });
        this.changeLabels(selectedLabels);
    },

    changeLabels: function(newLabels) {
        this.setState({
            selectedLabels: newLabels
        });
        this.props.onLabelsChanged(newLabels);
    },

    render: function() {
        var selectedLabels = this.state.selectedLabels.toJS();
        var selectedLabelItems = selectedLabels.map(function(label) {
           return <LabelItem key={label.name} label={label} onRemove={this.handleRemoveLabel.bind(this, label)} />
        }.bind(this));

        var suggestedLabelNames = this.state.suggestedLabels.map(function(label){
           return label.name;
        }).toArray();

        return(
            <div>
                <div>
                    {selectedLabelItems}
                </div>
                <div>
                    <input onKeyDown={this.handleKeyDown} value={this.state.currentInput} onChange={this.handleInputChange} />
                    <Suggestions suggestions={suggestedLabelNames} handleClick={this.handleSuggestionClick} />
                </div>
            </div>
        );
    }
});

var Suggestions = React.createClass({
    propTypes: {
        suggestions: React.PropTypes.array.isRequired,
        handleClick: React.PropTypes.func.isRequired
    },

    render: function() {
        var props = this.props;
        var suggestions = this.props.suggestions.map(function(item, i) {
            return (
                <li key={i}
                    onClick={props.handleClick.bind(null, i)}>
                    <span>{item}</span>
                </li>
            )
        }.bind(this));

        if (suggestions.length === 0) {
            return <div></div>
        }

        return (
            <div>
                <ul> { suggestions } </ul>
            </div>
        )
    }
});