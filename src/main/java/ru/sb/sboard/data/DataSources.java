package ru.sb.sboard.data;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.sb.sboard.utils.ResourceReader;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DataSources {
    private final DataFetcher jiraDataFetcher;
    private final DataFetcher bitBucketDataFetcher;

    public Object jqlData(String jql) {
        return jiraDataFetcher
                .extractData(new FetchConfig() {
                    @Override
                    public Map<String, String> requestConfig() {
                        return new HashMap<String, String>() {{
                            put("jql", jql);
                        }};
                    }

                    @Override
                    public Map<String, String> properties() {
                        return new HashMap<String, String>() {{
                            put("key", "key");
                            put("assignee", "fields.assignee");
                            put("issuetype", "fields.issuetype.name");
                        }};
                    }
                })
                .collect(Collectors.toList());
    }

    /**
     * can check http://localhost:8080/metrics/bitbucket?username=atlassianlabs&repository=atlascode
     */
    public Object bitbucketData(String username, String repository) {
        return bitBucketDataFetcher
                .extractData(new FetchConfig() {
                    @Override
                    public Map<String, String> requestConfig() {
                        return new HashMap<String, String>() {{
                            put("username", username);
                            put("repository", repository);
                        }};
                    }

                    @Override
                    public Map<String, String> properties() {
                        return new HashMap<String, String>() {{
                            put("hash", "hash");
                            put("author", "author.user.display_name");
                            put("summary", "summary.raw");
                        }};
                    }
                })
                .collect(Collectors.toList());
    }

    public Object reactAnalysisData() {
        try {
            return new ObjectMapper().readerFor(new TypeReference<List<Map<String, String>>>() {
            }).readTree(ResourceReader.readFileToString("datasets/reactDataset.json"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    public Object elasticAnalysisData() {
        try {
            return new ObjectMapper().readerFor(new TypeReference<List<Map<String, String>>>() {
            }).readTree(ResourceReader.readFileToString("datasets/elasticDataset.json"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    public Object vscodeAnalysisData() {
        try {
            return new ObjectMapper().readerFor(new TypeReference<List<Map<String, String>>>() {
            }).readTree(ResourceReader.readFileToString("datasets/vscodeDataset.json"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    public Object getData(String dataSource) {
        return getData(dataSource, new HashMap<>());
    }

    public Object getData(String dataSource, Map<String, String> configuration) {
        if (dataSource == null) {
            return Collections.emptyList();
        }

        switch (dataSource) {
            case "react": return reactAnalysisData();
            case "elastic": return elasticAnalysisData();
            case "jira": return jqlData(configuration.get("jql"));
            case "bitbucket": return bitbucketData(null, null);
            case "vscode": return vscodeAnalysisData();
        }

        return Collections.emptyList();
    }
}
