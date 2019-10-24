package ru.sb.sboard.dashboard;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.sb.sboard.dashboard.domain.Metric;

import java.util.UUID;

@Repository
public interface MetricRepository extends CrudRepository<Metric, UUID> {

}
