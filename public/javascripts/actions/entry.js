var entryActions = {
    fetchAllEntries: function() {
        var irgendwie = this;
        $.get( "/api/entry", function( response ) {
            if(response != null){
                if(response.status == 200){
                    irgendwie.dispatch(entryStoreActions.UPDATE_ALL, response.data);
                }
            }
        });
    }
};