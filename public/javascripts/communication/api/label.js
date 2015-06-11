var apiLabelActions = {
    fetchAll: function(callbacks) {
        API.common.httpRequest("/api/label", {
            type: "GET",
            success: callbacks.success,
            error: callbacks.error
        });
    }
};
