var EntryDetail = React.createClass ({
    mixins: [FluxMixin, StoreWatchMixin ("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.stores.EntryStore.getAllEntries();
    },

    propTypes: {
        entry: React.PropTypes.object.isRequired
    },



    handleRecommendation:function(){
        var entry = this.props.entry;
        this.getFlux().actions.recommendation.updateRecommendation(entry);
    },

    handleShowPopover: function() {
        if (document.getElementById('share-list').style.display == 'block') {
            document.getElementById('share-list').style.display = 'none';
        } else {
            document.getElementById('share-list').style.display = 'block';
        }
    },

    handleDeleteEntry: function() {
        var entry = this.props.entry;
        this.getFlux().actions.entry.deleteEntry(entry.id)
    },

    render: function () {
        var entry = this.props.entry;
    	var previewImage;
    	if (this.props.entry.previewImage) {
    	 	previewImage = <img src={"data:image/png;base64,".concat(this.props.entry.previewImage)} />;
    	 } else {
    	 	previewImage = <img src={"/api/entry/previewimage/"+encodeURIComponent(this.props.entry.url)} />;
    	 }

        var generatedUrl = window.location.origin + "/sharedentry/" + entry.publicUrl;

        return (
            <div>
                {/* Showing the details of the fetched entry */}
                <div className="row padding-top-2em padding-bottom-1em">
                    <div className="col-md-1"></div>
                    <div className="col-md-6">
                        <p className="box">URL: {this.props.entry.url}</p>
                        <p className="box">Titel: {this.props.entry.title}</p>
                        <div className="box">Labels: {this.props.entry.labels.map(function(label, index){ return <LabelItem key={index} label={label} />})}</div>
                    </div>
                    <div className="col-md-4">
                        {previewImage}
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row padding-top-1em">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <p className="box height-15em">Context: {this.props.entry.context}</p>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-1">
                        <button onClick={this.handleDeleteEntry} className="btn btn-default">Delete</button>
                    </div>
                    <div className="col-md-1">
                        <Link to="editEntry" params={{id: entry.id}} className="btn btn-default">Edit</Link>
                    </div>
                    <div className="col-md-7"></div>
                    <div className="col-md-1">
                            <div className="col-md-1">
                                <button type="button" onClick={this.handleShowPopover} className="btn btn-default" dataToggle="popover">Share</button>
                                <div id="share-list" className="share-box height-8em width-35-5em">
                                        <p className="share-box width-23.5em">{generatedUrl}</p>
                                        <div>
                                            <center>
                                                <a href={"mailto:?subject=Check%20out%20my%20new%20PICO%20entry!&body="+generatedUrl}><img src="/static/images/email.png" className="share-button"></img></a>
                                                <a href={"https://twitter.com/share?text=Check%20out%20my%20PICO%20entry%20"+generatedUrl} target="_blank"><img src="/static/images/twitter.png" className="share-button"></img></a>
                                                <a href="https://www.facebook.com/sharer.php?u=" target="_blank"><img src="/static/images/facebook.png" className="share-button"></img></a>
                                                <a href="https://plus.google.com/share?url=" target="_blank"><img src="/static/images/google+.png" className="share-button"></img></a>
                                            </center>
                                        </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <footer className="footer">
                    <div className="container-fluid1">
                        <span className="" type="button" onClick={this.handleRecommendation} data-toggle="collapse" data-target="#collapseBeispiel" aria-expanded="false" aria-controls="collapseBeispiel">
                        <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                        <span className="text-muted"> Recommendation</span>
                        </span>
                        <div className="collapse" id="collapseBeispiel">
                            <div className="well1">
                                    <RecommendationList />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
});
