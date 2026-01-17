-- Consultant Service Database Initialization
-- Database: elowen_consultant_db

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_consultant_user_id ON consultant(user_id);
CREATE INDEX IF NOT EXISTS idx_consultant_verified ON consultant(is_verified);
CREATE INDEX IF NOT EXISTS idx_consultant_experience ON consultant(total_experience_years);

CREATE INDEX IF NOT EXISTS idx_pool_consultant_id ON pool(consultant_id);
CREATE INDEX IF NOT EXISTS idx_pool_is_active ON pool(is_active);
CREATE INDEX IF NOT EXISTS idx_pool_created_at ON pool(created_at);

CREATE INDEX IF NOT EXISTS idx_candidate_pool_id ON candidate(pool_id);
CREATE INDEX IF NOT EXISTS idx_candidate_availability ON candidate(availability_status);
CREATE INDEX IF NOT EXISTS idx_candidate_added_on ON candidate(added_on);

CREATE INDEX IF NOT EXISTS idx_document_consultant_id ON consultant_document(consultant_id);
CREATE INDEX IF NOT EXISTS idx_document_type ON consultant_document(document_type);
CREATE INDEX IF NOT EXISTS idx_document_status ON consultant_document(status);

CREATE INDEX IF NOT EXISTS idx_verification_candidate_id ON candidate_verification(candidate_id);
CREATE INDEX IF NOT EXISTS idx_verification_status ON candidate_verification(verification_status);
CREATE INDEX IF NOT EXISTS idx_verification_created_at ON candidate_verification(created_at);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_pool_consultant_active ON pool(consultant_id, is_active);
CREATE INDEX IF NOT EXISTS idx_candidate_pool_availability ON candidate(pool_id, availability_status);
CREATE INDEX IF NOT EXISTS idx_document_consultant_status ON consultant_document(consultant_id, status);
CREATE INDEX IF NOT EXISTS idx_verification_candidate_status ON candidate_verification(candidate_id, verification_status);
