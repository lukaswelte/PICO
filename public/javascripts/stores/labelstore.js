var labelStoreActions = {
    UPDATE_ALL: "updateAllLabels"
};

var LabelStore = Fluxxor.createStore({

    initialize: function(options) {
        this.labels = Immutable.Map();

        // We could also use this in place of the `actions` hash, above:
        this.bindActions(
            labelStoreActions.UPDATE_ALL, this.handleUpdateAll
        );
    },

    handleUpdateAll: function(allLabels) {
        var store = this;
        allLabels.map(function (label){
           store.labels = store.labels.set(label.id, label);
        });
        this.emit("change");
    },

    getAllLabels: function() {
        return {
            labels: this.labels
        };
    }
});

