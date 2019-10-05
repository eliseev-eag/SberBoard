package ru.sb.sboard.data.properties;

import ru.sb.sboard.data.properties.maps.MapPropertyExtractor;
import ru.sb.sboard.data.properties.jpath.JsonPathPropertyExtractor;
import ru.sb.sboard.data.properties.jxpath.JXPathPropertyExtractor;

public class PropertyExtractorFactoryImpl implements PropertyExtractorFactory {

    public static final String JPATH = "jpath#";
    public static final String JXPATH = "jxpath#";
    public static final String MAP = "map#";

    @Override
    public PropertyExtractor createPropertyExtractor(String propertyPath) {
        if (propertyPath.startsWith(JXPATH)) {
            return new JXPathPropertyExtractor(propertyPath.substring(JXPATH.length()));
        }

        if (propertyPath.startsWith(MAP)) {
            return MapPropertyExtractor.forPath(propertyPath.substring(MAP.length()));
        }

        if (propertyPath.startsWith(JPATH)) {
            return new JsonPathPropertyExtractor(propertyPath.substring(JPATH.length()));
        }

        return new JsonPathPropertyExtractor(propertyPath);
    }
}
