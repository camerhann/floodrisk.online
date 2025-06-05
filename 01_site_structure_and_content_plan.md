# 01: Site Structure & Content Plan for floodrisk.online

This document outlines the planned structure for `floodrisk.online` and the content required for each section.

## 1. Overall Site Structure (Navigation)

*   **Home:** Engaging landing page introducing Chris Cameron-Hann, Aegaea, the core problem addressed (flood risk complexity), and a brief teaser of the "Consultancy as a Service."
*   **Services / Consultancy as a Service:** Detailed page explaining the service (from `ideas/consultancy-as-a-service.md`). This will be the main conversion page for subscriptions.
*   **Pricing:** The tiered pricing page we designed (from `ideas/pricing-consultancy-services.md`). This should clearly link to the subscription sign-up process.
*   **Blog:** Main blog listing page with excerpts of recent articles (e.g., titles, summaries, featured images if any). Pagination will be needed if many articles exist.
    *   **Blog Post Pages:** Individual article pages, well-formatted for readability.
    *   **(Optional but Recommended) Blog Categories/Tags Pages:** Pages listing articles by specific categories (e.g., "Environmental Impact Assessment," "SuDS Design," "NPPF Updates") or tags to improve navigation and SEO.
*   **About Chris:** A more detailed biography of Chris Cameron-Hann, highlighting expertise, experience (World Bank, Aegaea), professional philosophy, and perhaps a photo. Could also briefly mention Aegaea Ltd. as the parent consultancy for larger projects and link to its website.
*   **Contact:** Simple contact form (e.g., using a service like Formspree or a Next.js API route to handle submissions) or direct email link (mailto:).
*   **(Footer Links):**
    *   Privacy Policy (essential, especially with data collection/payments).
    *   Terms of Service (essential for service subscriptions and website use).
    *   (Optional) LinkedIn Profile link.
    *   (Optional) Link to Aegaea Ltd. website.

## 2. Detailed Content Plan per Section

### a. Home Page (`index.tsx` or `page.tsx` in Next.js)

*   **Hero Section:**
    *   Headline: Compelling, problem-focused (e.g., "Expert Flood Risk Guidance, Simplified.")
    *   Sub-headline: Briefly introduce Chris Cameron-Hann and the unique value proposition.
    *   Primary Call to Action (CTA): E.g., "Explore Services" (links to Services page) or "View Pricing."
*   **Problem/Solution Introduction:**
    *   Briefly outline common flood risk challenges faced by the target audience.
    *   Introduce the "Consultancy as a Service" as the accessible solution.
*   **Service Teaser:**
    *   Short summary of the subscription model and its key benefits (e.g., 2-3 bullet points).
    *   Secondary CTA: "Learn More About the Service" (links to Services page).
*   **Expertise/Credibility Snippet:**
    *   Brief mention of Chris's key credentials (17 years, World Bank, Aegaea Director).
    *   Link to "About Chris" page.
*   **Blog Teaser (Optional):**
    *   Display 2-3 recent or featured blog post titles/summaries.
    *   Link to main Blog page.
*   **Final CTA:** Reiterate main call to action or offer a contact option.

### b. Services Page (`/services` or `/consultancy-as-a-service`)

*   Directly adapt content from `ideas/consultancy-as-a-service.md`.
*   Structure with clear headings, bullet points, and user-focused language.
*   Emphasize benefits and solutions to pain points.
*   Include scarcity messaging (limited spots for personalized service).
*   Strong CTAs: "View Pricing & Subscribe" or "Discuss Your Needs."

### c. Pricing Page (`/pricing`)

*   Directly adapt content from `ideas/pricing-consultancy-services.md`.
*   Clearly display each tier (Expert Access, Priority Support, Power Hour).
*   Highlight features and effective hourly rates for subscription tiers.
*   Incorporate scarcity messaging (limited spots, waitlist).
*   Direct CTAs for each option, linking to the Stripe checkout flow or contact for Power Hours/Waitlist.
*   Link to Aegaea Ltd. for larger projects.

### d. Blog Listing Page (`/blog`)

*   Page Title: e.g., "Flood Risk Insights & News from Chris Cameron-Hann."
*   List of blog posts, typically in reverse chronological order.
*   For each post: Title (linked to full post), author, date, brief excerpt/summary, (optional) featured image.
*   Pagination if there are many posts.
*   (Optional) Sidebar for categories, tags, search, or popular posts.

### e. Blog Post Template (e.g., `/blog/[slug]`)

*   Content sourced from Markdown files.
*   Clear display of: Post Title, Author, Date, Tags/Categories.
*   Well-formatted article body content.
*   Social sharing buttons (optional).
*   Related posts section (optional).
*   Call to action at the end (e.g., "Need expert advice on this topic? Explore my Consultancy as a Service.").

### f. About Chris Page (`/about`)

*   Headline: e.g., "Meet Chris Cameron-Hann: Your Flood Risk Expert."
*   Detailed professional biography: Journey, key roles, achievements, areas of specialization (UK & International flood risk, World Bank, Aegaea).
*   Professional philosophy / approach to consultancy.
*   High-quality professional photo.
*   Link to LinkedIn profile.
*   Clear mention of Aegaea Ltd. for larger-scale consultancy and link to its website.

### g. Contact Page (`/contact`)

*   Headline: e.g., "Get in Touch" or "Discuss Your Flood Risk Needs."
*   Brief introductory text.
*   Contact Form (Fields: Name, Email, Subject, Message, (Optional) How did you hear about us?).
    *   Consider GDPR compliance note for data handling.
*   Alternatively, or additionally, a direct email address (mailto:).
*   (Optional) Phone number if desired.

### h. Legal Pages (e.g., `/privacy-policy`, `/terms-of-service`)

*   **Privacy Policy:** Standard privacy policy detailing data collection, usage, cookies, user rights. Crucial for GDPR if targeting UK/EU.
*   **Terms of Service:** Outline terms for using the website and, importantly, the terms for the consultancy subscription services (payment terms, cancellation, scope of service, limitations, intellectual property if relevant to advice given).
    *   *Legal advice should be sought for these pages to ensure they are comprehensive and compliant.*

## 3. Content Generation & Management with AI/Cursor

*   **Blog Posts:** Primary use case. Draft initial blog posts (like those in `ideas/`) using AI assistance in Cursor, then refine and save as Markdown files in the project repository (e.g., in a `content/blog` folder).
*   **Service & Pricing Page Content:** The existing Markdown files (`ideas/consultancy-as-a-service.md`, `ideas/pricing-consultancy-services.md`) will be the source, to be integrated into Next.js components.
*   **About Page:** AI can help draft sections based on Chris's provided CV/LinkedIn and key achievements.
*   **Homepage Copy:** AI can help generate engaging headlines, sub-headlines, and CTA text based on the overall service and target audience.
*   **SEO Meta Descriptions:** AI can generate optimized meta descriptions for each page and blog post.

This content plan provides a solid foundation for building out `floodrisk.online`. The next step will be to detail the development and deployment process. 