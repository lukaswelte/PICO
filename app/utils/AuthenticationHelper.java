package utils;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.User;
import play.libs.F;
import play.libs.Json;
import play.mvc.*;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class AuthenticationHelper {
    public static String generateToken() {
        return java.util.UUID.randomUUID().toString();
    }


    /**
     * Wraps the annotated action in an <code>UserAuthenticatedAction</code>.
     */
    @With(UserAuthenticatedAction.class)
    @Target({ElementType.TYPE, ElementType.METHOD})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface UserAuthenticated {
        Class<? extends Authenticator> value() default Authenticator.class;
    }

    /**
     * Wraps another action, allowing only user authenticated HTTP requests.
     * <p>
     * The user is retrieved from the http headers and set as argument to the request.
     */
    public static class UserAuthenticatedAction extends Action<UserAuthenticated> {

        public F.Promise<Result> call(Http.Context ctx) {
            try {
                Authenticator authenticator = configuration.value().newInstance();
                User user = authenticator.getUser(ctx);
                if(user == null) {
                    Result unauthorized = authenticator.onUnauthorized(ctx);
                    return F.Promise.pure(unauthorized);
                } else {
                    try {
                        ctx.args.put("user", user);
                        return delegate.call(ctx);
                    } finally {
                        ctx.args.put("user", null);
                    }
                }
            } catch(RuntimeException e) {
                throw e;
            } catch(Throwable t) {
                throw new RuntimeException(t);
            }
        }

    }

    /**
     * Handles authentication.
     */
    public static class Authenticator extends Results {

        /**
         * Retrieves the user from the HTTP context;.
         *
         * @return null if the user is not authenticated.
         */
        public User getUser(Http.Context ctx) {
            String accessToken = ctx.request().getHeader("Access-Token");
            if (accessToken == null) {
                return null;
            }

            return User.findByToken(accessToken);
        }

        /**
         * Generates an alternative result if the user is not authenticated; the default a not authorized json response.
         */
        public Result onUnauthorized(Http.Context ctx) {
            ObjectNode result = Json.newObject();
            result.put("status", Http.Status.UNAUTHORIZED);
            result.put("message", "Not authorized");
            return unauthorized(result);
        }

    }
}
