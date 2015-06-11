var Register = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("UserStore")],

    getStateFromFlux: function() {
       return {
          user: this.getFlux().stores.UserStore.getUserToRegister()
       };
    },

    handleEmailChange: function(event) {
        this.getFlux().actions.user.updateAndValidateUserToRegister(event.target.value, this.state.user.get("password"));
    },

    handlePasswordChange: function(event) {
        this.getFlux().actions.user.updateAndValidateUserToRegister(this.state.user.get("email"), event.target.value);
    },

    handleRegisterClick: function() {
        this.getFlux().actions.user.registerUser(this.state.user.get("email"), this.state.user.get("password"));
    },

    render: function() {
        var errors = this.state.user.get("errors");
        return (
            <div>
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
                    {this.state.user.registering ? "Currently registering..." : ""} <br />
                    <button type="button" onClick={this.handleRegisterClick} disabled={!this.state.user.get("valid")}>Register</button>
                </div>
            </div>
        );
    }
});
