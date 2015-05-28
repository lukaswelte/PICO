var stores = {
    TodoStore: new TodoStore(),
    LabelStore: new LabelStore(),
    EntryStore: new EntryStore()
};

var actions = {
    label : labelActions,
    entry: entryActions,
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

var routes = (
    <Route name="app" path="/" handler={Application}>
        <Route name="search" handler={Home}/>
        <Route name="test" handler={Test}/>
        <Route name="todo" handler={TodoList}/>
        <Route name="createentry" handler={CreateEntry}/>
        <Route name="showentry" handler={ShowEntry}/>

        <DefaultRoute handler={Home}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);


var router = Router.create({routes: routes});

Router.run(routes, function (Handler) {
    React.render(<Handler flux={flux}/>, document.body);
});
