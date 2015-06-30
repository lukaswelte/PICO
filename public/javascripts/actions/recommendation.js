var recommendationAction = {

    updateRecommendation: function(entry) {
        this.flux.actions.recommendation.updateRecommendationForLabels(entry.labels);
    },

    updateRecommendationForLabels: function(labels) {
        var labelNames = labels.map(function(label){
            return label.name;
        });

        this.flux.actions.recommendation.updateRecommendationForLabelNames(labelNames);
    },

    updateRecommendationForLabelNames: function(labelNames) {
        var recommendation = {
            labels: labelNames
        };

        this.dispatch(RecommendationStoreAction.RESET);
        // do the ajax request to the API
        API.recommendation.fetchAll(recommendation, {
            success: function (response) {
                if (response != null && response.status == 200) {
                   this.dispatch(RecommendationStoreAction.UPDATE, response.data);
                }
            }.bind(this)

        });
    }
};
