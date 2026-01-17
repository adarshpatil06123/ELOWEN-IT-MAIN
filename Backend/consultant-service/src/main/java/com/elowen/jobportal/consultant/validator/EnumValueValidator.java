package com.elowen.jobportal.consultant.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Validator for enum values
 */
public class EnumValueValidator implements ConstraintValidator<ValidEnum, String> {

    private Set<String> allowedValues;

    @Override
    public void initialize(ValidEnum constraintAnnotation) {
        this.allowedValues = Arrays.stream(constraintAnnotation.enumClass().getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // Use @NotNull for required validation
        }
        
        return allowedValues.contains(value.toUpperCase());
    }
}
