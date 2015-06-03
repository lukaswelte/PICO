var LabelListPopover = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        availableLabels: React.PropTypes.instanceOf(Immutable.Set),
        onLabelsChanged: React.PropTypes.func,
        selectedLabels: React.PropTypes.instanceOf(Immutable.Set)
    },

    /*getInitialState: function(){
     return  {
     selectedLabels: new Immutable.Set()
     };
     },
     */
    handleShowPopover: function () {
        var labelListString = labelList.join("");
        console.log("Clicked show popover");
    },

    handleAddLabel: function (label) {
        console.log("Add label: " + JSON.stringify(label));
        var newLabels = this.props.selectedLabels.add(label);
        //var newLabels = this.props.selectedLabels.add(label);
        if (this.props.onLabelsChanged) {
            this.props.onLabelsChanged(newLabels);
        }
    },

    handleRemoveLabel: function (labelToRemove) {
        var selectedLabels = this.props.selectedLabels.filterNot(function (label) {
            return labelToRemove.name === label.name;
        });
        if (this.props.onLabelsChanged) {
            this.props.onLabelsChanged(selectedLabels);
        }
    },

    render: function () {
        var allLabels = this.props.availableLabels.toJS();
        var labelList = allLabels.map(function (label) {
            var filteredLabels = this.props.selectedLabels.filter(function (selectedLabel) {
                return label.name === selectedLabel.name;
            });
            if (filteredLabels.size > 0) {
                return <LabelItem onClick={this.handleAddLabel.bind(this, label)} key={label.name} label={label}
                                  onRemove={this.handleRemoveLabel.bind(this, label)}/>;
            }
            return <LabelItem onClick={this.handleAddLabel.bind(this, label)} key={label.name} label={label}/>;

        }.bind(this));


        return (
            <div>
                <button type="button" onClick={this.handleShowPopover} ref="PopoverButton" className="btn btn-default"
                        dataToggle="popover">
                    All available Labels
                </button>
                <div>
                    <div>
                        {labelList}
                    </div>
                </div>
            </div>
        );
    }

});

