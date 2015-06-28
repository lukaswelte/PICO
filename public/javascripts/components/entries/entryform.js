var EntryForm = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("LabelStore")],

    propTypes: {
        entry: React.PropTypes.object.isRequired
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            availableLabels: flux.stores.LabelStore.getAllLabels()
        };
    },

    updateAndValidateEntry: function(entry) {
        if (entry.id != null){
            console.log("Juhu er ist in der If");
            this.getFlux().actions.entry.updateAndValidateEntryToUpdate(entry.id, entry.title, entry.url, entry.context, entry.labels);
        } else{
            console.log("Er ist nicht in der If");
            this.getFlux().actions.entry.updateAndValidateEntryToCreate(entry.title, entry.url, entry.context, entry.labels);
        }
    },

    handleURLChange: function(event) {
        var newURL = event.target.value;
        var entry = this.props.entry;
        entry.url = newURL;
        this.updateAndValidateEntry(entry);
    },

    handleTitleChange: function(event) {
        var newTitle = event.target.value;
        var entry = this.props.entry;
        entry.title = newTitle;
        this.updateAndValidateEntry(entry);
    },

    handleContextChange: function(event) {
        var newContext = event.target.value;
        var entry = this.props.entry;
        entry.context = newContext;
        this.updateAndValidateEntry(entry);
    },

    handleSaveEntry: function() {
        var entry = this.props.entry;
        if (entry.getID != null){
            this.getFlux().actions.entry.editEntry(entry.getID, entry.title, entry.url, entry.context, entry.labels);
        }
        this.getFlux().actions.entry.createEntry(entry.title, entry.url, entry.context, entry.labels);
    },

    handleCancel: function () {
        this.getFlux().actions.entry.resetCreateEntry();
        this.getFlux().actions.router.back();
    },

    handleOnLabelsChanged: function(newLabels) {
        var entry = this.props.entry;
        entry.labels = newLabels;
        this.updateAndValidateEntry(entry);
    },

    render: function() {
        var imageStyles = {
            width: '90%',
            paddingBottom: '1em'
        };

        var entry = this.props.entry;

        var previewImagePlaceholder = "/static/images/placeholder.png";
        var previewImageURL = "/api/entry/previewimage/"+encodeURIComponent(entry.url);
        if (!entry.url || entry.url.trim().length <= 0) {
            //No url is set so do not display a preview image
            previewImageURL = previewImagePlaceholder;
        }

        var urlError = "";
        if (entry.errors && entry.errors.url) {
            urlError = entry.errors.url;

            //there was a error with the url so do not try displaying the preview image
            previewImageURL = previewImagePlaceholder;
        }

        var duplicateEntryError = "";
        if (entry.errors && entry.errors.duplicateEntry) {
            duplicateEntryError = <div>An entry with this Url already exists: <Link to="showEntry" params={{id: entry.errors.duplicateEntry.id}}>{entry.errors.duplicateEntry.title}</Link></div>;
        }

        var titleError = "";
        if (entry.errors && entry.errors.title) {
            titleError = entry.errors.title;
        }

        var globalError = "";
        if (entry.errors && entry.errors.global) {
            globalError = entry.errors.global;
        }

        //Display a message if the entry is currently saving, maybe a loading spinner would be nicer
        var savingMessage = "";
        if (entry.saving) {
            savingMessage = "Save is in progress, please wait...";
        }

        var labels = this.state.availableLabels.labels.toSet().merge(entry.labels);

        return (
            <div>
                <div className="row padding-top-2em">
                    <div className="col-md-1"></div>
                    <div className="col-md-6">
                        {globalError}
                        <label>
                            {/* URL */}
                            <input name="url" type="url" value={entry.url} onChange={this.handleURLChange} required placeholder="URL" />
                            {urlError}
                            {duplicateEntryError}
                        </label>
                        <p className="">
                            <label>
                                {/* Title */}
                                {titleError}
                                <input name="title" type="text" value={entry.title} onChange={this.handleTitleChange} required placeholder="Title" />
                            </label>
                        </p>
                        <p className="">
                            {/* Labels */}
                            <div className="label-div-icon">
                                <LabelListPopover availableLabels={labels} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(entry.labels)} />
                            </div>
                            <LabelAutocomplete availableLabels={labels} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(entry.labels)} />
                        </p>
                    </div>
                    <div className="col-md-4">
                        <img style={imageStyles} src={previewImageURL} />
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row padding-top-1em">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <label>
                            {/* Context */}
                            <textarea name="context" value={entry.context} onChange={this.handleContextChange} placeholder="Context"/>
                        </label>
                        {savingMessage}
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-1">
                        <button type="button" onClick={this.handleCancel} disabled={entry.saving} className="btn btn-default">Cancel</button>
                    </div>
                    <div className="col-md-1">
                        <button type="submit" onClick={this.handleSaveEntry} disabled={!entry.valid || entry.saving} className="btn btn-default">Save</button>
                    </div>
                    <div className="col-md-8"></div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        );
    }
});
