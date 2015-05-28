var EntryDetail = React.createClass ({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        // Our entire state is made up of the TodoStore data. In a larger
        // application, you will likely return data from multiple stores, e.g.:
        //
        //   return {
        //     todoData: flux.store("TodoStore").getState(),
        //     userData: flux.store("UserStore").getData(),
        //     fooBarData: flux.store("FooBarStore").someMoreData()
        //   };

        return {
            entry: flux.stores.EntryStore.getEntryById(1)
        };
    },

    render: function () {
        // Since the entry doesn't excist from the very beginning, there must be a check if the labels of the entry are null before mapping on them
        var labelsDiv;
        if (this.state.entry.labels == null) {
            labelsDiv = <p className="box">Labels: NO LABELS</p>;
        } else {
            labelsDiv = <p className="box">Labels: {this.state.entry.labels.map(function(label){ return <span>{label.name}, </span> })}</p>;
        }

        return (
            <div>
                {/* Showing the details of the fetched entry */}
                <div className="row">
                    <div className="col-md-8">
                        <p className="box">Das ist die Entry mit der ID {this.state.entry.id}</p>
                        <p className="box">URL: {this.state.entry.url}</p>
                        <p className="box">Titel: {this.state.entry.title}</p>
                        {labelsDiv}
                    </div>
                    <div className="col-md-4">
                        Image:
                        {/*TODO: Mit Lukas genau abchecken was wir als previewImage bekommen
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA...*/}
                    </div>
                </div>
                <div className="row padding-top-1em">
                    <div className="col-md-12">
                        <p className="box height-15em">Context: {this.state.entry.context}</p>
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