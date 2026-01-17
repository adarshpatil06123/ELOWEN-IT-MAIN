package com.elowen.jobportal.consultant.domain.entity;

import com.elowen.jobportal.consultant.domain.enums.PoolStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Pool entity - represents a candidate pool organized by skill category
 */
@Entity
@Table(name = "pools")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultant_id", nullable = false)
    private Consultant consultant;

    @Column(nullable = false, length = 100)
    private String name; // e.g., "Security Guards", "Delivery Partners"

    @Column(nullable = false, length = 100)
    private String skillCategory; // e.g., "Security Guard (skill category)"

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PoolStatus status = PoolStatus.NEW;

    // Metrics
    @Column(nullable = false)
    private Integer totalCandidates = 0;

    @Column(nullable = false)
    private Integer activeCandidates = 0;

    @Column(nullable = false)
    private Integer inactiveCandidates = 0;

    @Column(nullable = false)
    private Integer deployedCandidates = 0;

    @Column(nullable = false)
    private Integer activeJobs = 0; // Jobs available for this pool

    @Column
    private Double successRate = 0.0; // Placement success rate

    @Column
    private Long commissionEarned = 0L; // Total commission from this pool

    // Relationships
    @OneToMany(mappedBy = "pool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidate> candidates = new ArrayList<>();

    // Audit fields
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Helper methods
    public void addCandidate(Candidate candidate) {
        candidates.add(candidate);
        candidate.setPool(this);
        updateMetrics();
    }

    public void removeCandidate(Candidate candidate) {
        candidates.remove(candidate);
        candidate.setPool(null);
        updateMetrics();
    }

    /**
     * Recalculate pool metrics based on candidates
     */
    public void updateMetrics() {
        this.totalCandidates = candidates.size();
        this.activeCandidates = (int) candidates.stream()
                .filter(c -> c.getAvailability() == com.elowen.jobportal.consultant.domain.enums.CandidateAvailability.ACTIVE)
                .count();
        this.inactiveCandidates = (int) candidates.stream()
                .filter(c -> c.getAvailability() == com.elowen.jobportal.consultant.domain.enums.CandidateAvailability.INACTIVE)
                .count();
        this.deployedCandidates = (int) candidates.stream()
                .filter(c -> c.getAvailability() == com.elowen.jobportal.consultant.domain.enums.CandidateAvailability.DEPLOYED)
                .count();
    }
}
