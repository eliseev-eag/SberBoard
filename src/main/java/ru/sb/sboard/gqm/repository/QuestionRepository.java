package ru.sb.sboard.gqm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sb.sboard.gqm.domain.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
