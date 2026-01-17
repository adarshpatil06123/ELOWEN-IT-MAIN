package com.elowen.jobportal.consultant.repository;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import com.elowen.jobportal.consultant.domain.entity.ConsultantDocument;
import com.elowen.jobportal.consultant.domain.enums.DocumentStatus;
import com.elowen.jobportal.consultant.domain.enums.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for ConsultantDocument entity
 */
@Repository
public interface ConsultantDocumentRepository extends JpaRepository<ConsultantDocument, Long> {

    /**
     * Find all documents by consultant
     */
    List<ConsultantDocument> findByConsultant(Consultant consultant);

    /**
     * Find all documents by consultant ID
     */
    @Query("SELECT d FROM ConsultantDocument d WHERE d.consultant.id = :consultantId ORDER BY d.createdAt DESC")
    List<ConsultantDocument> findByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Find document by consultant and document type
     */
    Optional<ConsultantDocument> findByConsultantAndDocumentType(Consultant consultant, DocumentType documentType);

    /**
     * Find all documents by consultant ID and document type
     */
    @Query("SELECT d FROM ConsultantDocument d WHERE d.consultant.id = :consultantId AND d.documentType = :documentType")
    List<ConsultantDocument> findByConsultantIdAndDocumentType(@Param("consultantId") Long consultantId, 
                                                                 @Param("documentType") DocumentType documentType);

    /**
     * Find all documents by consultant and status
     */
    @Query("SELECT d FROM ConsultantDocument d WHERE d.consultant.id = :consultantId AND d.status = :status ORDER BY d.createdAt DESC")
    List<ConsultantDocument> findByConsultantIdAndStatus(@Param("consultantId") Long consultantId, 
                                                          @Param("status") DocumentStatus status);

    /**
     * Find all pending documents for a consultant
     */
    @Query("SELECT d FROM ConsultantDocument d WHERE d.consultant.id = :consultantId AND d.status = 'PENDING' ORDER BY d.createdAt DESC")
    List<ConsultantDocument> findPendingDocumentsByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Find all verified documents for a consultant
     */
    @Query("SELECT d FROM ConsultantDocument d WHERE d.consultant.id = :consultantId AND d.status = 'VERIFIED' ORDER BY d.createdAt DESC")
    List<ConsultantDocument> findVerifiedDocumentsByConsultantId(@Param("consultantId") Long consultantId);

    /**
     * Count documents by consultant and status
     */
    @Query("SELECT COUNT(d) FROM ConsultantDocument d WHERE d.consultant.id = :consultantId AND d.status = :status")
    Long countByConsultantIdAndStatus(@Param("consultantId") Long consultantId, 
                                       @Param("status") DocumentStatus status);

    /**
     * Count pending documents for consultant
     */
    @Query("SELECT COUNT(d) FROM ConsultantDocument d WHERE d.consultant.id = :consultantId AND d.status = 'PENDING'")
    Long countPendingDocuments(@Param("consultantId") Long consultantId);

    /**
     * Count verified documents for consultant
     */
    @Query("SELECT COUNT(d) FROM ConsultantDocument d WHERE d.consultant.id = :consultantId AND d.status = 'VERIFIED'")
    Long countVerifiedDocuments(@Param("consultantId") Long consultantId);

    /**
     * Check if consultant has uploaded a specific document type
     */
    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM ConsultantDocument d " +
           "WHERE d.consultant.id = :consultantId AND d.documentType = :documentType")
    boolean hasDocumentType(@Param("consultantId") Long consultantId, 
                            @Param("documentType") DocumentType documentType);

    /**
     * Check if all required documents are verified
     */
    @Query("SELECT CASE WHEN COUNT(d) = 7 THEN true ELSE false END FROM ConsultantDocument d " +
           "WHERE d.consultant.id = :consultantId AND d.status = 'VERIFIED'")
    boolean hasAllDocumentsVerified(@Param("consultantId") Long consultantId);

    /**
     * Delete all documents by consultant
     */
    void deleteByConsultant(Consultant consultant);
}
