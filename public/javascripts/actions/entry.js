var entryActions = {
    resetCreateEntry: function() {
        this.dispatch(entryStoreActions.RESET_CREATE);
    },

    updateAndValidateEntryToCreate: function(title, url, context, labels) {
        var entry = {
            url: url,
            title: title,
            context: context,
            labels: labels
        };

        //initialize the errors map
        var noErrors = Immutable.Map();
        var errors = noErrors;

        //validate url
        var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (entry.url.match(urlRegex)) {
            //check if url does not start with http
            var httpString = "http";
            if (!(entry.url.substring(0, httpString.length) === httpString)) {
                //prepend http:// to the url
                entry.url = "http://".concat(entry.url);
            }

            // check if entry with this url already exists
            var duplicateEntry = this.flux.stores.EntryStore.getEntryByUrl(entry.url);
            if (duplicateEntry != null) {
                errors = errors.set('duplicateEntry', duplicateEntry);
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

    updateAndValidateEntryToUpdate: function(id, title, url, context, labels){
         var entry = {
              id: id,
              url: url,
              title: title,
              context: context,
              labels: labels
        };

        //initialize the errors map
        var noErrors = Immutable.Map();
        var errors = noErrors;

        //validate url
        var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (entry.url.match(urlRegex)) {
            //check if url does not start with http
            var httpString = "http";
            if (!(entry.url.substring(0, httpString.length) === httpString)) {
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

        this.dispatch(entryStoreActions.UPDATE_EDIT, entry);
        this.dispatch(entryStoreActions.ERROR_EDIT, errors.toJS());
    },

    createEntry: function(title, url, context, labels) {
        //inform that save is in progress
        this.dispatch(entryStoreActions.UPDATE_CREATE, {saving: true});

        var labelNameArray = labels.map(function (label){
            return label.name
        });

        //construct the entry that the API needs as input
        var entry = {
            url: url,
            title: title,
            context: context,
            labels: labelNameArray
        };

        //do the ajax request to the API
        API.entry.create(entry, {
            success: function(response){
                if(response != null && response.status == 200){
                    var returnedEntry = response.data;

                    //tell that the entry should be saved
                    this.dispatch(entryStoreActions.SUCCESS_CREATE, {entry: returnedEntry});

                    returnedEntry.labels.forEach(function (label) {
                        this.dispatch(labelStoreActions.UPDATE, label);
                    }.bind(this));


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
    },

    editEntry: function(id, title, url, context, labels) {
        //construct the entry that the API needs as input
        var entry = {
            url: url,
            title: title,
            context: context,
            labels: labels,
            saving: true,
            valid: true
        };

        //inform that save is in progress
        this.dispatch(entryStoreActions.UPDATE_EDIT, entry);

        var labelNameArray = labels.map(function (label){
            return label.name
        });

        //construct the entry that the API needs as input
        var apiEntry = {
            url: url,
            title: title,
            context: context,
            labels: labelNameArray
        };

        //do the ajax request to the API
        API.entry.edit(id, apiEntry, {
            success: function(response){
                if(response != null && response.status == 200){
                    var returnedEntry = response.data;

                    //tell that the entry should be saved
                    this.dispatch(entryStoreActions.SUCCESS_EDIT, {entry: returnedEntry});

                    returnedEntry.labels.forEach(function (label) {
                        this.dispatch(labelStoreActions.UPDATE, label);
                    }.bind(this));

                    //transition to the created entry
                    this.flux.actions.router.transition("showEntry", {id: returnedEntry.id});
                }
            }.bind(this),
            error: function(response){
                //for debugging print response to the console
                console.log("error on edit: "+JSON.stringify(response));

                //inform that we are no longer saving
                entry = entry.saving = false;
                this.dispatch(entryStoreActions.UPDATE_EDIT, entry);

                //inform about the error
                this.dispatch(entryStoreActions.ERROR_EDIT, {global: "An error occurred please check your input and try again."});
            }.bind(this)
        });
    }

};
