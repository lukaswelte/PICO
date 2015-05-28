var entryActions = {
    fetchAllEntries: function() {
        var fetchedEntries = this;
        $.get( "/api/entry", function( response ) {
            if(response != null){
                if(response.status == 200){
                    fetchedEntries.dispatch(entryStoreActions.UPDATE_ALL, response.data);
                }
            }
        });
    }
};