package ru.sb.sboard.data.adapters;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import java.io.IOException;
import java.util.function.Supplier;

@RequiredArgsConstructor
public class CookieHeaderInterceptor implements ClientHttpRequestInterceptor {
    private final Supplier<String> tokenProvider;

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        request.getHeaders().add("cookie", "JSESSIONID=" + tokenProvider.get());
        return execution.execute(request, body);
    }
}
