# API Documentation

## Base URL
```
http://localhost:8080/api/pets
```

## Endpoints

### 1. Get All Pets
**Endpoint:** `GET /`

**Description:** Retrieve all pets from the database

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 3,
    "price": 599.99,
    "imageUrl": "https://example.com/buddy.jpg",
    "description": "A friendly and energetic golden retriever",
    "available": true,
    "createdAt": 1716546000000,
    "updatedAt": 1716546000000
  }
]
```

---

### 2. Get Pet by ID
**Endpoint:** `GET /:id`

**Parameters:**
- `id` (path) - Pet ID

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 3,
  "price": 599.99,
  "imageUrl": "https://example.com/buddy.jpg",
  "description": "A friendly and energetic golden retriever",
  "available": true,
  "createdAt": 1716546000000,
  "updatedAt": 1716546000000
}
```

**Error (404 Not Found):**
```json
{
  "error": "Not Found",
  "message": "Pet not found with id: 999"
}
```

---

### 3. Create New Pet
**Endpoint:** `POST /`

**Request Body:**
```json
{
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 3,
  "price": 599.99,
  "imageUrl": "https://example.com/buddy.jpg",
  "description": "A friendly and energetic golden retriever puppy",
  "available": true
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 3,
  "price": 599.99,
  "imageUrl": "https://example.com/buddy.jpg",
  "description": "A friendly and energetic golden retriever puppy",
  "available": true,
  "createdAt": 1716546000000,
  "updatedAt": 1716546000000
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Validation Failed",
  "message": "Invalid input parameters",
  "details": {
    "name": "Pet name is required",
    "price": "Price must be greater than 0"
  }
}
```

---

### 4. Update Pet
**Endpoint:** `PUT /:id`

**Parameters:**
- `id` (path) - Pet ID

**Request Body:**
```json
{
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 4,
  "price": 599.99,
  "imageUrl": "https://example.com/buddy.jpg",
  "description": "A friendly and energetic golden retriever",
  "available": true
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 4,
  "price": 599.99,
  "imageUrl": "https://example.com/buddy.jpg",
  "description": "A friendly and energetic golden retriever",
  "available": true,
  "createdAt": 1716546000000,
  "updatedAt": 1716546060000
}
```

---

### 5. Delete Pet
**Endpoint:** `DELETE /:id`

**Parameters:**
- `id` (path) - Pet ID

**Response (204 No Content)**

---

### 6. Get Pets by Species
**Endpoint:** `GET /species/:species`

**Parameters:**
- `species` (path) - Species name (e.g., "Dog", "Cat")

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    "species": "Dog",
    // ... other fields
  }
]
```

---

### 7. Get Available Pets
**Endpoint:** `GET /available`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    "available": true,
    // ... other fields
  }
]
```

---

### 8. Filter Pets
**Endpoint:** `GET /filter?species=:species&available=:available`

**Parameters (Query):**
- `species` (optional) - Species name
- `available` (optional) - true/false

**Examples:**
- `/filter?species=Dog`
- `/filter?available=true`
- `/filter?species=Dog&available=true`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    // ... filtered results
  }
]
```

---

### 9. Search Pets
**Endpoint:** `GET /search?q=:searchTerm`

**Parameters (Query):**
- `q` (required) - Search term (searches in name, species, breed)

**Examples:**
- `/search?q=buddy`
- `/search?q=golden`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    // ... search results
  }
]
```

---

### 10. Get All Species
**Endpoint:** `GET /species/list/all`

**Response (200 OK):**
```json
[
  "Dog",
  "Cat",
  "Rabbit",
  "Bird"
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation Failed",
  "message": "Invalid input parameters",
  "details": {
    "fieldName": "Error message"
  }
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Pet not found with id: 999"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Request Headers

```
Content-Type: application/json
Accept: application/json
```

---

## cURL Examples

### Create Pet
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

### Get All Pets
```bash
curl http://localhost:8080/api/pets
```

### Get Pet by ID
```bash
curl http://localhost:8080/api/pets/1
```

### Update Pet
```bash
curl -X PUT http://localhost:8080/api/pets/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy Updated",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 4,
    "price": 599.99,
    "imageUrl": "https://example.com/buddy.jpg",
    "description": "Updated description",
    "available": true
  }'
```

### Delete Pet
```bash
curl -X DELETE http://localhost:8080/api/pets/1
```

### Search Pets
```bash
curl "http://localhost:8080/api/pets/search?q=buddy"
```

### Filter Pets
```bash
curl "http://localhost:8080/api/pets/filter?species=Dog&available=true"
```

---

## Validation Rules

### Request Validation

| Field | Rules |
|-------|-------|
| name | Required, non-blank string |
| species | Required, non-blank string |
| breed | Required, non-blank string |
| age | Required, integer >= 0 |
| price | Required, decimal > 0 |
| imageUrl | Valid URL format (optional) |
| description | Required, minimum 10 characters |
| available | Required, boolean |

---

## Response Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Delete successful |
| 400 | Bad Request - Validation failed |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

