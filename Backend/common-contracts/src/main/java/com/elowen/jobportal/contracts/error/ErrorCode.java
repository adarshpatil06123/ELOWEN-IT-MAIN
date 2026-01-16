package com.elowen.jobportal.contracts.error;

/**
 * Standard Error Codes across all microservices
 */
public enum ErrorCode {
    
    // General Errors (1000-1099)
    INTERNAL_SERVER_ERROR("ERR-1000", "Internal server error"),
    VALIDATION_ERROR("ERR-1001", "Validation failed"),
    RESOURCE_NOT_FOUND("ERR-1002", "Resource not found"),
    BAD_REQUEST("ERR-1003", "Bad request"),
    
    // Authentication Errors (1100-1199)
    INVALID_CREDENTIALS("ERR-1100", "Invalid email or password"),
    TOKEN_EXPIRED("ERR-1101", "Token has expired"),
    TOKEN_INVALID("ERR-1102", "Invalid token"),
    UNAUTHORIZED("ERR-1103", "Unauthorized access"),
    ACCOUNT_DISABLED("ERR-1104", "Account is disabled"),
    EMAIL_ALREADY_EXISTS("ERR-1105", "Email already registered"),
    OTP_INVALID("ERR-1106", "Invalid OTP"),
    OTP_EXPIRED("ERR-1107", "OTP has expired"),
    
    // User Errors (1200-1299)
    USER_NOT_FOUND("ERR-1200", "User not found"),
    USER_ALREADY_EXISTS("ERR-1201", "User already exists"),
    PROFILE_UPDATE_FAILED("ERR-1202", "Profile update failed"),
    
    // Job Errors (1300-1399)
    JOB_NOT_FOUND("ERR-1300", "Job not found"),
    JOB_EXPIRED("ERR-1301", "Job has expired"),
    JOB_CLOSED("ERR-1302", "Job is closed"),
    UNAUTHORIZED_JOB_ACCESS("ERR-1303", "Not authorized to access this job"),
    
    // Application Errors (1400-1499)
    APPLICATION_NOT_FOUND("ERR-1400", "Application not found"),
    ALREADY_APPLIED("ERR-1401", "Already applied to this job"),
    APPLICATION_WITHDRAWN("ERR-1402", "Application has been withdrawn"),
    CANNOT_APPLY("ERR-1403", "Cannot apply to this job"),
    
    // Search Errors (1500-1599)
    SEARCH_FAILED("ERR-1500", "Search operation failed"),
    INVALID_SEARCH_CRITERIA("ERR-1501", "Invalid search criteria"),
    
    // Notification Errors (1600-1699)
    NOTIFICATION_SEND_FAILED("ERR-1600", "Failed to send notification"),
    INVALID_NOTIFICATION_TYPE("ERR-1601", "Invalid notification type");
    
    private final String code;
    private final String message;
    
    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getMessage() {
        return message;
    }
}
