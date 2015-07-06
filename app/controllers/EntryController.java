package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Entry;
import models.Label;
import models.User;
import play.libs.Json;
import play.mvc.Http;
import play.mvc.Result;
import utils.AuthenticationHelper;
import views.html.sharedEntry;

import javax.persistence.OptimisticLockException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.*;


public class EntryController extends BaseController {


    /**
     * Create an entry with following inputs
     * required input: Json containing the URL and the Title
     * Example:
     * {
     *  "url": "http://test.de",
     *  "title": "test"
     *
     *  }
     * return API Response entry
     */
    @AuthenticationHelper.UserAuthenticated
    public static Result createEntry() {
        User user = (User) ctx().args.get("user");

        JsonNode json = request().body().asJson();
        if (json == null) {
            return invalidAPIInput();
        }

        String url = json.findPath("url").textValue();
        if (url == null || !isValidURL(url) || Entry.findByURL(url, user) != null) {
            return invalidAPIInput();
        }

        String title = json.findPath("title").textValue();
        if (title == null) {
            return invalidAPIInput();
        }

        Entry entry = Entry.create(url, title, user);

        String context = json.findPath("context").textValue();
        if (context != null) {
            entry.context = context;
        }
        Iterator<JsonNode> labelIterator = json.findPath("labels").elements();
        if(labelIterator != null){
            while(labelIterator.hasNext()) {
                JsonNode s = labelIterator.next();
                String labelName = s.textValue();
                Label alreadyExistingLabel = Label.findByName(labelName, user);
                if(alreadyExistingLabel == null){
                    alreadyExistingLabel = Label.create(labelName, user);
                }
                entry.labels.add(alreadyExistingLabel);
            }
        }

        try {
            byte[] previewImage = json.findPath("previewImage").binaryValue();
            if (previewImage != null) {
                entry.previewImage = previewImage;
            } else {
                entry.previewImage = PreviewImageController.fetchPreviewImage(url).get(10000);
            }
        } catch (Exception e) {
            //Ignore
            play.Logger.error("Error generating preview image", e);
        }
        try {
            entry.save();
        } catch (OptimisticLockException e) {
            return serverError(e);
        }
        return jsonAPIResponse(Json.toJson(entry));
    }


    /**
     * Validate the input if it is an correct URL; e.g: "www.coolors.io"
     *
     * @param pUrl The retrieved Object
     * @return true if valid URL or false is not valid URL
     */
    private static boolean isValidURL(String pUrl) {

        URL u = null;
        try {
            u = new URL(pUrl);
        } catch (MalformedURLException e) {
            return false;
        }
        try {
            u.toURI();
        } catch (URISyntaxException e) {
            return false;
        }
        return true;
    }
    /**
     * Retrieves a entry based on its ID
     *
     * @param entryID The id of the entry that should be fetched
     *
     * @return API Response containing the entry
     * Example:
     * {
     *      "status":200,
     *      "data":{
     *          "id":5,
     *          "url":"www.test.de",
     *          "title":"Erste Test Entry",
     *          "context":"Das ist ein Context",
     *          "thumbnailURL":null,
     *          "registrationDate":1432157356000,
     *          "lastUpdated":1432157356000,
     *          "user":1,
     *          "labels":[{"id":6,"name":"fooba","user":null,"entries":[5]}]
     *      }
     * }
     */
    @AuthenticationHelper.UserAuthenticated
    public static Result getEntry(Long entryID) {
        User user = (User) ctx().args.get("user");

        Entry foundEntry = Entry.findById(entryID, user);
        return findAPIResponse(foundEntry);
    }

    /**
     * Deletes a entry based on its ID
     *
     * @param entryID The id of the entry that should be deleted
     *
     * @return API Response containing the entry
     * Example:
     * {
     *      "status":200,
     *      "data":{
     *          "id":5,
     *          "url":"www.test.de",
     *          "title":"Erste Test Entry",
     *          "context":"Das ist ein Context",
     *          "thumbnailURL":null,
     *          "registrationDate":1432157356000,
     *          "lastUpdated":1432157356000,
     *          "user":1,
     *          "labels":[{"id":6,"name":"fooba","user":null,"entries":[5]}]
     *      }
     * }
     */
    @AuthenticationHelper.UserAuthenticated
    public static Result deleteEntry(Long entryID) {
        play.Logger.info("delete entry: "+entryID);
        User user = (User) ctx().args.get("user");

        Boolean isDeleted = Entry.delete(entryID, user);

        if (!isDeleted) {
            ObjectNode result = Json.newObject();
            result.put("status", Http.Status.PRECONDITION_FAILED);
            return status(Http.Status.PRECONDITION_FAILED, result);
        } else {
            ObjectNode result = Json.newObject();
            result.put("status", Http.Status.OK);
            result.put("data", entryID);
            return ok(result);
        }
    }

    /**
     * Retrieves the list of all entries
     *
     * @return API Response with List of entries
     * Example:
     * {
     * "status":200,
     * "data":[
     * {
     * "id":5,
     * "url":"www.test.de",
     * "title":"Erste Test Entry",
     * "context":"Das ist ein Context",
     * "thumbnailURL":null,
     * "registrationDate":1432157356000,
     * "lastUpdated":1432157356000,
     * "user":1,
     * "labels":[{"id":6,"name":"fooba","user":null,"entries":[5]}]
     * }
     * ]
     * }
     */
    @AuthenticationHelper.UserAuthenticated
    public static Result allEntries() {
        User user = (User) ctx().args.get("user");

        List<Entry> allEntries = Entry.getAll(user);
        return findAPIResponse(allEntries);
    }

    /**
     * Updates an entry with following inputs
     * required input: Json containing the URL and the Title
     * Example:
     * {
     *  "url": "http://test.de",
     *  "title": "test"
     *  }
     * @param entryID The id of the entry that should be updated
     * @return API Response with the updated entry
     */
    @AuthenticationHelper.UserAuthenticated
    public static Result updateEntry(Long entryId){
        User user = (User) ctx().args.get("user");

        JsonNode json = request().body().asJson();
        if (json == null) {
            return invalidAPIInput();
        }

        String url = json.findPath("url").textValue();
        if (url == null || !isValidURL(url)) {
            return invalidAPIInput();
        }

        String title = json.findPath("title").textValue();
        if (title == null) {
            return invalidAPIInput();
        }

        String context = json.findPath("context").textValue(); //context can be null

        Iterator<JsonNode> labelIterator = json.findPath("labels").elements();
        Set<Label> labels = new HashSet<>();
        if(labelIterator != null){
            while(labelIterator.hasNext()) {
                JsonNode s = labelIterator.next();
                String labelName = s.textValue();
                Label alreadyExistingLabel = Label.findByName(labelName, user);
                if(alreadyExistingLabel == null){
                    alreadyExistingLabel = Label.create(labelName, user);
                }
                labels.add(alreadyExistingLabel);
            }
        }

        Entry updatedEntry = Entry.update(entryId, url, title, user, context, labels);
        updatedEntry.refresh();
        return findAPIResponse(updatedEntry);
    }

       public static Result sharedEntry(String publicUrl) {

        Entry entry = Entry.findByPublicUrl(publicUrl);
        if (entry == null) {
            return notFound("Entry not available");
        }

        return ok(sharedEntry.render(entry));
    }
}
