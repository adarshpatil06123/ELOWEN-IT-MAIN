package com.elowen.jobportal.user.controller;

import com.elowen.jobportal.contracts.constants.HeaderConstants;
import com.elowen.jobportal.contracts.dto.UserProfileResponse;
import com.elowen.jobportal.user.dto.UserRequest;
import com.elowen.jobportal.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile(
            @RequestHeader(HeaderConstants.USER_ID) Long userId) {
        log.info("Get profile request for user: {}", userId);
        UserProfileResponse response = userService.getProfile(userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @RequestHeader(HeaderConstants.USER_ID) Long userId,
            @RequestHeader(HeaderConstants.USER_EMAIL) String email,
            @RequestHeader(HeaderConstants.USER_ROLE) String role,
            @RequestBody UserRequest request) {
        log.info("Update profile request for user: {}", userId);
        UserProfileResponse response = userService.createOrUpdateProfile(userId, email, role, request);
        return ResponseEntity.ok(response);
    }
}
