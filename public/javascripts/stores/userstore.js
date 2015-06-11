var userStoreActions = {
    SUCCESS_REGISTER_USER: "successfulRegisteredUser",
    UPDATE_USER_TO_REGISTER: "updateUserToRegister",
    ERROR_USER_TO_REGISTER: "errorOnUserToRegister",
    RESET_USER_TO_REGISTER: "resetUserToRegister",
    SUCCESS_LOGIN_USER: "successfulLoggedInUser",
    UPDATE_USER_TO_LOGIN: "updateUserToLogin",
    ERROR_USER_TO_LOGIN: "errorOnUserToLogin",
    RESET_USER_TO_LOGIN: "resetUserToLogin"
};

var UserStore = Fluxxor.createStore({
    initialize: function(options) {
        //The current logged / active in user
        this.user = new Immutable.Map();

        //Registration Form specific data
        this.emptyRegisterUser = function() {
            return Immutable.Map({email: "", password: "", valid: false, registering: false, errors: new Immutable.Map()});
        };
        this.userToRegister = this.emptyRegisterUser(); //the user that is currently registering

        //Login Form specific data
        this.emptyLoginUser = function() {
            return Immutable.Map({email: "", password: "", loggingIn: false, errors: new Immutable.Map()});
        };
        this.userToLogin = this.emptyLoginUser(); //the user that is currently registering

        this.bindActions(
            userStoreActions.SUCCESS_REGISTER_USER, this.handleSuccessfulRegistration,
            userStoreActions.UPDATE_USER_TO_REGISTER, this.handleUpdateOfUserToRegister,
            userStoreActions.ERROR_USER_TO_REGISTER, this.handleErrorOfUserToRegister,
            userStoreActions.RESET_USER_TO_REGISTER, this.handleResetOfUserToRegister,
            userStoreActions.SUCCESS_LOGIN_USER, this.handleSuccessfulLogin,
            userStoreActions.UPDATE_USER_TO_LOGIN, this.handleUpdateOfUserToLogin,
            userStoreActions.ERROR_USER_TO_LOGIN, this.handleErrorOfUserToLogin,
            userStoreActions.RESET_USER_TO_LOGIN, this.handleResetOfUserToLogin
        );

        console.log("Init finish");
    },

    handleSuccessfulRegistration: function(registeredUser) {
        this.user = new Immutable.Map(registeredUser);
        this.userToRegister = this.userToRegister.merge({registering: false, errors: new Immutable.Map()});
        this.emit("change");
    },

    handleUpdateOfUserToRegister: function(updatedUser) {
        this.userToRegister = this.userToRegister.merge(updatedUser);
        this.emit("change");
    },

    handleErrorOfUserToRegister: function(errors) {
        this.userToRegister = this.userToRegister.set('errors', new Immutable.Map(errors));
        this.emit("change");
    },

    handleResetOfUserToRegister: function() {
        this.userToRegister = this.emptyRegisterUser();
        this.emit("change");
    },


    handleSuccessfulLogin: function(loggedInUser) {
        this.user = new Immutable.Map(loggedInUser);
        this.userToLogin = this.userToLogin.merge({loggingIn: false, errors: new Immutable.Map()});
        this.emit("change");
    },

    handleUpdateOfUserToLogin: function(updatedUser) {
        this.userToLogin = this.userToLogin.merge(updatedUser);
        this.emit("change");
    },

    handleErrorOfUserToLogin: function(errors) {
        this.userToLogin = this.userToLogin.set('errors', new Immutable.Map(errors));
        this.emit("change");
    },

    handleResetOfUserToLogin: function() {
        this.userToLogin = this.emptyLoginUser();
        this.emit("change");
    },

    getUserToLogin: function() {
        return this.userToLogin;
    },

    getUserToRegister: function() {
        return this.userToRegister;
    }

});
