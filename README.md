# Project Management API (JIRA-style) — Node.js + Express

> Backend API for project/issue tracking — designed & developed by **Manoj Khanavalkar**.  
> Think of it as a lean, modular, self-hostable JIRA-like service for projects, tickets, sprints, roles and workflows.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange)](#security--auth)
[![Status](https://img.shields.io/badge/Status-Phase%201%20Complete-blue)](#project-roadmap)

---

## ✨ What this project is

A **Node.js + Express** backend that provides REST APIs for:

- **Users & Auth** — registration, login, JWT access/refresh tokens, secure password handling.
- **Email Workflows** — verification and password reset via **Mailgen + Nodemailer**.
- **Projects & Issues** — create/manage projects; create tasks/issues with status lifecycle (ToDo → In-Progress → Done).
- **Roles & Permissions** — basic RBAC guards to keep data scoped and safe.
- **Product Docs** — an initial **PRD** is included to capture scope and roadmap.

> Phase-1 ✅ focuses on the core primitives (Auth, Projects, Issues, Email flows, basic RBAC) so teams can onboard quickly.  
> Phase-2 🚀 adds sprints, comments, attachments, advanced reports, notifications, and integrations.

---

## 🗂️ Repo Structure (high level)

project-root/
├─ src/ # application code (routes, controllers, models, middleware, utils)
├─ public/images/ # assets (logos/email templates assets)
├─ PRD.md # product requirements document
├─ package.json
└─ .prettierrc # code style

markdown
Copy code

---

## 🧰 Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (access + refresh), `crypto` for token/OTP generation
- **Email:** Nodemailer + Mailgen (HTML + plaintext transactional emails)
- **Utilities:** Async error handling wrapper, structured API response helpers
- **Formatting:** Prettier

---

## 🔐 Security & Auth

- **JWT Access/Refresh Tokens** with rotation.
- **Hashed passwords** with industry-standard algorithms.
- **Email verification** flow + **Forgot/Reset password**.
- **RBAC hooks** to protect project/issue resources by role and ownership.
- **Defensive Mongo queries** and safe projections to avoid data leaks.

---

## 🚀 Getting Started

### 1) Prerequisites
- Node.js **18+**
- MongoDB (local or Atlas)
- An SMTP inbox (Mailtrap or any test SMTP recommended)

### 2) Install
```bash
git clone https://github.com/Manojkhanavalkar/Project_Management_project.git
cd Project_Management_project
npm install
```
3) Configure Environment
Create a .env at the project root:

dotenv

# App
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/project_management

# JWT
ACCESS_TOKEN_SECRET=replace-with-strong-secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=replace-with-strong-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Email (Mailtrap or your SMTP)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_user
MAIL_PASS=your_pass
MAIL_FROM="Task Manager <mail.taskmanager@example.com>"
Tip: For production, store secrets in a secure manager and enable HTTPS + CORS allowlist.

4) Run
bash
Copy code
# Dev with live reload (if nodemon is added)
npm run dev

# or plain start
npm start
📡 API Overview (Phase-1)
Base URL: http://localhost:5000/api/v1

Auth
POST /auth/register — Create account, send verification email

POST /auth/login — Issue access + refresh tokens

POST /auth/refresh — Rotate tokens

POST /auth/forgot-password — Send reset mail

POST /auth/reset-password — Confirm reset

POST /auth/verify-email — Verify email token

Projects
POST /projects — Create project

GET /projects — List projects (scoped)

GET /projects/:id — Get project by id

PATCH /projects/:id — Update project (owner/maintainer)

DELETE /projects/:id — Archive/delete

Issues / Tasks
POST /issues — Create issue (projectId, title, type, priority, assignee)

GET /issues — Query issues (by project, status, assignee)

PATCH /issues/:id — Update fields/status (todo|in_progress|done)

DELETE /issues/:id — Remove/soft-delete

Note: Routes are organized by feature modules; all protected endpoints require a valid access token.

🧱 Architecture
pgsql
Copy code
Express App
├─ middleware
│  ├─ authGuard.js        # verifies JWT, injects user
│  └─ errorHandler.js     # central error formatter
├─ modules
│  ├─ auth/               # register/login/refresh/email flows
│  ├─ users/              # user profile & roles
│  ├─ projects/           # CRUD and membership
│  └─ issues/             # CRUD and workflow transitions
├─ utils/
│  ├─ api-response.js     # success/error response helpers
│  ├─ api-errors.js       # typed errors
│  ├─ async-handler.js    # try/catch wrapper
│  └─ mail.js             # nodemailer + mailgen templates
└─ db/
   └─ mongoose.js         # connection & indexes
Design notes

Feature-first folder layout keeps controllers, routes, and models cohesive.

Mailgen produces branded HTML + plaintext versions for excellent deliverability.

Token rotation reduces the blast radius of leaked tokens.

Consistent API envelopes via ApiResponse and ApiError.

# 🧪 Testing (suggested)
Unit: Vitest/Jest for controllers & services

Integration: Supertest for route contracts

Contract: Swagger/OpenAPI for docs + Dredd/newman for contract checks

Coming in Phase-2: generated OpenAPI spec and Swagger UI at /docs.

# 🧭 Project Roadmap
Phase-1 ✅ (Complete)
User auth (JWT access/refresh), email verification

Forgot/reset password

Projects & Issues: core CRUD + status lifecycle

Basic RBAC & secure Mongo projections

Initial PRD and code style setup (Prettier)

# Phase-2 🚀 (Planned)
Sprints & Backlogs (stories, subtasks, estimations)

Comments & Attachments on issues

Notifications (email + optional webhooks)

Search & Filters with indexes

Analytics (burndown, velocity, assignee load)

Swagger Docs, Postman collection, seed scripts

Docker (API + Mongo), GitHub Actions CI

3rd-party integrations: Slack/Teams, Git providers

# 🧾 Example: Register & Login (cURL)
bash
Copy code
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Manoj Khanavalkar",
    "email":"manoj@example.com",
    "password":"StrongP@ssw0rd!"
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"manoj@example.com","password":"StrongP@ssw0rd!"}'
# => { "accessToken": "...", "refreshToken": "...", "user": { ... } }
✅ Code Quality Notes
Centralized error handling and async wrappers avoid unhandled rejections.

API responses are standardized (data, message, success), which simplifies frontend integration.

Sensitive fields (e.g., password, refreshToken) never included in projections.

Mail templates are generated in both HTML and plaintext for deliverability.

# 🧑‍💻 Author
Manoj Khanavalkar
Backend Developer — Node.js | Express | MongoDB

Email workflows, JWT security, and modular REST design

Building Phase-2 features next (sprints, comments, analytics)

# 📜 License
This project is open-sourced for learning and portfolio demonstration. For commercial use, please contact the author.
