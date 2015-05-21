package models;

import com.avaje.ebean.annotation.CreatedTimestamp;
import com.avaje.ebean.annotation.UpdatedTimestamp;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import play.db.ebean.Model;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

import javax.persistence.*;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User extends Model {

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    public String email;

    @Constraints.Required
    public String password;

    @CreatedTimestamp
    public Timestamp registrationDate;

    @UpdatedTimestamp
    public Timestamp lastUpdated;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIdentityReference(alwaysAsId = true)
    public Set<Entry> entries;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIdentityReference(alwaysAsId = true)
    public Set<Label> labels;

    public static Finder<Long,User> find = new Finder<Long,User>(
            Long.class, User.class
    );
}
