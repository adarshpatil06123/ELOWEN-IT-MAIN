package com.elowen.jobportal.auth.exception;

import com.elowen.jobportal.contracts.error.ApiErrorResponse;
import com.elowen.jobportal.contracts.error.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Global Exception Handler for Auth Service
 */
@Slf4j
@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {
        
        log.error("Validation error occurred", ex);
        
        List<ApiErrorResponse.FieldError> fieldErrors = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(error -> {
                    String fieldName = ((FieldError) error).getField();
                    String message = error.getDefaultMessage();
                    Object rejectedValue = ((FieldError) error).getRejectedValue();
                    return ApiErrorResponse.FieldError.builder()
                            .field(fieldName)
                            .message(message)
                            .rejectedValue(rejectedValue)
                            .build();
                })
                .collect(Collectors.toList());

        ApiErrorResponse response = ApiErrorResponse.builder()
                .errorCode(ErrorCode.VALIDATION_ERROR.getCode())
                .message(ErrorCode.VALIDATION_ERROR.getMessage())
                .path(request.getRequestURI())
                .fieldErrors(fieldErrors)
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiErrorResponse> handleRuntimeException(
            RuntimeException ex,
            HttpServletRequest request) {
        
        log.error("Runtime error occurred", ex);
        
        // Map common error messages to error codes
        ErrorCode errorCode = mapErrorMessage(ex.getMessage());
        
        ApiErrorResponse response = ApiErrorResponse.of(
                errorCode,
                ex.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGenericException(
            Exception ex,
            HttpServletRequest request) {
        
        log.error("Unexpected error occurred", ex);
        
        ApiErrorResponse response = ApiErrorResponse.of(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred",
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    private ErrorCode mapErrorMessage(String message) {
        if (message == null) {
            return ErrorCode.INTERNAL_SERVER_ERROR;
        }
        
        if (message.contains("Email already")) {
            return ErrorCode.EMAIL_ALREADY_EXISTS;
        } else if (message.contains("Invalid email or password")) {
            return ErrorCode.INVALID_CREDENTIALS;
        } else if (message.contains("Account is disabled")) {
            return ErrorCode.ACCOUNT_DISABLED;
        } else if (message.contains("Invalid OTP")) {
            return ErrorCode.OTP_INVALID;
        } else if (message.contains("OTP has expired")) {
            return ErrorCode.OTP_EXPIRED;
        } else if (message.contains("User not found")) {
            return ErrorCode.USER_NOT_FOUND;
        }
        
        return ErrorCode.INTERNAL_SERVER_ERROR;
    }
}
