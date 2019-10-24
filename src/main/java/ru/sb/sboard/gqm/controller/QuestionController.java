package ru.sb.sboard.gqm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resources;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.sb.sboard.dashboard.MetricRepository;
import ru.sb.sboard.dashboard.domain.Metric;
import ru.sb.sboard.gqm.domain.Question;
import ru.sb.sboard.gqm.repository.QuestionRepository;

import java.util.stream.Collectors;

@Transactional
@RepositoryRestController
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private MetricRepository metricRepository;

    @ResponseBody
    @RequestMapping(value = "questions/{id}/metrics", method = RequestMethod.POST)
    public Object addMetric(@PathVariable Long id, @RequestBody Metric metric, PersistentEntityResourceAssembler assembler) {
        Question q = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("goal missing"));

        Metric m = metricRepository.save(metric);
        m.setQuestion(q);
        q.getMetrics().add(m);

        return new Resources<>(q.getMetrics()
                .stream()
                .map(assembler::toResource)
                .collect(Collectors.toList())
        );
    }
}
