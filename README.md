# YSF Portfolio

A premium, modern, highly-animated single-page portfolio website built with Next.js 14+, Tailwind CSS, Framer Motion, and TypeScript.

## Features

- **Dark Space Theme:** Subtle animated particle background with glassmorphism UI elements.
- **Multilingual Support:** English, French, and Arabic (with dynamic RTL layout switch).
- **GitHub Integration:** Automatically fetches repositories, displaying pinned repos first.
- **Micro-Interactions:** Smooth Framer Motion animations (stagger reveal, hover tilts, skill bars).
- **Contact Form:** Ready-to-use form with built-in support for Formspree (primary) and EmailJS.
- **Fully Responsive:** Perfectly adapts from small mobile screens to large desktop monitors.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Typography:** `next/font` (Inter, Outfit, Cairo)

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### 1. Installation

Clone the repository and install dependencies:

```bash
cd ysf-portfolio
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory and copy the contents from `.env.example`:

```bash
cp .env.example .env.local
```

Fill in the required values:

```env
NEXT_PUBLIC_GITHUB_USERNAME=YourGitHubUsername
NEXT_PUBLIC_PINNED_REPOS=owner/repo,owner/repo2

# For the contact form, provide your Formspree endpoint:
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_endpoint

# Or EmailJS alternative credentials
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
```

### 3. Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### 4. Customizing Content

- **i18n / Languages**: Edit `src/lib/i18n.ts` to customize your translations and roles.
- **Contact Information**: Look for the `your@email.com` and `https://wa.me/yourphonenumber` links in `src/components/sections/Hero.tsx` and `src/components/sections/Contact.tsx`.
- **Skills**: Update the array inside `src/components/sections/Skills.tsx`.

## Deployment

This Next.js app is perfectly optimized for deployment on [Vercel](https://vercel.com/new). Make sure to add the environment variables in your Vercel project settings before deploying.

```bash
npm run build
npm run start
```

## Performance & Accessibility
- **Lighthouse Score Target**: 90+ across all categories.
- Respects `prefers-reduced-motion` natively through user system settings.
