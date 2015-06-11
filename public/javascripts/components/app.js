var Application = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("UserStore")],

    getStateFromFlux: function() {
        return {
            user: this.getFlux().stores.UserStore.getCurrentUser()
        };
    },

    handleLogoutClick: function() {
        this.getFlux().actions.user.logoutUser();
    },

    render: function() {

        //if the user is not present show the login page
        if (!this.state.user) {
            this.getFlux().actions.router.transition("login", {});
        }

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="home" className="navbar-brand"><img className="logo" src="/static/images/logo_white.png"/></Link>
                        </div>
                        <div className="navbar-header navbar-right">
                            <Link to="createEntry" className="navbar-brand"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></Link>
                            <span className="navbar-brand glyphicon glyphicon-info-sign" aria-hidden="true" onClick={this.handleLogoutClick}></span>
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
