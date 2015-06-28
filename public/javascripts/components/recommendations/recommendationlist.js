var RecommendationList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("RecommendationStore")],

    // get flux einfügen
    getStateFromFlux: function() {
        return this.getFlux().stores.RecommendationStore.getAllRecommendations();
    },


    render: function() {

        //if abfrage null --> loading
        var recommendations = this.state.recommendations;

        if (recommendations == null) {
            return (
                <div>
                    Loading...
                </div>
            );
        }

        if (recommendations.size == 0) {
            return (
                <div>
                    No recommendations for you
                </div>
            );
        }

        var recommendResult = recommendations.map(function(entry){
            return <RecommendationItem recommendation={entry} />
        });
        return(
            <div>
                {recommendResult}
            </div>
        );
    }
});