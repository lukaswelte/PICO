var apiRecommendActions = {
    fetchAll: function(payload, callbacks) {
        API.common.httpRequest("/api/recommendation", {
            type: "POST",
            data: payload,
            success: callbacks.success,
            error: callbacks.error
        });
    }
};

