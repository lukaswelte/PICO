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
        API.common.httpRequest("/api/entry/edit/"+id, {
           type: "PUT",
           data: entry,
           success: callbacks.success,
           error: callbacks.error
        });
    }

};
