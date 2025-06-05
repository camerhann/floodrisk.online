# 04: Deployment & Hosting Plan for floodrisk.online

This document outlines the plan for deploying and hosting `floodrisk.online`, focusing on Vercel (recommended) or Netlify, leveraging their Git integration for CI/CD.

## 1. Hosting Provider Selection: Vercel (Recommended)

*   **Primary Recommendation: Vercel**
    *   **Reasoning:** Developed by the creators of Next.js, Vercel offers the most seamless and optimized hosting experience for Next.js applications. It provides:
        *   **Effortless Git Integration:** Connect directly to your GitHub/GitLab/Bitbucket repository.
        *   **Automatic Builds & Deployments:** Every `git push` to the main branch (or specified production branch) triggers a new build and deployment.
        *   **Preview Deployments:** Automatic deployments for every branch and pull request, allowing you to review changes before merging to production.
        *   **Global CDN:** Fast content delivery worldwide.
        *   **Serverless Functions:** Perfect for Next.js API routes (used for Stripe integration) with generous free tier limits.
        *   **Image Optimization:** Built-in Next.js Image component optimization.
        *   **Analytics:** Built-in Vercel Analytics for traffic insights (optional, paid for more features).
        *   **Environment Variable Management:** Securely manage `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, etc.
*   **Alternative: Netlify**
    *   **Reasoning:** Also an excellent choice for Jamstack sites, including Next.js. Offers similar features to Vercel:
        *   Git-based deployments.
        *   Preview deployments.
        *   Global CDN.
        *   Serverless functions (Netlify Functions).
        *   Environment variable management.
    *   The choice between Vercel and Netlify often comes down to personal preference or minor differences in specific feature implementations or pricing at scale. For a Next.js project, Vercel usually has a slight edge due to its native integration.

## 2. Initial Deployment Setup (Vercel Example)

1.  **Push Project to Git:** Ensure your Next.js project (after `create-next-app` and initial setup from `02_development_process_and_ai_workflow.md`) is pushed to your GitHub/GitLab/Bitbucket repository.
2.  **Sign up/Log in to Vercel:** Use your Git provider account for easy authentication.
3.  **Import Project:**
    *   Click "Add New..." > "Project".
    *   Select your Git provider and import the `floodrisk.online` repository.
4.  **Configure Project:**
    *   **Framework Preset:** Vercel should automatically detect it as a Next.js project.
    *   **Build & Output Settings:** Default settings are usually correct for Next.js.
    *   **Root Directory:** Should be the root of your project.
    *   **Environment Variables:** This is crucial. Add:
        *   `STRIPE_SECRET_KEY`
        *   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
        *   `STRIPE_WEBHOOK_SECRET`
        *   *(Any other environment variables your application might need)*
    *   Click "Deploy."
5.  **First Deployment:** Vercel will build and deploy your site. You'll get a Vercel domain (e.g., `floodrisk-online.vercel.app`).

## 3. Custom Domain Configuration (`floodrisk.online`)

1.  **Add Domain in Vercel:**
    *   Go to your project settings in Vercel.
    *   Navigate to the "Domains" section.
    *   Enter `floodrisk.online` and add it.
2.  **Configure DNS Records:**
    *   Vercel will provide instructions on the DNS records you need to add or update at your domain registrar (where you bought `floodrisk.online`). This usually involves:
        *   An `A` record pointing to a Vercel IP address for the apex domain (`floodrisk.online`).
        *   Or, preferably, changing your domain's Nameservers to Vercel's nameservers for Vercel to manage DNS.
        *   A `CNAME` record for the `www` subdomain (`www.floodrisk.online`) pointing to Vercel's designated CNAME target (often `cname.vercel-dns.com` or similar).
3.  **Propagation:** DNS changes can take some time to propagate (from a few minutes to 48 hours, usually faster).
4.  **SSL/TLS:** Vercel automatically provisions and renews SSL/TLS certificates for custom domains, ensuring HTTPS.

## 4. CI/CD Workflow (Automatic via Vercel/Netlify)

*   **Development Branch (e.g., `develop` or feature branches):**
    *   Push changes to these branches.
    *   Vercel/Netlify automatically create a preview deployment with a unique URL.
    *   Test changes in isolation.
*   **Production Branch (e.g., `main` or `master`):**
    *   When changes are ready and tested (e.g., after merging a feature branch or `develop` into `main`), push to the production branch.
    *   Vercel/Netlify automatically build and deploy these changes to your live `floodrisk.online` domain.
*   **Management via Cursor:**
    *   All code changes, new blog posts (as Markdown files), and content updates are committed to Git directly within Cursor or using its integrated terminal.
    *   Pushing these commits triggers the CI/CD pipeline.

## 5. Ongoing Management & Monitoring

*   **Vercel/Netlify Dashboard:** Monitor build status, deployment logs, and basic analytics.
*   **Domain & SSL:** Managed automatically by Vercel/Netlify once set up.
*   **Rollbacks:** Vercel/Netlify keep previous deployments, allowing for easy rollbacks to a prior version if a deployment introduces issues.
*   **Environment Variables:** Update Stripe keys or other settings via the Vercel/Netlify dashboard as needed (changes will require a redeploy to take effect).

## 6. Key Considerations

*   **Build Times:** As the site grows (many blog posts), build times might increase. Next.js Incremental Static Regeneration (ISR) can be explored if this becomes an issue, though SSG is often sufficient for a blog of moderate size.
*   **Stripe Webhook URL:** When you set up your Stripe webhook endpoint, ensure you use the *production URL* (e.g., `https://floodrisk.online/api/stripe/webhooks`) for live mode and a Vercel preview deployment URL (or Stripe CLI forwarding) for testing.

This deployment and hosting plan provides a robust, scalable, and highly automated way to manage `floodrisk.online`, aligning perfectly with the AI-assisted development workflow in Cursor. 