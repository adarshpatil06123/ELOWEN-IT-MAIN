package com.elowen.jobportal.auth.service;

import com.elowen.jobportal.auth.dto.*;
import com.elowen.jobportal.auth.entity.AuthUser;
import com.elowen.jobportal.auth.entity.Role;
import com.elowen.jobportal.auth.repository.AuthUserRepository;
import com.elowen.jobportal.auth.security.JwtTokenProvider;
import com.elowen.jobportal.contracts.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

/**
 * Authentication Service - Handles user registration, login, and OTP verification
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (authUserRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(ErrorCode.EMAIL_ALREADY_EXISTS.getMessage());
        }

        // Check if phone already exists
        if (request.getPhone() != null && authUserRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already registered");
        }

        // Parse role with default fallback
        Role role = parseRole(request.getRole());

        // Create auth user
        AuthUser authUser = AuthUser.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(role)
                .enabled(true)
                .emailVerified(false)
                .phoneVerified(false)
                .createdAt(LocalDateTime.now())
                .build();

        authUser = authUserRepository.save(authUser);

        log.info("User registered successfully: {}", authUser.getEmail());

        // Generate OTP for phone verification (if phone provided)
        if (request.getPhone() != null) {
            generateOTP(authUser);
        }

        // Generate JWT token
        return generateAuthResponse(authUser);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        // Find user by email
        AuthUser authUser = authUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException(ErrorCode.INVALID_CREDENTIALS.getMessage()));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), authUser.getPassword())) {
            throw new RuntimeException(ErrorCode.INVALID_CREDENTIALS.getMessage());
        }

        // Check if account is enabled
        if (!authUser.getEnabled()) {
            throw new RuntimeException(ErrorCode.ACCOUNT_DISABLED.getMessage());
        }

        // Always generate OTP after successful login
        generateOTP(authUser);
        log.info("OTP generated for login: {}", authUser.getEmail());

        // Update last login
        authUser.setLastLogin(LocalDateTime.now());
        authUserRepository.save(authUser);

        log.info("User logged in successfully: {}", authUser.getEmail());

        // Generate JWT token
        return generateAuthResponse(authUser);
    }

    @Transactional
    public OTPResponse requestOTP(RequestOTPRequest request) {
        // Find user by phone
        AuthUser authUser = authUserRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException(ErrorCode.USER_NOT_FOUND.getMessage()));

        // Generate OTP
        generateOTP(authUser);

        log.info("OTP requested for phone: {}", request.getPhone());

        return OTPResponse.builder()
                .message("OTP sent successfully")
                .phone(request.getPhone())
                .otp("123456") // For testing only - remove in production
                .build();
    }

    @Transactional
    public AuthResponse verifyOTP(OTPRequest request) {
        AuthUser authUser;
        
        // Find user by email or phone
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            authUser = authUserRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException(ErrorCode.USER_NOT_FOUND.getMessage()));
            log.info("Verifying OTP for email: {}", request.getEmail());
        } else if (request.getPhone() != null && !request.getPhone().isEmpty()) {
            authUser = authUserRepository.findByPhone(request.getPhone())
                    .orElseThrow(() -> new RuntimeException(ErrorCode.USER_NOT_FOUND.getMessage()));
            log.info("Verifying OTP for phone: {}", request.getPhone());
        } else {
            throw new RuntimeException("Either email or phone is required for OTP verification");
        }

        // Check if OTP exists and not expired
        if (authUser.getOtpCode() == null || authUser.getOtpExpiry() == null) {
            throw new RuntimeException("No OTP generated for this user");
        }

        if (LocalDateTime.now().isAfter(authUser.getOtpExpiry())) {
            throw new RuntimeException(ErrorCode.OTP_EXPIRED.getMessage());
        }

        // Verify OTP
        if (!authUser.getOtpCode().equals(request.getOtp())) {
            throw new RuntimeException(ErrorCode.OTP_INVALID.getMessage());
        }

        // Mark phone as verified (if phone exists)
        if (authUser.getPhone() != null) {
            authUser.setPhoneVerified(true);
        }
        authUser.setOtpCode(null); // Clear OTP after verification
        authUser.setOtpExpiry(null);
        authUser.setLastLogin(LocalDateTime.now());
        authUserRepository.save(authUser);

        log.info("OTP verified successfully for user: {}", authUser.getEmail());

        // Generate JWT token
        return generateAuthResponse(authUser);
    }

    private AuthResponse generateAuthResponse(AuthUser authUser) {
        String token = jwtTokenProvider.generateToken(
                authUser.getId(),
                authUser.getEmail(),
                authUser.getRole().name()
        );

        LocalDateTime expiresAt = jwtTokenProvider.getExpiryDateTime();

        AuthResponse.UserInfo userInfo = AuthResponse.UserInfo.builder()
                .id(authUser.getId())
                .fullName(authUser.getEmail()) // Full name will come from user-service
                .email(authUser.getEmail())
                .role(authUser.getRole().name())
                .phone(authUser.getPhone())
                .emailVerified(authUser.getEmailVerified())
                .phoneVerified(authUser.getPhoneVerified())
                .build();

        return AuthResponse.builder()
                .token(token)
                .expiresAt(expiresAt)
                .user(userInfo)
                .build();
    }

    private void generateOTP(AuthUser authUser) {
        // Fixed OTP for testing
        String otp = "123456";
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(10); // 10 minutes validity

        authUser.setOtpCode(otp);
        authUser.setOtpExpiry(expiry);
        authUserRepository.save(authUser);

        log.info("OTP generated for phone {}: {}", authUser.getPhone(), otp);

        // TODO: Send OTP via SMS (integrate with SMS service)
        // For now, using fixed OTP: 123456
    }

    private Role parseRole(String roleStr) {
        if (roleStr == null || roleStr.isEmpty()) {
            return Role.JOB_SEEKER;
        }
        try {
            return Role.valueOf(roleStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            return Role.JOB_SEEKER;
        }
    }
}
