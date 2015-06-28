var RecommendationStoreAction = {
    UPDATE:"updateRecommendations",
    RESET:"resetRecommendation"
};

var RecommendationStore = Fluxxor.createStore({

    initialize: function(options){
        this.recommendations = null;

        //We could also use this in place of the `action`hash, above:
        this.bindActions(
            RecommendationStoreAction.UPDATE, this.handleUpdate,
            userStoreActions.USER_LOGGED_OUT, this.handleDestroyData,
            RecommendationStoreAction.RESET, this.handleReset
        );
    },
    handleDestroyData: function() {
        this.recommendations = null;
        this.emit("change");
    },

    handleUpdate: function(recommendations){
        this.recommendations = new Immutable.List(recommendations);
        this.emit("change");
    },

    handleReset: function(){
      this.recommendations = null;
      this.emit("change")
    },

    getAllRecommendations: function(){
        return  {
            recommendations:this.recommendations
        };
    }
});