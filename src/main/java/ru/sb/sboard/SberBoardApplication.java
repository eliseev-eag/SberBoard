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
import ru.sb.sboard.data.adapters.jira.JiraDataFetcher;
import ru.sb.sboard.data.properties.PropertyExtractorFactory;
import ru.sb.sboard.data.properties.PropertyExtractorFactoryImpl;

import javax.net.ssl.SSLContext;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

@SpringBootApplication
public class SberBoardApplication {

    private static final String JIRA_URL = "https://jira.atlassian.com/";

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

    @Bean
    public JiraDataFetcher getJiraDataFetcher() {
        return new JiraDataFetcher(JIRA_URL, restTemplate, null, propertyExtractorFactory);
    }


    @Bean
    @Scope(value = "prototype", proxyMode = ScopedProxyMode.INTERFACES)
    public RestOperations jiraRestTemplate() throws Exception {
        return new RestTemplate(clientHttpRequestFactory());
    }
}
