# Migration Plan: Vanilla Legacy to Serverless Next.js

## Completed Steps
- [x] Initialized Next.js 15+ App Router project with TypeScript and Tailwind CSS.
- [x] Installed necessary dependencies (`mongodb`, `bcryptjs`).
- [x] Base project structure scaffolded (`app/page.tsx`, `app/globals.css`, `app/layout.tsx`).

---

## Pending Migration Steps

### Phase 1: Tailwind Configuration & Fonts Migration
The vanilla `index.html` uses an inline Tailwind config and Google Fonts. This needs to be adapted for Next.js.

1. **Configure Fonts in `app/layout.tsx`**:
   Replace the `<link rel="stylesheet">` tags by importing `Inter`, `JetBrains_Mono`, and `Permanent_Marker` from `next/font/google` and applying them to the body.

2. **Update Tailwind Config** (or `app/globals.css` depending on Tailwind v4 setup):
   Migrate the custom theme extensions from the vanilla inline script to your CSS/Config:
   ```css
   @theme {
     --color-brand-black: #09090b;
     --color-brand-white: #ffffff;
     --color-brand-red: #e11d48;
     --color-brand-redDark: #be123c;
     --color-brand-gray: #f4f4f5;
     --color-brand-darkGray: #27272a;
     --shadow-brutal: 4px 4px 0px 0px rgba(0,0,0,1);
     --shadow-brutal-lg: 8px 8px 0px 0px rgba(0,0,0,1);
     --shadow-brutal-xl: 12px 12px 0px 0px rgba(0,0,0,1);
     --shadow-brutal-red: 8px 8px 0px 0px rgba(225,29,72,1);
   }
   ```

### Phase 2: Global Styles Migration
Move the custom CSS within the `<style>` tag in `Vanilla-project/index.html` (e.g., neo-brutalist buttons, custom scrollbar, `.terminal-scanline`, marquee animation) into `app/globals.css`.

### Phase 3: UI Componentization & Refactoring
Break down `Vanilla-project/index.html` into modular React components inside an `app/components/` directory. For all HTML moved to JSX:
- Change `class="..."` to `className="..."`.
- Change inline styles `style="..."` to React style objects `style={{...}}`.
- Ensure self-closing tags (`<img />`, `<br />`, `<input />`).

1. **`Navbar.tsx`**: Migrate `<nav id="navbar">`. Use `useState` to toggle the mobile menu (`mobile-menu-btn`).
2. **`Hero.tsx`**: Migrate the Hero section. Refactor the `makeDraggable` Vanilla JS logic into React pointer events or a library like `react-draggable` for the Retro PC window (`#pc-window`).
3. **`About.tsx`**: Migrate the About section.
4. **`Highlights.tsx`**: Migrate the carousel (`#highlights`). Convert the `scrollCarousel` function to utilize React `useRef` for the container element.
5. **`Bounties.tsx`**: Migrate `#tracks`.

### Phase 4: Modal State & Interactivity Migration
The legacy code uses DOM manipulation (`document.getElementById().classList.remove('hidden')`) for modals.

1. **`BountyModal.tsx`**:
   - Accept props: `isOpen`, `bountyData`, `onClose`.
   - Conditionally render or animate visibility based on `isOpen`.

2. **`RegistrationModal.tsx`**:
   - Manage form state (`formData`) with `useState`.
   - Convert dynamic team member addition (`addTeamMember` in vanilla JS) to render an array from React state.
   - Refactor the form submission (`handleRegistration`) to make an HTTP POST request to the Next.js API route instead of the simulated vanilla timeout.

### Phase 5: Serverless Backend & Database Setup
Replace the conceptual/legacy backend calls with Next.js App Router API Routes connecting to MongoDB.

1. **Database Utility (`lib/mongodb.ts`)**:
   Implement a singleton pattern to connect to MongoDB using `MongoClient`.

2. **Registration API (`app/api/events/register/route.ts`)**:
   ```typescript
   import { NextResponse } from 'next/server';
   import clientPromise from '@/lib/mongodb';

   export async function POST(req: Request) {
     const data = await req.json();
     const client = await clientPromise;
     const db = client.db('futuresprint');
     await db.collection('registrations').insertOne({ ...data, createdAt: new Date() });
     return NextResponse.json({ success: true });
   }
   ```

3. **Admin Dashboard (`app/admin/page.tsx`) & API (`app/api/events/admin/route.ts`)**:
   Create a secure route to fetch all registrations and display them in the admin interface, secured via password matching against an `ADMIN_PASSWORD` environment variable using `bcryptjs`.
