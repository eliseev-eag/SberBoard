package ru.sb.sboard.data.adapters.stash;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import ru.sb.sboard.data.adapters.BaseDataFetcher;
import ru.sb.sboard.data.properties.PropertyExtractorFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class BitBucketCommitDataFetcher extends BaseDataFetcher {
    private final String url;
    private final RestTemplate restOperations;

    public BitBucketCommitDataFetcher(String url, RestTemplate restOperations, PropertyExtractorFactory propertyExtractorFactory) {
        super(propertyExtractorFactory);
        this.url = url;
        this.restOperations = restOperations;
    }

    @Override
    protected Stream<?> streamData(Map<String, String> fetchConfiguration) {
        final ResponseEntity<HashMap> commitsResult = restOperations.exchange(
                commitsUrl(),
                HttpMethod.GET,
                new HttpEntity<>(new HttpHeaders()),
                new ParameterizedTypeReference<HashMap>() {
                },
                new HashMap<String, String>() {{
                    put("username", fetchConfiguration.get("username"));
                    put("repository", fetchConfiguration.get("repository"));
                }}
        );

        return ((List) commitsResult.getBody().get("values")).stream();
    }

    private String commitsUrl() {
        return apiUrl() + "/repositories/{username}/{repository}/commits";
    }

    /**
     * https://developer.atlassian.com/bitbucket/api/2/reference/resource/
     */
    private String apiUrl() {
        return url + "/api/2.0";
    }
}
