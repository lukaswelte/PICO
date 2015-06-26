var recommendationAction = {

    updateRecommendation:function(entry) {
        var labelNames = entry.labels.map(function(label){
            return label.name;
        });

        var recommendation = {
            labels: labelNames
        };

        // do the ajax request to the API
        API.recommendation.fetchAll({
            success: function (response) {
                if (response != null && response.status == 200) {

                    //var returnedRecommendation = response.data;

                    //returnedRecommendation.recommendations.forEach(function (recommendation)
                    //{
                        this.dispatch(RecommendationStoreAction.UPDATE, recommendation);
                    //}.bind(this));

                }
            }.bind(this)

        });
    }
};