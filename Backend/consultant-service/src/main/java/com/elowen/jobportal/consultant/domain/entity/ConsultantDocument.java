package com.elowen.jobportal.consultant.domain.entity;

import com.elowen.jobportal.consultant.domain.enums.DocumentStatus;
import com.elowen.jobportal.consultant.domain.enums.DocumentType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * ConsultantDocument entity - represents KYC documents uploaded by consultants
 */
@Entity
@Table(name = "consultant_documents")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultantDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultant_id", nullable = false)
    private Consultant consultant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 100)
    private DocumentType documentType;

    @Column(nullable = false, length = 200)
    private String documentName;

    @Column(nullable = false, length = 500)
    private String documentUrl;

    @Column(length = 100)
    private String documentNumber; // e.g., GST number, PAN number

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DocumentStatus status = DocumentStatus.PENDING;

    @Column(length = 500)
    private String rejectionReason;

    @Column
    private LocalDateTime verifiedAt;

    @Column(length = 100)
    private String verifiedBy; // Admin ID who verified

    // Audit fields
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
