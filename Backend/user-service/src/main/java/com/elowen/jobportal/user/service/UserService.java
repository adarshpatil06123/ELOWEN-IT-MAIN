package com.elowen.jobportal.user.service;

import com.elowen.jobportal.contracts.dto.UserProfileResponse;
import com.elowen.jobportal.user.dto.UserRequest;
import com.elowen.jobportal.user.entity.UserProfile;
import com.elowen.jobportal.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public UserProfileResponse createOrUpdateProfile(Long userId, String email, String role, UserRequest request) {
        UserProfile profile = userRepository.findById(userId)
                .orElse(UserProfile.builder()
                        .id(userId)
                        .email(email)
                        .role(role)
                        .isActive(true)
                        .build());

        updateProfileFromRequest(profile, request);
        profile = userRepository.save(profile);

        log.info("Profile updated for user: {}", userId);
        return mapToResponse(profile);
    }

    public UserProfileResponse getProfile(Long userId) {
        UserProfile profile = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found"));
        return mapToResponse(profile);
    }

    private void updateProfileFromRequest(UserProfile profile, UserRequest request) {
        if (request.getFullName() != null) profile.setFullName(request.getFullName());
        if (request.getPhone() != null) profile.setPhone(request.getPhone());
        if (request.getState() != null) profile.setState(request.getState());
        if (request.getCity() != null) profile.setCity(request.getCity());
        if (request.getProfilePicture() != null) profile.setProfilePicture(request.getProfilePicture());
        if (request.getBio() != null) profile.setBio(request.getBio());
        if (request.getSkills() != null) profile.setSkills(request.getSkills());
        if (request.getEducation() != null) profile.setEducation(request.getEducation());
        if (request.getExperience() != null) profile.setExperience(request.getExperience());
        
        if (request.getDateOfBirth() != null) {
            try {
                profile.setDateOfBirth(LocalDate.parse(request.getDateOfBirth()));
            } catch (Exception e) {
                log.warn("Invalid date format: {}", request.getDateOfBirth());
            }
        }
    }

    private UserProfileResponse mapToResponse(UserProfile profile) {
        return UserProfileResponse.builder()
                .id(profile.getId())
                .fullName(profile.getFullName())
                .email(profile.getEmail())
                .phone(profile.getPhone())
                .role(profile.getRole())
                .state(profile.getState())
                .city(profile.getCity())
                .dateOfBirth(profile.getDateOfBirth())
                .profilePicture(profile.getProfilePicture())
                .bio(profile.getBio())
                .skills(profile.getSkills())
                .education(profile.getEducation())
                .isActive(profile.getIsActive())
                .build();
    }
}
