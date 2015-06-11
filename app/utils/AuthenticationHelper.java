package utils;

public class AuthenticationHelper {
    public static String generateToken() {
        return java.util.UUID.randomUUID().toString();
    }
}
