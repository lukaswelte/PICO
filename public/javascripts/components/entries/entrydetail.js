var EntryDetail = React.createClass ({
    mixins: [FluxMixin, StoreWatchMixin ("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.stores.EntryStore.getAllEntries();
    },

    propTypes: {
        entry: React.PropTypes.object.isRequired
    },

    render: function () {
        var entry = this.props.entry;
    	var previewImage;
    	if (this.props.entry.previewImage) {
    	 	previewImage = <img src={"data:image/png;base64,".concat(this.props.entry.previewImage)} />;
    	 } else {
    	 	previewImage = <img src={"/api/entry/previewimage/"+encodeURIComponent(this.props.entry.url)} />;
    	 }
    	
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
                        <a href="#" className="btn btn-default">Delete</a>
                    </div>
                    <div className="col-md-1">
                        <Link to="editEntry" params={{id: entry.id}}>Edit</Link>
                    </div>
                    <div className="col-md-7"></div>
                    <div className="col-md-1">
                        <a href="#" className="btn btn-default">Share</a>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <footer className="footer">
                    <div className="container-fluid padding-down-1em">
                        <span className="" type="button" data-toggle="collapse" data-target="#collapseBeispiel" aria-expanded="false" aria-controls="collapseBeispiel">
                        <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                        <span className="text-muted"> Recommendation</span>
                        </span>
                        <div className="collapse" id="collapseBeispiel">
                            <div className="well">
                                {this.state.entries.map(function(entry){
                                    return <EntryItem key={entry.id} entry={entry} />
                                })}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }


});
