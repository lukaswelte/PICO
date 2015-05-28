var stores = {
    TodoStore: new TodoStore(),
    LabelStore: new LabelStore()
};

var actions = {
    label : labelActions,
    todo : toDoActions
};

var flux = new Fluxxor.Flux(stores, actions);
flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

flux.actions.label.fetchAllLabels();

var routes = (
    <Route name="app" path="/" handler={Application}>
        <Route name="search" handler={Home}/>
        <Route name="test" handler={Test}/>
        <Route name="todo" handler={TodoList}/>
        <Route name="createentry" handler={CreateEntry}/>

        <DefaultRoute handler={Home}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler flux={flux}/>, document.body);
});
