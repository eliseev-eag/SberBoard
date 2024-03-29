package ru.sb.sboard.gqm.domain;

import lombok.*;
import ru.sb.sboard.common.domain.AbstractIdentity;
import ru.sb.sboard.gqm.enums.GoalPurpose;
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
public class Goal extends AbstractIdentity {
    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private GoalPurpose purpose;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "goals", cascade = CascadeType.PERSIST)
    private Set<Tag> tags = new HashSet<>(0);

    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Question> questions = new HashSet<>(0);
}

