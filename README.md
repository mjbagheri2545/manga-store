# Manga Store 🛒📚 (Training Project)

This is a **training project** built from scratch without relying on tools like React Query or any advanced UI libraries — **intentionally**.

> ⚠️ **Why I Didn't Use React Query, UI Libraries, etc?**  
> Because this was a practice project, I deliberately avoided advanced libraries and did many things manually to deeply understand how they work.  
> Also, due to some early decisions and constraints, I had to build things myself — and that turned out to be a very good thing.

> ⚠️ **What’s Up With Some Design Choices, Things I’m Aware of (But Didn’t Change)?**  
> I'm fully aware that certain parts of the architecture could be better — but it’s too late to refactor them now. The project has served its learning purpose, and the mistakes are part of that learning process.

---

## 🚀 Key Features and Architecture

Here’s what this project actually **does** have — and most of it was built from scratch:

1. **Custom Mini React Query**  
   A lightweight state management system for handling async queries, caching, and automatic refetching — similar in concept to React Query, but much simpler and custom-built.

2. **ABAC Permission System (Server-Side Only)**  
   Implements an Attribute-Based Access Control system on the server, allowing fine-grained control over what users can do based on attributes.

3. **Custom Scripts for Repetitive Tasks**  
   Includes `npm run` scripts to automate repetitive development tasks like seeding, generating features, and more.

4. **Advanced Team-Ready Configuration**  
   Configured to support teamwork and collaboration:
   - **Git hooks** via [Husky](https://typicode.github.io/husky) and `lint-staged`
   - **Madge** for visualizing and enforcing dependency graph rules.
     > Madge analyzes module dependencies to detect circular imports and enforce clean architecture.
   - Strict **ESLint** and **Prettier** setup for consistent code formatting
   - Separated `eslint` configs for different scripts

5. **JWT Authentication System**  
   Full registration, login, logout system using JSON Web Tokens.

6. **Advanced Logging System**  
   Custom logging setup with:
   - Separate log files by category (errors, operations, etc.)
   - Daily rotating file logs
   - Works well for production environments too

7. **Custom Seeding System**  
   Generates realistic fake data for every important part of the database. Automatically creates users, products, categories, tags, etc.

8. **Feature-Based Structure (Both Client and Server)**  
   Every module (feature) is self-contained. Client and server both follow feature-first architecture for better scalability.

9. **Code Splitting and Lazy Loading**  
   Dynamic import of components, pages, and routes to improve performance and reduce initial load time.

10. **Git + Husky Auto-Init on Install**  
   After `npm install`, the server will automatically:
   - Re-initialize Git (if needed)
   - Set up Husky hooks
   - Prepare all required hooks/scripts for a clean workflow

11. **Advanced Comment System**  
   Built-in support for nested comments, replies, likes and dislikes, and comment moderation.

12. **Data Validation (Client + Server)**  
   Full validation for all inputs — including:
   - Strong server-side validation with detailed error messages
   - Client-side form validations
   - **File validation**: file size, MIME type, filename cleaning, etc.

13. **File Upload System**  
   - Files are **organized by date** to avoid clutter
   - **Private files** (like avatars) are securely served and not publicly accessible
   - Public and private file separation handled by custom middleware
     
14. **Advanced Messaging System**  
   All error and success messages are clear, contextual, and human-friendly.
   Instead of vague messages like invalid value, each response gives users precise, helpful feedback — both on the client and the server.

**And many more ...**

---

## 🛠️ Tech Stack (Overview)

- **Frontend**: React + Vite + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT
- **Styles**: Tailwind CSS (basic setup) + Daisyui (I prefer not to use this library in all of my projects. just use and see why!)
- **Testing**: [optional in future]
- **Logging**: Winston-based advanced logger
- **Validation**: express-validator (server), custom client validation
- **Dev Tools**: Husky, lint-staged, Madge, ESLint, Prettier

---

## ⚡ Final Note

I built this project not just to learn how things work, but to **build the things that usually get abstracted away**.

Now that I’ve seen the internals of permissions, file upload systems, caching, and logging — I’m more confident moving forward into real-world applications.

---

