package ru.sb.sboard.gqm.domain;

import lombok.Getter;
import lombok.Setter;
import ru.sb.sboard.common.domain.AbstractIdentity;
import ru.sb.sboard.tag.domain.Tag;
import ru.sb.sboard.metric.enums.Metric;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
public class Question extends AbstractIdentity {

    private String text;

    @Enumerated(EnumType.STRING)
    private Metric metric;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal")
    private Goal goal;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "questions")
    private Set<Tag> tags;

}
