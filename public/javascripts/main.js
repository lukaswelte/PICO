var routes = (
    <Route name="app" path="/" handler={Application}>
        <Route name="register" handler={Register} />
        <Route name="home" handler={Home}/>
        <Route name="entry" handler={EmptyView}>
            <Route name="createEntry" path="create" handler={CreateEntry} />
            <Route name="showEntry" path=":id" handler={ShowEntry}/>
        </Route>

        <Route name="notfound" handler={NotFound} />

        <DefaultRoute handler={Home}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

var router = Router.create({routes: routes});

var stores = {
    LabelStore: new LabelStore(),
    EntryStore: new EntryStore(),
    UserStore: new UserStore(),
    RouterStore: new RouteStore({router:router})
};

var actions = {
    label : labelActions,
    entry: entryActions,
    user: userActions,
    router: routerActions
};

var flux = new Fluxxor.Flux(stores, actions);
flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

//Fill stores with current data
flux.actions.label.fetchAllLabels();
flux.actions.entry.fetchAllEntries();

Router.run(routes, function (Handler) {
    React.render(<Handler flux={flux}/>, document.body);
});
