package ru.sb.sboard.data.properties;

public interface PropertyExtractor {
    /**
     * Извлекает свойство объекта
     * TODO некоторые запросы могут вычитывать свойства каскадом и возвращать более одного - как это обрабатывать?
     * Например, хотим вывести статусы задачи
     */
    Object extractProperty(Object object);
}
