var entryStoreActions = {
    UPDATE_ALL: "updateAllEntries",
    UPDATE: "updateSingleEntry"
};

var EntryStore = Fluxxor.createStore({

    initialize: function(options) {
        this.entries = Immutable.Map();

        // We could also use this in place of the `actions` hash, above:
        this.bindActions(
            entryStoreActions.UPDATE_ALL, this.handleUpdateAll,
            entryStoreActions.UPDATE, this.handleSingleUpdate
        );
    },

    handleUpdateAll: function(allEntries) {
        var store = this;
        allEntries.map(function(entry){
            // Save the entries in key value pairs, with the entry id as the key and the hole entry as value
            store.entries = store.entries.set(entry.id, entry);
        });
        this.emit("change");
    },

    handleSingleUpdate: function(entry) {
        this.entries = this.entries.set(entry.id, entry);
        this.emit("change");
    },

    getAllEntries: function() {
        return {
            entries: this.entries
        };
    },

    getEntryById: function(id) {
        // This method is looking for the entry with the delivered id and stops its search when an entry with that id is found
        // If no entry with this id is found it shows the string "No Entry with that ID found"
        return this.entries.get(id, {id:"No Entry with that ID found"});
    }


});
