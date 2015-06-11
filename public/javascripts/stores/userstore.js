var userStoreActions = {
    SUCCESS_REGISTER_USER: "successfulRegisteredUser",
    UPDATE_USER_TO_REGISTER: "updateUserToRegister",
    ERROR_USER_TO_REGISTER: "errorOnUserToRegister",
    RESET_USER_TO_REGISTER: "resetUserToRegister"
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

        this.bindActions(
            userStoreActions.SUCCESS_REGISTER_USER, this.handleSuccessfulRegistration,
            userStoreActions.UPDATE_USER_TO_REGISTER, this.handleUpdateOfUserToRegister,
            userStoreActions.ERROR_USER_TO_REGISTER, this.handleErrorOfUserToRegister,
            userStoreActions.RESET_USER_TO_REGISTER, this.handleResetOfUserToRegister
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

    getUserToRegister: function() {
        return this.userToRegister;
    }

});
