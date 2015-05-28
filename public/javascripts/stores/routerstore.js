var routerStoreActions = {
    TRANSITION: "transitionRoute"
};

var RouteStore = Fluxxor.createStore({
    initialize: function(options) {
        this.router = options.router;

        this.bindActions(
            routerStoreActions.TRANSITION, this.handleRouteTransition
        );
    },

    handleRouteTransition: function(payload) {
        var path = payload.path;
        var params = payload.params;

        this.router.transitionTo(path, params);
    }
});
