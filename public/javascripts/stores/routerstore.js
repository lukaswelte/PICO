var routerStoreActions = {
    TRANSITION: "transitionRoute",
    BACK: "transitionBack"
};

var RouteStore = Fluxxor.createStore({
    initialize: function(options) {
        this.router = options.router;

        this.bindActions(
            routerStoreActions.TRANSITION, this.handleRouteTransition,
            routerStoreActions.BACK, this.handleBackTransition
        );
    },

    handleRouteTransition: function(payload) {
        var path = payload.path;
        var params = payload.params;

        this.router.transitionTo(path, params);
    },

    handleBackTransition: function() {
        var success = this.router.goBack();
        if (!success) {
            this.router.transitionTo("app", {});
        }
    }
});
