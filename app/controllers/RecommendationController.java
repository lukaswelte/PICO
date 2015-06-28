package controllers;


import com.fasterxml.jackson.databind.JsonNode;
import models.Entry;;
import models.User;
import play.mvc.Result;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


public class RecommendationController extends BaseController {

    public static Result getRecommendation(){

        User user = (User) ctx().args.get("user");
        JsonNode json = request().body().asJson();


        Iterator<JsonNode> labels = json.findPath("labels").elements();
        List<String> labelNames = new ArrayList<>();
        while(labels.hasNext()) {
            JsonNode s = labels.next();
            String labelName = s.textValue();
            labelNames.add(labelName);
        }
        List<Entry> allRecommendEntries = Entry.getAllRecommendedEntries(labelNames);

        return findAPIResponse(allRecommendEntries);
    }
}

