# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **marketing website for aiexpert.ai**, an AI consulting company offering fractional CAIO services, AI strategy, and implementation.

**Architecture**: Modern React 18 + Vite + TypeScript single-page application (SPA) with React Router, deployed to GitHub Pages.

**Repository**: https://github.com/ESchwaa919/eschwaa919.github.io
**Live Site**: https://theaiexpert.ai (custom domain via GitHub Pages)
**Project Location**: `/Users/eschwaa/Projects/new_website/new-site/`

## Development Commands

### Local Development
```bash
# Start Vite dev server (with HMR)
npm run dev
# Site available at http://localhost:8080

# Run linter
npm run lint

# Preview production build locally
npm run build && npm run preview
```

### Build & Deployment
```bash
# Production build
npm run build
# Output: dist/

# Clean build artifacts
npm run clean

# Build for development (with sourcemaps)
npm run build:dev
```

### Deployment
**Automatic deployment via GitHub Actions:**
- Push to `main` branch triggers automatic build and deployment
- Workflow file: `.github/workflows/deploy.yml`
- Builds React app and deploys `dist/` folder to GitHub Pages
- Live in ~2-3 minutes after push

**Manual deployment:**
```bash
git add .
git commit -m "Your changes"
git push origin main
# GitHub Actions automatically builds and deploys
```

## Architecture

### Tech Stack
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM 6.30.1
- **Forms**: React Hook Form 7.61.1 + Zod 3.25.76
- **Icons**: Lucide React 0.462.0
- **Deployment**: GitHub Pages + GitHub Actions

### Project Structure

```
new-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/                     # Static assets (copied to dist/)
│   ├── CNAME                   # Custom domain configuration
│   ├── 404.html                # GitHub Pages 404 handler
│   ├── robots.txt              # SEO crawler instructions
│   ├── sitemap.xml             # SEO sitemap
│   ├── ai-assessment.html      # Legacy AI assessment tool
│   ├── ai-roi-calculator.html  # Legacy ROI calculator
│   ├── ai-learning/            # AI learning path microsite
│   ├── automlr/                # AutoMLR product microsite
│   ├── ailms/                  # AILMS product microsite
│   ├── promptfluency/          # Prompt Fluency toolkit microsite
│   ├── skills/                 # Skills assessment microsite
│   └── images/                 # Image assets
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (Radix-based)
│   │   ├── Navigation.tsx      # Main navigation component
│   │   ├── Footer.tsx          # Site footer
│   │   ├── HeroSection.tsx     # Homepage hero
│   │   └── ...                 # Other React components
│   ├── pages/
│   │   ├── Index.tsx           # Homepage (/)
│   │   ├── About.tsx           # About page (/about)
│   │   ├── Services.tsx        # Services page (/services)
│   │   ├── Pricing.tsx         # Pricing page (/pricing)
│   │   ├── Process.tsx         # Process page (/process)
│   │   ├── Resources.tsx       # Resources page (/resources)
│   │   ├── Contact.tsx         # Contact page (/contact)
│   │   └── NotFound.tsx        # 404 page
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn, etc.)
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # React entry point
│   └── index.css               # Global Tailwind styles
├── dist/                       # Build output (git-ignored)
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

### Routing Structure

React Router handles all routing:
- `/` → Homepage (Index.tsx)
- `/about` → About Erik (About.tsx)
- `/services` → Services overview (Services.tsx)
- `/pricing` → Pricing & engagement models (Pricing.tsx)
- `/process` → 3-stage AI methodology (Process.tsx)
- `/resources` → Tools, insights, downloads (Resources.tsx)
- `/contact` → Contact form (Contact.tsx)
- `/privacy` → Privacy policy (Privacy.tsx)
- `/terms` → Terms of service (Terms.tsx)
- `/ai-assessment` → Redirects to legacy tool
- `/roi-calculator` → Redirects to legacy tool

### Microsites

Legacy microsites remain as standalone HTML/JS applications in `/public/`:
- `/ai-learning/` - AI learning path generator with personalized recommendations
- `/automlr/` - AutoMLR (Medical Legal Review) product microsite
- `/ailms/` - AILMS (AI Learning Management System) product microsite
- `/promptfluency/` - Prompt Fluency training toolkit microsite
- `/skills/` - Skills assessment and tracking

**Important**: These are NOT React components. They are copied as-is to the build output and function independently.

## Key Components

### Navigation Component
**File**: `src/components/Navigation.tsx`

Modern React-based navigation with:
- Responsive design (mobile hamburger menu)
- Active link highlighting via React Router
- Smooth scroll behavior for anchor links
- Sticky header on scroll
- Logo with link to homepage

### Footer Component
**File**: `src/components/Footer.tsx`

Consistent footer across all pages with:
- Company info and contact details
- Social media links
- Quick navigation links
- Copyright and legal links

### UI Components
**Location**: `src/components/ui/`

shadcn/ui components based on Radix UI primitives:
- `button.tsx` - Button component with variants
- `card.tsx` - Card container component
- `input.tsx` - Form input component
- `accordion.tsx` - Collapsible content sections
- `dialog.tsx` - Modal dialogs
- And many more...

**Usage pattern**:
```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
```

## Key Patterns & Conventions

### File Naming
- React components: PascalCase (e.g., `HeroSection.tsx`)
- Pages: PascalCase (e.g., `About.tsx`)
- Utilities/hooks: camelCase (e.g., `use-toast.ts`)
- Config files: kebab-case (e.g., `vite.config.ts`)

### Code Style
- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Styling**: Tailwind CSS utility classes
- **Imports**: Use `@/` alias for src/ imports
- **Formatting**: Consistent with ESLint rules

### Component Patterns
```tsx
// Typical component structure
import { Button } from "@/components/ui/button"

export const MyComponent = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold">Title</h1>
      <Button>Click me</Button>
    </div>
  )
}
```

### Routing Patterns
```tsx
// Using React Router
import { Link } from "react-router-dom"

// Internal React Router links
<Link to="/about">About</Link>

// External links or legacy tools
<a href="/ai-learning/">AI Learning</a>
```

## Deployment

### GitHub Actions Workflow
**File**: `.github/workflows/deploy.yml`

Automatic deployment on push to `main`:
1. Checks out code
2. Sets up Node.js 20
3. Installs dependencies (`npm ci`)
4. Builds production bundle (`npm run build`)
5. Deploys `dist/` folder to GitHub Pages

### Custom Domain Configuration
**File**: `public/CNAME`

Contains: `theaiexpert.ai`

DNS Configuration:
- **A Records** → GitHub Pages IPs (185.199.108-111.153)
- **CNAME Record** → www.theaiexpert.ai → eschwaa919.github.io

### Build Output
Vite builds to `dist/`:
- `index.html` - Single HTML entry point
- `assets/` - JS bundles, CSS, images
- All files from `public/` copied to root

**Note**: The SPA uses client-side routing. GitHub Pages 404 handling ensures React Router works correctly.

## SEO & Metadata

Each page component should include:
- Helmet/React Helmet for dynamic meta tags (if needed)
- Descriptive page titles
- Open Graph tags for social sharing
- Structured data where appropriate

**Static SEO files**:
- `public/robots.txt` - Search engine crawler instructions
- `public/sitemap.xml` - Site structure for search engines

## Form Handling

**Current approach**: EmailJS integration (configured in components)

**Future consideration**: May need to migrate HubSpot integration from old static site to React components or serverless functions.

## Testing

Currently no automated test suite. Manual testing required:
- Test all page routes (/, /about, /services, etc.)
- Verify responsive design (mobile, tablet, desktop)
- Test navigation (links, active states, mobile menu)
- Verify legacy microsite links work correctly
- Test form submissions
- Check external links (Calendly, LinkedIn, etc.)

## Common Workflows

### Adding a New Page
1. Create new component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`:
   ```tsx
   <Route path="/your-page" element={<YourPage />} />
   ```
3. Add navigation link in `src/components/Navigation.tsx`
4. Test locally with `npm run dev`
5. Commit and push to trigger deployment

### Updating UI Components
1. Edit component in `src/components/`
2. Follow Tailwind CSS utility-first approach
3. Use existing shadcn/ui components where possible
4. Test responsiveness across breakpoints
5. Commit and push

### Updating Microsites
1. Edit files in `public/[microsite]/`
2. These are standalone HTML/JS apps
3. Changes are copied to build output as-is
4. Test microsite independently
5. Commit and push

### Making Emergency Fixes
```bash
# Quick fix workflow
git add .
git commit -m "fix: Description of fix"
git push origin main
# Live in ~2-3 minutes
```

## Environment Variables

Currently none required for build/deployment.

**Future consideration**: If adding API integrations (HubSpot, etc.), use:
- `.env.local` for local development (git-ignored)
- GitHub Secrets for production environment variables

## Performance Considerations

**Current bundle size**: ~617KB (gzipped: ~177KB)

Recommendations for optimization:
- Use dynamic imports for code splitting
- Lazy load routes with React.lazy()
- Optimize image sizes
- Consider manual chunking for large dependencies

## Migration Notes

**November 2024**: Migrated from static HTML/CSS/JavaScript site to React/Vite/TypeScript SPA.

**Key changes**:
- All main pages now React components
- React Router for client-side routing
- Modern build pipeline with Vite
- GitHub Pages deployment (replaced Netlify)
- Legacy microsites preserved as standalone apps

**Preserved**:
- All microsite functionality (`/ai-learning`, `/automlr`, `/ailms`, etc.)
- Custom domain (theaiexpert.ai)
- All content and messaging
- All downloadable resources

## Troubleshooting

### Build Failures
- Check TypeScript errors: `npm run lint`
- Verify all imports use `@/` alias correctly
- Ensure no missing dependencies: `npm ci`

### Deployment Not Working
- Verify GitHub Pages source is set to "GitHub Actions"
- Check Actions tab for workflow failures
- Ensure CNAME file exists in `public/`

### Routing Issues
- Verify routes defined in `src/App.tsx`
- Check React Router Link components use correct paths
- For legacy microsites, use `<a href>` not `<Link>`

### Styling Issues
- Verify Tailwind classes are valid
- Check responsive breakpoints (sm, md, lg, xl, 2xl)
- Use `className` (not `class`) in JSX

## Documentation References

- `README.md` - Project overview and setup
- `.github/workflows/deploy.yml` - Deployment configuration
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Tailwind customization

## Additional Notes

- **Old static site backup**: Renamed to avoid confusion with new React site
- **Primary development location**: `/Users/eschwaa/Projects/new_website/new-site/`
- **Git repository**: Connected to https://github.com/ESchwaa919/eschwaa919.github.io
- **Deployment**: Fully automated via GitHub Actions on push to main
