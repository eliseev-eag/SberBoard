package ru.sb.sboard.gqm;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;
import ru.sb.sboard.dashboard.MetricRepository;
import ru.sb.sboard.dashboard.domain.Metric;
import ru.sb.sboard.gqm.domain.Goal;
import ru.sb.sboard.gqm.domain.Question;
import ru.sb.sboard.gqm.repository.GoalRepository;
import ru.sb.sboard.gqm.repository.QuestionRepository;
import ru.sb.sboard.tag.domain.Tag;
import ru.sb.sboard.tag.domain.TagRepository;

import java.util.Arrays;
import java.util.HashSet;

@Component
public class InitGoals implements InitializingBean {
    @Autowired
    private GoalRepository goalRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private PlatformTransactionManager transactionManager;
    @Autowired
    private MetricRepository metricRepository;

    @Override
    public void afterPropertiesSet() throws Exception {
        new TransactionTemplate(transactionManager)
                .execute(status -> {
                    Goal goal = Goal.builder()
                            .description("Сократить число задач с типом баг в спринте")
                            .tags(new HashSet<>(Arrays.asList(
                                    tagRepository.save(Tag.builder()
                                            .name("Дефекты")
                                            .build()
                                    )
                            )))
                            .questions(
                                    new HashSet<>(Arrays.asList(
                                            questionRepository.save(Question.builder()
                                                    .text("Плохо сформулировано ТЗ?")
                                                    .build()),
                                            questionRepository.save(Question.builder()
                                                    .text("Отсутствуют тесты функционала?")
                                                    .build()),
                                            questionRepository.save(Question.builder()
                                                    .text("Баги пропускаются на этапе тестирования?")
                                                    .metrics(new HashSet<>(Arrays.asList(
                                                            metricRepository.save(Metric.builder()
                                                                    .name("Реакт")
                                                                    .dataSource("react")
                                                                .build())
                                                    )))
                                                    .build())
                                    ))
                            )
                            .build();

                    goal.getQuestions().forEach(q -> {
                        q.setGoal(goal);
                        if (q.getMetrics() != null) {
                            q.getMetrics().forEach(m -> m.setQuestion(q));
                        }
                    });
                    goal.getTags().forEach(t -> t.setGoals(new HashSet<>(Arrays.asList(goal))));

                    return goalRepository.save(goal);
                });
    }
}
