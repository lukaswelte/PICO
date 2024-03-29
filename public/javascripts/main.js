var routes = (
    <Route name="pico" path="/" handler={EmptyView}>
        <Route name="register" handler={Register} />
        <Route name="login" handler={Login} />

        <DefaultRoute handler={Login}/>
        <NotFoundRoute handler={NotFound}/>

        <Route name="app" handler={Application}>
            <Route name="home" handler={SearchEntry}/>
            <Route name="entry" handler={EmptyView}>
                <Route name="createEntry" path="create" handler={CreateEntry} />
                <Route name="showEntry" path=":id" handler={ShowEntry}/>
                <Route name="editEntry" path="edit/:id" handler={EditEntry}/>
                <Route name="deleteEntry" path="delete/:id" handler={DeleteEntry}/>
            </Route>
            <Route name="searchEntry" handler={SearchEntry}/>
            <Route name="notfound" handler={NotFound} />
            <DefaultRoute handler={SearchEntry}/>
        </Route>
    </Route>
);

var router = Router.create({routes: routes});

var actions = {
    label : labelActions,
    entry: entryActions,
    user: userActions,
    recommendation:recommendationAction,
    router: routerActions
};

var stores = {
    UserStore: new UserStore(),
    LabelStore: new LabelStore(),
    EntryStore: new EntryStore(),
    RecommendationStore: new RecommendationStore(),
    RouterStore: new RouteStore({router:router})
};

var flux = new Fluxxor.Flux(stores, actions);
flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

//Try loading user from local storage
flux.actions.user.loadUserFromLocalStorage();

Router.run(routes, function (Handler) {
    React.render(<Handler flux={flux}/>, document.body);
});
