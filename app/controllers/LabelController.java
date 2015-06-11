package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Label;
import models.User;
import play.libs.Json;
import play.mvc.*;
import utils.AuthenticationHelper;

import javax.persistence.OptimisticLockException;
import java.util.List;

/**
 * Controller handling all API Actions connected with Labels
 */
public class LabelController extends BaseController {

    /**
     * Retrieves a label based on its ID
     *
     * @param labelID The id of the label that should be fetched
     * @return API Response containing the label
     * Example:
     * {
     * "status":200,
     * "data":{
     * "id":1,
     * "name":"labelName",
     * "user":2,
     * "entries":[1]
     * }
     * }
     */
    @AuthenticationHelper.UserAuthenticated
    public static Result getLabelWithIndex(Long labelID) {
        User user = (User) ctx().args.get("user");
        Label foundLabel = Label.findById(labelID, user);
        return findAPIResponse(foundLabel);
    }

    /**
     * Retrieve all entries that contain a label
     *
     * @param labelID The id of the label
     * @return API Response with the List of entries
     * Example:
     * {
     * "status":200,
     * "data":[
     * {
     * "id":1,
     * "url":"www.test.de",
     * "title":"Erste Test Entry",
     * "context":null,
     * "thumbnailURL":null,
     * "registrationDate":1432197258000,
     * "lastUpdated":1432197258000,
     * "user":2,
     * "labels":[{"id":1,"name":"fooba","user":null,"entries":[1]}]
     * }
     * ]
     * }
     */
    @AuthenticationHelper.UserAuthenticated
    public static Result getEntriesWithLabel(Long labelID) {
        User user = (User) ctx().args.get("user");
        Label foundLabel = Label.findById(labelID, user);
        if (foundLabel == null) {
            return notFoundAPIResponse();
        } else {
            return findAPIResponse(foundLabel.entries);
        }
    }

    /**
     * Retrieves the list of all Labels
     *
     * @return API Response with List of labels
     * Example:
     * {
     * "status":200,
     * "data":[
     * {
     * "id":1,
     * "name":"fooba",
     * "user":2,
     * "entries":[1]
     * }
     * ]
     * }
     */
    @AuthenticationHelper.UserAuthenticated
    public static Result allLabels() {
        User user = (User) ctx().args.get("user");
        List<Label> allLabels = Label.getAll(user);
        return findAPIResponse(allLabels);
    }

    /**
     * Creates a label
     *
     * required input: Json containing the label name
     *
     * @return API Response with created Label
     * Example: {"status":200,"data":{"id":4,"name":"testname","user":null,"entries":[]}}
     *
     */
    @AuthenticationHelper.UserAuthenticated
    public static Result createLabel() {
        User user = (User) ctx().args.get("user");

        JsonNode json = request().body().asJson();
        if (json == null) {
            return invalidAPIInput();
        }

        String name = json.findPath("name").textValue();
        if (name == null) {
            return invalidAPIInput();
        }

        Label label = null;
        try {
            label = Label.create(name, user);
        } catch (OptimisticLockException e) {
            return serverError(e);
        }
        return jsonAPIResponse(Json.toJson(label));
    }
}
