package controllers;

import models.Entry;
import play.mvc.Result;

import java.util.List;


public class EntryController extends BaseController {

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
     *      "status":200,
     *      "data":[
     *          {
     *          "id":5,
     *          "url":"www.test.de",
     *          "title":"Erste Test Entry",
     *          "context":"Das ist ein Context",
     *          "thumbnailURL":null,
     *          "registrationDate":1432157356000,
     *          "lastUpdated":1432157356000,
     *          "user":1,
     *          "labels":[{"id":6,"name":"fooba","user":null,"entries":[5]}]
     *          }
     *      ]
     * }
     */
    public static Result allEntries() {
        List<Entry> allEntries = Entry.find.all();
        return findAPIResponse(allEntries);
    }

}
