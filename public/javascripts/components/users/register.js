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
            this.getFlux().actions.router.transition("app", {});
        }

        var errors = this.state.user.get("errors");
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <img className="logo" src="/static/images/logo_white.png"/>
                        </div>
                    </div>
                </nav>

                <Link to="login">Go to Login</Link>
                <form onSubmit={this.handleRegister}>
                    {errors.get("global", "")}
                    <label>
                        {errors.get("email") ? "Invalid Email Address" : ""}<br />
                        Email
                        <input type="email" value={this.state.user.get("email")} onChange={this.handleEmailChange} />
                    </label>

                    <label>
                        {errors.get("password") ? "Minimum 2 Characters required" : ""}<br />
                        Password
                        <input type="password" value={this.state.user.get("password")} onChange={this.handlePasswordChange} />
                    </label>

                    <div>
                        {this.state.user.get("registering") ? "Currently registering..." : ""} <br />
                        <button type="submit" disabled={!this.state.user.get("valid")}>Register</button>
                    </div>
                </form>
            </div>
        );
    }
});
