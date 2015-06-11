var userActions = {
    resetUserToRegister: function() {
        this.dispatch(userStoreActions.RESET_USER_TO_REGISTER);
    },

    updateAndValidateUserToRegister: function(email, password) {
        var user = {
            email: email,
            password: password
        };

        //initialize the errors map
        var noErrors = Immutable.Map();
        var errors = noErrors;

        //validate email
        var emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if (!user.email.match(emailRegex)) {
            //URL is invalid
            errors = errors.set('email', "Invalid Email Address");
        }

        //validate password
        if (user.password.trim().length <= 2) {
            //password is empty
            errors = errors.set('password', "You must specify a password with min two characters");
        }

        //Check if there where errors and if not the entry is valid
        user.valid = errors === noErrors;

        this.dispatch(userStoreActions.UPDATE_USER_TO_REGISTER, user);
        this.dispatch(userStoreActions.ERROR_USER_TO_REGISTER, errors);
    },

    registerUser: function(email, password) {
        //inform that save is in progress
        this.dispatch(userStoreActions.UPDATE_USER_TO_REGISTER, {registering: true});

        //construct the user that the API needs as input
        var user = {
            email: email,
            password: password
        };

        //do the ajax request to the API
        API.user.register(user, {
            success: function(response){
                if(response != null && response.status == 200){
                    var returnedUser = response.data;

                    //tell that the registration succeeded
                    this.dispatch(userStoreActions.SUCCESS_REGISTER_USER, returnedUser);
                    this.dispatch(userStoreActions.USER_AUTHENTICATED, returnedUser);

                    //reset the registered user so that we can register another one
                    this.dispatch(userStoreActions.RESET_USER_TO_REGISTER);

                    //now redirect to the dashboard
                    this.flux.actions.router.transition("app", {});
                }
            }.bind(this),
            error: function(response){
                //inform that we are no longer saving
                this.dispatch(userStoreActions.UPDATE_USER_TO_REGISTER, {registering: false});

                //inform about the error
                this.dispatch(userStoreActions.ERROR_USER_TO_REGISTER, {global: "An error occurred please check your input and try again."});
            }.bind(this)
        });
    },

    resetUserToLogin: function() {
        this.dispatch(userStoreActions.RESET_USER_TO_LOGIN);
    },

    updateUserToLogin: function(email, password) {
        var user = {
            email: email,
            password: password
        };

        this.dispatch(userStoreActions.UPDATE_USER_TO_LOGIN, user);
    },


    loginUser: function(email, password) {
        //inform that login is in progress
        this.dispatch(userStoreActions.UPDATE_USER_TO_LOGIN, {loggingIn: true});

        //construct the user that the API needs as input
        var user = {
            email: email,
            password: password
        };

        //do the ajax request to the API
        API.user.login(user, {
            success: function(response){
                if(response != null && response.status == 200){
                    var returnedUser = response.data;

                    //tell that the user is logged in
                    this.dispatch(userStoreActions.SUCCESS_LOGIN_USER, returnedUser);
                    this.dispatch(userStoreActions.USER_AUTHENTICATED, returnedUser);

                    //reset the logged in user so that we can login another one
                    this.dispatch(userStoreActions.RESET_USER_TO_LOGIN);

                    //now redirect to the dashboard
                    this.flux.actions.router.transition("app", {});
                }
            }.bind(this),
            error: function(response){
                //inform that we are no longer logging in
                this.dispatch(userStoreActions.UPDATE_USER_TO_LOGIN, {loggingIn: false});

                //inform about the error
                this.dispatch(userStoreActions.ERROR_USER_TO_LOGIN, {global: "Not successful. Please try again."});
            }.bind(this)
        });
    },

    logoutUser: function() {
        this.dispatch(userStoreActions.USER_LOGGED_OUT);

        //transition to the login page
        this.flux.actions.router.transition("login", {});
    },

    loadUserFromLocalStorage: function() {
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            var retrievedJSON = localStorage.getItem("user");
            try {
                var user = new Immutable.Map(JSON.parse(retrievedJSON));
                this.dispatch(userStoreActions.USER_AUTHENTICATED, user);
            } catch(err) {
            }
        }
    }
};
