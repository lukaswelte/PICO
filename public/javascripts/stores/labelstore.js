var LabelStoreActions = {
    UPDATE_ALL: "updateAllLabels"
};

var LabelStore = Fluxxor.createStore({

    initialize: function(options) {
        this.labels = [];

        // We could also use this in place of the `actions` hash, above:
        this.bindActions(
            LabelStoreActions.UPDATE_ALL, this.handleUpdateAll
        );
    },

    handleUpdateAll: function(payload) {
       this.labels = payload;
       this.emit("change");
    },

    getAllLabels: function() {
        return {
            labels: this.labels
        };
    }

});

