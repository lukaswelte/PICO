var ShareEntry = React.createClass({
    mixins: [FluxMixin],

    //propTypes: {
    //    entry: React.PropTypes.object.isRequired
    //},

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
                <div className="col-md-1">
                    <button type="button" onClick={this.handleShowPopover} className="btn btn-default" dataToggle="popover">Share</button>
                </div>
                <div id="share-list" className="box">
                    <a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a>
                </div>
            </div>
        );
    }
});

