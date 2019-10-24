package ru.sb.sboard.dashboard.domain;

import lombok.*;
import ru.sb.sboard.common.domain.AbstractIdentity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Dashboard extends AbstractIdentity {
    @OneToMany(mappedBy = "dashboard", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Metric> metrics = new HashSet<>();
}
