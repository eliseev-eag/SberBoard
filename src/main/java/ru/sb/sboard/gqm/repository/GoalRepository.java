package ru.sb.sboard.gqm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;
import ru.sb.sboard.gqm.domain.Goal;

import java.util.UUID;

@Repository
public interface GoalRepository extends JpaRepository<Goal, UUID>, QuerydslPredicateExecutor<Goal> {
}
