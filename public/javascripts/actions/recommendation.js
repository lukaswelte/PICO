var recommendationAction = {

    updateRecommendation:function(entry) {
        var labelNames = entry.labels.map(function(label){
            return label.name;
        });

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