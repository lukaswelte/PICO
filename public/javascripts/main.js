var routes = (
    <Route name="pico" path="/" handler={EmptyView}>
        <Route name="register" handler={Register} />
        <Route name="login" handler={Login} />

        <DefaultRoute handler={Login}/>
        <NotFoundRoute handler={NotFound}/>

        <Route name="app" handler={Application}>
            <Route name="home" handler={Home}/>
            <Route name="entry" handler={EmptyView}>
                <Route name="createEntry" path="create" handler={CreateEntry} />
                <Route name="showEntry" path=":id" handler={ShowEntry}/>
            </Route>
            <Route name="searchEntry" handler={SearchEntry}/>

            <Route name="notfound" handler={NotFound} />

            <DefaultRoute handler={Home}/>
        </Route>
    </Route>
);

var router = Router.create({routes: routes});

var actions = {
    label : labelActions,
    entry: entryActions,
    user: userActions,
    router: routerActions
};

var stores = {
    UserStore: new UserStore(),
    LabelStore: new LabelStore(),
    EntryStore: new EntryStore(),
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
