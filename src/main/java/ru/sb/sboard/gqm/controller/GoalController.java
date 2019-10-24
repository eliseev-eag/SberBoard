package ru.sb.sboard.gqm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.sb.sboard.gqm.domain.Goal;
import ru.sb.sboard.gqm.domain.Question;
import ru.sb.sboard.gqm.repository.GoalRepository;
import ru.sb.sboard.gqm.repository.QuestionRepository;

import java.util.ArrayList;

@Transactional
@RepositoryRestController
public class GoalController {
    @Autowired
    private GoalRepository goalRepository;
    @Autowired
    private QuestionRepository questionRepository;

    @ResponseBody
    @RequestMapping(value = "goals/{id}/questions", method = RequestMethod.POST)
    public Object addQuestion(@PathVariable Long id, @RequestBody Question question, PagedResourcesAssembler assembler) {
        Goal goal = goalRepository.findById(id).orElseThrow(() -> new RuntimeException("goal missing"));

        Question q = questionRepository.save(question);
        q.setGoal(goal);
        goal.getQuestions().add(q);

        return assembler.toResource(new PageImpl(new ArrayList(goal.getQuestions())));
    }
}
