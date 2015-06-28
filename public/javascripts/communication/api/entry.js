var apiEntryActions = {
    fetchAll: function(callbacks) {
        API.common.httpRequest("/api/entry", {
            type: "GET",
            success: callbacks.success,
            error: callbacks.error
        });
    },

    create: function(entry, callbacks) {
        API.common.httpRequest("/api/entry", {
            type: "POST",
            data: entry,
            success: callbacks.success,
            error: callbacks.error
        });
    },

    edit: function(id, entry, callbacks) {
        API.common.httpRequestWithId(id, "/api/entry/edit", {
           type: "PUT",
           data: {
               entryId: id,
               entry: entry
           },
           success: callbacks.success,
           error: callbacks.error
        });
    }
};
