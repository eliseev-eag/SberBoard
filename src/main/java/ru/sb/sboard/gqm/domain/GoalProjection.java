package ru.sb.sboard.gqm.domain;

import org.springframework.data.rest.core.config.Projection;
import ru.sb.sboard.tag.domain.Tag;

import java.util.Set;

@Projection(name = "default", types = { Goal.class })
public interface GoalProjection {
    String getName();
    String getDescription();
    Set<Tag> getTags();
    Set<QuestionProjection> getQuestions();
}
