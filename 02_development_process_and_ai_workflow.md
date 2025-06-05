# 02: Development Process & AI-Assisted Workflow for floodrisk.online

This document outlines the proposed development process, emphasizing AI assistance (particularly via Cursor) and streamlined workflows.

## 1. Initial Project Setup (Manual & AI-Assisted)

1.  **Choose Git Hosting:** Create a new repository on GitHub, GitLab, or Bitbucket.
2.  **Local Project Initialization (Next.js):**
    *   Use `create-next-app` with TypeScript: `npx create-next-app@latest floodrisk.online --typescript`
    *   `cd floodrisk.online`
3.  **Install Core Dependencies:**
    *   Tailwind CSS: Follow official Next.js with Tailwind CSS guide.
    *   Stripe: `npm install stripe @stripe/stripe-js`
    *   Markdown Processing: `npm install gray-matter react-markdown` (or similar like `next-mdx-remote` if MDX is preferred for components within Markdown).
4.  **Initial Git Commit & Push:** Push the boilerplate to your chosen Git host.
5.  **Connect to Hosting Provider (Vercel/Netlify):**
    *   Sign up/log in to Vercel or Netlify.
    *   Connect your Git repository for automatic deployments.
    *   Configure build settings (usually auto-detected for Next.js).
    *   Set up `floodrisk.online` domain (can be done later, but good to keep in mind).

## 2. AI-Assisted Development Workflow (Iterative)

This workflow will be repeated for most components, pages, and features, leveraging Cursor's capabilities.

1.  **Define Requirement/Component:**
    *   Clearly define the purpose and functionality (e.g., "Create a responsive Navbar component with links from `01_site_structure_and_content_plan.md`").
2.  **AI Prompting in Cursor (Code Generation):**
    *   Use Cursor chat/edit features to generate boilerplate for Next.js components (React functional components with TypeScript).
    *   Prompt for specific elements: "Generate a React component for a hero section with a headline, sub-headline, and CTA button, styled with Tailwind CSS."
    *   For API routes (Stripe): "Generate a Next.js API route to handle Stripe webhook events for `invoice.payment_succeeded`."
3.  **Code Refinement & Integration (Manual & AI-Assisted):**
    *   Review AI-generated code for correctness, style, and adherence to project structure.
    *   Use Cursor's AI to help refactor, add error handling, or explain code snippets.
    *   Manually integrate components into pages, pass props, and manage state.
4.  **Styling with Tailwind CSS (AI-Assisted):**
    *   Use Cursor to suggest Tailwind classes for specific styling goals: "Style this button to be primary blue with hover effects using Tailwind CSS."
5.  **Content Integration (Manual & AI-Assisted for Placeholders):**
    *   For static pages (Home, About), AI can generate placeholder text or draft initial copy based on the content plan, which you then refine.
    *   For dynamic blog content, Next.js will read Markdown files.
6.  **Testing (Manual & AI-Assisted for Unit Tests - Optional):**
    *   Manually test components and pages in the browser.
    *   (Optional) Use AI to help generate basic unit tests for utility functions or simple components (e.g., using Jest/React Testing Library).
7.  **Commit & Push (Via Cursor or Terminal):**
    *   Regularly commit changes with clear messages.
    *   Pushing to the main branch will trigger automatic deployments on Vercel/Netlify.

## 3. Specific Development Phases & AI Application

### a. Phase 1: Core Layout & Static Pages

*   **Tasks:** Create main layout (Navbar, Footer), Homepage, About Page, Contact Page (basic version).
*   **AI Workflow:**
    *   Generate components for Navbar, Footer, Hero section, content sections.
    *   Style using Tailwind CSS with AI assistance.
    *   Draft placeholder/initial text for About page and Homepage sections.

### b. Phase 2: Blog Functionality

*   **Tasks:** Setup Markdown parsing for blog posts, create blog listing page, individual blog post template.
*   **AI Workflow:**
    *   Generate Next.js utility functions (`getStaticProps`, `getStaticPaths`) to read and parse Markdown files from the `content/blog` directory.
    *   Create React components for `BlogCard` (for listing page) and `BlogPostLayout`.
    *   AI to help structure loops for displaying posts and formatting content from Markdown (`react-markdown`).

### c. Phase 3: Service & Pricing Pages (Static Content)

*   **Tasks:** Create dedicated pages for Services and Pricing, using the content from `ideas/*.md` files.
*   **AI Workflow:**
    *   Generate React components to structure this content attractively.
    *   Focus on clear presentation of tiers, features, and CTAs.

### d. Phase 4: Stripe Integration

*   **Tasks:** Set up Stripe products & prices in Stripe dashboard, create API routes for checkout sessions, handle webhooks for subscription status, create client-side logic to call Stripe checkout.
*   **AI Workflow (Crucial for API routes & frontend calls):**
    *   Prompt AI in Cursor for: "Next.js API route to create a Stripe Checkout session for product ID [your_product_id]."
    *   "Client-side JavaScript function to redirect to Stripe Checkout using session ID fetched from API."
    *   "Next.js API route to handle Stripe webhook for `checkout.session.completed` and `customer.subscription.deleted`."
    *   *Note: Stripe secret keys must be managed via environment variables (`.env.local` in Next.js, configured on Vercel/Netlify). AI should not handle raw secret keys directly in prompts.* Security is paramount here.

### e. Phase 5: SEO & Legal Pages

*   **Tasks:** Add meta tags, generate sitemap, create Privacy Policy and Terms of Service pages.
*   **AI Workflow:**
    *   AI to generate meta descriptions for all pages.
    *   AI can provide templates/starting points for Privacy Policy & ToS, but **these must be reviewed by a legal professional.**
    *   Next.js can have a `sitemap.xml.js` API route to dynamically generate the sitemap.

## 4. Content Management Workflow (Post-Launch)

1.  **Drafting Blog Posts (Cursor & AI):**
    *   Chris uses Cursor chat to brainstorm ideas, outline posts, and generate initial drafts on flood risk topics.
    *   Refine content within Cursor, ensuring technical accuracy and personal voice.
2.  **Saving as Markdown:**
    *   Save the final article as a `.md` file in the `content/blog` directory of the project (e.g., `content/blog/my-new-article-slug.md`). Include frontmatter (title, date, author, tags, slug).
3.  **Adding Images (Optional):**
    *   Place images in the `public/images/blog/` folder and reference them in Markdown.
4.  **Commit & Push:**
    *   Commit the new Markdown file (and any images) via Cursor.
    *   Push to Git.
5.  **Automatic Deployment:**
    *   Vercel/Netlify detects the new content and automatically rebuilds and deploys the site with the new article live.

## 5. Ongoing Maintenance

*   **Dependency Updates:** Regularly update Next.js and other npm packages (can be prompted via AI for guidance on safe updates).
*   **Content Updates:** Edit existing Markdown files for blog posts or page content as needed, commit, and push.
*   **Monitoring:** Use Vercel/Netlify analytics and potentially integrate a simple analytics tool (e.g., Plausible, Fathom, or GA4).

This AI-centric workflow should significantly speed up development and make ongoing management of `floodrisk.online` very efficient directly from your Cursor environment. 