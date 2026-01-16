package com.elowen.jobportal.job.exception;

/**
 * Exception thrown when a job is not found
 */
public class JobNotFoundException extends RuntimeException {
    
    public JobNotFoundException(String message) {
        super(message);
    }
    
    public JobNotFoundException(Long jobId) {
        super("Job not found with id: " + jobId);
    }
}
