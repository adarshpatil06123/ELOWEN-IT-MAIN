package com.elowen.jobportal.job.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs", indexes = {
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_posted_date", columnList = "createdAt"),
    @Index(name = "idx_category_location", columnList = "category, location"),
    @Index(name = "idx_featured", columnList = "featured"),
    @Index(name = "idx_employer", columnList = "employerId")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    // WHY: Company fields inlined for MVP simplicity - no separate Company entity
    @Column(nullable = false)
    private String company;
    
    @Column
    private String companyLogoUrl;

    @Column(nullable = false)
    private String location;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String country;

    @Column
    private String category;

    // Salary - stored as both string (for display) and numbers (for filtering)
    @Column
    private String salary;

    @Column
    private Integer minSalary;

    @Column
    private Integer maxSalary;

    @Column
    private String currency;

    @Column
    private String experience;

    @Column
    private String languages;

    @Column(name = "industry")
    private String industry;

    @Column(name = "functional_area")
    private String functionalArea;

    @Column(name = "experience_level")
    private String experienceLevel;

    @Column(name = "employment_type")
    private String employmentType;

    @Column(name = "joining_period")
    private String joiningPeriod;

    @Column(name = "company_docs")
    private String companyDocs;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    @Column(columnDefinition = "TEXT")
    private String benefits;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private JobType jobType = JobType.FULL_TIME;

    @Column(nullable = false)
    @Builder.Default
    private Boolean featured = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private JobStatus status = JobStatus.ACTIVE;

    @Column
    private Long employerId;

    @Column
    @Builder.Default
    private Integer views = 0;

    @Column
    @Builder.Default
    private Integer applicationsCount = 0;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @Column
    private LocalDateTime expiresAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
