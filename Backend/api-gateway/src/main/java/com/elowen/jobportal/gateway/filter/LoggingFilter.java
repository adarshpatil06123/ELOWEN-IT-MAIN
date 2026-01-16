package com.elowen.jobportal.gateway.filter;

import com.elowen.jobportal.contracts.constants.HeaderConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

/**
 * Logging Filter for API Gateway
 * Logs all incoming requests and adds request tracking headers
 */
@Slf4j
@Component
public class LoggingFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String requestId = UUID.randomUUID().toString();
        String path = exchange.getRequest().getPath().value();
        String method = exchange.getRequest().getMethod().name();

        // Add request tracking header
        exchange.getRequest().mutate()
                .header(HeaderConstants.REQUEST_ID, requestId)
                .build();

        log.info("Gateway Request [{}] {} {}", requestId, method, path);

        long startTime = System.currentTimeMillis();

        return chain.filter(exchange)
                .doFinally(signalType -> {
                    long duration = System.currentTimeMillis() - startTime;
                    log.info("Gateway Response [{}] {} {} - {}ms", 
                            requestId, method, path, duration);
                });
    }

    @Override
    public int getOrder() {
        return -99; // Execute after JWT filter
    }
}
