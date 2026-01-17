package com.elowen.jobportal.consultant.repository;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import com.elowen.jobportal.consultant.domain.entity.Pool;
import com.elowen.jobportal.consultant.domain.enums.PoolStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Pool entity
 */
@Repository
public interface PoolRepository extends JpaRepository<Pool, Long> {

    /**
     * Find all pools by consultant
     */
    List<Pool> findByConsultant(Consultant consultant);

    /**
     * Find all pools by consultant ID
     */
    @Query("SELECT p FROM Pool p WHERE p.consultant.id = :consultantId ORDER BY p.createdAt DESC")
    List<Pool> findByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Find pool by consultant and pool ID
     */
    @Query("SELECT p FROM Pool p WHERE p.id = :poolId AND p.consultant.id = :consultantId")
    Optional<Pool> findByIdAndConsultantId(@Param("poolId") Long poolId, 
                                            @Param("consultantId") Long consultantId);

    /**
     * Find all pools by consultant and status
     */
    @Query("SELECT p FROM Pool p WHERE p.consultant.id = :consultantId AND p.status = :status ORDER BY p.createdAt DESC")
    List<Pool> findByConsultantIdAndStatus(@Param("consultantId") Long consultantId, 
                                            @Param("status") PoolStatus status);

    /**
     * Find all active pools for consultant
     */
    @Query("SELECT p FROM Pool p WHERE p.consultant.id = :consultantId AND p.status = 'ACTIVE' ORDER BY p.name ASC")
    List<Pool> findActivePoolsByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Find pool by name and consultant
     */
    @Query("SELECT p FROM Pool p WHERE p.consultant.id = :consultantId AND LOWER(p.name) = LOWER(:name)")
    Optional<Pool> findByConsultantIdAndName(@Param("consultantId") Long consultantId, 
                                              @Param("name") String name);

    /**
     * Find pools by skill category
     */
    @Query("SELECT p FROM Pool p WHERE p.consultant.id = :consultantId AND LOWER(p.skillCategory) LIKE LOWER(CONCAT('%', :skillCategory, '%'))")
    List<Pool> findByConsultantIdAndSkillCategory(@Param("consultantId") Long consultantId, 
                                                   @Param("skillCategory") String skillCategory);

    /**
     * Count pools by consultant
     */
    @Query("SELECT COUNT(p) FROM Pool p WHERE p.consultant.id = :consultantId")
    Long countByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Count active pools by consultant
     */
    @Query("SELECT COUNT(p) FROM Pool p WHERE p.consultant.id = :consultantId AND p.status = 'ACTIVE'")
    Long countActivePoolsByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Get total candidates across all pools for consultant
     */
    @Query("SELECT COALESCE(SUM(p.totalCandidates), 0) FROM Pool p WHERE p.consultant.id = :consultantId")
    Long getTotalCandidatesCount(@Param("consultantId") Long consultantId);

    /**
     * Get total active candidates across all pools for consultant
     */
    @Query("SELECT COALESCE(SUM(p.activeCandidates), 0) FROM Pool p WHERE p.consultant.id = :consultantId")
    Long getTotalActiveCandidatesCount(@Param("consultantId") Long consultantId);

    /**
     * Get total deployed candidates across all pools for consultant
     */
    @Query("SELECT COALESCE(SUM(p.deployedCandidates), 0) FROM Pool p WHERE p.consultant.id = :consultantId")
    Long getTotalDeployedCandidatesCount(@Param("consultantId") Long consultantId);

    /**
     * Get total commission earned across all pools
     */
    @Query("SELECT COALESCE(SUM(p.commissionEarned), 0) FROM Pool p WHERE p.consultant.id = :consultantId")
    Long getTotalCommissionEarned(@Param("consultantId") Long consultantId);

    /**
     * Get average success rate across all pools
     */
    @Query("SELECT COALESCE(AVG(p.successRate), 0.0) FROM Pool p WHERE p.consultant.id = :consultantId AND p.status = 'ACTIVE'")
    Double getAverageSuccessRate(@Param("consultantId") Long consultantId);

    /**
     * Get pool overview metrics for dashboard
     */
    @Query("SELECT NEW map(" +
           "COUNT(p) as totalPools, " +
           "SUM(p.totalCandidates) as totalCandidates, " +
           "SUM(p.activeCandidates) as activeCandidates, " +
           "SUM(p.activeJobs) as activeJobs, " +
           "AVG(p.successRate) as avgSuccessRate, " +
           "SUM(p.commissionEarned) as totalCommission) " +
           "FROM Pool p WHERE p.consultant.id = :consultantId")
    java.util.Map<String, Object> getPoolOverviewMetrics(@Param("consultantId") Long consultantId);

    /**
     * Get pools with highest candidates
     */
    @Query("SELECT p FROM Pool p WHERE p.consultant.id = :consultantId ORDER BY p.totalCandidates DESC")
    List<Pool> findTopPoolsByCandidateCount(@Param("consultantId") Long consultantId, 
                                             org.springframework.data.domain.Pageable pageable);

    /**
     * Delete all pools by consultant
     */
    void deleteByConsultant(Consultant consultant);
}
