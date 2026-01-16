package com.elowen.jobportal.job.specification;

import com.elowen.jobportal.job.entity.Job;
import com.elowen.jobportal.job.entity.JobStatus;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

/**
 * Specification builder for Job entity filtering
 */
public class JobSpecification {

    /**
     * Build specification based on filter criteria
     */
    public static Specification<Job> withFilters(
            String location,
            String category,
            String experience,
            Integer minSalary,
            Integer maxSalary,
            JobStatus status
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always filter by status (default: ACTIVE)
            if (status != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            } else {
                predicates.add(criteriaBuilder.equal(root.get("status"), JobStatus.ACTIVE));
            }

            // Location filter (matches location field)
            if (location != null && !location.trim().isEmpty()) {
                String locationPattern = "%" + location.toLowerCase() + "%";
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("location")), 
                        locationPattern
                ));
            }

            // Category filter
            if (category != null && !category.trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
            }

            // Experience level filter
            if (experience != null && !experience.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("experience")),
                        "%" + experience.toLowerCase() + "%"
                ));
            }

            // Salary filter - use numeric fields for proper filtering
            if (minSalary != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("maxSalary"), minSalary));
            }

            if (maxSalary != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("minSalary"), maxSalary));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    /**
     * Filter only active jobs
     */
    public static Specification<Job> isActive() {
        return (root, query, criteriaBuilder) -> 
                criteriaBuilder.equal(root.get("status"), JobStatus.ACTIVE);
    }

    /**
     * Filter by category
     */
    public static Specification<Job> hasCategory(String category) {
        return (root, query, criteriaBuilder) -> 
                category == null ? null : criteriaBuilder.equal(root.get("category"), category);
    }

    /**
     * Filter by location
     */
    public static Specification<Job> hasLocation(String location) {
        return (root, query, criteriaBuilder) -> {
            if (location == null || location.trim().isEmpty()) {
                return null;
            }
            String pattern = "%" + location.toLowerCase() + "%";
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("location")), pattern);
        };
    }
}
