package com.elowen.jobportal.consultant.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Validation annotation for enum values
 */
@Documented
@Constraint(validatedBy = EnumValueValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidEnum {
    
    String message() default "Invalid value. Allowed values are: {allowedValues}";
    
    Class<? extends Enum<?>> enumClass();
    
    Class<?>[] groups() default {};
    
    Class<? extends Payload>[] payload() default {};
}
