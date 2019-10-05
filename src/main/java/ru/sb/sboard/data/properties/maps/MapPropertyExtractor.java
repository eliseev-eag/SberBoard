package ru.sb.sboard.data.properties.maps;

import ru.sb.sboard.data.properties.PropertyExtractor;

import java.util.HashMap;
import java.util.Iterator;

import static java.util.Arrays.asList;

public class MapPropertyExtractor implements PropertyExtractor {
    private final Iterable<String> path;

    public MapPropertyExtractor(Iterable<String> path) {
        this.path = path;
    }

    @Override
    public Object extractProperty(Object object) {
        return get(Object.class, object, path.iterator());
    }

    public static MapPropertyExtractor forPath(String... path) {
        return new MapPropertyExtractor(asList(path));
    }

    public static <T> T get(Class<T> resClass, Object body, String... path) {
        return get(resClass, body, asList(path).iterator());
    }

    public static <T> T get(Class<T> resClass, Object body, Iterator<String> iterator) {
        if (body == null) {
            return null;
        }

        if (!iterator.hasNext()) {
            return resClass.cast(body);
        }

        return (T) get(Object.class, ((HashMap<String, ?>) body).get(iterator.next()), iterator);
    }
}
