# Backend Setup Guide

## Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.8+
- PostgreSQL 12+

### Installation Steps

1. **Build the project**
   ```bash
   cd backend
   mvn clean install
   ```

2. **Configure database**
   - Update `src/main/resources/application.properties`
   - Set PostgreSQL connection details

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access API**
   - Base URL: `http://localhost:8080/api/pets`
   - Swagger UI: `http://localhost:8080/swagger-ui.html` (when added)

## Project Structure

```
src/main/java/com/petstore/
├── controller/      # REST API endpoints
├── service/         # Business logic
├── repository/      # Data access
├── model/          # JPA entities
├── dto/            # Data transfer objects
├── exception/      # Custom exceptions
└── PetStoreApplication.java
```

## API Endpoints

See [API Documentation](./API.md) for detailed endpoint information.

## Development

```bash
# Run with development profile
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# Run tests
mvn test

# Build JAR
mvn clean package
```

## Troubleshooting

See TROUBLESHOOTING.md for common issues and solutions.
