package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.F;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.util.function.Function;

public class BaseController extends Controller {

    /**
     * Helper method that takes a json result and converts it into a API result
     * @param payload the json payload that should be sent
     * @return a http json response
     */
    protected static Result jsonAPIResponse(JsonNode payload) {
        if (payload == null) {
            ObjectNode result = Json.newObject();
            result.put("status", Http.Status.BAD_REQUEST);
            return badRequest(result);
        } else {
            ObjectNode result = Json.newObject();
            result.put("status", Http.Status.OK);
            result.put("data", payload);
            return ok(result);
        }
    }

    /**
     * The default API NotFound Response
     * @return The json API
     */
    protected static Result notFoundAPIResponse() {
        ObjectNode result = Json.newObject();
        result.put("status", Http.Status.NOT_FOUND);
        return notFound(result);
    }

    /**
     * Wrapper for find methods of the API
     * Checks if the object is valid, otherwise prints not found.
     * If it cannot be serialized it returns a Bad Request
     *
     * @param foundEntity The retrieved Object
     * @return The corresponding API Response
     */
    protected static Result findAPIResponse(Object foundEntity) {
        if (foundEntity == null) {
            return notFoundAPIResponse();
        }

        return jsonAPIResponse(Json.toJson(foundEntity));
    }

    /**
     * The default API Invalid Input Response
     * @return The json Result
     */
    protected static Result invalidAPIInput() {
        ObjectNode result = Json.newObject();
        result.put("status", Http.Status.BAD_REQUEST);
        result.put("message", "Invalid Input");
        return badRequest(result);
    }

    protected static F.Promise<Result> wrapFunctionInPromise(final F.Function0 function) {
        return F.Promise.promise(function);
    }
}
