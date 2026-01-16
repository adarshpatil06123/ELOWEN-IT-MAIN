package com.elowen.jobportal.gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Gateway Routes Configuration
 * Defines routing rules for all microservices
 */
@Configuration
public class GatewayRoutesConfig {

    @Value("${services.auth.url}")
    private String authServiceUrl;

    @Value("${services.user.url}")
    private String userServiceUrl;

    @Value("${services.job.url}")
    private String jobServiceUrl;

    @Value("${services.application.url}")
    private String applicationServiceUrl;

    @Value("${services.search.url}")
    private String searchServiceUrl;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Auth Service Routes (Public - No JWT required)
                .route("auth-service", r -> r
                        .path("/auth/**")
                        .filters(f -> f
                                .stripPrefix(0)
                                .addRequestHeader("X-Gateway", "Elowen-API-Gateway"))
                        .uri(authServiceUrl))

                // User Service Routes (Protected)
                .route("user-service", r -> r
                        .path("/users/**", "/profile/**")
                        .filters(f -> f
                                .stripPrefix(0)
                                .addRequestHeader("X-Gateway", "Elowen-API-Gateway"))
                        .uri(userServiceUrl))

                // Job Service Routes - API prefix (Protected)
                .route("job-service-api", r -> r
                        .path("/api/jobs/**")
                        .filters(f -> f
                                .stripPrefix(0)
                                .addRequestHeader("X-Gateway", "Elowen-API-Gateway"))
                        .uri(jobServiceUrl))

                // Job Service Routes - Legacy (Protected)
                .route("job-service", r -> r
                        .path("/jobs/**", "/categories/**")
                        .filters(f -> f
                                .stripPrefix(0)
                                .addRequestHeader("X-Gateway", "Elowen-API-Gateway"))
                        .uri(jobServiceUrl))

                // Application Service Routes (Protected)
                .route("application-service", r -> r
                        .path("/applications/**", "/apply/**")
                        .filters(f -> f
                                .stripPrefix(0)
                                .addRequestHeader("X-Gateway", "Elowen-API-Gateway"))
                        .uri(applicationServiceUrl))

                // Search Service Routes (Protected)
                .route("search-service", r -> r
                        .path("/search/**")
                        .filters(f -> f
                                .stripPrefix(0)
                                .addRequestHeader("X-Gateway", "Elowen-API-Gateway"))
                        .uri(searchServiceUrl))

                // Health Check Route
                .route("health", r -> r
                        .path("/health")
                        .filters(f -> f.setStatus(200))
                        .uri("no://op"))

                .build();
    }
}
