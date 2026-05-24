# PetStore - Full-Stack Pet E-Commerce Platform

A comprehensive full-stack web application for buying and managing pets with a modern React frontend and Spring Boot backend.

## 🎯 Overview

PetStore is a complete e-commerce platform designed to help pet enthusiasts discover and purchase their perfect pet companion. The application features a responsive product gallery with advanced filtering, comprehensive pet management capabilities, and a robust REST API backend.

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Java 17
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- Maven
- Docker

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Material-UI
- Axios
- React Router

## 📁 Project Structure

```
petstore/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/petstore/
│   │   │   │   ├── controller/       # REST API endpoints
│   │   │   │   ├── service/          # Business logic
│   │   │   │   ├── repository/       # Data access layer
│   │   │   │   ├── model/            # JPA entities
│   │   │   │   ├── dto/              # Data transfer objects
│   │   │   │   ├── exception/        # Custom exceptions
│   │   │   │   └── PetStoreApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-dev.properties
│   │   └── test/
│   ├── pom.xml
│   ├── Dockerfile
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── styles/           # CSS and Tailwind styles
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── Dockerfile
│   ├── .gitignore
│   └── index.html
├── docker-compose.yml
├── .gitignore
└── README.md
```

## ✨ Features

### Pet Management
- ✅ Create new pet listings
- ✅ Read/View pet details
- ✅ Update pet information
- ✅ Delete pet listings
- ✅ Responsive product gallery

### Search & Filtering
- ✅ Search pets by name, species, and breed
- ✅ Filter by species
- ✅ Filter by availability status
- ✅ Combined filtering capabilities

### Database
- ✅ PostgreSQL persistent storage
- ✅ JPA/Hibernate ORM
- ✅ Automatic schema generation

### API
- ✅ RESTful API endpoints
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support
- ✅ Pagination-ready design

## 🗄️ Database Schema

### Pets Table

| Field | Type | Constraints |
|-------|------|-------------|
| id | BIGSERIAL | PRIMARY KEY |
| name | VARCHAR(255) | NOT NULL |
| species | VARCHAR(255) | NOT NULL |
| breed | VARCHAR(255) | NOT NULL |
| age | INTEGER | NOT NULL |
| price | DECIMAL(10,2) | NOT NULL |
| imageUrl | VARCHAR(500) | |
| description | TEXT | NOT NULL |
| available | BOOLEAN | NOT NULL |
| createdAt | BIGINT | NOT NULL, AUTO |
| updatedAt | BIGINT | NOT NULL, AUTO |

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18+
- npm or yarn
- PostgreSQL 12+
- Docker & Docker Compose (optional)

### Installation & Setup

#### Option 1: Local Development

**Backend Setup:**
```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Configure database
# Update src/main/resources/application.properties with your PostgreSQL credentials

# Run the application
mvn spring-boot:run
```

**Frontend Setup:**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Database Setup:**
```sql
CREATE USER petstore_user WITH PASSWORD 'petstore_password';
CREATE DATABASE petstore_db OWNER petstore_user;
GRANT ALL PRIVILEGES ON DATABASE petstore_db TO petstore_user;
```

#### Option 2: Using Docker Compose

```bash
# From the project root directory
docker-compose up --build

# The application will be available at:
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
# Database: localhost:5432
```

## 📡 API Endpoints

### Base URL
```
http://localhost:8080/api/pets
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all pets |
| GET | `/:id` | Get pet by ID |
| POST | `/` | Create new pet |
| PUT | `/:id` | Update pet |
| DELETE | `/:id` | Delete pet |
| GET | `/species/:species` | Get pets by species |
| GET | `/available` | Get available pets |
| GET | `/filter?species=&available=` | Filter pets |
| GET | `/search?q=` | Search pets |
| GET | `/species/list/all` | Get all species |

### Example Request

**Create Pet:**
```bash
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 3,
    "price": 599.99,
    "imageUrl": "https://example.com/buddy.jpg",
    "description": "A friendly and energetic golden retriever puppy",
    "available": true
  }'
```

## 🎨 Frontend Pages

### Home Page
- Pet gallery with responsive grid layout
- Search functionality
- Species and availability filters
- Pet action buttons (View, Edit, Delete)

### Add Pet Page
- Form for creating new pet listings
- Input validation
- Image URL support

### Edit Pet Page
- Update existing pet information
- Pre-populated form fields
- Real-time validation

### Pet Detail Page
- Full pet information display
- Large pet image
- Edit and delete buttons
- Availability status badge

## 🔐 Validation

### Backend Validation
- Pet name: required, non-blank
- Species: required, non-blank
- Breed: required, non-blank
- Age: required, must be >= 0
- Price: required, must be > 0
- Description: required, minimum 10 characters
- Image URL: must be valid URL format
- Availability: required boolean

### Frontend Validation
- Client-side form validation
- Real-time error messaging
- Required field indicators

## 📊 Development Workflow

### Backend Development
```bash
# Compile and test
mvn clean compile

# Run tests
mvn test

# Build JAR
mvn clean package

# Run with dev profile
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

### Frontend Development
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐳 Docker Commands

```bash
# Build and start services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Execute commands in container
docker-compose exec backend mvn clean package
```

## 🔄 CORS Configuration

The application is configured to accept requests from:
- `http://localhost:5173` (Frontend dev server)
- `http://localhost:3000` (Alternative dev server)

Update `PetStoreApplication.java` to change CORS settings.

## 📝 Environment Variables

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/petstore_db
spring.datasource.username=petstore_user
spring.datasource.password=petstore_password
spring.jpa.hibernate.ddl-auto=update
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Dependencies

### Backend
- Spring Boot 3.2.0
- PostgreSQL JDBC Driver 42.7.1
- Lombok (reduces boilerplate)
- H2 (for testing)

### Frontend
- React 18.2.0
- React Router 6.20.0
- Axios 1.6.0
- Tailwind CSS 3.4.0
- Material-UI 5.14.0

## 🛣️ Future Enhancements

- [ ] User authentication and authorization
- [ ] Shopping cart functionality
- [ ] Payment integration
- [ ] Order management system
- [ ] Pet reviews and ratings
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Image upload functionality
- [ ] Wishlist feature
- [ ] Admin dashboard

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Team

- Full-Stack Development
- UI/UX Design
- DevOps & Deployment

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: support@petstore.local
- Documentation: See docs/ folder

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Material-UI](https://mui.com)

---

**Happy coding! 🐾**
