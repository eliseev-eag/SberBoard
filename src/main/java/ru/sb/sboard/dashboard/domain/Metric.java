package ru.sb.sboard.dashboard.domain;

import lombok.*;
import ru.sb.sboard.common.domain.AbstractIdentity;

import javax.persistence.*;
import java.util.Map;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Metric extends AbstractIdentity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dashboard")
    private Dashboard dashboard;

    @ElementCollection
    @MapKeyColumn(name="name")
    @Column(name="value")
    @CollectionTable(name = "metrics_config", joinColumns = @JoinColumn(name = "metric"))
    private Map<String, String> config;
}
