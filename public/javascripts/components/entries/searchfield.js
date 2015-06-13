var SearchField = React.createClass({
    mixins: [FluxMixin],

    render: function () {
        return (
            <div>
                huhu
                <div>
                    <input onKeyDown={this.handleKeyDown} value={this.state.currentInput} onChange={this.handleInputChange} placeholder="Search for an entry"/>
                </div>
                <div>
                    {selectedEntryItems}
                </div>
            </div>
        );
    }

});

