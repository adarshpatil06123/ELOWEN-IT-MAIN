package com.elowen.jobportal.consultant.controller;

import com.elowen.jobportal.consultant.domain.enums.DocumentStatus;
import com.elowen.jobportal.consultant.domain.enums.DocumentType;
import com.elowen.jobportal.consultant.dto.request.DocumentUploadRequest;
import com.elowen.jobportal.consultant.dto.request.UpdateDocumentStatusRequest;
import com.elowen.jobportal.consultant.dto.response.DocumentResponse;
import com.elowen.jobportal.consultant.service.DocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for document management
 */
@RestController
@RequestMapping("/api/consultants/{consultantId}/documents")
@RequiredArgsConstructor
@Slf4j
public class DocumentController {

    private final DocumentService documentService;

    /**
     * Upload document
     */
    @PostMapping
    public ResponseEntity<DocumentResponse> uploadDocument(
            @PathVariable Long consultantId,
            @Valid @RequestBody DocumentUploadRequest request) {
        log.info("REST request to upload {} document for consultant ID: {}", request.getDocumentType(), consultantId);
        DocumentResponse response = documentService.uploadDocument(consultantId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get all documents for consultant
     */
    @GetMapping
    public ResponseEntity<List<DocumentResponse>> getAllDocuments(@PathVariable Long consultantId) {
        log.info("REST request to get all documents for consultant ID: {}", consultantId);
        List<DocumentResponse> response = documentService.getDocuments(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get document by ID
     */
    @GetMapping("/{documentId}")
    public ResponseEntity<DocumentResponse> getDocumentById(
            @PathVariable Long consultantId,
            @PathVariable Long documentId) {
        log.info("REST request to get document ID: {} for consultant ID: {}", documentId, consultantId);
        DocumentResponse response = documentService.getDocumentById(documentId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get documents by type
     */
    @GetMapping("/type/{documentType}")
    public ResponseEntity<List<DocumentResponse>> getDocumentsByType(
            @PathVariable Long consultantId,
            @PathVariable DocumentType documentType) {
        log.info("REST request to get {} documents for consultant ID: {}", documentType, consultantId);
        List<DocumentResponse> response = documentService.getDocumentsByType(consultantId, documentType);
        return ResponseEntity.ok(response);
    }

    /**
     * Get documents by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<DocumentResponse>> getDocumentsByStatus(
            @PathVariable Long consultantId,
            @PathVariable DocumentStatus status) {
        log.info("REST request to get {} documents for consultant ID: {}", status, consultantId);
        List<DocumentResponse> response = documentService.getDocumentsByStatus(consultantId, status);
        return ResponseEntity.ok(response);
    }

    /**
     * Update document status
     */
    @PatchMapping("/{documentId}/status")
    public ResponseEntity<DocumentResponse> updateDocumentStatus(
            @PathVariable Long consultantId,
            @PathVariable Long documentId,
            @Valid @RequestBody UpdateDocumentStatusRequest request,
            @RequestParam(required = false) String reviewedBy) {
        log.info("REST request to update status for document ID: {} to {}", documentId, request.getStatus());
        DocumentResponse response = documentService.updateDocumentStatus(consultantId, documentId, request, reviewedBy != null ? reviewedBy : "System");
        return ResponseEntity.ok(response);
    }

    /**
     * Delete document
     */
    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable Long consultantId,
            @PathVariable Long documentId) {
        log.info("REST request to delete document ID: {} for consultant ID: {}", documentId, consultantId);
        documentService.deleteDocument(consultantId, documentId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get pending documents
     */
    @GetMapping("/pending")
    public ResponseEntity<List<DocumentResponse>> getPendingDocuments(@PathVariable Long consultantId) {
        log.info("REST request to get pending documents for consultant ID: {}", consultantId);
        List<DocumentResponse> response = documentService.getDocumentsByStatus(consultantId, DocumentStatus.PENDING);
        return ResponseEntity.ok(response);
    }

    /**
     * Get verified documents
     */
    @GetMapping("/verified")
    public ResponseEntity<List<DocumentResponse>> getVerifiedDocuments(@PathVariable Long consultantId) {
        log.info("REST request to get verified documents for consultant ID: {}", consultantId);
        List<DocumentResponse> response = documentService.getDocumentsByStatus(consultantId, DocumentStatus.VERIFIED);
        return ResponseEntity.ok(response);
    }
}
