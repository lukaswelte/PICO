var apiUserActions = {
    login: function(user, callbacks) {
        API.common.httpRequest("/api/user", {
            type: "PUT",
            data: user,
            success: callbacks.success,
            error: callbacks.error
        });
    },

    register: function(user, callbacks) {
        API.common.httpRequest("/api/user", {
            type: "POST",
            data: user,
            success: callbacks.success,
            error: callbacks.error
        });
    }
};
