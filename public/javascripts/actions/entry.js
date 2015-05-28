var entryActions = {
    fetchAllEntries: function() {
        $.get("/api/entry", function( response ) {
            if(response != null && response.status == 200){
                this.dispatch(entryStoreActions.UPDATE_ALL, response.data);
            }
        }.bind(this));
    },

    createEntry: function(title, url, context) {
        var entry = {
            url: url,
            title: title,
            context: context
        };

        $.ajax("/api/entry", {
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(entry),
            processData: false,
            dataType: 'json',
            success: function(response){
                if(response != null && response.status == 200){
                    this.dispatch(entryStoreActions.UPDATE, {entry: response.data, transitionToEntry: true});
                }
            }.bind(this),
            error: function(response){
                console.log("Failed: "+response);
            }
        });
    }
};
