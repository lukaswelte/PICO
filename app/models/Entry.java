package models;

import com.avaje.ebean.annotation.CreatedTimestamp;
import com.avaje.ebean.annotation.UpdatedTimestamp;
import com.fasterxml.jackson.annotation.*;
import play.data.validation.*;
import play.db.ebean.Model;

import javax.persistence.*;
import java.sql.Blob;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Entry extends Model {

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    public String url;

    @Constraints.Required
    public String title;

    public String context;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    @JsonIgnore
    public byte[] previewImage;

    @CreatedTimestamp
    public Timestamp registrationDate;

    @UpdatedTimestamp
    public Timestamp lastUpdated;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    public User user;

    @ManyToMany
    @JsonManagedReference
    public Set<Label> labels;

    public static Finder<Long,Entry> find = new Finder<>(
            Long.class, Entry.class
    );
}
