package utils;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHashHelper {

    /**
     * Hashes a password
     * @param password the cleartext password to be hashed
     * @return The hashed string
     */
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    /**
     * Checks whether a cleartext password and a hashed string match
     * @param password the cleartext password
     * @param hashedPassword the hashed string
     * @return true if matching otherwise false
     */
    public static Boolean isPasswordMatching(String password, String hashedPassword) {
        if (password == null || hashedPassword == null) {
            return false;
        }
        return BCrypt.checkpw(password, hashedPassword);
    }
}
