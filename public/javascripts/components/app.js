var Application = React.createClass({
    mixins: [FluxMixin],

    render: function() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="test" className="navbar-brand">Dashboard</Link>
                            <Link to="search" className="navbar-brand">Inbox</Link>
                            <Link to="todo" className="navbar-brand">Todo List</Link>
                            <Link to="createEntry" className="navbar-brand">Create Entry</Link>
                            Logged in
                        </div>
                    </div>
                </nav>

                {/* this is the important part */}
                <EmptyView/>
            </div>
        );
    }
});

var EmptyView = React.createClass({
    mixins: [FluxMixin],

    render: function() {
        return(
            <RouteHandler />
        );
    }
});
