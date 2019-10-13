package ru.sb.sboard.metric.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ru.sb.sboard.metric.service.impl.RandomValueMetric;

@Getter
@RequiredArgsConstructor
public enum Metric {

    RANDOM_VALUE_METRIC(
        "Пример метрики, возвращает рандомные числа",
        RandomValueMetric.class
    );

    private final String description;
    private final Class handler;

    public String getHandlerName() {
        char[] name = handler.getSimpleName().toCharArray();
        name[0] = Character.toLowerCase(name[0]);

        return new String(name);
    }
}
