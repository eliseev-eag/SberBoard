package ru.sb.sboard.gqm.domain;

import lombok.*;
import ru.sb.sboard.common.domain.AbstractIdentity;
import ru.sb.sboard.tag.domain.Tag;
import ru.sb.sboard.gqm.enums.GoalPurpose;

import javax.persistence.*;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Goal extends AbstractIdentity {
    private String description;

    @Enumerated(EnumType.STRING)
    private GoalPurpose purpose;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "goals")
    private Set<Tag> tags;

    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Question> questions;
}

