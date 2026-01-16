package com.elowen.jobportal.contracts.constants;

/**
 * Standard HTTP Header Constants
 * Used across all microservices
 */
public final class HeaderConstants {
    
    // Authentication Headers
    public static final String AUTHORIZATION = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    
    // User Context Headers (from JWT)
    public static final String USER_ID = "X-User-Id";
    public static final String USER_EMAIL = "X-User-Email";
    public static final String USER_ROLE = "X-User-Role";
    
    // Request Tracking
    public static final String REQUEST_ID = "X-Request-Id";
    public static final String CORRELATION_ID = "X-Correlation-Id";
    
    // API Version
    public static final String API_VERSION = "X-API-Version";
    
    // Mobile App Headers
    public static final String APP_VERSION = "X-App-Version";
    public static final String PLATFORM = "X-Platform";
    public static final String DEVICE_ID = "X-Device-Id";
    
    private HeaderConstants() {
        // Utility class
    }
}
