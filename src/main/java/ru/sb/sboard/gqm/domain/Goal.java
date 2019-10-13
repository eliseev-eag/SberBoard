package ru.sb.sboard.gqm.domain;

import lombok.Getter;
import lombok.Setter;
import ru.sb.sboard.common.domain.AbstractIdentity;
import ru.sb.sboard.tag.domain.Tag;
import ru.sb.sboard.gqm.enums.GoalPurpose;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
public class Goal extends AbstractIdentity {
    private String description;

    @Enumerated(EnumType.STRING)
    private GoalPurpose purpose;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "goals", cascade = CascadeType.ALL)
    private Set<Tag> tags;

    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL)
    private Set<Question> questions;
}

