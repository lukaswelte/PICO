package controllers;


import models.Entry;
import play.db.DB;
import play.mvc.Controller;

import javax.sql.DataSource;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.sql.Connection;

public class CreateEntry extends Controller {


    /**
     * Create an entry with following inputs
     * @param url
     * @param title
     * @param context
     * @param thumbnailURL
     * @return entry
     */
    public Entry create(String url,String title,String context,String thumbnailURL){
        Entry entry = new Entry();
        if (isValidURL(url)) {
            entry.url = url;
        }
        entry.title = title;
        entry.context = context;
        entry.thumbnailURL = thumbnailURL;
        return entry;
    }

    /**
     * Validate the input if it is an correct URL; e.g: "www.coolors.io"
     * @param pUrl The retrieved Object
     * @return
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
     * Connecting to database
     */
    DataSource ds = DB.getDataSource();
    Connection connection = DB.getConnection();


}



