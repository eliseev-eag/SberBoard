package ru.sb.sboard.metric.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sb.sboard.metric.enums.Metric;

import java.util.Map;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MetricService {

    private final Map<String, MetricAdapter> metrics;

    public Object getMetricValue(Metric metric) {
        return metrics.get(metric.getHandlerName()).getValue();
    }

}
