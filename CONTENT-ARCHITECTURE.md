# Content Architecture Plan

## Overview

This document defines the content strategy, design patterns, and implementation guidelines for the new pillar pages on theaiexpert.ai. All subagents building pages MUST follow these patterns for consistency.

## Brand Voice & Messaging

### Core Positioning
**"The AI Expert helps businesses move through AI in three steps: literacy, strategy, implementation. Understand what AI is, where it fits, and how to turn it into real business results."**

### Voice Principles
- **Plain English**: No jargon. Write like you're explaining to a smart business leader, not a developer.
- **Confident but not arrogant**: Erik has 20+ years experience. Let credibility show through substance.
- **Action-oriented**: Every page should answer "what should I do next?"
- **UK-focused with global relevance**: Primary audience is UK SMEs and mid-market.

### Key Phrases to Use
- "Literacy → Strategy → Implementation"
- "Getting AI done right"
- "From AI-curious to AI-powered"
- "Build fast, learn fast"
- "Strategy before scale"

---

## Design System Reference

### Colors (from index.css)
```
Primary (Emerald Green): hsl(155 100% 45%)
Secondary (Magenta): hsl(320 85% 55%)
Tertiary (Cyan): hsl(185 100% 50%)
Background: hsl(220 20% 3%)
Foreground: hsl(0 0% 96%)
Muted: hsl(220 10% 55%)
```

### CSS Classes to Use
```
Cards: "card-enhanced group" or "glass-card border border-primary/20"
Buttons Primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-cyber"
Buttons Outline: "border-2 border-primary/50 text-primary hover:bg-primary/10"
Headings Gradient: "text-gradient-animate glow-green"
Section Glow: "section-glow"
Badge: "glass border border-primary/30" with Sparkles icon
```

### Animation Patterns
- Use `useScrollReveal` hook for section animations
- Standard reveal: `transition-all duration-1000 opacity-0 translate-y-12` → `opacity-100 translate-y-0`
- Cyber corners on key cards (see Process.tsx for pattern)

---

## Page Structure Template

Every pillar page MUST follow this structure:

### 1. Imports
```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createFAQSchema } from "@/components/StructuredData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { [relevant icons] } from "lucide-react";
```

### 2. SEO Head (Required)
```tsx
<SEOHead
  title="[Page Title] | The AI Expert"
  description="[150-160 char description with primary keyword]"
  keywords="[comma-separated keywords]"
  canonicalUrl="/[page-slug]"
/>
```

### 3. Structured Data (Required for GEO)
- Use `createFAQSchema` for FAQ sections
- Use `createServiceSchema` for service pages
- Add custom schema where appropriate

### 4. Hero Section Pattern
```tsx
<section className="pt-8 pb-20 relative overflow-hidden">
  {/* Background glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
  </div>

  <div ref={heroRef} className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
      <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
      <span className="text-sm font-heading text-primary tracking-wider">[BADGE TEXT]</span>
    </div>

    <h1 className="text-4xl md:text-6xl font-heading leading-tight mb-6">
      <span className="text-gradient-animate glow-green-intense">[HEADLINE PART 1]</span>
      <br />
      <span className="text-foreground">[HEADLINE PART 2]</span>
    </h1>

    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
      [Opening paragraph - answer the main question immediately]
    </p>

    {/* CTAs */}
    <div className="flex flex-col sm:flex-row gap-4">
      <Button size="lg" className="...primary styles..." asChild>
        <a href="https://calendly.com/eschwaa/30min">Book a Strategy Call</a>
      </Button>
      <Button size="lg" variant="outline" className="...outline styles..." asChild>
        <Link to="/process">See Our Process</Link>
      </Button>
    </div>
  </div>
</section>
```

### 5. Content Sections Pattern
Each content section should:
- Have an `id` attribute for anchor linking
- Use `useScrollReveal` for animation
- Include a clear H2 heading
- Have cyber corners on key cards
- End with relevant CTA or link to next section

### 6. FAQ Section (Required for GEO)
```tsx
<section className="py-20" id="faq">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-heading text-center mb-12">
      Frequently Asked Questions
    </h2>
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <Card key={index} className="card-enhanced">
          <CardContent className="p-6">
            <h3 className="text-lg font-heading text-primary mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
```

### 7. Final CTA Section
```tsx
<section className="py-20">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-heading mb-4">
      Ready to [Action]?
    </h2>
    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
      [Value proposition]
    </p>
    <Button size="lg" className="...primary styles..." asChild>
      <a href="https://calendly.com/eschwaa/30min">
        Book Your Free Strategy Call
        <ArrowRight className="w-5 h-5 ml-2" />
      </a>
    </Button>
  </div>
</section>
```

---

## New Pillar Pages to Create

### 1. Fractional CAIO (`/fractional-caio`)
**Primary Keywords**: fractional chief AI officer, fractional CAIO UK, head of AI consultant
**Intent**: High-intent buyer researching whether to hire fractional AI leadership
**Structure**:
- Hero: What is a Fractional CAIO?
- Section: Why SMEs Choose Fractional Over Full-Time
- Section: What a Fractional CAIO Does (with Erik's specific approach)
- Section: How It Works (engagement model)
- Section: Results/Outcomes
- FAQ: 6-8 questions buyers ask
- CTA: Book discovery call
**PDF Download**: Fractional Chief AI Officer (CAIO) PDF (no gate)

### 2. AI Literacy (`/ai-literacy`)
**Primary Keywords**: AI literacy for business leaders, AI training for executives, what is AI for business
**Intent**: Early-stage buyer who needs education before strategy
**Structure**:
- Hero: AI Literacy for Business Leaders (answer "what is AI?" immediately)
- Section: Why AI Literacy Matters (the cost of not understanding)
- Section: Core AI Concepts Explained (embed key content from Competency Matrix)
- Section: Executive Briefings & Workshops (service offering)
- Section: The Literacy Assessment
- FAQ: What is AI really? Can AI replace my team? etc.
- CTA: Take the AI Readiness Assessment or Book a Call
**PDF Download**: AI Competency Matrix (no gate)

### 3. AI Strategy (`/ai-strategy`)
**Primary Keywords**: AI strategy consulting UK, AI strategy for SMEs, AI roadmap
**Intent**: Buyer ready to plan but needs expert guidance
**Structure**:
- Hero: AI Strategy Consulting for SMEs
- Section: What Makes a Good AI Strategy (embed key framework from Playbook)
- Section: The Strategy Development Process
- Section: Deliverables (roadmap, governance, ROI model)
- Section: Strategy vs Implementation (when to move to Stage 3)
- FAQ: How long does strategy take? What ROI should I expect?
- CTA: Book strategy session
**PDF Download**: AI Execution Playbook for SMBs (no gate)

### 4. AI Governance (`/ai-governance`)
**Primary Keywords**: AI governance for SMEs, responsible AI consulting UK, AI policy
**Intent**: Buyer concerned about risk, compliance, or ethical AI
**Structure**:
- Hero: Responsible AI for Business
- Section: Why Governance Matters (not a blocker, an enabler)
- Section: The 10-Day Governance Framework (EMBED full framework from PDF)
- Section: Frameworks We Use (ISO 42001, NIST AI RMF, EU AI Act)
- Section: Governance as Part of Strategy
- FAQ: Do I need AI governance? What about the EU AI Act?
- CTA: Book a governance review
**PDF Download**: AI Governance - 10 Days (no gate)

### 5. AI Implementation (`/ai-implementation`)
**Primary Keywords**: AI implementation consultant, AI adoption for SMEs, how to implement AI
**Intent**: Buyer ready to build, needs execution support
**Structure**:
- Hero: AI Implementation for SMEs
- Section: The First 90 Days (EMBED methodology from PDF)
- Section: From Pilot to Production (avoiding pilot purgatory)
- Section: How We Work (prototyping, deployment, handover)
- Section: Technology Stack & Tools
- FAQ: How long does implementation take? What do we own at the end?
- CTA: Start your first AI project
**PDF Download**: AI Expert Methodology Guide (no gate)

### 6. AI Use Cases (`/use-cases`)
**Primary Keywords**: AI use cases for business, where to use AI, AI for [function]
**Intent**: Buyer exploring where AI fits in their business
**Structure**:
- Hero: Where AI Fits in Your Business
- Section: Use Cases by Business Function (grid linking to sub-pages)
- Section: How to Prioritize Use Cases
- Section: Quick Wins vs Strategic Bets
- FAQ: What are the best first AI projects?
- CTA: Take AI Readiness Assessment
**Future Sub-pages**: /use-cases/operations, /use-cases/marketing, /use-cases/customer-service, etc.

---

## Routing Updates Required

Add to `src/App.tsx`:
```tsx
import FractionalCAIO from "./pages/FractionalCAIO";
import AILiteracy from "./pages/AILiteracy";
import AIStrategy from "./pages/AIStrategy";
import AIGovernance from "./pages/AIGovernance";
import AIImplementation from "./pages/AIImplementation";
import UseCases from "./pages/UseCases";

// In Routes:
<Route path="/fractional-caio" element={<FractionalCAIO />} />
<Route path="/ai-literacy" element={<AILiteracy />} />
<Route path="/ai-strategy" element={<AIStrategy />} />
<Route path="/ai-governance" element={<AIGovernance />} />
<Route path="/ai-implementation" element={<AIImplementation />} />
<Route path="/use-cases" element={<UseCases />} />
```

---

## Navigation Updates

Consider adding a "Solutions" or "Learn" dropdown in Navigation.tsx with:
- AI Literacy
- AI Strategy
- AI Implementation
- AI Governance
- Fractional CAIO
- Use Cases

---

## Internal Linking Strategy

Each pillar page should link to:
1. **Adjacent stages**: Literacy → Strategy → Implementation
2. **Related tools**: AI Readiness Assessment, ROI Calculator
3. **Resources**: Relevant PDFs from /resources
4. **Contact/Booking**: Calendly link for strategy calls

---

## Open Content Strategy (NOT Gated)

**Key Principle**: For GEO discoverability, content must be freely accessible and indexable. Answer engines cannot cite gated content.

### Approach:
1. **Put the best content ON the page** - Don't hide insights behind PDFs
2. **PDFs are bonus formats** - Offer as "Download as PDF" for offline reading, not as lead gates
3. **Direct downloads** - No email required for PDFs (lead capture happens at booking stage)
4. **Answer questions directly** - Each page should answer buyer questions in the first few paragraphs

### Content Priority:
- **Primary**: On-page content (fully indexable, GEO-friendly)
- **Secondary**: PDF download option (same content, portable format)
- **Conversion point**: "Book a Strategy Call" CTA (where leads are captured)

### Example Pattern:
```
Page: /ai-governance

Content on page:
- Full explanation of AI governance
- The 10-day implementation framework (from PDF)
- Key governance components
- FAQ section

Download option:
- "Download this guide as PDF" button (no form required)

Conversion:
- "Ready to implement? Book a governance review" → Calendly
```

This approach means:
- Google indexes all content
- AI answer engines can cite your pages
- Users get value immediately (building trust)
- Lead capture happens when they're ready to engage

---

## Execution Plan

### Phase 1: Infrastructure (This Session)
1. Create this architecture document ✓
2. Update App.tsx with new routes
3. Update Navigation with new links

### Phase 2: Pillar Pages (Parallel Subagents)
Launch 6 subagents simultaneously, each building one pillar page following this architecture.

### Phase 3: Validation
1. Build and test locally
2. Verify all internal links work
3. Test mobile responsiveness
4. Commit and push

---

## Subagent Instructions Template

When launching subagents, use this prompt pattern:

```
Build the [PAGE NAME] page for theaiexpert.ai.

Follow the patterns in CONTENT-ARCHITECTURE.md exactly.

Key requirements:
1. Use SEOHead with proper meta tags for the primary keywords
2. Include StructuredData with FAQ schema for GEO
3. Use useScrollReveal for all sections
4. Include 6-8 FAQs answering real buyer questions
5. EMBED key content from the PDF directly on the page (for SEO/GEO indexing)
6. Offer PDF as free download (no lead capture form)
7. Link to related pages (literacy/strategy/implementation flow)
8. Include CTA to book a strategy call via Calendly

Primary keywords: [KEYWORDS]
PDF to embed content from: [PDF NAME]

IMPORTANT: The page content should FULLY answer the buyer's question.
Do NOT hide the best content behind a download. Make it indexable.
The PDF is a convenience format, not the primary content.

Export as default from src/pages/[PageName].tsx
```
