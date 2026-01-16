# Elowen Job Portal - Microservices Backend

A production-ready, scalable microservices architecture for the Elowen Job Portal mobile application.

## 🏗️ Architecture Overview

This backend follows a **microservices architecture** with clearly defined service boundaries and responsibilities:

```
Mobile App (React Native)
         ↓
    API Gateway (Port 8080)
         ↓
    ┌────────┴────────────────────────────┐
    ↓         ↓         ↓         ↓       ↓
Auth-Service  User-Service  Job-Service  Application-Service  Search-Service
(Port 8081)   (Port 8082)   (Port 8083)  (Port 8084)         (Port 8085)
                                                    ↓
                                          Notification-Service
                                               (Port 8086)
```

## 📦 Services

### 1. **API Gateway** (Port 8080)
- Single entry point for all client requests
- JWT validation and routing
- Rate limiting and security
- Load balancing

### 2. **Auth Service** (Port 8081)
- User authentication (login, register, OTP)
- JWT token generation and validation
- Password management
- **Database:** `elowen_auth_db`

### 3. **User Service** (Port 8082)
- User profile management
- Profile updates
- User search and listing
- **Database:** `elowen_user_db`

### 4. **Job Service** (Port 8083)
- Job posting CRUD
- Job listing and filtering
- Category management
- Employer job management
- **Database:** `elowen_job_db`

### 5. **Application Service** (Port 8084)
- Job applications
- Application status tracking
- Application history
- **Database:** `elowen_application_db`

### 6. **Search Service** (Port 8085)
- Elasticsearch-based job search
- Advanced filtering
- Location-based search
- **Database:** Elasticsearch

### 7. **Notification Service** (Port 8086)
- Event-driven notifications
- Email/SMS/Push notifications
- Application status updates
- **Database:** `elowen_notification_db`

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- Docker & Docker Compose
- MySQL 8.0+
- Elasticsearch 8.x (optional for search)

### Running with Docker Compose

```bash
# Start all services
docker-compose up -d

# Check service health
docker-compose ps

# View logs
docker-compose logs -f [service-name]

# Stop all services
docker-compose down
```

### Running Individual Services

```bash
# Build all services
mvn clean install

# Run specific service
cd auth-service
mvn spring-boot:run
```

## 🗄️ Database Setup

Each service has its own database for data isolation:

```sql
CREATE DATABASE elowen_auth_db;
CREATE DATABASE elowen_user_db;
CREATE DATABASE elowen_job_db;
CREATE DATABASE elowen_application_db;
CREATE DATABASE elowen_notification_db;
```

## 🔐 Security

- **JWT Authentication**: All services validate JWT tokens
- **API Gateway**: Central security enforcement
- **CORS**: Configured for mobile app origins
- **Rate Limiting**: Prevents API abuse

## 📊 API Documentation

Access Swagger UI for each service:
- Gateway: http://localhost:8080/swagger-ui.html
- Auth: http://localhost:8081/swagger-ui.html
- User: http://localhost:8082/swagger-ui.html
- Job: http://localhost:8083/swagger-ui.html
- Application: http://localhost:8084/swagger-ui.html
- Search: http://localhost:8085/swagger-ui.html

## 🔄 Service Communication

- **Synchronous**: REST APIs via API Gateway
- **Asynchronous**: Event-driven using RabbitMQ/Kafka
- **Service Discovery**: Spring Cloud Netflix Eureka (optional)

## 📈 Monitoring & Logging

- **Spring Boot Actuator**: Health checks and metrics
- **ELK Stack**: Centralized logging (optional)
- **Prometheus + Grafana**: Metrics visualization (optional)

## 🧪 Testing

```bash
# Run all tests
mvn test

# Run integration tests
mvn verify

# Run specific service tests
cd auth-service
mvn test
```

## 📝 Environment Configuration

Each service uses `application.yml` for configuration. Environment-specific configs:
- `application-dev.yml` - Development
- `application-prod.yml` - Production

## 🌐 Mobile App Integration

**API Base URL:** `http://your-server:8080`

Update in React Native app:
```javascript
const API_BASE_URL = 'http://10.0.2.2:8080'; // Android Emulator
const API_BASE_URL = 'http://localhost:8080'; // iOS Simulator
const API_BASE_URL = 'https://api.elowen.com'; // Production
```

## 📦 Deployment

### Docker Hub
```bash
docker-compose build
docker-compose push
```

### Kubernetes
```bash
kubectl apply -f k8s/
```

## 🤝 Contributing

1. Follow Spring Boot best practices
2. Maintain service boundaries
3. Write unit and integration tests
4. Update documentation

## 📄 License

Proprietary - Elowen Job Portal

## 📧 Support

For issues and questions, contact the development team.
