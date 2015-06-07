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
        availableLabels: React.PropTypes.instanceOf(Immutable.Set).isRequired,
        selectedLabels: React.PropTypes.instanceOf(Immutable.Set).isRequired,
        onLabelsChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onLabelsChanged: function(){}
        };
    },

    getInitialState: function() {
        return {
            currentInput: "",
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
        var alreadyLabelWithNameSelected = this.props.selectedLabels.filter(function(label) {
            return label.name.toLowerCase() === labelName.toLowerCase();
        }).size > 0;
        if (!alreadyLabelWithNameSelected) {

            //there is no label with the same name so add the label
            var newLabel = new Immutable.Map({name: labelName});
            var selectedLabels = this.props.selectedLabels.add(newLabel);
            this.setState({currentInput: ""});
            this.props.onLabelsChanged(selectedLabels);
        }
    },

    handleSuggestionClick: function(i, e) {
        var labelToAdd = this.state.suggestedLabels.get(i);
        if (labelToAdd) {
            this.handleAddLabel(labelToAdd.name);
        }
    },

    handleRemoveLabel: function(labelToRemove) {
        var selectedLabels = this.props.selectedLabels.filterNot(function (label) {
            return labelToRemove.name === label.name;
        });
        this.props.onLabelsChanged(selectedLabels);
    },

    render: function() {
        var selectedLabelItems = this.props.selectedLabels.map(function(label) {
           return <LabelItem key={label.name} label={label} onRemove={this.handleRemoveLabel.bind(this, label)} />
        }.bind(this));

        var suggestedLabelNames = this.state.suggestedLabels.map(function(label){
           return label.name;
        }).toArray();

        return(
            <div>
                <div>
                    <input onKeyDown={this.handleKeyDown} value={this.state.currentInput} onChange={this.handleInputChange} placeholder="Labels"/>
                    <Suggestions suggestions={suggestedLabelNames} handleClick={this.handleSuggestionClick} />
                </div>
                <div>
                    {selectedLabelItems}
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
