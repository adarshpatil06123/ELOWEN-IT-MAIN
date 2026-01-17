package com.elowen.jobportal.consultant.domain.entity;

import com.elowen.jobportal.consultant.domain.enums.CandidateAvailability;
import com.elowen.jobportal.consultant.domain.enums.Gender;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Candidate entity - represents candidates in a pool
 */
@Entity
@Table(name = "candidates")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pool_id", nullable = false)
    private Pool pool;

    // Personal Information
    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Gender gender;

    @Column(length = 15)
    private String phoneNumber;

    @Column(length = 100)
    private String email;

    @Column(length = 200)
    private String currentAddress;

    @Column(length = 200)
    private String permanentAddress;

    @Column(length = 100)
    private String city;

    @Column(length = 50)
    private String state;

    @Column(length = 10)
    private String pincode;

    // Professional Information
    @Column(nullable = false, length = 100)
    private String position; // e.g., "Security Guard"

    @Column(length = 50)
    private String workExperience; // e.g., "5 years"

    @Column(length = 100)
    private String skills; // Comma-separated skills

    @Column(length = 50)
    private String payRangeMin; // e.g., "15k"

    @Column(length = 50)
    private String payRangeMax; // e.g., "18k"

    // Availability & Status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private CandidateAvailability availability = CandidateAvailability.NEW;

    @Column(nullable = false)
    private Boolean isVerified = false;

    // Verification relationship
    @OneToOne(mappedBy = "candidate", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private CandidateVerification verification;

    // Documents
    @Column(length = 500)
    private String resumeUrl;

    @Column(length = 500)
    private String photoUrl;

    @Column(length = 500)
    private String idProofUrl;

    // Placement Information
    @Column
    private Long currentJobId; // Reference to job from job-service (if deployed)

    @Column
    private Long currentEmployerId; // Reference to employer (if deployed)

    @Column
    private LocalDateTime deployedAt;

    // Audit fields
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Helper method
    public void setVerification(CandidateVerification verification) {
        this.verification = verification;
        if (verification != null) {
            verification.setCandidate(this);
        }
    }
}
