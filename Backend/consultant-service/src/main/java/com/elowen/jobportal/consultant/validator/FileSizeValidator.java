package com.elowen.jobportal.consultant.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

/**
 * Validator for file size
 */
public class FileSizeValidator implements ConstraintValidator<ValidFileSize, MultipartFile> {

    private long maxSizeInBytes;

    @Override
    public void initialize(ValidFileSize constraintAnnotation) {
        this.maxSizeInBytes = constraintAnnotation.maxSizeInMB() * 1024 * 1024;
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null || file.isEmpty()) {
            return true; // Use @NotNull for required validation
        }
        
        return file.getSize() <= maxSizeInBytes;
    }
}
