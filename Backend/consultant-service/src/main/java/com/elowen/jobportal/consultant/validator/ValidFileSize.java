package com.elowen.jobportal.consultant.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Validation annotation for file size
 */
@Documented
@Constraint(validatedBy = FileSizeValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidFileSize {
    
    String message() default "File size exceeds maximum allowed size";
    
    long maxSizeInMB() default 5;
    
    Class<?>[] groups() default {};
    
    Class<? extends Payload>[] payload() default {};
}
