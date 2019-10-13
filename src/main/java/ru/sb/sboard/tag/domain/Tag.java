package ru.sb.sboard.tag.domain;

import lombok.Getter;
import lombok.Setter;
import ru.sb.sboard._common.domain.AbstractIdentity;
import ru.sb.sboard.gqm.domain.Goal;
import ru.sb.sboard.gqm.domain.Question;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
public class Tag extends AbstractIdentity {
    private String description;
    private String name;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "tag_goal",
        joinColumns = {@JoinColumn(name = "tag")},
        inverseJoinColumns = {@JoinColumn(name = "goal")}
    )
    private Set<Goal> goals;

    @ManyToMany
    @JoinTable(
        name = "tag_question",
        joinColumns = {@JoinColumn(name = "tag")},
        inverseJoinColumns = {@JoinColumn(name = "question")}
    )
    private Set<Question> questions;
}
