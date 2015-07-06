var labelStoreActions = {
    UPDATE_ALL: "updateAllLabels",
    UPDATE: "updateLabel",
    DELETE: "deleteLabel",
    FETCH_FROM_SERVER: "fetchFromServer"
};

var LabelStore = Fluxxor.createStore({

    initialize: function(options) {
        this.labels = new Immutable.Map();

        // We could also use this in place of the `actions` hash, above:
        this.bindActions(
            labelStoreActions.UPDATE_ALL, this.handleUpdateAll,
            labelStoreActions.UPDATE, this.handleSingleUpdate,
            labelStoreActions.DELETE, this.handleSingleDelete,
            userStoreActions.USER_AUTHENTICATED, this.handleLoadData,
            labelStoreActions.FETCH_FROM_SERVER, this.handleLoadData,
            userStoreActions.USER_LOGGED_OUT, this.handleDestroyData
        );
    },

    handleDestroyData: function() {
        this.labels = new Immutable.Map();
        this.emit("change");
    },

    handleLoadData: function () {
        API.label.fetchAll({
            success: function(response) {
                if(response != null && response.status == 200){
                    this.handleUpdateAll(response.data);
                }
            }.bind(this)
        });
    },

    handleSingleUpdate: function (label){
        this.labels = this.labels.set(label.id, label);
        this.emit("change");
    },

    handleSingleDelete: function (label){
        this.labels = this.labels.delete(label.id);
        this.emit("change");
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

