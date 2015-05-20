package models;

import play.data.validation.*;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Label extends Model {

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    public String name;

    @ManyToOne
    public User user;

    @ManyToMany(mappedBy = "labels")
    public Set<Entry> entries;

    public static Finder<Long,Label> find = new Finder<Long,Label>(
            Long.class, Label.class
    );

    public Label(String name) {
        this.name = name;
    }
}
