package ru.sb.sboard.data;

import ru.sb.sboard.data.properties.PropertyExtractorFactoryImpl;

import java.util.Map;

public interface FetchConfig {
    /**
     * Конфигурация выполняемого запроса ключ/значение
     */
    Map<String, String> requestConfig();

    /**
     * Описание маппинга для извлечения свойств
     *
     * Ключ - имя поля, в которое будет извлекаться свойство,
     * значение - путь к свойству в извлекаемых данных в виде строки
     * {@link PropertyExtractorFactoryImpl}
     *
     * Если список свойств пуст - возвращаются все свойства в неструктурирвоанном виде.
     */
    Map<String, String> properties();
}
