# GhawdeX Portal - API Reference

## Authentication

All endpoints (except `/login`) require user to be authenticated via NextAuth.js.

### Login
```
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

### Logout
```
GET /api/auth/signout
```

---

## Public Endpoints (Authenticated Users)

### Get All Policies
```
GET /api/policies

Response: 200 OK
[
  {
    "id": "cuid",
    "title": "Code of Conduct",
    "category": "Employee Manual",
    "content": "...",
    "version": 1,
    "status": "active",
    "createdAt": "2025-11-22T...",
    "updatedAt": "2025-11-22T..."
  }
]
```

### Get All Goals
```
GET /api/goals

Response: 200 OK
[
  {
    "id": "cuid",
    "title": "Increase Capacity",
    "description": "...",
    "period": "yearly",
    "department": "Engineering",
    "owner": "John Smith",
    "status": "active",
    "progress": 45,
    "createdAt": "2025-11-22T...",
    "updatedAt": "2025-11-22T..."
  }
]
```

### Get All Procedures
```
GET /api/procedures

Response: 200 OK
[
  {
    "id": "cuid",
    "title": "Emergency Evacuation",
    "category": "emergency",
    "content": "...",
    "priority": "critical",
    "createdAt": "2025-11-22T...",
    "updatedAt": "2025-11-22T..."
  }
]
```

### Get All Tools
```
GET /api/tools

Response: 200 OK
[
  {
    "id": "cuid",
    "name": "Slack",
    "description": "Team communication platform",
    "url": "https://slack.com",
    "category": "Communication",
    "createdAt": "2025-11-22T...",
    "updatedAt": "2025-11-22T..."
  }
]
```

### Get All Wiki Pages
```
GET /api/wiki

Response: 200 OK
[
  {
    "id": "cuid",
    "title": "Getting Started",
    "slug": "getting-started",
    "category": "Engineering",
    "author": "Team",
    "published": true,
    "createdAt": "2025-11-22T...",
    "updatedAt": "2025-11-22T..."
  }
]
```

### Get Wiki Page by Slug
```
GET /api/wiki/[slug]

Response: 200 OK
{
  "id": "cuid",
  "title": "Getting Started",
  "slug": "getting-started",
  "content": "...",
  "category": "Engineering",
  "author": "Team",
  "published": true,
  "createdAt": "2025-11-22T...",
  "updatedAt": "2025-11-22T..."
}

Response: 404 Not Found
{ "error": "Page not found" }
```

---

## Admin Endpoints (Admin Role Only)

### Company Info

#### Get Company Info
```
GET /api/admin/company

Response: 200 OK
{
  "id": "cuid",
  "mission": "...",
  "vision": "...",
  "values": "...",
  "createdAt": "2025-11-22T...",
  "updatedAt": "2025-11-22T..."
}
```

#### Update Company Info
```
POST /api/admin/company
Content-Type: application/json

{
  "mission": "New mission",
  "vision": "New vision",
  "values": "New values"
}

Response: 200 OK
{ ...updated company info... }
```

---

### Announcements

#### Get All Announcements
```
GET /api/admin/announcements

Response: 200 OK
[ ...array of announcements... ]
```

#### Create Announcement
```
POST /api/admin/announcements
Content-Type: application/json

{
  "title": "New Announcement",
  "content": "Announcement content",
  "author": "Author Name",
  "priority": "normal|high|urgent"
}

Response: 200 OK
{ ...created announcement... }
```

#### Delete Announcement
```
DELETE /api/admin/announcements/[id]

Response: 200 OK
{ "success": true }

Response: 404 Not Found
{ "error": "Not found" }
```

---

### Team Members

#### Get All Team Members
```
GET /api/admin/team

Response: 200 OK
[ ...array of team members... ]
```

#### Create Team Member
```
POST /api/admin/team
Content-Type: application/json

{
  "name": "John Doe",
  "title": "Engineer",
  "department": "Engineering",
  "email": "john@example.com",
  "phone": "+356 1234 5678",
  "bio": "Bio text"
}

Response: 200 OK
{ ...created team member... }
```

#### Delete Team Member
```
DELETE /api/admin/team/[id]

Response: 200 OK
{ "success": true }
```

---

### Policies

#### Get All Policies
```
GET /api/admin/policies

Response: 200 OK
[ ...array of policies... ]
```

#### Create Policy
```
POST /api/admin/policies
Content-Type: application/json

{
  "title": "Policy Title",
  "category": "Employee Manual|Vacation Policy|...",
  "content": "Policy content"
}

Response: 200 OK
{ ...created policy... }
```

#### Delete Policy
```
DELETE /api/admin/policies/[id]

Response: 200 OK
{ "success": true }
```

---

### Goals

#### Get All Goals
```
GET /api/admin/goals

Response: 200 OK
[ ...array of goals... ]
```

#### Create Goal
```
POST /api/admin/goals
Content-Type: application/json

{
  "title": "Goal Title",
  "description": "Goal description",
  "period": "quarterly|yearly|ongoing",
  "department": "Engineering",
  "owner": "Owner Name",
  "progress": 0
}

Response: 200 OK
{ ...created goal... }
```

---

### Procedures

#### Get All Procedures
```
GET /api/admin/procedures

Response: 200 OK
[ ...array of procedures... ]
```

#### Create Procedure
```
POST /api/admin/procedures
Content-Type: application/json

{
  "title": "Procedure Title",
  "category": "emergency|problem-solving|best-practices|how-to",
  "content": "Procedure steps",
  "priority": "normal|high|critical"
}

Response: 200 OK
{ ...created procedure... }
```

#### Delete Procedure
```
DELETE /api/admin/procedures/[id]

Response: 200 OK
{ "success": true }
```

---

### Tools

#### Get All Tools
```
GET /api/admin/tools

Response: 200 OK
[ ...array of tools... ]
```

#### Create Tool
```
POST /api/admin/tools
Content-Type: application/json

{
  "name": "Tool Name",
  "description": "Tool description",
  "category": "Communication|Development|...",
  "url": "https://tool.com"
}

Response: 200 OK
{ ...created tool... }
```

#### Delete Tool
```
DELETE /api/admin/tools/[id]

Response: 200 OK
{ "success": true }
```

---

### Wiki Pages

#### Get All Wiki Pages
```
GET /api/admin/wiki

Response: 200 OK
[ ...array of wiki pages... ]
```

#### Create Wiki Page
```
POST /api/admin/wiki
Content-Type: application/json

{
  "title": "Page Title",
  "slug": "auto-generated",
  "category": "Engineering",
  "content": "Page content",
  "author": "Author Name"
}

Response: 200 OK
{ ...created wiki page... }

Response: 400 Bad Request
{ "error": "Slug already exists" }
```

#### Delete Wiki Page
```
DELETE /api/admin/wiki/[id]

Response: 200 OK
{ "success": true }
```

---

### Users

#### Get All Users
```
GET /api/admin/users

Response: 200 OK
[
  {
    "id": "cuid",
    "email": "user@example.com",
    "name": "User Name",
    "role": "ADMIN|MANAGER|EMPLOYEE",
    "department": "Engineering",
    "active": true
  }
]
```

#### Create User
```
POST /api/admin/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "hashed-password",
  "name": "User Name",
  "role": "ADMIN|MANAGER|EMPLOYEE",
  "department": "Engineering"
}

Response: 200 OK
{ ...created user... }

Response: 400 Bad Request
{ "error": "Email already exists" }
```

#### Update User
```
PATCH /api/admin/users/[id]
Content-Type: application/json

{
  "active": false,
  "role": "MANAGER"
}

Response: 200 OK
{ ...updated user... }
```

#### Delete User
```
DELETE /api/admin/users/[id]

Response: 200 OK
{ "success": true }
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Not authenticated"
}
```

### 403 Forbidden
```json
{
  "error": "Unauthorized - Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to process request"
}
```

---

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination

Currently returns all results. For large datasets, add:

```json
{
  "limit": 20,
  "offset": 0,
  "total": 100
}
```

---

## Sorting

Currently sorted by:
- Announcements: `createdAt` DESC
- Team: `name` ASC
- Policies: `createdAt` DESC
- Goals: `createdAt` DESC
- Procedures: `createdAt` DESC
- Tools: `category` ASC
- Wiki: `createdAt` DESC

---

## Filtering

Query parameters can be added:
```
GET /api/policies?category=Employee%20Manual
GET /api/goals?period=quarterly
GET /api/procedures?category=emergency
GET /api/tools?category=Communication
GET /api/wiki?category=Engineering
```

---

## Content Types

- **Policy Category**: Employee Manual, Vacation Policy, Time-Off Policy, Benefits, Expense & Reimbursement
- **Procedure Category**: emergency, problem-solving, best-practices, how-to
- **Procedure Priority**: normal, high, critical
- **Goal Period**: quarterly, yearly, ongoing
- **Announcement Priority**: normal, high, urgent
- **User Role**: ADMIN, MANAGER, EMPLOYEE

---

## Data Validation

Required fields are enforced in the database schema. Validation errors return 400 Bad Request.

---

Last Updated: November 22, 2025
