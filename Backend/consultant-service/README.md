# Consultant Service

## Overview
Microservice responsible for managing consultant profiles, KYC documents, candidate pools, and candidate verification workflows for the Elowen Job Portal.

## Technology Stack
- Java 17
- Spring Boot 3.2.1
- Spring Data JPA
- MySQL
- Eureka Client
- Docker

## Database
- Database Name: `elowen_consultant_db`
- Port: 8089

## Owned Entities
- Consultant (profile and specializations)
- ConsultantDocument (KYC documents)
- Pool (candidate pools by skill category)
- Candidate (candidate details)
- CandidateVerification (verification workflow)

## API Endpoints

### Consultant Profile
- `GET /api/consultant/profile` - Get consultant profile
- `PUT /api/consultant/profile` - Update consultant profile
- `PUT /api/consultant/specializations` - Update specializations

### Documents
- `POST /api/consultant/documents` - Upload document
- `GET /api/consultant/documents` - Get all documents
- `PUT /api/consultant/documents/{id}/status` - Update document status
- `DELETE /api/consultant/documents/{id}` - Delete document

### Pools
- `POST /api/consultant/pools` - Create pool
- `GET /api/consultant/pools` - Get all pools
- `GET /api/consultant/pools/{id}` - Get pool by ID
- `PUT /api/consultant/pools/{id}` - Update pool
- `DELETE /api/consultant/pools/{id}` - Delete pool
- `GET /api/consultant/pools/{id}/metrics` - Get pool metrics

### Candidates
- `POST /api/consultant/pools/{poolId}/candidates` - Add candidate
- `GET /api/consultant/pools/{poolId}/candidates` - Get candidates by pool
- `GET /api/consultant/candidates/{id}` - Get candidate by ID
- `PUT /api/consultant/candidates/{id}` - Update candidate
- `PUT /api/consultant/candidates/{id}/status` - Update candidate status
- `DELETE /api/consultant/candidates/{id}` - Delete candidate

### Dashboard
- `GET /api/consultant/dashboard` - Get complete dashboard
- `GET /api/consultant/dashboard/pool-overview` - Get pool overview
- `GET /api/consultant/dashboard/workforce-metrics` - Get workforce metrics
- `GET /api/consultant/dashboard/performance-metrics` - Get performance metrics
- `GET /api/consultant/dashboard/finance-metrics` - Get finance metrics

## Build & Run

```bash
# Build
mvn clean package

# Run locally
mvn spring-boot:run

# Docker build
docker build -t consultant-service:1.0.0 .

# Docker run
docker run -p 8089:8089 consultant-service:1.0.0
```
