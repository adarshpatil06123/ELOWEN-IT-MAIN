package com.elowen.jobportal.consultant.domain.entity;

import com.elowen.jobportal.consultant.domain.enums.VerificationStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * CandidateVerification entity - tracks verification workflow for candidates
 */
@Entity
@Table(name = "candidate_verifications")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false, unique = true)
    private Candidate candidate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private VerificationStatus status = VerificationStatus.NEW;

    // Police Verification
    @Column
    private Boolean policeVerificationDone = false;

    @Column
    private LocalDateTime policeVerificationDate;

    @Column(length = 500)
    private String policeVerificationDocumentUrl;

    @Column(length = 500)
    private String policeVerificationRemarks;

    // Health Check
    @Column
    private Boolean healthCheckDone = false;

    @Column
    private LocalDateTime healthCheckDate;

    @Column(length = 500)
    private String healthCheckDocumentUrl;

    @Column(length = 500)
    private String healthCheckRemarks;

    // Background Verification
    @Column
    private Boolean backgroundVerificationDone = false;

    @Column
    private LocalDateTime backgroundVerificationDate;

    @Column(length = 500)
    private String backgroundVerificationRemarks;

    // Reference Check
    @Column
    private Boolean referenceCheckDone = false;

    @Column(length = 200)
    private String referenceName;

    @Column(length = 15)
    private String referencePhone;

    @Column(length = 500)
    private String referenceRemarks;

    // Overall Verification
    @Column
    private LocalDateTime verifiedAt;

    @Column(length = 100)
    private String verifiedBy; // Admin/Consultant ID who completed verification

    @Column(length = 1000)
    private String verificationNotes;

    @Column(length = 500)
    private String rejectionReason;

    // Audit fields
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Check if all verification steps are complete
     */
    public boolean isFullyVerified() {
        return policeVerificationDone && 
               healthCheckDone && 
               backgroundVerificationDone && 
               referenceCheckDone;
    }

    /**
     * Calculate verification progress percentage
     */
    public int getVerificationProgress() {
        int completed = 0;
        int total = 4;

        if (policeVerificationDone) completed++;
        if (healthCheckDone) completed++;
        if (backgroundVerificationDone) completed++;
        if (referenceCheckDone) completed++;

        return (completed * 100) / total;
    }
}
