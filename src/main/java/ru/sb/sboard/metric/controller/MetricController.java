package ru.sb.sboard.metric.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sb.sboard.data.DataFetcher;
import ru.sb.sboard.data.FetchConfig;
import ru.sb.sboard.metric.enums.Metric;
import ru.sb.sboard.metric.service.MetricService;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/metrics")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MetricController {

    private final DataFetcher jiraDataFetcher;
    private final MetricService metricService;

    @GetMapping("/{metric}")
    public Object getMetric(@PathVariable Metric metric) {
        return metricService.getMetricValue(metric);
    }

    @GetMapping("/jira")
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
