package com.elowen.jobportal.consultant.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Validation annotation for experience years
 */
@Documented
@Constraint(validatedBy = ValidExperienceValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidExperience {
    
    String message() default "Experience must be between 0 and 50 years";
    
    Class<?>[] groups() default {};
    
    Class<? extends Payload>[] payload() default {};
}
