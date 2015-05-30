var EntryDetail = React.createClass ({
    mixins: [FluxMixin],

    propTypes: {
        entry: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <div>
                {/* Showing the details of the fetched entry */}
                <div className="row">
                    <div className="col-md-8">
                        <p className="box">Das ist die Entry mit der ID {this.props.entry.id}</p>
                        <p className="box">URL: {this.props.entry.url}</p>
                        <p className="box">Titel: {this.props.entry.title}</p>
                        <div className="box">Labels: {this.props.entry.labels.map(function(label, index){ return <LabelItem key={index} label={label} />})}</div>
                    </div>
                    <div className="col-md-4">
                        Image:
                        <img src={"data:image/png;base64,".concat(this.props.entry.previewImage)} />
                    </div>
                </div>
                <div className="row padding-top-1em">
                    <div className="col-md-12">
                        <p className="box height-15em">Context: {this.props.entry.context}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <a href="#" className="btn btn-default">Löschen</a>
                    </div>
                    <div className="col-md-1">
                        <a href="#" className="btn btn-default">Editieren</a>
                    </div>
                    <div className="col-md-9"></div>
                    <div className="col-md-1">
                        <a href="#" className="btn btn-default">Share</a>
                    </div>
                </div>
            </div>
        );
    }


});
