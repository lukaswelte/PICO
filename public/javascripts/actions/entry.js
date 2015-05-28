var entryActions = {
    fetchAllEntries: function() {
        var dispatcher = this;
        $.get("/api/entry", function( response ) {
            if(response != null){
                if(response.status == 200){
                    dispatcher.dispatch(entryStoreActions.UPDATE_ALL, response.data);
                }
            }
        });
    },

    createEntry: function(entry) {
        var dispatcher = this;
        $.ajax("/api/entry", {
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(entry),
            processData: false,
            dataType: 'json',
            success: function(response){
                if(response != null && response.status == 200){
                    dispatcher.dispatch(entryStoreActions.UPDATE, response.data);
                    router.transitionTo("showentry");
                }
            },
            error: function(response){
                console.log("Failed: "+response);
            }
        });
    }
};
