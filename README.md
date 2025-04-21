# Manga Store 🛒📚 (Training Project)

This is a **training project** built from scratch without relying on tools like React Query or advanced UI libraries — intentionally.

---

## ⚠️ Why I Didn't Use React Query, UI Libraries, etc.

Because this is a **practice project**, I deliberately avoided advanced libraries and built many features manually to deeply understand their internal mechanics.  
Also, due to some early constraints, I was *forced* to write my own solutions — and that turned out to be a great learning opportunity.

---

## ⚠️ Design Choices I'm Aware of (But Didn't Change)

I know that some design choices could’ve been better or more scalable.  
However, it's **too late for major refactors**, and I chose to let the imperfections stay — because this project already fulfilled its purpose: **learning**.  
Mistakes included.

---

## 🧪 Live Demo

Check out the live demo of this project here:  
👉 [Manga Store Demo](https://manga-store-1.onrender.com/)

> ⚠️ This is a training project and not optimized for production.  
Some features or flows might be intentionally incomplete or simplified.

---

## 🚀 Key Features and Architecture

> All of the following were either built from scratch or heavily customized:

### ✅ Custom Mini React Query
A lightweight async state manager that handles:
- Caching (manually and simple)
- Mutation handling
- Pagination
- Infinite scroll
Built manually to understand how libraries like React Query actually work.

### ✅ ABAC Permission System (Server-Side Only)
Implements **Attribute-Based Access Control** to define dynamic user permissions based on their attributes and context.

### ✅ Custom Scripts
Reusable CLI scripts for repetitive tasks like:
- Seeding
- Feature generation

### ✅ VS Code Tasks Integration
Zero-setup development:  
Just run `npm run` and everything boots up in the terminal automatically — including server, client.

### ✅ Advanced Team-Ready Dev Config  
Strictly configured for scalable teamwork — enforced on both **client** and **server**:
- **Git Hooks via Husky** for pre-commit checks  
- **Lint-Staged** for running checks only on staged files  
- **Madge** for visualizing and enforcing module boundaries  
- **ESLint Plugin Boundary** ensures each feature is isolated and can't import from other features
  and ensures all files are known and defined.
- **ESLint Plugin Sort Imports** enforces consistent import order across the project  
- **ESLint & Prettier** for strict formatting and linting  
- All checks are automatically run in `pre-commit` hooks to prevent bad code from being pushed

### ✅ JWT Authentication System
Full implementation of:
- Registration
- Login

### ✅ Advanced Logging System
Custom logger using **Winston**:
- Daily rotating log files
- Logs categorized by purpose (error, operation, etc.)
- Suitable for production-ready monitoring

### ✅ Custom Seeding System
Generates **realistic fake data**:
- Users
- Products
- Categories
- Tags, and more

### ✅ Feature-Based Architecture
Both **client and server** follow feature-first structure:  
Modular, scalable, and easy to maintain.

### ✅ Code Splitting & Lazy Loading
Optimized performance via dynamic imports of:
- Pages

### ✅ Git + Husky Auto-Init on Install
After running `npm install` in the server:
- Git will auto-initialize (if missing)
- Husky hooks will be auto-installed
- Lint + commit logic is instantly ready

### ✅ Advanced Comment System
Includes:
- Nested comments
- Likes/dislikes
- Replies
- Moderation capabilities

### ✅ Data Validation (Client + Server)
All user input is validated:
- **Server**: Using `express-validator`
- **Client**: Using `zod`
- **Files**: MIME type, file size, and more

### ✅ File Upload System
- Files are organized into **date-based folders**
- **Private files** like avatar images are securely served and not publicly accessible
- Middleware ensures correct access handling

### ✅ Advanced Messaging System
Instead of generic error messages like `Invalid value`, this system provides:
- **Readable**, **human-friendly**, and **contextual** messages
- Consistent on both client and server

### ✅ Type-Safe & Runtime-Safe Environment Variables  
Environment variables are validated with **Zod** — both on the **client** and **server**:
- Runtime validation using schema parsing  
- Prevents the app from running with missing or invalid values  
- Separate configurations for development and production environments *(though this project only uses development)*

  ### ➕ And Many More...
  
---

## 🛠️ Tech Stack (Overview)

| Layer      | Tools / Libraries |
|------------|------------------|
| **Frontend** | React + Vite + TypeScript |
| **Backend**  | Node.js + Express + TypeScript |
| **Database** | PostgreSQL + Prisma ORM |
| **Authentication** | JWT |
| **Styles** | Tailwind CSS + DaisyUI *(minimal use)* |
| **Validation** | `express-validator` (server) + `zod` (client) |
| **Logging** | Winston-based custom logger |
| **Tooling** | Husky, lint-staged, Madge, ESLint, Prettier |
| **Testing** | *(Optional in future)* |

---

## ⚡ Final Note

I didn’t just build this project to check off features —  
I built it to **understand what goes on behind the scenes**.

Now that I’ve dealt with permission systems, file uploads, seeding, validation, caching, logging, and more —  
I feel much more confident to dive into **real-world, production-grade applications**.

---

### 🤝 Thanks for reading!

Feel free to explore the code, leave feedback, or use this as inspiration for your own projects.

