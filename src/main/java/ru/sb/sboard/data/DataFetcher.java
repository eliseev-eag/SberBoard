package ru.sb.sboard.data;

import java.util.Map;
import java.util.stream.Stream;

public interface DataFetcher {
    /**
     * Извлечение данных как векторов, конфигурация должна обеспечить извлечение плоской структуры.
     * В результирующих словарях ключ - имя поля, значение - извлечёный примитив.
     *
     * @param fetchConfig конфигурация
     */
    Stream<Map<String, Object>> extractData(FetchConfig fetchConfig);
}
