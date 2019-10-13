package ru.sb.sboard.metric.service.impl;

import org.springframework.stereotype.Component;
import ru.sb.sboard.metric.service.MetricAdapter;

@Component
public class RandomValueMetric implements MetricAdapter {

    @Override
    public Object getValue() {
        return Math.random();
    }

}
