# 06: Content Workflow & Folder Structure for floodrisk.online

This document outlines the proposed content management workflow and folder structure, particularly for blog posts, to ensure a clear distinction between drafts and published articles and to integrate smoothly with an AI-assisted, Cursor-managed development process for `floodrisk.online`.

## 1. Core Content Directory Structure

*   **`_content/`**: A top-level directory in your project root (e.g., `floodrisk.online/_content/`). The leading underscore typically indicates it's not a public-facing route but a source for build-time data.
    *   **`_content/blog/`**: A subdirectory specifically for blog post Markdown files.
        *   **`_content/blog/drafts/`**: All new blog posts are created and edited here as `.md` files. These files will **not** be included in the production build of your live website by default.
        *   **`_content/blog/published/`**: When a blog post is finalized and ready to go live, its Markdown file will be moved from the `drafts/` directory to this `published/` directory. Only files in this directory will be processed for the live `floodrisk.online` blog.
    *   **(Optional) `_content/pages/`**: If you have other significant content-driven pages that aren't part of the core Next.js `pages` or `app` directory structure and you want to manage their content via Markdown, you could create a similar structure here (e.g., for very detailed service sub-pages if they become too large for direct component integration).

## 2. Next.js Data Fetching Configuration

Your Next.js data fetching logic (primarily in `getStaticProps` for generating blog listing pages and `getStaticPaths`/`getStaticProps` for individual blog post pages) will be configured as follows:

*   **Development Mode (`process.env.NODE_ENV === 'development'`):**
    *   When running the local development server (`npm run dev`), the code can be configured to read Markdown files from *both* `_content/blog/drafts/` and `_content/blog/published/`.
    *   This allows you to easily preview draft posts on your local machine as they would appear on the live site, including layout and styling.
    *   This might involve a helper function that checks the environment and accordingly scans one or both directories.
*   **Production Mode (`process.env.NODE_ENV === 'production'`):**
    *   When building the site for deployment (via `npm run build` on Vercel/Netlify), the data fetching functions will be strictly configured to **only** read Markdown files from the `_content/blog/published/` directory.
    *   This is a critical safeguard to ensure that no unfinished or unapproved draft content is ever built into or deployed to the live `floodrisk.online` website.

## 3. Publishing Workflow: From Idea to Live Post

1.  **Idea & Outline (Cursor/AI):**
    *   Brainstorm topics, use AI in Cursor to help generate outlines or initial ideas.
2.  **Drafting in `_content/blog/drafts/` (Cursor/AI):**
    *   Create a new Markdown file (e.g., `_content/blog/drafts/my-new-post-slug.md`).
    *   Use Cursor's AI capabilities to generate sections of the draft.
    *   Chris reviews, edits, and adds his expert insights, ensuring technical accuracy and personal voice.
    *   Complete all necessary frontmatter (title, date, author, slug, tags, excerpt, featuredImage if any).
3.  **Local Preview & Review:**
    *   Run the Next.js development server (`npm run dev`).
    *   Access `http://localhost:3000/blog` (or the relevant blog path) to see the draft post in the list (if dev mode is configured to show drafts).
    *   Navigate to the draft post itself and thoroughly review its content, formatting, images, and links.
4.  **Final Approval:**
    *   Once Chris is fully satisfied with the draft and it's ready for the public.
5.  **Move to Publish:**
    *   Using the file explorer in Cursor or your operating system, move the Markdown file from:
        *   `_content/blog/drafts/my-new-post-slug.md`
        *   TO `_content/blog/published/my-new-post-slug.md`
6.  **Commit & Push (Cursor/Git):**
    *   Stage the changes in Git. Git will typically see this as the deletion of a file in `drafts/` and the creation of a new file in `published/` (or a rename if `git mv` was used).
    *   Commit with a clear and descriptive message (e.g., "publish: New blog post on SuDS innovations").
    *   Push the commit(s) to the main (production) branch of your Git repository (e.g., `main` or `master`).
7.  **Automatic Deployment to Live Site:**
    *   Vercel/Netlify (or your chosen hosting platform integrated with your Git repository) detects the push to the production branch.
    *   A new build of `floodrisk.online` is automatically triggered.
    *   During this build, Next.js only fetches content from `_content/blog/published/`, so the newly moved post is now included.
    *   The updated website with the new blog post is deployed and becomes live.

## 4. Benefits of This Workflow

*   **Safety:** Prevents accidental publication of incomplete or unapproved drafts.
*   **Clarity:** Clear, physical separation of draft and published content in the repository.
*   **Simplicity:** The act of publishing is an intuitive file move.
*   **Version Control:** All changes, including the act of publishing (file move), are tracked in Git.
*   **Efficient Previews:** Ability to preview drafts in the full site context during local development.
*   **Cursor & AI Integration:** Seamlessly fits with drafting content using AI in Cursor and managing files directly within the IDE.

## 5. Considerations

*   **Initial Setup:** The Next.js data fetching logic needs to be robustly implemented to correctly distinguish between development and production environments for reading draft content.
*   **Consistency:** Ensure all blog posts follow the same frontmatter conventions for metadata.

This structured content workflow provides a reliable and developer-friendly way to manage your blog content from creation to publication on `floodrisk.online`. 