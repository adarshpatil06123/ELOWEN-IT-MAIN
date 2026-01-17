-- Sample test data for development and testing
-- This script should only be run in development/test environments

-- Insert test consultant
INSERT IGNORE INTO consultant (user_id, full_name, phone_number, email, total_experience_years, specialization, location, is_verified, total_placements, success_rate, total_incentives_earned, total_commission_earned, rating, created_at, updated_at)
VALUES 
(1001, 'John Doe', '+919876543210', 'john.doe@elowen.com', 8, 'Java,Spring Boot,Microservices', 'Bangalore', true, 25, 85.5, 150000, 500000, 4.5, NOW(), NOW()),
(1002, 'Jane Smith', '+919876543211', 'jane.smith@elowen.com', 5, 'Python,Django,React', 'Mumbai', true, 15, 78.0, 100000, 350000, 4.2, NOW(), NOW()),
(1003, 'Mike Johnson', '+919876543212', 'mike.johnson@elowen.com', 10, '.NET,Azure,DevOps', 'Hyderabad', false, 30, 90.0, 200000, 650000, 4.8, NOW(), NOW());

-- Insert test pools
INSERT IGNORE INTO pool (id, consultant_id, pool_name, job_role, required_experience, skill_set, total_candidates, available_candidates, deployed_candidates, is_active, created_at, last_updated)
VALUES 
(1, 1, 'Senior Java Developers Pool', 'Senior Software Engineer', 5, 'Java,Spring Boot,Microservices,AWS', 10, 7, 3, true, NOW(), NOW()),
(2, 1, 'Full Stack Developers Pool', 'Full Stack Developer', 3, 'Java,React,Node.js,MongoDB', 8, 5, 3, true, NOW(), NOW()),
(3, 2, 'Python Developers Pool', 'Python Developer', 4, 'Python,Django,PostgreSQL,Docker', 12, 9, 3, true, NOW(), NOW());

-- Insert test candidates
INSERT IGNORE INTO candidate (pool_id, candidate_name, email, phone, experience_years, primary_skills, notice_period_days, current_ctc, expected_ctc, availability_status, resume_link, added_on)
VALUES 
(1, 'Alice Brown', 'alice.brown@example.com', '+919876543220', 6, 'Java,Spring Boot,AWS', 30, 1200000, 1500000, 'AVAILABLE', 'https://example.com/resume/alice.pdf', NOW()),
(1, 'Bob Wilson', 'bob.wilson@example.com', '+919876543221', 5, 'Java,Microservices,Kubernetes', 15, 1000000, 1300000, 'AVAILABLE', 'https://example.com/resume/bob.pdf', NOW()),
(2, 'Carol Davis', 'carol.davis@example.com', '+919876543222', 3, 'React,Node.js,MongoDB', 45, 800000, 1000000, 'AVAILABLE', 'https://example.com/resume/carol.pdf', NOW()),
(3, 'David Lee', 'david.lee@example.com', '+919876543223', 4, 'Python,Django,PostgreSQL', 60, 900000, 1200000, 'NOTICE_PERIOD', 'https://example.com/resume/david.pdf', NOW());

-- Insert test documents
INSERT IGNORE INTO consultant_document (consultant_id, document_type, document_url, status, uploaded_at)
VALUES 
(1, 'PAN_CARD', 'https://example.com/docs/john_pan.pdf', 'VERIFIED', NOW()),
(1, 'AADHAAR_CARD', 'https://example.com/docs/john_aadhaar.pdf', 'VERIFIED', NOW()),
(2, 'PAN_CARD', 'https://example.com/docs/jane_pan.pdf', 'VERIFIED', NOW()),
(3, 'PAN_CARD', 'https://example.com/docs/mike_pan.pdf', 'PENDING', NOW());

-- Insert test verifications
INSERT IGNORE INTO candidate_verification (candidate_id, verification_status, verification_type, verified_details, created_at, updated_at)
VALUES 
(1, 'VERIFIED', 'BACKGROUND_CHECK', 'Background verification completed successfully', NOW(), NOW()),
(2, 'VERIFIED', 'SKILL_ASSESSMENT', 'Technical skills verified through assessment', NOW(), NOW()),
(3, 'PENDING', 'BACKGROUND_CHECK', NULL, NOW(), NOW());
