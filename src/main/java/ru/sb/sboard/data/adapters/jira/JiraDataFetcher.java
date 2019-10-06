package ru.sb.sboard.data.adapters.jira;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;
import ru.sb.sboard.data.adapters.BaseDataFetcher;
import ru.sb.sboard.data.properties.PropertyExtractorFactory;
import ru.sb.sboard.data.properties.maps.MapPropertyExtractor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Stream;

import static java.util.Collections.singletonList;

public class JiraDataFetcher extends BaseDataFetcher {
    private final String jiraUrl;
    private final RestOperations restOperations;
    private final Supplier<String> tokenProvider;

    public JiraDataFetcher(String jiraUrl,
                           RestOperations restOperations,
                           Supplier<String> tokenProvider,
                           PropertyExtractorFactory propertyExtractorFactory) {
        super(propertyExtractorFactory);
        this.jiraUrl = jiraUrl;
        this.restOperations = restOperations;
        this.tokenProvider = tokenProvider;
    }

    public JiraDataFetcher(String jiraUrl,
                           RestOperations restOperations,
                           PropertyExtractorFactory propertyExtractorFactory) {
        this(jiraUrl,
                restOperations,
                () -> {
                    final ResponseEntity<HashMap> loginResponse = restOperations
                            .postForEntity(
                                    authUrl(jiraUrl) + "/session",
                                    new HashMap<String, String>() {{
                                        put("username", System.getProperty("jira.user"));
                                        put("password", System.getProperty("jira.password"));
                                    }},
                                    HashMap.class
                            );

                    return MapPropertyExtractor.get(String.class, loginResponse.getBody(), "session", "value");
                },
                propertyExtractorFactory
        );
    }

    private static String authUrl(String jiraUrl) {
        return jiraUrl + "/rest/auth/latest";
    }

    private String apiUrl() {
        return jiraUrl + "/rest/api/latest";
    }

    private String authUrl() {
        return authUrl(jiraUrl);
    }

    private String jqlUrl() {
        return apiUrl() + "/search?jql={jql}";
    }

    @Override
    protected Stream<?> streamData(Map<String, String> fetchConfiguration) {
        final ResponseEntity<HashMap> jqlResult = restOperations.exchange(
                jqlUrl(),
                HttpMethod.GET,
                new HttpEntity<>(
                        formHeaders()
                ),
                new ParameterizedTypeReference<HashMap>() {
                },
                new HashMap<String, String>() {{
                    put("jql", fetchConfiguration.get("jql"));
                }}
        );

        return ((List) jqlResult.getBody().get("issues")).stream();
    }

    private HttpHeaders formHeaders() {
        if (tokenProvider == null) {
            return new HttpHeaders();
        }

        String token = tokenProvider.get();
        System.out.println("Session: " + token);

        return new HttpHeaders() {{
            put("cookie", singletonList("JSESSIONID=" + token));
        }};
    }
}
