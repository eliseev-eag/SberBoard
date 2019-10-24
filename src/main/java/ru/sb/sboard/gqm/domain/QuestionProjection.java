package ru.sb.sboard.gqm.domain;

import org.springframework.data.rest.core.config.Projection;
import ru.sb.sboard.dashboard.domain.MetricProjection;

import java.util.Set;

@Projection(name = "default", types = { Question.class })
public interface QuestionProjection {
    String getText();
    Set<MetricProjection> getMetrics();
}
