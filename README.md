# Architect Studio

A premium, minimalist architecture portfolio website built with **Next.js 16**, **Tailwind CSS**, and **Server Actions**. This project features a robust admin dashboard for content management, advanced scroll animations, and full **Progressive Web App (PWA)** capabilities.

## 🚀 Features

### Public Frontend
- **Immersive UX**: Custom parallax scrolling with spring physics and reveal animations.
- **Project Showcase**: Staggered grid layouts and detailed project pages with galleries and PDF downloads.
- **Performance**: Static and dynamic optimization with Next.js App Router.
- **PWA Ready**: Installable on mobile/desktop with offline caching support.

### Admin Dashboard
- **Secure Access**: JWT-based authentication protecting `/admin` routes.
- **Project Management**: Create, Edit, and Delete projects.
- **Media Management**: Drag-and-drop integration with **ImageKit** for high-performance image and PDF hosting.
- **Inquiries**: centralized view of contact form messages with email notifications.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Storage**: [ImageKit](https://imagekit.io/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **PWA**: [@ducanh2912/next-pwa](https://github.com/DuCanhGH/next-pwa)

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB URI
- ImageKit Account (Public/Private Keys, URL Endpoint)
- SMTP Server (e.g., Gmail, SendGrid, or similar) for emails

### 2. Installation

```bash
git clone <repository-url>
cd architect
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Database
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/architect

# ImageKit (Media Storage)
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id/

# Email (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
SMTP_ADMIN_EMAIL=admin@example.com

# Admin Authentication
ADMIN_SECRET=complex_secret_string_for_jwt_signing
ADMIN_PASSWORD=your_secure_admin_login_password
```

### 4. Running the Project

**Development Mode:**
```bash
npm run dev
# Starts server at http://localhost:3000
# Note: PWA is disabled in dev mode by default.
```

**Production Build:**
```bash
npm run build
npm start
# Required for testing PWA functionality (Service Workers)
```

## 📂 Project Structure

```
src/
├── actions/        # Server Actions (Backend Logic)
├── app/            # Next.js App Router Pages
│   ├── (public)/   # Public usage routes
│   ├── admin/      # Protected admin routes
│   └── api/        # API routes (if any)
├── components/     # Reusable UI components
├── lib/            # Utilities (DB, ImageKit, Models)
└── ...
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
