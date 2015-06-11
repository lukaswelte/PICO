package utils;


import java.util.regex.Pattern;

public class EmailValidator {

    public static final String EMAIL_REGEX = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
    public static final Pattern REGEX_PATTERN = java.util.regex.Pattern.compile(EMAIL_REGEX);

    public static Boolean isValidEmailAddress(String emailAddress) {
        return REGEX_PATTERN.matcher(emailAddress).matches();
    }
}
