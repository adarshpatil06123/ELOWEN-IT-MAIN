package com.elowen.jobportal.consultant.repository;

import com.elowen.jobportal.consultant.domain.entity.Candidate;
import com.elowen.jobportal.consultant.domain.entity.Pool;
import com.elowen.jobportal.consultant.domain.enums.CandidateAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository for Candidate entity
 */
@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    /**
     * Find all candidates by pool
     */
    List<Candidate> findByPool(Pool pool);

    /**
     * Find all candidates by pool ID
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.id = :poolId ORDER BY c.createdAt DESC")
    List<Candidate> findByPoolId(@Param("poolId") Long poolId);

    /**
     * Find candidate by ID and pool ID (for authorization)
     */
    @Query("SELECT c FROM Candidate c WHERE c.id = :candidateId AND c.pool.id = :poolId")
    Optional<Candidate> findByIdAndPoolId(@Param("candidateId") Long candidateId, 
                                           @Param("poolId") Long poolId);

    /**
     * Find candidate by ID and consultant ID (for authorization)
     */
    @Query("SELECT c FROM Candidate c WHERE c.id = :candidateId AND c.pool.consultant.id = :consultantId")
    Optional<Candidate> findByIdAndConsultantId(@Param("candidateId") Long candidateId, 
                                                 @Param("consultantId") Long consultantId);

    /**
     * Find all candidates by pool and availability status
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.id = :poolId AND c.availability = :availability ORDER BY c.createdAt DESC")
    List<Candidate> findByPoolIdAndAvailability(@Param("poolId") Long poolId, 
                                                 @Param("availability") CandidateAvailability availability);

    /**
     * Find all active candidates by pool
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.id = :poolId AND c.availability = 'ACTIVE' ORDER BY c.name ASC")
    List<Candidate> findActiveByPoolId(@Param("poolId") Long poolId);

    /**
     * Find all candidates by consultant ID
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.consultant.id = :consultantId ORDER BY c.createdAt DESC")
    List<Candidate> findByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Find all candidates by consultant ID and availability
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.consultant.id = :consultantId AND c.availability = :availability ORDER BY c.createdAt DESC")
    List<Candidate> findByConsultantIdAndAvailability(@Param("consultantId") Long consultantId, 
                                                       @Param("availability") CandidateAvailability availability);

    /**
     * Search candidates by name (case-insensitive)
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.id = :poolId AND LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) ORDER BY c.name ASC")
    List<Candidate> searchByNameInPool(@Param("poolId") Long poolId, 
                                        @Param("searchTerm") String searchTerm);

    /**
     * Search candidates by position
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.id = :poolId AND LOWER(c.position) LIKE LOWER(CONCAT('%', :position, '%'))")
    List<Candidate> searchByPosition(@Param("poolId") Long poolId, 
                                      @Param("position") String position);

    /**
     * Search candidates across multiple fields (name, position, skills)
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.id = :poolId AND " +
           "(LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.position) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.skills) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
           "ORDER BY c.name ASC")
    List<Candidate> searchCandidates(@Param("poolId") Long poolId, @Param("searchTerm") String searchTerm);

    /**
     * Count candidates by pool
     */
    @Query("SELECT COUNT(c) FROM Candidate c WHERE c.pool.id = :poolId")
    Long countByPoolId(@Param("poolId") Long poolId);

    /**
     * Count candidates by pool and availability
     */
    @Query("SELECT COUNT(c) FROM Candidate c WHERE c.pool.id = :poolId AND c.availability = :availability")
    Long countByPoolIdAndAvailability(@Param("poolId") Long poolId, 
                                       @Param("availability") CandidateAvailability availability);

    /**
     * Count active candidates by pool
     */
    @Query("SELECT COUNT(c) FROM Candidate c WHERE c.pool.id = :poolId AND c.availability = 'ACTIVE'")
    Long countActiveByPoolId(@Param("poolId") Long poolId);

    /**
     * Count deployed candidates by pool
     */
    @Query("SELECT COUNT(c) FROM Candidate c WHERE c.pool.id = :poolId AND c.availability = 'DEPLOYED'")
    Long countDeployedByPoolId(@Param("poolId") Long poolId);

    /**
     * Count verified candidates by pool
     */
    @Query("SELECT COUNT(c) FROM Candidate c WHERE c.pool.id = :poolId AND c.isVerified = true")
    Long countVerifiedByPoolId(@Param("poolId") Long poolId);

    /**
     * Count candidates by consultant ID
     */
    @Query("SELECT COUNT(c) FROM Candidate c WHERE c.pool.consultant.id = :consultantId")
    Long countByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Count active candidates by consultant ID
     */
    @Query("SELECT COUNT(c) FROM Candidate c WHERE c.pool.consultant.id = :consultantId AND c.availability = 'ACTIVE'")
    Long countActiveByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Count deployed candidates by consultant ID
     */
    @Query("SELECT COUNT(c) FROM Candidate c WHERE c.pool.consultant.id = :consultantId AND c.availability = 'DEPLOYED'")
    Long countDeployedByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Get recently onboarded candidates (last 30 days)
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.consultant.id = :consultantId AND c.createdAt >= :since ORDER BY c.createdAt DESC")
    List<Candidate> findRecentlyOnboarded(@Param("consultantId") Long consultantId, 
                                           @Param("since") LocalDateTime since,
                                           org.springframework.data.domain.Pageable pageable);

    /**
     * Get candidates with pending verification
     */
    @Query("SELECT c FROM Candidate c WHERE c.pool.consultant.id = :consultantId AND c.isVerified = false ORDER BY c.createdAt ASC")
    List<Candidate> findPendingVerification(@Param("consultantId") Long consultantId);

    /**
     * Find candidate by phone number
     */
    @Query("SELECT c FROM Candidate c WHERE c.phoneNumber = :phoneNumber")
    Optional<Candidate> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    /**
     * Find candidate by email
     */
    @Query("SELECT c FROM Candidate c WHERE c.email = :email")
    Optional<Candidate> findByEmail(@Param("email") String email);

    /**
     * Get workforce metrics for consultant
     */
    @Query("SELECT NEW map(" +
           "COUNT(c) as totalWorkers, " +
           "SUM(CASE WHEN c.availability = 'ACTIVE' THEN 1 ELSE 0 END) as activeWorkers, " +
           "SUM(CASE WHEN c.availability = 'DEPLOYED' THEN 1 ELSE 0 END) as deployedWorkers, " +
           "SUM(CASE WHEN c.availability = 'INACTIVE' THEN 1 ELSE 0 END) as inactiveWorkers) " +
           "FROM Candidate c WHERE c.pool.consultant.id = :consultantId")
    java.util.Map<String, Object> getWorkforceMetrics(@Param("consultantId") Long consultantId);

    /**
     * Delete all candidates by pool
     */
    void deleteByPool(Pool pool);
}
