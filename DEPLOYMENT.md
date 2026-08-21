# RideWise - Deployment Guide

This guide outlines containerized deployment instructions for staging and production environments using Docker Compose.

---

## 1. Prerequisites

* Docker v24.0+
* Docker Compose v2.20+
* Node.js v20+ & Python 3.11+ (for local bare-metal execution)

---

## 2. Docker Production Deployment

```bash
# 1. Clone repository
git clone https://github.com/SanujTiwari/ridewise.git
cd ridewise

# 2. Configure Environment Variables
cp .env.example .env

# 3. Build & Launch Docker Services
docker-compose up --build -d

# 4. Check Container Logs
docker-compose logs -f backend
```

---

## 3. Environment Variable Checklist

Ensure the following variables are set in production `.env`:

* `JWT_SECRET`: Unique 256-bit secret key
* `DATABASE_URL`: Production PostgreSQL URI (`postgresql://user:pass@host:5432/dbname`)
* `REDIS_URL`: Production Redis URI (`redis://host:6379/0`)
* `CORS_ORIGIN`: Allowed domain origins (`https://ridewise.io`)
