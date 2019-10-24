package ru.sb.sboard.metric.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.sb.sboard.data.DataFetcher;
import ru.sb.sboard.data.DataSources;
import ru.sb.sboard.data.FetchConfig;
import ru.sb.sboard.utils.ResourceReader;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/metrics")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MetricController {

    private final DataFetcher jiraDataFetcher;
    private final DataFetcher bitBucketDataFetcher;
    private final DataSources dataSources;

    @GetMapping("/jira")
    @ResponseBody
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
    @GetMapping("bitbucket")
    @ResponseBody
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

    @GetMapping("react")
    @ResponseBody
    public Object reactAnalysisData() {
        return ResourceReader.readFileToString("datasets/reactDataset.json");
    }

    @GetMapping("elastic")
    @ResponseBody
    public Object elasticAnalysisData() {
        return ResourceReader.readFileToString("datasets/elasticDataset.json");
    }

    @GetMapping("vscode")
    @ResponseBody
    public Object vscodeAnalysisData() {
        return ResourceReader.readFileToString("datasets/vscodeDataset.json");
    }

    @GetMapping("sample")
    @ResponseBody
    public Object sample(String source) {
        Object data = dataSources.getData(source);

        if (data instanceof Iterable) {
            List<Object> collection = (List<Object>) StreamSupport.stream(((Iterable) data).spliterator(), false)
                    .limit(4)
                    .collect(Collectors.toList());

            if (!collection.isEmpty()) {
                return collection;
            }
        }

        return Collections.emptyList();
    }
}
