package ru.sb.sboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.sb.sboard.data.DataFetcher;
import ru.sb.sboard.data.FetchConfig;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RequestMapping("/metrics")
@Controller
public class MetricController {
    @Autowired
    private DataFetcher jiraDataFetcher;

    @GetMapping("jira")
    @ResponseBody
    public Object jqlMetric(String jql) {
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
}
