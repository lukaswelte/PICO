var EntryForm = React.createClass({
    mixins: [FluxMixin],

    getInitialState: function() {
        return {
            url: "",
            title: "",
            context: ""
        };
    },

    handleURLChange: function(event) {
        var newURL = event.target.value;

        var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (newURL.match(urlRegex)) {
            if (!newURL.startsWith("http")) {
                newURL = "http://".concat(newURL);
            }
            this.setState({
                url: newURL,
                urlError: null
            });
        } else {
            this.setState({
                url: newURL,
                urlError: "Invalid URL"
            });
        }
    },

    handleTitleChange: function(event) {
        var newTitle = event.target.value;
        if (newTitle.trim().length <= 0) {
            this.setState({
                title: newTitle,
                titleError: "You need to define a title"
            });
        } else {
            this.setState({
                title: newTitle,
                titleError: null
            });
        }
    },

    handleContextChange: function(event) {
        var newContext = event.target.value;
        this.setState({context: newContext});
    },

    handleSaveEntry: function() {
        this.getFlux().actions.entry.createEntry(this.state.title, this.state.url, this.state.context);
    },

    render: function() {
        return (
            <div>
                 <label>
                     URL:<br />
                     {this.state.urlError}
                     <input name="url" type="url" value={this.state.url} onChange={this.handleURLChange} required />
                 </label>
                 <br />
                 <label>
                     Title:<br />
                     {this.state.titleError}
                     <input name="title" type="text" value={this.state.title} onChange={this.handleTitleChange} required />
                 </label>
                 <br />
                 <label>
                     Context:<br />
                     <textarea name="context" value={this.state.context} onChange={this.handleContextChange} />
                 </label>
                 <br />

                 <button type="button">Cancel</button>
                 <button type="submit" onClick={this.handleSaveEntry}>Save</button>
            </div>
        );
    }
});
