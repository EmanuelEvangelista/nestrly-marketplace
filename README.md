# Nestrly 🏠

**Full-Stack Real Estate Rental Platform**

Nestrly is a production-ready property rental marketplace built with Next.js 16 and TypeScript. Originally based on the PropertyPulse project from Coursera's *Next.js 14 from Scratch* course, it has been significantly extended with original features, fully migrated to TypeScript, and upgraded to Next.js 16.

🔗 **[Live Demo](https://nestrly.vercel.app)**

---

## ✨ Features

### Property Listings
- Browse rental properties with search and advanced filters
- Pagination for large listing sets
- Optimized image delivery via Cloudinary
- Multiple rental rate types: Nightly, Weekly, Monthly

### Extended Weather Forecast
- Each property page displays a location-based extended weather forecast
- Fetches real-time data from a public weather API based on the property's city/state
- Helps renters evaluate the local climate before booking

### Owner View Counter
- Property owners can track how many times their listing has been viewed
- View count increments on each visit and is visible on the owner's profile dashboard

### Property Management
- Authenticated users can add, edit, and delete their own properties
- Multi-image upload with Cloudinary storage (up to 4 images per listing)
- Full CRUD with ownership verification on every operation

### Authentication
- Credential-based login and Google OAuth via NextAuth.js
- Session-protected routes and API endpoints
- Ownership checks on all property mutations

### Bookmarks & Contact
- Users can bookmark properties and manage their saved listings
- Contact form to reach property owners directly

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js + Google OAuth |
| Image Storage | Cloudinary |
| Styling | Tailwind CSS |
| Testing | Jest + React Testing Library |
| Deployment | Vercel |

---

## 🏗️ Project Structure

```
nestrly/
├── app/                  # Next.js App Router — pages & API routes
├── components/           # Reusable UI components
├── models/               # Mongoose data models
├── config/               # DB connection & Cloudinary config
├── utils/                # Helper functions & server utilities
├── types/                # TypeScript type definitions
├── __tests__/            # Jest unit & integration tests
└── public/               # Static assets
```

---

## 🧩 Original Features vs. Course Base

This project is based on the PropertyPulse project from Coursera's *Next.js 14 from Scratch* course. The following were added or changed independently:

| Feature | Status |
|---|---|
| Upgrade to Next.js 16 | ✅ Original |
| Full TypeScript migration | ✅ Original |
| Location-based weather forecast | ✅ Original |
| Owner view counter | ✅ Original |
| Complete UI redesign | ✅ Original |
| Unit tests with Jest | ✅ Original |
| Search & pagination | Base course |
| Cloudinary image upload | Base course |
| NextAuth + Google OAuth | Base course |
| Bookmarks | Base course |

---

## 🧪 Testing

```bash
npm run test
```

Tests written with Jest and React Testing Library, covering core components and utility functions.

---

## ⚙️ Getting Started Locally

### Prerequisites

- Node.js 18+
- MongoDB database (local or Atlas)
- Cloudinary account
- Google OAuth credentials (optional)

### Installation

```bash
git clone https://github.com/EmanuelEvangelista/nestrly-marketplace.git
cd nestrly-marketplace
npm install
cp .env.example .env.local
# Fill in your credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

```env
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_DOMAIN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## 📦 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
npm run test     # Jest test suite
```

---

## 👨‍💻 Author

**Emanuel Evangelista** — Fullstack Developer

[GitHub](https://github.com/EmanuelEvangelista) · [LinkedIn](https://linkedin.com/in/emanuel-evangelista-102b2b292) · [Portfolio](https://personal-portfolio-rho-three-30.vercel.app/)

---

## 📄 License

MIT License
