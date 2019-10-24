package ru.sb.sboard.dashboard.domain;

import lombok.*;
import ru.sb.sboard.common.domain.AbstractIdentity;
import ru.sb.sboard.gqm.domain.Question;

import javax.persistence.*;
import java.util.Map;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Metric extends AbstractIdentity {
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    private Dashboard dashboard;

    @ElementCollection
    @MapKeyColumn(name="name")
    @Column(name="value")
    @CollectionTable(name = "metrics_config", joinColumns = @JoinColumn(name = "metric"))
    private Map<String, String> config;
}
