var EntryDetail = React.createClass ({
    mixins: [FluxMixin],

    propTypes: {
        entry: React.PropTypes.object.isRequired
    },

    render: function () {
        // Since the entry doesn't excist from the very beginning, there must be a check if the labels of the entry are null before mapping on them
        var labelsDiv;
        if (this.props.entry.labels == null) {
            labelsDiv = <p className="box">Labels: NO LABELS</p>;
        } else {
            labelsDiv = <p className="box">Labels: {this.props.entry.labels.map(function(label){ return <span>{label.name}, </span>})}</p>;
        }

        return (
            <div>
                {/* Showing the details of the fetched entry */}
                <div className="row">
                    <div className="col-md-8">
                        <p className="box">Das ist die Entry mit der ID {this.props.entry.id}</p>
                        <p className="box">URL: {this.props.entry.url}</p>
                        <p className="box">Titel: {this.props.entry.title}</p>
                        {labelsDiv}
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
