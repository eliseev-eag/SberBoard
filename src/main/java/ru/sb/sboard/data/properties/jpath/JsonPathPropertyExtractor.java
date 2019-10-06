package ru.sb.sboard.data.properties.jpath;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.Option;
import ru.sb.sboard.data.properties.PropertyExtractor;

public class JsonPathPropertyExtractor implements PropertyExtractor {
    public static final Configuration DEFAULT_CONFIGURATION = Configuration.builder()
            .options(
                    Option.DEFAULT_PATH_LEAF_TO_NULL,
                    Option.SUPPRESS_EXCEPTIONS
            )
            .build();
    private final JsonPath compiledPath;

    public JsonPathPropertyExtractor(String jsonPath) {
        this.compiledPath = JsonPath.compile(jsonPath);
    }

    @Override
    public Object extractProperty(Object object) {
        return compiledPath.read(object, DEFAULT_CONFIGURATION);
    }
}
