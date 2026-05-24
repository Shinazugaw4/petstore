# Project Structure

## Directory Tree

```
petstore/
│
├── backend/                                    # Spring Boot API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/petstore/
│   │   │   │   ├── controller/
│   │   │   │   │   └── PetController.java
│   │   │   │   ├── service/
│   │   │   │   │   └── PetService.java
│   │   │   │   ├── repository/
│   │   │   │   │   └── PetRepository.java
│   │   │   │   ├── model/
│   │   │   │   │   └── Pet.java
│   │   │   │   ├── dto/
│   │   │   │   │   └── PetDTO.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   └── ResourceNotFoundException.java
│   │   │   │   └── PetStoreApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-dev.properties
│   │   └── test/
│   │       └── java/com/petstore/
│   ├── pom.xml
│   ├── Dockerfile
│   ├── .gitignore
│   └── README.md
│
├── frontend/                                   # React + Vite UI
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PetCard.jsx
│   │   │   ├── PetForm.jsx
│   │   │   └── PetFilters.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AddPetPage.jsx
│   │   │   ├── EditPetPage.jsx
│   │   │   └── PetDetailPage.jsx
│   │   ├── services/
│   │   │   └── petService.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── Dockerfile
│   ├── .gitignore
│   └── README.md
│
├── docker-compose.yml                        # Docker orchestration
├── .gitignore                               # Git ignore rules
├── README.md                                # Main documentation
├── IMPLEMENTATION_PLAN.md                   # Development plan
├── API.md                                   # API documentation
├── DATABASE_SETUP.md                        # Database guide
├── .env.example                             # Environment template
└── PROJECT_STRUCTURE.md                     # This file
```

## File Descriptions

### Backend Files

| File | Purpose |
|------|---------|
| `PetStoreApplication.java` | Spring Boot entry point, CORS config |
| `PetController.java` | REST API endpoints for pets |
| `PetService.java` | Business logic and data manipulation |
| `PetRepository.java` | Database queries and JPA interface |
| `Pet.java` | JPA entity representing database table |
| `PetDTO.java` | Data transfer object for API |
| `GlobalExceptionHandler.java` | Centralized exception handling |
| `ResourceNotFoundException.java` | Custom exception for missing resources |
| `pom.xml` | Maven dependencies and build config |
| `application.properties` | Spring Boot configuration |
| `application-dev.properties` | Development-specific config |

### Frontend Files

| File | Purpose |
|------|---------|
| `main.jsx` | React entry point |
| `App.jsx` | Main app component with routing |
| `Header.jsx` | Navigation header component |
| `Footer.jsx` | Footer component |
| `PetCard.jsx` | Individual pet card display |
| `PetForm.jsx` | Form for add/edit pet |
| `PetFilters.jsx` | Filter interface component |
| `HomePage.jsx` | Gallery page with pets |
| `AddPetPage.jsx` | New pet creation page |
| `EditPetPage.jsx` | Pet editing page |
| `PetDetailPage.jsx` | Detailed pet view page |
| `petService.js` | API communication service |
| `index.css` | Global styles and Tailwind |
| `vite.config.js` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `package.json` | Dependencies and scripts |
| `index.html` | HTML entry point |

### Configuration Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Multi-container orchestration |
| `backend/Dockerfile` | Backend containerization |
| `frontend/Dockerfile` | Frontend containerization |
| `.gitignore` | Git ignore rules |
| `.env.example` | Environment variables template |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and setup |
| `IMPLEMENTATION_PLAN.md` | Development timeline and tasks |
| `API.md` | API endpoint documentation |
| `DATABASE_SETUP.md` | Database setup instructions |
| `PROJECT_STRUCTURE.md` | This file |

## Naming Conventions

### Backend
- **Classes**: PascalCase (e.g., `PetController`, `PetService`)
- **Packages**: lowercase (e.g., `com.petstore.controller`)
- **Methods**: camelCase (e.g., `getPetById()`)
- **Constants**: UPPER_SNAKE_CASE

### Frontend
- **Components**: PascalCase (e.g., `PetCard.jsx`)
- **Files**: camelCase or PascalCase
- **Functions**: camelCase (e.g., `handleSubmit()`)
- **Constants**: UPPER_SNAKE_CASE

## Architecture Patterns

### Layered Architecture (Backend)
```
Controller → Service → Repository → Database
```

### Component-Based (Frontend)
```
Pages → Components → Services → API
```

## Data Flow

### Create Pet Flow
```
Frontend Form → API Service → Controller → Service → Repository → Database
```

### Retrieve Pet Flow
```
Frontend Component → Service → Controller → Repository → Database
```

## Dependencies

### Backend (pom.xml)
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL JDBC
- Lombok
- Validation API

### Frontend (package.json)
- React 18.2
- React Router 6.20
- Axios 1.6
- Tailwind CSS 3.4
- Material-UI 5.14

## Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Backend API | 8080 | http://localhost:8080 |
| Frontend Dev | 5173 | http://localhost:5173 |
| PostgreSQL | 5432 | localhost:5432 |

## Git Structure

```
main branch (production)
  └── develop branch
      ├── feature/add-pet
      ├── feature/search-filter
      └── bugfix/validation-error
```

