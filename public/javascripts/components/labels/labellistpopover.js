var LabelListPopover = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        availableLabels: React.PropTypes.instanceOf(Immutable.Set),
        onLabelsChanged: React.PropTypes.func,
        selectedLabels: React.PropTypes.instanceOf(Immutable.Set)
    },
    
    handleShowPopover: function () {
        console.log("Clicked show popover");
        if(document.getElementById('label-list').style.display == 'block'){
            document.getElementById('label-list').style.display = 'none';
        } else {
            document.getElementById('label-list').style.display = 'block';
        }
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
                <button type="button" onClick={this.handleShowPopover} ref="PopoverButton" className="button-icon label-icon"
                        dataToggle="popover">
                   <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                </button>
                <div id="label-list" className="box">
                    <div className="label-list-item">
                        {labelList}
                    </div>
                </div>
            </div>
        );
    }

});

