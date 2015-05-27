var labelActions = {
    fetchAllLabels: function() {
        var irgendwie = this;
        $.get( "/api/label", function( response ) {
            if(response != null){
                if(response.status == 200){
                   irgendwie.dispatch(LabelStoreActions.UPDATE_ALL, response.data);
                }
            }
        });
    }
};
