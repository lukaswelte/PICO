var entryStoreActions = {
    UPDATE_ALL: "updateAllEntries"
};

var EntryStore = Fluxxor.createStore({

    initialize: function(options) {
        this.entries = Immutable.Map();

        // We could also use this in place of the `actions` hash, above:
        this.bindActions(
            entryStoreActions.UPDATE_ALL, this.handleUpdateAll
        );
    },

    handleUpdateAll: function(allEntries) {
        var store = this;
        allEntries.map(function(entry){
            store.entries = store.entries.set(entry.id, entry);
        });
        this.emit("change");
    },

    getAllEntries: function() {
        return {
            entries: this.entries
        };
    },

    getEntryById: function(id) {
        return this.entries.get(id, {id:"Nope"});
    }


});
