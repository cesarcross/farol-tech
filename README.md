# Farol Digital — Landing Page

Digital agency landing page built with Next.js 14 (App Router), Tailwind CSS, Framer Motion, and Resend.

## Stack

| Tech | Purpose |
|------|---------|
| Next.js 14 App Router | Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| React Hook Form + Zod | Form validation |
| Resend | Email delivery |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Resend API key

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Contact form API (Resend)
│   ├── globals.css            # Design tokens + base styles
│   ├── layout.tsx             # Root layout + fonts + providers
│   └── page.tsx               # Home page (section assembly)
├── components/
│   └── sections/
│       ├── Navbar.tsx         # Nav + language switcher
│       ├── Hero.tsx           # Hero section
│       ├── Services.tsx       # Services grid
│       ├── Clients.tsx        # Client logos + quote
│       ├── Contact.tsx        # Contact form + WhatsApp
│       └── Footer.tsx         # Footer
├── context/
│   └── i18n.tsx               # All translations + useI18n hook
└── lib/
    └── utils.ts               # cn() Tailwind helper
```

## i18n

Language switching is fully client-side. All translations live in `src/context/i18n.tsx`.
See `CURSOR_CONTEXT.md` for detailed instructions on adding/editing translations with Cursor.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_EMAIL` | Email address that receives contact form submissions |

## Customisation

- **WhatsApp number**: update `WA_NUMBER` in `src/components/sections/Contact.tsx`
- **Brand colours**: edit CSS variables in `src/app/globals.css` under `:root`
- **Fonts**: swap Google Fonts imports in `globals.css` and update `--font-display` / `--font-body`
- **Client logos**: update the `logos` array in `src/components/sections/Clients.tsx`
