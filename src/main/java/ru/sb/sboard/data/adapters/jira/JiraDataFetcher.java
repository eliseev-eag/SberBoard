package ru.sb.sboard.data.adapters.jira;

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

public class JiraDataFetcher extends BaseDataFetcher {
    private final String url;
    private final RestTemplate restOperations;

    public JiraDataFetcher(String url,
                           RestTemplate restOperations,
                           PropertyExtractorFactory propertyExtractorFactory) {
        super(propertyExtractorFactory);
        this.url = url;
        this.restOperations = restOperations;
    }


    private static String authUrl(String jiraUrl) {
        return jiraUrl + "/rest/auth/latest";
    }

    private String apiUrl() {
        return url + "/rest/api/latest";
    }

    private String authUrl() {
        return authUrl(url);
    }

    private String jqlUrl() {
        return apiUrl() + "/search?jql={jql}";
    }

    @Override
    protected Stream<?> streamData(Map<String, String> fetchConfiguration) {
        final ResponseEntity<HashMap> jqlResult = restOperations.exchange(
                jqlUrl(),
                HttpMethod.GET,
                new HttpEntity<>(new HttpHeaders()),
                new ParameterizedTypeReference<HashMap>() {
                },
                new HashMap<String, String>() {{
                    put("jql", fetchConfiguration.get("jql"));
                }}
        );

        return ((List) jqlResult.getBody().get("issues")).stream();
    }
}
