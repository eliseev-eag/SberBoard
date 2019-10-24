package ru.sb.sboard.gqm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resources;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.sb.sboard.gqm.domain.Goal;
import ru.sb.sboard.gqm.domain.Question;
import ru.sb.sboard.gqm.repository.GoalRepository;
import ru.sb.sboard.gqm.repository.QuestionRepository;

import java.util.stream.Collectors;

@Transactional
@RepositoryRestController
public class GoalController {
    @Autowired
    private GoalRepository goalRepository;
    @Autowired
    private QuestionRepository questionRepository;

    @ResponseBody
    @RequestMapping(value = "goals/{id}/questions", method = RequestMethod.POST)
    public Object addQuestion(@PathVariable Long id, @RequestBody Question question, PersistentEntityResourceAssembler assembler) {
        Goal goal = goalRepository.findById(id).orElseThrow(() -> new RuntimeException("goal missing"));

        Question q = questionRepository.save(question);
        q.setGoal(goal);
        goal.getQuestions().add(q);

        return new Resources<>(goal.getQuestions()
                .stream()
                .map(assembler::toResource)
                .collect(Collectors.toList())
        );
    }
}
