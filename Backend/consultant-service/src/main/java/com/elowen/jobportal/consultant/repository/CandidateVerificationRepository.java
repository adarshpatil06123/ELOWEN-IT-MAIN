package com.elowen.jobportal.consultant.repository;

import com.elowen.jobportal.consultant.domain.entity.Candidate;
import com.elowen.jobportal.consultant.domain.entity.CandidateVerification;
import com.elowen.jobportal.consultant.domain.enums.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for CandidateVerification entity
 */
@Repository
public interface CandidateVerificationRepository extends JpaRepository<CandidateVerification, Long> {

    /**
     * Find verification by candidate
     */
    Optional<CandidateVerification> findByCandidate(Candidate candidate);

    /**
     * Find verification by candidate ID
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.candidate.id = :candidateId")
    Optional<CandidateVerification> findByCandidateId(@Param("candidateId") Long candidateId);

    /**
     * Find verification by candidate ID and consultant ID (for authorization)
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.candidate.id = :candidateId AND v.candidate.pool.consultant.id = :consultantId")
    Optional<CandidateVerification> findByCandidateIdAndConsultantId(@Param("candidateId") Long candidateId, 
                                                                       @Param("consultantId") Long consultantId);

    /**
     * Find all verifications by status
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.status = :status ORDER BY v.createdAt DESC")
    List<CandidateVerification> findByStatus(@Param("status") VerificationStatus status);

    /**
     * Find all verifications by consultant and status
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.status = :status ORDER BY v.createdAt DESC")
    List<CandidateVerification> findByConsultantIdAndStatus(@Param("consultantId") Long consultantId, 
                                                             @Param("status") VerificationStatus status);

    /**
     * Find all pending verifications for consultant
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.status IN ('NEW', 'UNDER_VERIFICATION') ORDER BY v.createdAt ASC")
    List<CandidateVerification> findPendingVerificationsByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Find all completed verifications for consultant
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.status = 'VERIFIED' ORDER BY v.verifiedAt DESC")
    List<CandidateVerification> findCompletedVerificationsByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Count verifications by status
     */
    @Query("SELECT COUNT(v) FROM CandidateVerification v WHERE v.status = :status")
    Long countByStatus(@Param("status") VerificationStatus status);

    /**
     * Count verifications by consultant and status
     */
    @Query("SELECT COUNT(v) FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.status = :status")
    Long countByConsultantIdAndStatus(@Param("consultantId") Long consultantId, 
                                       @Param("status") VerificationStatus status);

    /**
     * Count pending verifications for consultant
     */
    @Query("SELECT COUNT(v) FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.status IN ('NEW', 'UNDER_VERIFICATION')")
    Long countPendingVerificationsByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Count completed verifications for consultant
     */
    @Query("SELECT COUNT(v) FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.status = 'VERIFIED'")
    Long countCompletedVerificationsByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Find verifications requiring police verification
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.policeVerificationDone = false AND v.status != 'REJECTED' ORDER BY v.createdAt ASC")
    List<CandidateVerification> findRequiringPoliceVerification(@Param("consultantId") Long consultantId);

    /**
     * Find verifications requiring health check
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.healthCheckDone = false AND v.status != 'REJECTED' ORDER BY v.createdAt ASC")
    List<CandidateVerification> findRequiringHealthCheck(@Param("consultantId") Long consultantId);

    /**
     * Find verifications requiring background check
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.backgroundVerificationDone = false AND v.status != 'REJECTED' ORDER BY v.createdAt ASC")
    List<CandidateVerification> findRequiringBackgroundCheck(@Param("consultantId") Long consultantId);

    /**
     * Find verifications requiring reference check
     */
    @Query("SELECT v FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId AND v.referenceCheckDone = false AND v.status != 'REJECTED' ORDER BY v.createdAt ASC")
    List<CandidateVerification> findRequiringReferenceCheck(@Param("consultantId") Long consultantId);

    /**
     * Get verification statistics for consultant
     */
    @Query("SELECT NEW map(" +
           "COUNT(v) as total, " +
           "SUM(CASE WHEN v.status = 'NEW' THEN 1 ELSE 0 END) as newCount, " +
           "SUM(CASE WHEN v.status = 'UNDER_VERIFICATION' THEN 1 ELSE 0 END) as inProgressCount, " +
           "SUM(CASE WHEN v.status = 'VERIFIED' THEN 1 ELSE 0 END) as verifiedCount, " +
           "SUM(CASE WHEN v.status = 'REJECTED' THEN 1 ELSE 0 END) as rejectedCount, " +
           "SUM(CASE WHEN v.policeVerificationDone = true THEN 1 ELSE 0 END) as policeVerifiedCount, " +
           "SUM(CASE WHEN v.healthCheckDone = true THEN 1 ELSE 0 END) as healthCheckCount) " +
           "FROM CandidateVerification v WHERE v.candidate.pool.consultant.id = :consultantId")
    java.util.Map<String, Object> getVerificationStatistics(@Param("consultantId") Long consultantId);

    /**
     * Check if candidate has verification record
     */
    @Query("SELECT CASE WHEN COUNT(v) > 0 THEN true ELSE false END FROM CandidateVerification v WHERE v.candidate.id = :candidateId")
    boolean existsByCandidateId(@Param("candidateId") Long candidateId);

    /**
     * Delete verification by candidate
     */
    void deleteByCandidate(Candidate candidate);
}
