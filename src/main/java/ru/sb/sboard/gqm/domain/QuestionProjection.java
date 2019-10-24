package ru.sb.sboard.gqm.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "default", types = { Question.class })
public interface QuestionProjection {
    String getText();
    String getMetric();
}
