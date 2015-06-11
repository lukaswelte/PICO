var Login = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("UserStore")],

    getStateFromFlux: function() {
        return {
            user: this.getFlux().stores.UserStore.getUserToLogin()
        };
    },

    handleEmailChange: function(event) {
        this.getFlux().actions.user.updateUserToLogin(event.target.value, this.state.user.get("password"));
    },

    handlePasswordChange: function(event) {
        this.getFlux().actions.user.updateUserToLogin(this.state.user.get("email"), event.target.value);
    },

    handleLogin: function(event) {
        event.preventDefault();
        this.getFlux().actions.user.loginUser(this.state.user.get("email"), this.state.user.get("password"));
    },

    render: function() {
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

                <Link to="register">Go to register</Link>
                <form onSubmit={this.handleLogin}>
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
                        {this.state.user.get("loggingIn") ? "Currently registering..." : ""} <br />
                        <input type="submit" disabled={this.state.user.get("loggingIn", false)}>Login</input>
                    </div>
                </form>
            </div>
        );
    }
});
