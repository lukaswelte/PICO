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

        var recommendResult = recommendations.map(function(entry){
            return <RecommendationItem entry={entry} />
        });
        return(
            <div>
                {recommendResult}
            </div>
        );
    }
});