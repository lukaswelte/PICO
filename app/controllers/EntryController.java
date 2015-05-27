package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Entry;
import play.libs.Json;
import play.mvc.Result;

import javax.persistence.OptimisticLockException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;


public class EntryController extends BaseController {


    /**
     * Create an entry with following inputs
     * required input: Json containing the URL and the Title
     * Example:
     * (
     *  "url": "http://test.de"
     *  "title": "test"
     *  )
     * return API Response entry
     */
    public static Result createEntry() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return invalidAPIInput();
        }

        String url = json.findPath("url").textValue();
        Entry entry = new Entry();
        if (url == null || !isValidURL(url)) {
            return invalidAPIInput();
        }

        entry.url = url;

        String title = json.findPath("title").textValue();
        if (title == null) {
            return invalidAPIInput();
        } else {
            entry.title = title;
        }
        String context = json.findPath("context").textValue();
        if (context != null) {
            entry.context = context;
        }

        try {
            byte[] previewImage = json.findPath("previewImage").binaryValue();
            if (previewImage != null) {
                entry.previewImage = previewImage;
            }
        } catch (IOException e) {
            //Ignore
        }
        try {
        entry.save();
        }catch (OptimisticLockException e){
            // 
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
    public static Result getEntry(Long entryID) {
        Entry foundEntry = Entry.find.byId(entryID);
        return findAPIResponse(foundEntry);
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
    public static Result allEntries() {
        List<Entry> allEntries = Entry.find.all();
        return findAPIResponse(allEntries);
    }

}
