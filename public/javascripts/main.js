var routes = (
    <Route name="app" path="/" handler={Application}>
        <Route name="search" handler={Home}/>
        <Route name="test" handler={Test}/>
        <Route name="todo" handler={TodoList}/>
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
    TodoStore: new TodoStore(),
    LabelStore: new LabelStore(),
    EntryStore: new EntryStore(),
    RouterStore: new RouteStore({router:router})
};

var actions = {
    label : labelActions,
    entry: entryActions,
    router: routerActions,
    todo : toDoActions
};

var flux = new Fluxxor.Flux(stores, actions);
flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

flux.actions.label.fetchAllLabels();
flux.actions.entry.fetchAllEntries();

Router.run(routes, function (Handler) {
    React.render(<Handler flux={flux}/>, document.body);
});
