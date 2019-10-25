package ru.sb.sboard.dashboard.domain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "default", types = { Metric.class })
public interface MetricProjection {
    Long getId();
    @Value("#{@dataSources.getData(target.dataSource, target.config)}")
    Object getData();
    String getName();
    String getDataSource();
}
