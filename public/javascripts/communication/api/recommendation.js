var apiRecommendActions = {
    fetchAll: function(callbacks) {
        API.common.httpRequest("/api/recommendation", {
            type: "GET",
            success: callbacks.success,
            error: callbacks.error
        });
    }
};

