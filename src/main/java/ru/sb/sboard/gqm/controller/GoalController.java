package ru.sb.sboard.gqm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.sb.sboard.gqm.domain.Goal;
import ru.sb.sboard.gqm.domain.Question;
import ru.sb.sboard.gqm.repository.GoalRepository;
import ru.sb.sboard.gqm.repository.QuestionRepository;

import java.util.UUID;

@Transactional
@RepositoryRestController
public class GoalController {
    @Autowired
    private GoalRepository goalRepository;
    @Autowired
    private QuestionRepository questionRepository;

    @ResponseBody
    @RequestMapping(value = "goals/{id}/questions", method = RequestMethod.POST)
    public Goal addQuestion(@PathVariable UUID id, @RequestBody Question question) {
        Goal goal = goalRepository.findById(id).orElseThrow(() -> new RuntimeException("goal missing"));

        Question q = questionRepository.save(question);
        q.setGoal(goal);
        goal.getQuestions().add(q);

        return goal;
    }
}
