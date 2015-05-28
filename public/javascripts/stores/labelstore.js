var labelStoreActions = {
    UPDATE_ALL: "updateAllLabels"
};

var LabelStore = Fluxxor.createStore({

    initialize: function(options) {
        this.labels = [];

        // We could also use this in place of the `actions` hash, above:
        this.bindActions(
            labelStoreActions.UPDATE_ALL, this.handleUpdateAll
        );
    },

    handleUpdateAll: function(allLabels) {
       this.labels = allLabels;
       this.emit("change");
    },

    getAllLabels: function() {
        return {
            labels: this.labels
        };
    }

});

