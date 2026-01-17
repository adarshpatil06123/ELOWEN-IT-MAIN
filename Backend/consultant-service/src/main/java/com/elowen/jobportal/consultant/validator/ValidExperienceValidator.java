package com.elowen.jobportal.consultant.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Validator for experience years
 */
public class ValidExperienceValidator implements ConstraintValidator<ValidExperience, Integer> {

    private static final int MIN_EXPERIENCE = 0;
    private static final int MAX_EXPERIENCE = 50;

    @Override
    public boolean isValid(Integer experience, ConstraintValidatorContext context) {
        if (experience == null) {
            return true; // Use @NotNull for required validation
        }
        
        return experience >= MIN_EXPERIENCE && experience <= MAX_EXPERIENCE;
    }
}
