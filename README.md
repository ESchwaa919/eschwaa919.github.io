# The AI Expert - Marketing Website

Marketing website for [theaiexpert.ai](https://theaiexpert.ai), an AI consulting company offering fractional CAIO services, AI strategy, and implementation.

## Live Site

**URL**: https://theaiexpert.ai

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **Deployment**: GitHub Pages via GitHub Actions

## Development

### Prerequisites

- Node.js 18+ and npm

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
├── src/
│   ├── components/     # React components
│   │   └── ui/         # shadcn/ui components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities
│   └── assets/         # Images, fonts
├── public/             # Static assets
│   ├── downloads/      # PDF resources
│   ├── ai-learning/    # AI Learning microsite
│   ├── automlr/        # AutoMLR microsite
│   ├── ailms/          # AILMS microsite
│   └── promptfluency/  # Prompt Fluency microsite
└── .github/workflows/  # GitHub Actions
```

## Deployment

Automatic deployment via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions builds the site
3. Deploys to GitHub Pages
4. Live at https://theaiexpert.ai within ~2-3 minutes

## Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed architecture documentation and development guidelines.
