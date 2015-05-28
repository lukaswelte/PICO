var routerActions = {
    transition: function(path, params) {
        this.dispatch(routerStoreActions.TRANSITION, {path: path, params: params});
    }
};
