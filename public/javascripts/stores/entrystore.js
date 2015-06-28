var entryStoreActions = {
    UPDATE_ALL: "updateAllEntries",
    SUCCESS_CREATE: "createdEntry",
    SUCCESS_EDIT: "editEntry",
    UPDATE_CREATE: "updateEntryToCreate",
    UPDATE_EDIT: "updateEntryToEdit",
    ERROR_CREATE: "errorOnCreation",
    ERROR_EDIT: "errorOnEdit",
    RESET_CREATE: "resetCreation"
};

var EntryStore = Fluxxor.createStore({

    initialize: function(options) {
        this.entries = new Immutable.Map();

        this.emptyEntry = function() {
            return Immutable.Map({title: "", url: "", context: "", labels: new Immutable.Set(), valid:false, saving: false, errors: new Immutable.Map()});
        };
        this.entryToCreate = this.emptyEntry(); //the entry that is currently created
        this.entryToUpdate = {id: null, entry: null};

        // We could also use this in place of the `actions` hash, above:
        this.bindActions(
            entryStoreActions.UPDATE_ALL, this.handleUpdateAll,
            entryStoreActions.SUCCESS_CREATE, this.handleSuccessfulCreation,
            entryStoreActions.SUCCESS_EDIT, this.handleSuccessfulEdit,
            entryStoreActions.UPDATE_CREATE, this.handleUpdateOfEntryToCreate,
            entryStoreActions.UPDATE_EDIT, this.handleUpdateOfEntryToEdit,
            entryStoreActions.ERROR_CREATE, this.handleCreationError,
            entryStoreActions.ERROR_EDIT, this.handleEditError,
            entryStoreActions.RESET_CREATE, this.handleResetCreation,
            userStoreActions.USER_AUTHENTICATED, this.handleLoadData,
            userStoreActions.USER_LOGGED_OUT, this.handleDestroyData
        );
    },

    handleDestroyData: function() {
        this.entries = new Immutable.Map();
        this.emit("change");
    },

    handleLoadData: function () {
        API.entry.fetchAll({
            success: function(response) {
                if(response != null && response.status == 200){
                    this.handleUpdateAll(response.data);
                }
            }.bind(this)
        });
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

    handleSuccessfulEdit: function(id, payload){
        var updatedEntry = payload.entry;
        this.entries = this.entries.update(updatedEntry.id, updatedEntry);
        this.entryToUpdate = this.entryToUpdate.merge(updatedEntry, {saving: false, errors: null});
        this.emit("change");
    },

    handleUpdateOfEntryToCreate: function(updatedEntry) {
        this.entryToCreate = this.entryToCreate.merge(updatedEntry);
        this.emit("change");
    },

    handleUpdateOfEntryToEdit: function(id, updatedEntry){
        console.log("handleUpdateOfEntryToEdit wird aufgerufen");
        this.entryToUpdate.entry = updatedEntry;
        this.emit("change");
    },

    handleCreationError: function(errors) {
        this.entryToCreate = this.entryToCreate.set('errors', errors);
        this.emit("change");
    },

    handleEditError: function(id, errors) {
        this.entryToUpdate.entry = this.entryToUpdate.entry.set('errors', errors);
        this.emit("change");
    },

    handleResetCreation: function() {
        this.entryToCreate = this.emptyEntry();
        this.emit("change");
    },

    getEntryToUpdate: function(id) {
        if(id == this.entryToUpdate.id){
            return this.entryToUpdate.entry;
        }
        var entryToUpdate = {id: id, entry: this.getEntryById(id)};
        return entryToUpdate;
    },

    getAllEntries: function() {
        return {
            entries: this.entries
        };
    },

    getEntryById: function(id) {
        // This method is looking for the entry with the delivered id and stops its search when an entry with that id is found
        // If no entry with this id is found it returns null
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
