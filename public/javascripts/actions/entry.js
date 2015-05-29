var entryActions = {
    fetchAllEntries: function() {
        $.get("/api/entry", function( response ) {
            if(response != null && response.status == 200){
                this.dispatch(entryStoreActions.UPDATE_ALL, response.data);
            }
        }.bind(this));
    },

    resetCreateEntry: function() {
        this.dispatch(entryStoreActions.RESET_CREATE);
    },

    updateAndValidateEntryToCreate: function(title, url, context) {
        var entry = {
            url: url,
            title: title,
            context: context
        };

        //initialize the errors map
        var noErrors = Immutable.Map();
        var errors = noErrors;

        //validate url
        var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (entry.url.match(urlRegex)) {
            //check if url does not start with http
            if (!entry.url.startsWith("http")) {
                //prepend http:// to the url
                entry.url = "http://".concat(entry.url);
            }
        } else {
            //URL is invalid
            errors = errors.set('url', "Invalid URL");
        }

        //validate title
        if (entry.title.trim().length <= 0) {
            //title is empty
            errors = errors.set('title', "You must specify a title");
        }

        //Check if there where errors and if not the entry is valid
        entry.valid = errors === noErrors;

        this.dispatch(entryStoreActions.UPDATE_CREATE, entry);
        this.dispatch(entryStoreActions.ERROR_CREATE, errors.toJS());
    },

    createEntry: function(title, url, context) {
        //inform that save is in progress
        this.dispatch(entryStoreActions.UPDATE_CREATE, {saving: true});

        //construct the entry that the API needs as input
        var entry = {
            url: url,
            title: title,
            context: context
        };

        //do the ajax request to the API
        $.ajax("/api/entry", {
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(entry),
            processData: false,
            dataType: 'json',
            success: function(response){
                if(response != null && response.status == 200){
                    var returnedEntry = response.data;

                    //tell that the entry should be saved
                    this.dispatch(entryStoreActions.SUCCESS_CREATE, {entry: returnedEntry});

                    //transition to the created entry
                    this.flux.actions.router.transition("showEntry", {id: returnedEntry.id});

                    //reset the created entry so that we can create another one
                    this.dispatch(entryStoreActions.RESET_CREATE);
                }
            }.bind(this),
            error: function(response){
                //for debugging print response to the console
                console.log("error on create: "+JSON.stringify(response));

                //inform that we are no longer saving
                this.dispatch(entryStoreActions.UPDATE_CREATE, {saving: false});

                //inform about the error
                this.dispatch(entryStoreActions.ERROR_CREATE, {global: "An error occurred please check your input and try again."});
            }.bind(this)
        });
    }
};
