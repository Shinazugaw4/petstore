# Database Setup Guide

## PostgreSQL Installation

### Windows
1. Download from https://www.postgresql.org/download/windows/
2. Run installer
3. Choose installation path
4. Set password for postgres user
5. Accept default settings

### macOS
```bash
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

## Create Database and User

### Using psql CLI

```bash
# Connect to PostgreSQL
psql -U postgres

# Create user
CREATE USER petstore_user WITH PASSWORD 'petstore_password';

# Create database
CREATE DATABASE petstore_db OWNER petstore_user;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE petstore_db TO petstore_user;

# Connect to new database (verify)
\c petstore_db

# Exit
\q
```

### Using pgAdmin GUI

1. Open pgAdmin
2. Right-click on "Databases" → Create → Database
3. Name: `petstore_db`
4. Owner: Select or create `petstore_user`
5. Click Save

---

## Database Configuration

Update `backend/src/main/resources/application.properties`:

```properties
# PostgreSQL Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/petstore_db
spring.datasource.username=petstore_user
spring.datasource.password=petstore_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

---

## Schema Overview

### Pets Table

```sql
CREATE TABLE pets (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  species VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  description TEXT NOT NULL,
  available BOOLEAN NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  CONSTRAINT age_check CHECK (age >= 0),
  CONSTRAINT price_check CHECK (price > 0)
);
```

### Create Index for Better Performance

```sql
CREATE INDEX idx_species ON pets(species);
CREATE INDEX idx_available ON pets(available);
CREATE INDEX idx_name ON pets(name);
```

---

## Verify Installation

### Test Connection

```bash
# From command line
psql -U petstore_user -d petstore_db -h localhost -p 5432

# You should see:
# psql (15.x)
# Type "help" for help.
# petstore_db=>
```

### Test with Spring Boot

Run the backend application:
```bash
cd backend
mvn spring-boot:run
```

Check logs for:
```
HikariPool-1 - Starting...
HikariPool-1 - Pool is ready to accept connections
```

---

## Backup & Restore

### Backup Database

```bash
pg_dump -U petstore_user -d petstore_db > petstore_backup.sql
```

### Restore Database

```bash
psql -U petstore_user -d petstore_db < petstore_backup.sql
```

---

## Common Issues

### Connection Refused
- Ensure PostgreSQL is running: `systemctl status postgresql` (Linux)
- Check port 5432 is open
- Verify credentials

### Permission Denied
- Check user permissions: `\du` in psql
- Grant privileges: `GRANT ALL PRIVILEGES ON DATABASE petstore_db TO petstore_user;`

### Database Not Found
- List databases: `\l` in psql
- Create database: `CREATE DATABASE petstore_db;`

---

## Docker Setup

See `docker-compose.yml` for containerized PostgreSQL setup.

```bash
docker-compose up -d postgres
```

This will create and start PostgreSQL with pre-configured user and database.

---

## Useful Commands

```bash
# Connect to database
psql -U petstore_user -d petstore_db

# List databases
\l

# List tables
\dt

# Describe table
\d pets

# Show current database
SELECT current_database();

# Check connections
SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;

# Drop database (use with caution!)
DROP DATABASE petstore_db;
```

