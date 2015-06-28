package models;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.SqlUpdate;
import com.avaje.ebean.annotation.CreatedTimestamp;
import com.avaje.ebean.annotation.UpdatedTimestamp;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Entry extends Model{

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    public String url;

    @Constraints.Required
    public String title;

    public String context;

    public String publicUrl;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    public byte[] previewImage;

    @CreatedTimestamp
    public Timestamp registrationDate;

    @UpdatedTimestamp
    @Version
    public Timestamp lastUpdated;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    public User user;

    @ManyToMany
    @JsonManagedReference
    public Set<Label> labels = new HashSet<>();

    public static Entry create(String url, String title, User user) {
        Entry entry = new Entry();
        entry.url = url;
        entry.title = title;
        entry.user = user;
        return entry;
    }

    public static Entry update(Long id, String url, String title, User user){
       Entry updatedEntry = findById(id, user);
       updatedEntry.url = url;
       updatedEntry.title = title;
       updatedEntry.save();
       return updatedEntry;
    }

    private static Finder<Long,Entry> find = new Finder<>(
            Long.class, Entry.class
    );

    public static Entry findById(Long id, User user) {
        return Entry.find.where().eq("user", user).eq("id", id).findUnique();
    }

    public static Entry findByURL(String url, User user) {
        return Entry.find.where().eq("user", user).eq("url", url).findUnique();
    }

    public static Entry findByPublicURL(String publicUrl, User user) {
        return Entry.find.where().eq("user", user).eq("publicUrl", publicUrl).findUnique();
    }

    public static List<Entry> getAll(User user) {
        return Entry.find.where().eq("user", user).findList();
    }

    public static Entry findEntryByIdInternalOnly(Long id) {
        return Entry.find.byId(id);
    }
}
