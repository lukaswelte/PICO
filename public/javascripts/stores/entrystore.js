var entryStoreActions = {
    UPDATE_ALL: "updateAllEntries",
    SUCCESS_CREATE: "createdEntry",
    UPDATE_CREATE: "updateEntryToCreate",
    ERROR_CREATE: "errorOnCreation",
    RESET_CREATE: "resetCreation"
};

var EntryStore = Fluxxor.createStore({

    initialize: function(options) {
        this.entries = Immutable.Map();
        this.emptyEntry = function() {
            return Immutable.Map({title: "", url: "", context: "", labels: new Immutable.Set(), valid:false, saving: false, errors: new Immutable.Map()});
        };
        this.entryToCreate = this.emptyEntry(); //the entry that is currently created

        // We could also use this in place of the `actions` hash, above:
        this.bindActions(
            entryStoreActions.UPDATE_ALL, this.handleUpdateAll,
            entryStoreActions.SUCCESS_CREATE, this.handleSuccessfulCreation,
            entryStoreActions.UPDATE_CREATE, this.handleUpdateOfEntryToCreate,
            entryStoreActions.ERROR_CREATE, this.handleCreationError,
            entryStoreActions.RESET_CREATE, this.handleResetCreation
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

    handleSuccessfulCreation: function(payload) {
        var entry = payload.entry;
        this.entries = this.entries.set(entry.id, entry);
        this.entryToCreate = this.entryToCreate.merge(entry, {saving: false, errors: null});
        this.emit("change");
    },

    handleUpdateOfEntryToCreate: function(updatedEntry) {
        this.entryToCreate = this.entryToCreate.merge(updatedEntry);
        this.emit("change");
    },

    handleCreationError: function(errors) {
        this.entryToCreate = this.entryToCreate.set('errors', errors);
        this.emit("change");
    },

    handleResetCreation: function() {
        this.entryToCreate = this.emptyEntry();
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
        return this.entries.get(id, null);
    },

    getEntryByUrl: function(url) {
        return this.entries.find(function(entry) {
            return entry.url == url
        });
    },


    getEntryToCreate: function() {
        return this.entryToCreate.toJS();
    }
});
