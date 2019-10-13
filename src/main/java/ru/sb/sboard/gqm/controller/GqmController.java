package ru.sb.sboard.gqm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sb.sboard.gqm.domain.Goal;
import ru.sb.sboard.gqm.domain.Question;
import ru.sb.sboard.gqm.repository.GoalRepository;
import ru.sb.sboard.gqm.repository.QuestionRepository;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/gqm/")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class GqmController {

    private final GoalRepository goalRepository;
    private final QuestionRepository questionRepository;

    @PostMapping("goal")
    public Goal saveGoal(
        @RequestBody Goal goal
    ) {
        return goalRepository.save(goal);
    }

    @GetMapping("goal")
    public List<Goal> getGoals() {
        return goalRepository.findAll();
    }

    @GetMapping("goal/{id}")
    public Goal getGoal(
        @PathVariable(name = "id") UUID goalId
    ) {
        return goalRepository.findById(goalId).orElse(null);
    }

    @PostMapping("goal/question")
    public Question saveQuestion(
        @RequestBody Question question
    ) {
        return questionRepository.saveAndFlush(question);
    }

    @GetMapping("goal/{id}/question")
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }
}
