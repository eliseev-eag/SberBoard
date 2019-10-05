package ru.sb.sboard.data.properties.jpath;

import com.jayway.jsonpath.JsonPath;
import ru.sb.sboard.data.properties.PropertyExtractor;

public class JsonPathPropertyExtractor implements PropertyExtractor {
    private final JsonPath compiledPath;

    public JsonPathPropertyExtractor(String jsonPath) {
        this.compiledPath = JsonPath.compile(jsonPath);
    }

    @Override
    public Object extractProperty(Object object) {
        return compiledPath.read(object);
    }
}
