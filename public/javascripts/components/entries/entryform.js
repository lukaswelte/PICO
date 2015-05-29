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

    handleURLChange: function(event) {
        var newURL = event.target.value;
        this.getFlux().actions.entry.updateAndValidateEntryToCreate(this.props.entry.title, newURL, this.props.entry.context);
    },

    handleTitleChange: function(event) {
        var newTitle = event.target.value;
        this.getFlux().actions.entry.updateAndValidateEntryToCreate(newTitle, this.props.entry.url, this.props.entry.context);
    },

    handleContextChange: function(event) {
        var newContext = event.target.value;
        this.getFlux().actions.entry.updateAndValidateEntryToCreate(this.props.entry.title, this.props.entry.url, newContext);
    },

    handleSaveEntry: function() {
        this.getFlux().actions.entry.createEntry(this.props.entry.title, this.props.entry.url, this.props.entry.context);
    },

    handleCancel: function () {
        this.getFlux().actions.entry.resetCreateEntry();
        this.getFlux().actions.router.back();
    },

    render: function() {
        var imageStyles = {
            maxWidth: '30%'
        };

        var entry = this.props.entry;

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
                 </label>
                 <br />
                 <label>
                     Title:<br />
                     {titleError}
                     <input name="title" type="text" value={entry.title} onChange={this.handleTitleChange} required />
                 </label>
                 <br />
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
