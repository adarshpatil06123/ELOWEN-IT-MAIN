package com.elowen.jobportal.consultant.domain.entity;

import com.elowen.jobportal.consultant.domain.enums.HiringLevel;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Consultant entity - represents a consultant company/profile
 */
@Entity
@Table(name = "consultants")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId; // Reference to user from auth-service

    @Column(nullable = false, length = 100)
    private String companyName;

    @Column(nullable = false, length = 100)
    private String contactPersonName;

    @Column(nullable = false, length = 15)
    private String phoneNumber;

    @Column(length = 15)
    private String alternatePhoneNumber;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 200)
    private String currentAddress;

    @Column(length = 200)
    private String permanentAddress;

    @Column(length = 100)
    private String city;

    @Column(length = 50)
    private String state;

    @Column(length = 100)
    private String country;

    @Column(length = 10)
    private String pincode;

    @Column(length = 500)
    private String profileImageUrl;

    // Specializations
    @ElementCollection
    @CollectionTable(name = "consultant_industries", joinColumns = @JoinColumn(name = "consultant_id"))
    @Column(name = "industry")
    private List<String> industriesServed = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "consultant_functional_areas", joinColumns = @JoinColumn(name = "consultant_id"))
    @Column(name = "functional_area")
    private List<String> functionalAreas = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "consultant_hiring_levels", joinColumns = @JoinColumn(name = "consultant_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "hiring_level")
    private List<HiringLevel> hiringLevels = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "consultant_geographical_coverage", joinColumns = @JoinColumn(name = "consultant_id"))
    @Column(name = "location")
    private List<String> geographicalCoverage = new ArrayList<>();

    // Ratings & Performance
    @Column
    private Double rating = 0.0;

    @Column
    private Integer totalPlacements = 0;

    @Column
    private Double successRate = 0.0;

    @Column
    private Long totalIncentivesEarned = 0L;

    @Column
    private Long totalCommissionEarned = 0L;

    @Column
    private Long pendingCommission = 0L;

    // Relationships
    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConsultantDocument> documents = new ArrayList<>();

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pool> pools = new ArrayList<>();

    // Status
    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false)
    private Boolean isVerified = false;

    @Column(nullable = false)
    private Boolean isProfileComplete = false;

    // Audit fields
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Helper methods
    public void addDocument(ConsultantDocument document) {
        documents.add(document);
        document.setConsultant(this);
    }

    public void removeDocument(ConsultantDocument document) {
        documents.remove(document);
        document.setConsultant(null);
    }

    public void addPool(Pool pool) {
        pools.add(pool);
        pool.setConsultant(this);
    }

    public void removePool(Pool pool) {
        pools.remove(pool);
        pool.setConsultant(null);
    }
}
