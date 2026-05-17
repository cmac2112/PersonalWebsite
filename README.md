# 🚀 Personal Website

> A modern, cost-optimized React-based personal website built with custom tooling and innovative engineering solutions.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646cff?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🎯 Overview

A showcase portfolio website demonstrating modern web development practices with a focus on performance, cost optimization, and clean architecture. The site serves as both a portfolio and a testbed for innovative engineering solutions.

**Live Demo:** [cadenmcarthur.net](https://www.cadenmcarthur.net)

## ✨ Key Features

- **⚡ High Performance** – Optimized React build with Vite for lightning-fast load times
- **💰 Zero Operating Costs** – Intelligent static generation and caching strategies
- **📝 Dynamic Blog System** – Markdown-powered blog with custom Obsidian note integration
- **🎨 Responsive Design** – Mobile-first approach with smooth animations and dark theme
- **🔗 Knowledge Graph** – Interactive visualization of blog interconnections using D3.js
- **3️⃣ 3D Elements** – Enhanced UX with Three.js integration
- **🛠️ Custom Tooling** – Proprietary `obby-parser` npm package for Obsidian markdown conversion

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.1 | UI Framework |
| **TypeScript** | ~5.8 | Type Safety |
| **Vite** | 6.3 | Build Tooling |
| **React Router** | 7.7 | Routing |
| **D3.js** | 7.9 | Data Visualization |
| **Three.js** | 0.180 | 3D Graphics |
| **Axios** | 1.13 | HTTP Client |
| **obby-parser** | 1.0.1 | Markdown Parsing |

## 📚 Architecture Highlights

### Blog System
The blog infrastructure demonstrates a clever approach to keeping hosting costs minimal:

1. **Build-Time Compilation** – Markdown files are converted to JSON at deploy time
2. **Custom Parser** – `obby-parser` npm package handles Obsidian markdown → HTML conversion
3. **Static Generation** – Pre-rendered blog content embedded in the app bundle
4. **No Backend Required** – Eliminates server costs entirely

```
.md files (Obsidian) → ParseBlogsToJson.ts → parsedBlog.json → React App
```

### Workflow Automation
GitHub Actions automatically:
- Detects new/modified blog posts
- Runs the TypeScript parser
- Generates updated JSON
- Creates automated PRs with generated changes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/cmac2112/PersonalWebsite.git
cd PersonalWebsite

# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Outputs optimized static files in the `dist/` directory.

### Running Linter

```bash
npm run lint
```

## 📝 Writing Blog Posts

Blog posts are written in Obsidian markdown format in the `/Blogs` directory:

1. Create a `.md` file with the following format:
```markdown
## Your Blog Title
## YYYY-MM-DD

Your blog content here...
```

2. Add internal links using `[[Link Syntax]]` for automatic knowledge graph generation
3. On push to `master`, the CI/CD pipeline automatically:
   - Parses your markdown
   - Converts to JSON
   - Updates the blog system
   - Creates a PR with the changes

## 🏗️ Project Structure

```
PersonalWebsite/
├── client/                          # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── Blogs/                           # Blog content & parsing
│   ├── ParseBlogsToJson.ts          # Parser script
│   ├── package.json                 # Separate dependencies
│   └── *.md                         # Blog posts (Obsidian format)
├── .github/workflows/
│   └── main.yml                     # CI/CD pipeline
└── README.md
```

## 🔄 CI/CD Pipeline

The GitHub Actions workflow:
- **Trigger:** Push to `master` branch
- **Action:** Runs blog parser on new/modified markdown files
- **Output:** Generates `parsedBlog.json`
- **Result:** Creates automated PR with compiled blog data

See [.github/workflows/main.yml](.github/workflows/main.yml) for details.

## 🎓 Engineering Decisions

### Why Custom Tooling?
- **obby-parser** – Eliminates vendor lock-in while supporting Obsidian's powerful features
- **Build-time Compilation** – Blog content ships as static JSON, removing server dependencies
- **Cost Optimization** – No database, no backend server, no CDN costs

### Tech Choices
- **Vite over CRA** – Faster development, better build optimization
- **TypeScript** – Catch errors early, improve code maintainability
- **D3.js + Three.js** – Create engaging, interactive visualizations
- **React Router v7** – Latest routing capabilities and better performance

## 📦 Custom Dependencies

### obby-parser
A custom npm package for parsing Obsidian markdown files:
- Converts `.md` files to structured HTML
- Extracts internal links for knowledge graph generation
- Handles Obsidian-specific syntax

## 🚦 Code Quality

- **Linting:** ESLint with React and TypeScript support
- **Type Safety:** Strict TypeScript configuration
- **Build Verification:** Full type checking before production builds

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report issues
- Suggest improvements
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 About

Built by [Caden McArthur](https://github.com/cmac2112) as a personal portfolio and experimentation ground for modern web technologies.

---

**Last Updated:** May 2026  
**Status:** Active Development  
**Version:** 1.0.0
