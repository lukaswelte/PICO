package controllers;

import models.Entry;
import models.Label;
import play.*;
import play.libs.Json;
import play.mvc.*;

import views.html.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Application extends Controller {

    public static Result index() {
        return ok(main.render());
    }

    public static Result testData() {

        Entry entryOne = new Entry();
        entryOne.title = "Erste Test Entry";
        entryOne.url = "www.test.de";
        entryOne.labels = new HashSet<Label>();
        Label fooba = new Label("fooba");
        fooba.save();
        entryOne.labels.add(fooba);
        entryOne.save();
        List<Label> labels = Label.find.all();

        return ok(labels.toString());
    }

    /**
     * Fetches some data as a example to API Actions
     *
     * required input: entry
     * Example:
     * {
     *     "id": 5,
     *     "title: "coolors",
     *     "url": "coolors.io",
     *     "userID": 3
     * }
     *
     * @return list of users
     * Example:
     * {
     *      "status": 200,
     *      "data": {
     *          "labels": [{
     *              "id": 2,
     *              "name":"hans"
     *          }]
     *      }
     * }
     */
    public static Result exampleAPIAction() {
        return ok(Json.parse("{\"status\": \"ok\", \"data\": { \"users\":[{\"id\": 2, \"name\": \"hans\"}]}}"));
    }

    /**
     * required input entry
     * Example:
     * {
     *     "title: "coolors",
     *     "url": "coolors.io",
     *     "userID": 3
     * }
     *
     * @return updated entry
     * Example:
     * {
     *     "status": 200,
     *     "data": {
     *         "entry": {
     *             "id": 5,
     *             "title: "coolors",
     *              "url": "coolors.io",
     *              "userID": 3
     *         }
     *     }
     * }
     */
    public static Result createEntry() {
        return ok();
    }
}
