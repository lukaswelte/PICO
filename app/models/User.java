package models;

import com.avaje.ebean.annotation.CreatedTimestamp;
import com.avaje.ebean.annotation.UpdatedTimestamp;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import utils.AuthenticationHelper;
import utils.PasswordHashHelper;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User extends Model {

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    public String email;

    @Constraints.Required
    @JsonIgnore
    public String hashedPassword;

    @CreatedTimestamp
    public Timestamp registrationDate;

    @UpdatedTimestamp
    @Version
    public Timestamp lastUpdated;

    @Column(unique = true)
    public String token;

    @JsonIgnore
    public Timestamp tokenCreatedDate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIdentityReference(alwaysAsId = true)
    public Set<Entry> entries = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIdentityReference(alwaysAsId = true)
    public Set<Label> labels = new HashSet<>();

    /**
     * Checks whether a given password matches the password of the user
     * @param password the given password
     * @return true if it matches otherwise false
     */
    public Boolean passwordMatches(String password) {
        return PasswordHashHelper.isPasswordMatching(password, this.hashedPassword);
    }

    /**
     * Updates the token
     */
    public void refreshToken() {
        this.token = AuthenticationHelper.generateToken();
        this.tokenCreatedDate = new Timestamp(System.currentTimeMillis());
        this.save();
    }

    public static User create(String email, String password) {
        User user = new User();
        user.email = email;
        user.hashedPassword = PasswordHashHelper.hashPassword(password);
        user.token = AuthenticationHelper.generateToken();
        user.tokenCreatedDate = new Timestamp(System.currentTimeMillis());
        user.save();
        return user;
    }

    private static Finder<Long,User> find = new Finder<Long,User>(
            Long.class, User.class
    );

    public static User findByEmail(String email) {
        return User.find.where().eq("email", email).findUnique();
    }

    public static User findByToken(String token) {
        return User.find.where().eq("token", token).findUnique();
    }
}
