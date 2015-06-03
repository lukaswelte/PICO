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
        this.getFlux().actions.entry.updateAndValidateEntryToCreate(entry.title, entry.url, entry.context, entry.labels);
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
            maxWidth: '30%'
        };

        var entry = this.props.entry;
        var labels = this.state.availableLabels.labels.toSet();

        var previewImageURL = "/api/entry/previewimage/"+encodeURIComponent(entry.url);
        if (!entry.url || entry.url.trim().length <= 0) {
            //No url is set so do not display a preview image
            previewImageURL = "";
        }

        var urlError = "";
        if (entry.errors && entry.errors.url) {
            urlError = entry.errors.url;

            //there was a error with the url so do not try displaying the preview image
            previewImageURL = "";
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

        return (
            <div>
                {globalError}

                 <img style={imageStyles} src={previewImageURL} />
                 <br />

                 <label>
                     URL:<br />
                     {urlError}
                     <input name="url" type="url" value={entry.url} onChange={this.handleURLChange} required />
                     {duplicateEntryError}
                 </label>
                 <br />
                 <label>
                     Title:<br />
                     {titleError}
                     <input name="title" type="text" value={entry.title} onChange={this.handleTitleChange} required />
                 </label>
                 <br />
                 <b>Labels:</b><br />
                 <LabelAutocomplete availableLabels={labels} onLabelsChanged={this.handleOnLabelsChanged} selectedLabels={Immutable.Set(entry.labels)} />
                 <label>
                     Context:<br />
                     <textarea name="context" value={entry.context} onChange={this.handleContextChange} />
                 </label>
                 <br />

                {savingMessage}
                 <button type="button" onClick={this.handleCancel} disabled={entry.saving}>Cancel</button>
                 <button type="submit" onClick={this.handleSaveEntry} disabled={!entry.valid || entry.saving}>Save</button>
            </div>
        );
    }
});
