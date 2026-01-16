-- Initialize all databases for microservices
CREATE DATABASE IF NOT EXISTS elowen_auth_db;
CREATE DATABASE IF NOT EXISTS elowen_user_db;
CREATE DATABASE IF NOT EXISTS elowen_job_db;
CREATE DATABASE IF NOT EXISTS elowen_application_db;
CREATE DATABASE IF NOT EXISTS elowen_notification_db;

-- Grant privileges
GRANT ALL PRIVILEGES ON elowen_auth_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON elowen_user_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON elowen_job_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON elowen_application_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON elowen_notification_db.* TO 'root'@'%';
FLUSH PRIVILEGES;
