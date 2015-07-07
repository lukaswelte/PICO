var Register = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("UserStore")],

    getStateFromFlux: function() {
       return {
           user: this.getFlux().stores.UserStore.getUserToRegister(),
           isLoggedIn: this.getFlux().stores.UserStore.getToken() != null
       };
    },

    handleEmailChange: function(event) {
        this.getFlux().actions.user.updateAndValidateUserToRegister(event.target.value, this.state.user.get("password"));
    },

    handlePasswordChange: function(event) {
        this.getFlux().actions.user.updateAndValidateUserToRegister(this.state.user.get("email"), event.target.value);
    },

    handleRegister: function(event) {
        event.preventDefault();
        this.getFlux().actions.user.registerUser(this.state.user.get("email"), this.state.user.get("password"));
    },

    render: function() {
        //if the user is present show the app page
        if (this.state.isLoggedIn) {
            try {
                this.getFlux().actions.router.transition("app", {});
            } catch(err) {

            }
        }

        var errors = this.state.user.get("errors");
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
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
                <div className="row homepage-blue-area margin-top-5em">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <h1>Welcome to PICO</h1>
                        <h2>Your Personalized Internet context organizer</h2>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row homepage-white-area">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h3>Get a free account to get organzied right now</h3>
                        <Link to="login" className="orange-color">Or Login if you already have an account <span className="glyphicon glyphicon-play" aria-hidden="true"></span></Link>
                        <form onSubmit={this.handleRegister}>
                            {errors.get("global", "")}
                            <label>
                                {errors.get("email") ? "Invalid Email Address" : ""}<br />
                                <input type="email" value={this.state.user.get("email")} onChange={this.handleEmailChange} placeholder="Email"/>
                            </label>

                            <label>
                                {errors.get("password") ? "Minimum 2 Characters required" : ""}<br />
                                <input type="password" value={this.state.user.get("password")} onChange={this.handlePasswordChange}  placeholder="Password"/>
                            </label>

                            <div>
                                {this.state.user.get("registering") ? "Currently registering..." : ""} <br />
                                <button type="submit" className="btn btn-default" disabled={!this.state.user.get("valid")}>Register</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row homepage-blue-area">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <h2>
                            <span className="glyphicon glyphicon-check" aria-hidden="true"></span> Discover and benefit from the richness of the WWW<br/>
                            <br/>
                            <span className="glyphicon glyphicon-check" aria-hidden="true"></span> Find requested information<br/>
                            <br/>
                            <span className="glyphicon glyphicon-check" aria-hidden="true"></span> Label - and recommendation-based service platform
                        </h2>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        );
    }
});
