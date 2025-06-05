# 00: Project Overview & Recommended Technology Stack for floodrisk.online

## 1. Project Goal

To launch `floodrisk.online`, a professional website serving as the primary platform for Chris Cameron-Hann's "Consultancy as a Service." The site will:

*   Clearly present the service offerings and pricing tiers.
*   Facilitate client subscriptions/payments via Stripe integration.
*   Host a blog for articles related to flood risk, environmental consulting, and related topics (leveraging AI for content generation and management via Cursor).
*   Be easily maintainable and scalable, with a development and deployment process optimized for AI assistance and management within Cursor.

## 2. Key Functional Requirements

*   **Service Pages:** Landing page detailing the "Consultancy as a Service," including benefits, target audience, and how it works (based on `ideas/consultancy-as-a-service.md`).
*   **Pricing Page:** Clear presentation of subscription tiers and ad-hoc "Power Hour" options (based on `ideas/pricing-consultancy-services.md`).
*   **Blog:** Dynamically generated blog with individual article pages, tags, and potentially categories. Articles will be primarily managed as Markdown files.
*   **Stripe Integration:** Secure payment processing for monthly subscriptions and one-off "Power Hour" bookings. This includes handling subscription management (sign-ups, cancellations if possible via Stripe customer portal).
*   **Responsive Design:** Fully responsive and accessible on all devices (desktop, tablet, mobile).
*   **SEO Optimized:** Good foundational SEO practices (meta tags, structured data, sitemap).
*   **Contact Method:** Simple contact form or clear email links.

## 3. Recommended Technology Stack

This stack is chosen for its suitability for AI-assisted development (especially with Cursor), ease of content management (Markdown), robust Stripe integration capabilities, and excellent deployment/hosting options.

*   **Framework/Static Site Generator (SSG): Next.js (React)**
    *   **Why:** Highly popular, powerful, and flexible. Excellent for building fast, modern websites. Supports Static Site Generation (SSG) for blog posts and service pages (great for performance and SEO), and API routes for backend logic (essential for Stripe integration without a separate backend server). Rich ecosystem and strong community support. JSX/TSX is well-supported by AI code generation tools.
    *   **Cursor Synergy:** Next.js projects are JavaScript/TypeScript based, which Cursor handles adeptly for code generation, component creation, and managing API routes.

*   **Primary Language: TypeScript (or JavaScript)**
    *   **Why:** TypeScript adds static typing to JavaScript, improving code quality and maintainability, especially as the project grows. AI tools often provide better suggestions with typed code. If preferred, plain JavaScript is also viable with Next.js.

*   **Styling: Tailwind CSS**
    *   **Why:** Utility-first CSS framework that allows for rapid UI development without writing custom CSS for everything. Works very well with Next.js and is easy for AI to generate class strings for styling components.

*   **Content Management: Markdown Files (`.md` or `.mdx`)**
    *   **Why:** Directly aligns with your request to generate articles and manage content within Cursor. Next.js can easily source content from local Markdown files. `.mdx` allows embedding React components within Markdown for richer content if needed.

*   **Hosting & Deployment: Vercel (or Netlify)**
    *   **Vercel Why:** Created by the developers of Next.js, offering seamless integration, optimized builds, global CDN, serverless functions (for Stripe API routes), and automatic deployments from Git. Free tier is generous for personal projects.
    *   **Netlify Why:** Strong competitor with similar features: Git-based deployment, serverless functions, global CDN. Also excellent for Jamstack sites.
    *   **Cursor Synergy:** Both platforms use Git for deployment. You can commit and push changes directly from Cursor's integrated terminal to trigger new builds and deployments.

*   **Payment Processing: Stripe**
    *   **Why:** Industry-standard, robust, developer-friendly APIs for subscriptions (Stripe Billing) and one-off payments. Securely handles sensitive payment information.

*   **Version Control: Git (with GitHub/GitLab/Bitbucket)**
    *   **Why:** Essential for tracking changes, collaboration (even solo), and enabling automated deployments on Vercel/Netlify. Cursor has excellent Git integration.

## 4. Alternatives Considered

*   **Hugo/Eleventy + Serverless Functions:** Simpler SSGs if the dynamic aspects (Stripe) were less critical or if a non-React preference was strong. Stripe would require separate serverless functions.
*   **Python (Flask/Pelican) + Hosting:** Viable if Python expertise is a primary driver, but Next.js offers a more integrated modern Jamstack experience for this type of project.

**Conclusion for Tech Stack:** The Next.js, TypeScript, Tailwind CSS, Markdown, Vercel/Netlify, and Stripe stack offers a powerful, modern, and highly automatable solution that aligns perfectly with the goal of managing and developing `floodrisk.online` effectively with AI assistance through Cursor. 