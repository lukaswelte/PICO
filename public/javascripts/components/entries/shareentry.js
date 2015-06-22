var ShareEntry = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        entry: React.PropTypes.object.isRequired
    },

    handleShowPopover: function() {
        if (document.getElementById('share-list').style.display == 'block') {
            document.getElementById('share-list').style.display = 'none';
        } else {
            document.getElementById('share-list').style.display = 'block';
        }
    },

    render: function() {
        return (
            <div>
                <button type="button" onClick={this.handleShowPopover} ref="PopoverButton" className="button-icon share-icon"
                        dataToggle="popover">
                </button>
            </div>
        );
    }
});
