package ru.sb.sboard;

import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;
import ru.sb.sboard.data.adapters.jira.JiraDataFetcher;
import ru.sb.sboard.data.adapters.stash.BitBucketCommitDataFetcher;
import ru.sb.sboard.data.properties.PropertyExtractorFactory;
import ru.sb.sboard.data.properties.PropertyExtractorFactoryImpl;
import ru.sb.sboard.data.properties.maps.MapPropertyExtractor;

import javax.net.ssl.SSLContext;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

@SpringBootApplication
public class SberBoardApplication {

    private static final String JIRA_URL = "https://jira.atlassian.com/";
    private static final String BITBUCKET_URL = "https://bitbucket.org/";

    @Autowired
    private PropertyExtractorFactory propertyExtractorFactory;

    public static void main(String[] args) {
        SpringApplication.run(SberBoardApplication.class, args);
    }

    @Bean
    public PropertyExtractorFactory propertyExtractorFactory() {
        return new PropertyExtractorFactoryImpl();
    }

    @Bean
    @Scope("prototype")
    public ClientHttpRequestFactory clientHttpRequestFactory() throws Exception {
        return new HttpComponentsClientHttpRequestFactory(trustyHttpClient());
    }

    @Bean
    @Scope("prototype")
    public CloseableHttpClient trustyHttpClient() throws NoSuchAlgorithmException, KeyManagementException, KeyStoreException {
        final SSLContext sslContext = SSLContexts.custom()
                .loadTrustMaterial(null, (x509Certificates, s) -> true)
                .build();

        SSLConnectionSocketFactory sslConnectionSocketFactory =
                new SSLConnectionSocketFactory(sslContext, (s, sslSession) -> true);

        return HttpClients.custom()
                .setSSLSocketFactory(sslConnectionSocketFactory)
                .build();
    }

    @Bean
    @Scope(value = "prototype", proxyMode = ScopedProxyMode.INTERFACES)
    public JiraDataFetcher jiraDataFetcher() throws Exception {
        return new JiraDataFetcher(JIRA_URL, restTemplate(), propertyExtractorFactory);
    }

    @Bean
    @Scope(value = "prototype", proxyMode = ScopedProxyMode.INTERFACES)
    public BitBucketCommitDataFetcher bitBucketDataFetcher() throws Exception {
        return new BitBucketCommitDataFetcher(BITBUCKET_URL, restTemplate(), propertyExtractorFactory);
    }

    @Bean
    @Scope(value = "prototype")
    public RestTemplate restTemplate() throws Exception {
        return new RestTemplate(clientHttpRequestFactory());
    }

    public static String postForSession(RestTemplate restOperations, String sessionUrl, String username, String password) {
        final ResponseEntity<HashMap> loginResponse = restOperations
                .postForEntity(
                        sessionUrl,
                        new HashMap<String, String>() {{
                            put("username", username);
                            put("password", password);
                        }},
                        HashMap.class
                );

        return MapPropertyExtractor.get(String.class, loginResponse.getBody(), "session", "value");
    }
}
