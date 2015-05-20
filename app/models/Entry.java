package models;

import com.avaje.ebean.annotation.CreatedTimestamp;
import com.avaje.ebean.annotation.UpdatedTimestamp;
import play.data.validation.*;
import play.db.ebean.Model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
public class Entry extends Model {

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    public String url;

    @Constraints.Required
    public String title;

    public String context;
    public String thumbnailURL;

    @CreatedTimestamp
    public Timestamp registrationDate;

    @UpdatedTimestamp
    public Timestamp lastUpdated;

    @ManyToOne
    public User user;

    @ManyToMany
    public Set<Label> labels;

    public static Finder<Long,Entry> find = new Finder<Long,Entry>(
            Long.class, Entry.class
    );
}
