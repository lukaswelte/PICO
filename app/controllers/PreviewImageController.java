package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Entry;
import play.Logger;
import play.libs.F;
import play.libs.ws.WS;
import play.libs.ws.WSRequestHolder;
import play.mvc.Result;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Objects;

public class PreviewImageController extends BaseController {

    /**
     * Returns the URL to call for the generated preview image
     * @param urlToRender the url that should be rendered
     * @return the API URL to call to get the rendered PNG
     */
    private static WSRequestHolder getPreviewGenerationAPIRequest(String urlToRender) {
        String urlToFetch = urlToRender;
        if (!urlToFetch.startsWith("http")) {
            urlToFetch = "http://".concat(urlToFetch);
        }
        return WS.url("http://api.phantomjscloud.com/single/browser/v1/a-demo-key-with-low-quota-per-ip-address/")
                .setQueryParameter("targetUrl", urlToFetch)
                .setQueryParameter("loadImages", "true")
                .setQueryParameter("resourceUrlBlacklist", "[]")
                .setQueryParameter("viewportSize", "{width:1280,height:720,zoomFactor:1.0}")
                .setQueryParameter("clipRectangle", "{top:0,left:0,width:1280,height:720}")
                .setQueryParameter("requestType", "png");
    }

    /**
     * Fetches the preview image of a url as png in bytes
     * @param urlToRender the URL that show be rendered as png
     * @return The byte array containing the image bytes
     */
    public static F.Promise<byte[]> fetchPreviewImage(String urlToRender) {
        WSRequestHolder previewGenerationAPIRequest = getPreviewGenerationAPIRequest(urlToRender);
        return previewGenerationAPIRequest.get().map(response -> {
            InputStream inputStream = null;
            try {
                inputStream = response.getBodyAsStream();

                ByteArrayOutputStream output = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int count;
                while ((count = inputStream.read(buffer)) != -1) {
                    output.write(buffer, 0, count);
                }

                return output.toByteArray();
            } catch (IOException e) {
                Logger.error("Generation Exception: " + e);
                return new byte[0];
            } finally {
                if (inputStream != null) {inputStream.close();}
            }
        });
    }

    /**
     * Generates a preview Image for a given website
     *
     * required input: Json containing the URL
     * Example:
     * {
     *     "format": "base64",
     *     "url": "http://test.de"
     * }
     *
     * @return The base64 encoded image or outputted as HTML
     */
    public static F.Promise<Result> generatePreviewOfURL() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return wrapFunctionInPromise(BaseController::invalidAPIInput);
        }

        String url = json.findPath("url").textValue();
        if (url == null) {
            return wrapFunctionInPromise(BaseController::invalidAPIInput);
        }

        String format = json.findPath("format").textValue();
        if (format == null) {
            format = "base64";
        }

        final String finalFormat = format;
        return fetchPreviewImage(url).map(image -> {
            if (Objects.equals(finalFormat, "base64")) {
                byte[] base64Image = Base64.getEncoder().encode(image);
                return ok(base64Image).as("image/png");
            } else {
                return ok(image).as("image/png");
            }
        });
    }

    /**
     * Generates and displays a preview image for a url
     * @param url the url that should be rendered
     * @return The rendered website as png
     */
    public static F.Promise<Result> getPreviewImageOfURL(String url) {
        return fetchPreviewImage(url).map(image -> ok(image).as("image/png"));
    }

    /**
     * Returns the png of the preview image
     * @param entryID The entry id for which the image should be shown
     * @return The preview image of the entry as png
     */
    public static Result previewImageOfEntry(Long entryID) {
        Entry entry = Entry.findEntryByIdInternalOnly(entryID);
        if (entry == null || entry.previewImage == null) {
            return notFound();
        } else {
            return ok(entry.previewImage).as("image/png");
        }
    }
}
