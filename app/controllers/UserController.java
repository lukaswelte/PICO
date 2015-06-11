package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.User;
import play.libs.Json;
import play.mvc.Result;
import utils.EmailValidator;

public class UserController extends BaseController {

    /**
     * Register a user with following inputs
     * required input: Json containing the email and the password
     * Example:
     * {
     *  "email": "foo@bar.de",
     *  "password": "secretpass"
     *
     *  }
     * return API Response user
     * Example:
     *  {"status":200,
     *  "data":{"id":1,"email":"test@test.de","registrationDate":1434031301880,"lastUpdated":1434031301880,"token":"63ff00eb-9ac5-4367-993b-97b8f795a269","entries":[],"labels":[]}}
     */
    public static Result registerUser() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return invalidAPIInput();
        }

        String email = json.findPath("email").textValue();
        String password = json.findPath("password").textValue();
        if (email == null || !EmailValidator.isValidEmailAddress(email) || password == null || password.length() < 2) {
            return invalidAPIInput();
        }

        //Check if user with email exists
        User user = User.findByEmail(email);
        if (user != null) {
            return invalidAPIInput();
        }

        try {
            user = User.create(email, password);
        } catch (Exception e) {
            return serverError(e);
        }

        return jsonAPIResponse(Json.toJson(user));
    }
}
