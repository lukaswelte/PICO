package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Label;
import play.libs.Json;
import play.mvc.*;

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
    public static Result getLabelWithIndex(Long labelID) {
        Label foundLabel = Label.find.byId(labelID);
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
    public static Result getEntriesWithLabel(Long labelID) {
        Label foundLabel = Label.find.byId(labelID);
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
    public static Result allLabels() {
        List<Label> allLabels = Label.find.all();
        return findAPIResponse(allLabels);
    }

    /**
     * Creates a label
     *
     * input:...
     *
     * @return API Response with created Label
     * Example: {"status":200,"data":{"id":4,"name":"testname","user":null,"entries":[]}}
     *
     */
    public static Result createLabel() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return invalidAPIInput();
        }

        String name = json.findPath("name").textValue();
        if (name == null) {
            return invalidAPIInput();
        }

        Label label = new Label(name);
        try {
            label.save();
        } catch (OptimisticLockException e) {
            return serverError(e);
        }
        return jsonAPIResponse(Json.toJson(label));
    }
}
