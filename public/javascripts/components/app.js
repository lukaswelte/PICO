var Application = React.createClass({
    mixins: [FluxMixin],

    render: function() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="home" className="navbar-brand">Dashboard</Link>
                            <Link to="createEntry" className="navbar-brand">Create Entry</Link>
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
