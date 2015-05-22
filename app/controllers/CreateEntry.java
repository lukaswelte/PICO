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
    DataSource ds = DB.getDataSource();
    Connection connection = DB.getConnection();


    }


