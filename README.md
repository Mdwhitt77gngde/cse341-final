# TaskForge — Library-style Starter (Books & Authors + Auth + Swagger)

This repository is a *working* starter backend for the CSE341 final project, built from a proven Project 2 foundation.
It uses the native `mongodb` driver, Passport (GitHub strategy optional), JWT auth for API access, and `swagger-autogen` to produce `/api-docs`.

Use this repo as the canonical base for Week 1 (W05): create two collections (authors + books) with full CRUD, error handling,
and published API documentation at `/api-docs`. From here you will add the rest of your project (projects, tasks, comments, etc).

---

## Table of Contents

- Quickstart (local)
- Environment variables (`.env`)
- Install & run commands
- Seed the database
- Swagger (API docs)
- API endpoints & sample requests
- Deploy to Render (exact settings)
- Troubleshooting (common errors + fixes)
- Testing (notes & commands)
- Project checklist: Week 1 deliverables
- Team contributions template
- Notes & next steps
- License

---

## Quickstart (local)

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-org-or-username>/<repo>.git
   cd <repo>
