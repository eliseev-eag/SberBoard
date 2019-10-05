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
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;
import ru.sb.sboard.data.properties.PropertyExtractorFactory;
import ru.sb.sboard.data.properties.PropertyExtractorFactoryImpl;
import ru.sb.sboard.data.FetchConfig;
import ru.sb.sboard.data.adapters.jira.JiraDataFetcher;

import javax.annotation.PostConstruct;
import javax.net.ssl.SSLContext;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SpringBootApplication
public class SberBoardApplication {

    private static final String JIRA_URL = "${jira.url}";

    @Autowired
    private RestOperations restTemplate;
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

    @PostConstruct
    public void executeJiraTemplate() {
        final List<Map<String, Object>> extracteDataWithConfiguration =
                new JiraDataFetcher(JIRA_URL, restTemplate, propertyExtractorFactory)
                        .extractData(new FetchConfig() {
                            @Override
                            public Map<String, String> requestConfig() {
                                return new HashMap<String, String>() {{
                                    put("jql", "${jql}");
                                }};
                            }

                            @Override
                            public Map<String, String> properties() {
                                return new HashMap<String, String>() {{
                                    put("key", "key");
                                    put("assignee", "fields.assignee.name");
                                    put("issuetype", "fields.issuetype.name");
                                }};
                            }
                        }).collect(Collectors.toList());

        System.out.println("Extracted: " + extracteDataWithConfiguration);
    }


    @Bean
    @Scope(value = "prototype", proxyMode = ScopedProxyMode.INTERFACES)
    public RestOperations jiraRestTemplate() throws Exception {
        return new RestTemplate(clientHttpRequestFactory());
    }
}
