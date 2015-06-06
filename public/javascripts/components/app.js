var Application = React.createClass({
    mixins: [FluxMixin],

    render: function() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="home" className="navbar-brand"><img className="logo" src="/static/images/logo_white.png"/></Link>
                        </div>
                        <div className="navbar-header navbar-right">
                            <Link to="createEntry" className="navbar-brand"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></Link>
                            <Link to="home" className="navbar-brand"><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span></Link>
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
