package com.elowen.jobportal.consultant.service;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import com.elowen.jobportal.consultant.domain.entity.ConsultantDocument;
import com.elowen.jobportal.consultant.domain.enums.DocumentStatus;
import com.elowen.jobportal.consultant.domain.enums.DocumentType;
import com.elowen.jobportal.consultant.dto.request.DocumentUploadRequest;
import com.elowen.jobportal.consultant.dto.request.UpdateDocumentStatusRequest;
import com.elowen.jobportal.consultant.dto.response.DocumentResponse;
import com.elowen.jobportal.consultant.exception.BusinessException;
import com.elowen.jobportal.consultant.exception.ResourceNotFoundException;
import com.elowen.jobportal.consultant.mapper.DocumentMapper;
import com.elowen.jobportal.consultant.repository.ConsultantDocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for consultant document management
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentService {

    private final ConsultantDocumentRepository documentRepository;
    private final ConsultantService consultantService;
    private final DocumentMapper documentMapper;

    /**
     * Upload a new document
     */
    @Transactional
    public DocumentResponse uploadDocument(Long consultantId, DocumentUploadRequest request) {
        log.info("Uploading document {} for consultant ID: {}", request.getDocumentType(), consultantId);
        
        Consultant consultant = consultantService.getConsultantById(consultantId);
        
        // Check if document type already exists
        documentRepository.findByConsultantAndDocumentType(consultant, request.getDocumentType())
                .ifPresent(existing -> {
                    throw new BusinessException("Document type " + request.getDocumentType() + " already exists. Please update or delete the existing document.");
                });
        
        ConsultantDocument document = documentMapper.toEntity(request, consultant);
        ConsultantDocument savedDocument = documentRepository.save(document);
        
        log.info("Document uploaded successfully with ID: {}", savedDocument.getId());
        return documentMapper.toResponse(savedDocument);
    }

    /**
     * Get all documents for a consultant
     */
    @Transactional(readOnly = true)
    public List<DocumentResponse> getDocuments(Long consultantId) {
        log.debug("Fetching documents for consultant ID: {}", consultantId);
        
        List<ConsultantDocument> documents = documentRepository.findByConsultantId(consultantId);
        return documents.stream()
                .map(documentMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get document by ID
     */
    @Transactional(readOnly = true)
    public DocumentResponse getDocumentById(Long documentId) {
        log.debug("Fetching document ID: {}", documentId);
        
        ConsultantDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document", documentId));
        
        return documentMapper.toResponse(document);
    }

    /**
     * Update document status (verification)
     */
    @Transactional
    public DocumentResponse updateDocumentStatus(Long consultantId, Long documentId, 
                                                 UpdateDocumentStatusRequest request, String verifiedBy) {
        log.info("Updating status for document ID: {} to {}", documentId, request.getStatus());
        
        ConsultantDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document", documentId));
        
        // Verify ownership
        if (!document.getConsultant().getId().equals(consultantId)) {
            throw new BusinessException("Document does not belong to this consultant");
        }
        
        document.setStatus(request.getStatus());
        
        if (request.getStatus() == DocumentStatus.VERIFIED) {
            document.setVerifiedAt(LocalDateTime.now());
            document.setVerifiedBy(verifiedBy);
            document.setRejectionReason(null);
        } else if (request.getStatus() == DocumentStatus.REJECTED) {
            document.setRejectionReason(request.getRejectionReason());
            document.setVerifiedAt(null);
            document.setVerifiedBy(null);
        }
        
        ConsultantDocument savedDocument = documentRepository.save(document);
        
        // Check if all documents are verified and update consultant verification status
        checkAndUpdateConsultantVerification(consultantId);
        
        log.info("Document status updated successfully");
        return documentMapper.toResponse(savedDocument);
    }

    /**
     * Delete a document
     */
    @Transactional
    public void deleteDocument(Long consultantId, Long documentId) {
        log.info("Deleting document ID: {}", documentId);
        
        ConsultantDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document", documentId));
        
        // Verify ownership
        if (!document.getConsultant().getId().equals(consultantId)) {
            throw new BusinessException("Document does not belong to this consultant");
        }
        
        documentRepository.delete(document);
        log.info("Document deleted successfully");
    }

    /**
     * Get documents by status
     */
    @Transactional(readOnly = true)
    public List<DocumentResponse> getDocumentsByStatus(Long consultantId, DocumentStatus status) {
        log.debug("Fetching {} documents for consultant ID: {}", status, consultantId);
        
        List<ConsultantDocument> documents = documentRepository.findByConsultantIdAndStatus(consultantId, status);
        return documents.stream()
                .map(documentMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get documents by type
     */
    @Transactional(readOnly = true)
    public List<DocumentResponse> getDocumentsByType(Long consultantId, DocumentType documentType) {
        log.debug("Fetching {} documents for consultant ID: {}", documentType, consultantId);
        
        List<ConsultantDocument> documents = documentRepository.findByConsultantIdAndDocumentType(consultantId, documentType);
        return documents.stream()
                .map(documentMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get pending documents count
     */
    @Transactional(readOnly = true)
    public Long getPendingDocumentsCount(Long consultantId) {
        return documentRepository.countPendingDocuments(consultantId);
    }

    /**
     * Get verified documents count
     */
    @Transactional(readOnly = true)
    public Long getVerifiedDocumentsCount(Long consultantId) {
        return documentRepository.countVerifiedDocuments(consultantId);
    }

    /**
     * Check if specific document type exists
     */
    @Transactional(readOnly = true)
    public boolean hasDocumentType(Long consultantId, DocumentType documentType) {
        return documentRepository.hasDocumentType(consultantId, documentType);
    }

    /**
     * Check and update consultant verification status
     */
    private void checkAndUpdateConsultantVerification(Long consultantId) {
        boolean allVerified = documentRepository.hasAllDocumentsVerified(consultantId);
        if (allVerified) {
            consultantService.updateVerificationStatus(consultantId, true);
            log.info("All documents verified for consultant ID: {}. Consultant marked as verified.", consultantId);
        }
    }
}
