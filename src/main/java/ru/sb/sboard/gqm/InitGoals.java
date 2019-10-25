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

import java.util.HashSet;

import static java.util.Arrays.asList;

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
                            .name("Анализ проекта ReactJs с целью выявить лучшие практики")
                            .tags(
                                    new HashSet<>(asList(tagRepository.save(Tag.builder().name("react").build())))
                            )
                            .questions(
                                    new HashSet<>(asList(
                                            questionRepository.save(Question.builder()
                                                    .text("Как изменялась сложность проекта с течением времени?")
                                                    .metrics(new HashSet<>(asList(
                                                            metricRepository.save(Metric.builder()
                                                                    .name("Количество обращений")
                                                                    .dataSource("react")
                                                                    .build()),

                                                            metricRepository.save(Metric.builder()
                                                                    .name("Количество открытых обращений")
                                                                    .dataSource("react")
                                                                    .build()),

                                                            metricRepository.save(Metric.builder()
                                                                    .name("Количество закрытых обращений")
                                                                    .dataSource("react")
                                                                    .build())
                                                    )))
                                                    .build()
                                            ),
                                            questionRepository.save(Question.builder()
                                                    .text("Показатели стаических анализаторов сложности кода")
                                                    .metrics(new HashSet<>(asList(
                                                            metricRepository.save(Metric.builder()
                                                                    .name("Количество файлов")
                                                                    .dataSource("react")
                                                                    .build()),

                                                            metricRepository.save(Metric.builder()
                                                                    .name("Количество строк")
                                                                    .dataSource("react")
                                                                    .build()),

                                                            metricRepository.save(Metric.builder()
                                                                    .name("Сложность")
                                                                    .dataSource("react")
                                                                    .build()),

                                                            metricRepository.save(Metric.builder()
                                                                    .name("Сложность / Строки")
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
                    goal.getTags().forEach(t -> t.setGoals(new HashSet<>(asList(goal))));

                    return goalRepository.save(goal);
                });
    }
}
