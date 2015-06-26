var RecommendationStoreAction = {
    UPDATE:"updateRecommendations"
};

var RecommendationStore = Fluxxor.createStore({

    initialize: function(options){
        this.recommendations = new Immutable.Map();

        //We could also use this in place of the `action`hash, above:
        this.bindActions(
            RecommendationStoreAction.UPDATE, this.handleUpdate,
            RecommendationStoreAction.USER_LOGGED_OUT, this.handleDestroyData,
            RecommendationStoreAction.RESET, this.handleReset
        );
    } ,
    handleDestroyData: function() {
        this.recommendations = new Immutable.Map();
        this.emit("change");
    },

    handleUpdate: function(recommendations){
        this.recommendations = new Immutable.Map(recommendations);
        this.emit("change");
    },

    handleReset: function(){
      this.recommendations = new  Immutable.Map();
      this.emit("change")
    },

    getAllRecommendations: function(){
        return  {
            recommendations:this.recommendations
        };
    }
});