package com.elowen.jobportal.consultant.repository;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for Consultant entity
 */
@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Long> {

    /**
     * Find consultant by userId (from auth-service)
     */
    Optional<Consultant> findByUserId(Long userId);

    /**
     * Find consultant by email
     */
    Optional<Consultant> findByEmail(String email);

    /**
     * Check if consultant exists by userId
     */
    boolean existsByUserId(Long userId);

    /**
     * Check if consultant exists by email
     */
    boolean existsByEmail(String email);

    /**
     * Find all active consultants
     */
    @Query("SELECT c FROM Consultant c WHERE c.isActive = true")
    java.util.List<Consultant> findAllActive();

    /**
     * Find all verified consultants
     */
    @Query("SELECT c FROM Consultant c WHERE c.isVerified = true")
    java.util.List<Consultant> findAllVerified();

    /**
     * Get total active consultants count
     */
    @Query("SELECT COUNT(c) FROM Consultant c WHERE c.isActive = true")
    Long countActiveConsultants();

    /**
     * Get total verified consultants count
     */
    @Query("SELECT COUNT(c) FROM Consultant c WHERE c.isVerified = true")
    Long countVerifiedConsultants();

    /**
     * Find consultants by city
     */
    @Query("SELECT c FROM Consultant c WHERE c.city = :city AND c.isActive = true")
    java.util.List<Consultant> findByCity(@Param("city") String city);

    /**
     * Find consultants by state
     */
    @Query("SELECT c FROM Consultant c WHERE c.state = :state AND c.isActive = true")
    java.util.List<Consultant> findByState(@Param("state") String state);

    /**
     * Search consultants by company name (case-insensitive)
     */
    @Query("SELECT c FROM Consultant c WHERE LOWER(c.companyName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) AND c.isActive = true")
    java.util.List<Consultant> searchByCompanyName(@Param("searchTerm") String searchTerm);

    /**
     * Get consultant performance summary
     */
    @Query("SELECT NEW map(" +
           "c.id as consultantId, " +
           "c.companyName as companyName, " +
           "c.totalPlacements as totalPlacements, " +
           "c.successRate as successRate, " +
           "c.rating as rating, " +
           "c.totalCommissionEarned as totalCommission) " +
           "FROM Consultant c WHERE c.id = :consultantId")
    java.util.Map<String, Object> getPerformanceSummary(@Param("consultantId") Long consultantId);
}
