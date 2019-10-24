package ru.sb.sboard.dashboard;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.sb.sboard.dashboard.domain.Dashboard;

import java.util.UUID;

@Repository
public interface DashboardRepository extends CrudRepository<Dashboard, UUID> {

}
