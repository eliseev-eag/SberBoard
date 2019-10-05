package ru.sb.sboard.data.adapters;

import ru.sb.sboard.data.properties.PropertyExtractor;
import ru.sb.sboard.data.properties.PropertyExtractorFactory;
import ru.sb.sboard.data.DataFetcher;
import ru.sb.sboard.data.FetchConfig;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public abstract class BaseDataFetcher implements DataFetcher {
    private final PropertyExtractorFactory propertyExtractorFactory;

    public BaseDataFetcher(PropertyExtractorFactory propertyExtractorFactory) {
        this.propertyExtractorFactory = propertyExtractorFactory;
    }

    @Override
    public Stream<Map<String, Object>> extractData(FetchConfig fetchConfig) {
        final Map<String, PropertyExtractor> propertyExtractors = fetchConfig.properties().entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> propertyExtractorFactory.createPropertyExtractor(entry.getValue())
                ));

        return streamData(fetchConfig.requestConfig())
                .flatMap(dataItem -> fetchConfig.properties().isEmpty()
                        ? Stream.of((HashMap<String, Object>) dataItem)
                        : extractData(propertyExtractors, dataItem)
                );
    }

    private Stream<Map<String, Object>> extractData(Map<String, PropertyExtractor> propertyExtractors, Object dataItem) {
        return Stream.of(propertyExtractors.entrySet()
                .stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().extractProperty(dataItem)
                )));
    }

    protected abstract Stream<?> streamData(Map<String, String> fetchConfiguration);
}
