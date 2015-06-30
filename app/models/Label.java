package models;

import com.fasterxml.jackson.annotation.*;
import play.data.validation.*;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Label extends Model {

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    public String name;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    public User user;

    @ManyToMany(mappedBy = "labels")
    @JsonIdentityReference(alwaysAsId = true)
    public Set<Entry> entries = new HashSet<>();

    public static Label create(String name, User user) {
        Label label = new Label();
        label.name = name;
        label.user = user;
        label.save();
        return label;
    }

    public static Label update(Long id, String name, User user){
        Label updatedLabel = findById(id, user);
        updatedLabel.name = name;
        updatedLabel.user= user;
        updatedLabel.save();
        return updatedLabel;
    }

    private static Finder<Long,Label> find = new Finder<Long,Label>(
            Long.class, Label.class
    );

    public static Label findById(Long id, User user) {
        return Label.find.where().eq("user", user).eq("id", id).findUnique();
    }

    public static Label findByName(String name, User user) {
        return Label.find.where().eq("user", user).where().eq("name", name).findUnique();
    }

    public static List<Label> getAll(User user) {
        return Label.find.where().eq("user", user).findList();
    }

}
