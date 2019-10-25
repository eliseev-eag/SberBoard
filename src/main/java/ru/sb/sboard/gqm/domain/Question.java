package ru.sb.sboard.gqm.domain;

import lombok.*;
import ru.sb.sboard.common.domain.AbstractIdentity;
import ru.sb.sboard.dashboard.domain.Metric;
import ru.sb.sboard.tag.domain.Tag;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Question extends AbstractIdentity {

    private String text;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = CascadeType.PERSIST)
    private Set<Metric> metrics;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal")
    private Goal goal;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "questions", cascade = CascadeType.PERSIST)
    private Set<Tag> tags = new HashSet<>(0);

}
