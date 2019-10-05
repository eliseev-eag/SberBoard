package ru.sb.sboard.data.properties;

public interface PropertyExtractorFactory {
    PropertyExtractor createPropertyExtractor(String propertyPath);
}
