# 03: Stripe Integration Plan for floodrisk.online

This document outlines the plan for integrating Stripe for payment processing, covering subscriptions and one-off "Power Hour" payments.

## 1. Stripe Account Setup & Product Configuration

1.  **Create/Verify Stripe Account:** Ensure your Stripe account is fully set up and verified for live payments (https://dashboard.stripe.com/).
2.  **Define Products in Stripe Dashboard:**
    *   **Product 1: Expert Access Subscription**
        *   Name: Expert Access Subscription
        *   Pricing Model: Standard (Recurring)
        *   Price: £200 / month
        *   Billing Period: Monthly
        *   (Optional) Add a description.
    *   **Product 2: Priority Support Subscription**
        *   Name: Priority Support Subscription
        *   Pricing Model: Standard (Recurring)
        *   Price: £375 / month
        *   Billing Period: Monthly
    *   **Product 3: Ad-Hoc Power Hour**
        *   Name: Ad-Hoc Power Hour
        *   Pricing Model: Standard (One-time)
        *   Price: £150 (or your chosen Power Hour rate)
    *   *Note down the Price IDs for each of these. They will be needed in the backend code.*
3.  **Branding:** Customize the look of Stripe Checkout & Customer Portal (logo, colors) in Stripe Dashboard settings to match `floodrisk.online`.
4.  **Customer Portal Configuration (Important for Subscriptions):**
    *   Enable the Stripe Customer Portal (Settings > Billing > Customer portal).
    *   Configure it to allow customers to:
        *   Update payment methods.
        *   View billing history.
        *   Cancel subscriptions.
    *   This significantly reduces your manual admin for subscription management.

## 2. Core Integration Steps (Next.js API Routes & Frontend)

This will primarily involve server-side logic in Next.js API routes and client-side JavaScript to interact with Stripe.js and your API routes.

### a. Environment Variables

*   Store Stripe API Keys securely:
    *   `STRIPE_SECRET_KEY`: Your Stripe secret key (for server-side operations).
    *   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (for client-side Stripe.js).
    *   `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret (for verifying webhook events).
*   Use `.env.local` for local development. These will be configured as environment variables in your hosting provider (Vercel/Netlify) for deployed environments.

### b. Subscription Checkout Flow (Expert Access & Priority Support)

1.  **Frontend (Pricing Page):**
    *   "Subscribe" button for each subscription tier.
    *   When clicked, the button makes a client-side JavaScript call to a Next.js API route, passing the Price ID of the selected subscription.
2.  **Backend (Next.js API Route - e.g., `/api/stripe/create-checkout-session`):**
    *   Receives the Price ID from the frontend request.
    *   Initializes the Stripe Node.js library with your `STRIPE_SECRET_KEY`.
    *   Creates a Stripe Checkout Session:
        *   `mode: 'subscription'`
        *   `line_items`: Contains the Price ID and quantity (1).
        *   `success_url`: URL to redirect to on successful payment (e.g., `yourdomain.com/payment-success?session_id={CHECKOUT_SESSION_ID}`).
        *   `cancel_url`: URL to redirect to if the user cancels (e.g., `yourdomain.com/pricing`).
        *   (Optional) `customer_email`: If the user is already known/logged in (more advanced).
        *   (Optional) `allow_promotion_codes: true` if you plan to use discount codes.
    *   Returns the `sessionId` from the created Stripe Checkout Session to the frontend.
3.  **Frontend (Redirect to Stripe):**
    *   Uses the `sessionId` received from the API route.
    *   Initializes Stripe.js with your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
    *   Calls `stripe.redirectToCheckout({ sessionId })` to redirect the user to the secure Stripe-hosted checkout page.

### c. Power Hour Checkout Flow (One-Time Payment)

*   Similar to the subscription flow, but with key differences in the API route:
1.  **Frontend (Pricing Page / Contact Flow):**
    *   "Book Power Hour" button.
    *   Might involve a pre-step to confirm availability via contact before payment, or direct payment.
2.  **Backend (Next.js API Route - e.g., `/api/stripe/create-power-hour-session`):**
    *   Uses the Price ID for the Power Hour product.
    *   Creates a Stripe Checkout Session with `mode: 'payment'`.
    *   `line_items`: Price ID and quantity (e.g., number of hours if variable).
    *   `success_url` and `cancel_url`.
3.  **Frontend (Redirect to Stripe):** Same as subscription.

### d. Webhook Handling (Crucial for Post-Payment Actions)

1.  **Create Webhook Endpoint in Stripe Dashboard:**
    *   Point it to a Next.js API route on your live site (e.g., `yourdomain.com/api/stripe/webhooks`).
    *   Select the events to listen to, such as:
        *   `checkout.session.completed` (for both one-time and initial subscription payments)
        *   `invoice.payment_succeeded` (for recurring subscription payments)
        *   `invoice.payment_failed` (for handling failed subscription payments)
        *   `customer.subscription.created`
        *   `customer.subscription.updated`
        *   `customer.subscription.deleted` (when a user cancels via Stripe Customer Portal or manually)
2.  **Backend (Next.js API Route - e.g., `/api/stripe/webhooks`):**
    *   **Verify Webhook Signature:** CRITICAL for security. Use `stripe.webhooks.constructEvent()` with the raw request body, `sig` header, and your `STRIPE_WEBHOOK_SECRET`.
    *   **Handle Specific Events:** Use a `switch` statement on `event.type`:
        *   `checkout.session.completed`:
            *   Retrieve session details.
            *   If it's a subscription, store the `subscription_id` and `customer_id` associated with your internal user record (if you have user accounts). If no user accounts, this might be for logging/admin.
            *   For Power Hours, fulfill the order (e.g., send a confirmation email, notify Chris).
        *   `invoice.payment_succeeded`:
            *   Update internal records about continued subscription access.
        *   `customer.subscription.deleted` / `invoice.payment_failed`:
            *   Update internal records to revoke access or flag for follow-up.
    *   Return a `200 OK` response to Stripe quickly to acknowledge receipt of the event.

### e. Client-Side Payment Success/Cancel Pages

*   **Success Page (e.g., `/payment-success`):**
    *   Thank the user.
    *   (Optional) Retrieve session details using `session_id` from URL to confirm payment status with your backend (not strictly necessary if relying on webhooks for fulfillment, but good for UX).
    *   Provide next steps (e.g., "You'll receive a confirmation email shortly," "How to access your service").
*   **Cancel Page (e.g., `/pricing` or a dedicated `/payment-cancelled` page):**
    *   Acknowledge cancellation, offer to try again or contact support.

## 3. Redirecting to Stripe Customer Portal

1.  **Backend (Next.js API Route - e.g., `/api/stripe/create-customer-portal-session`):**
    *   Takes a `customer_id` (which you would have stored from a webhook when the subscription was created).
    *   Creates a Stripe Billing Portal session: `stripe.billingPortal.sessions.create()`.
    *   `customer`: The Stripe Customer ID.
    *   `return_url`: Where to send the user after they finish in the portal (e.g., back to your site's account page).
    *   Returns the portal session `url` to the frontend.
2.  **Frontend:**
    *   A "Manage Subscription" button (e.g., in a user account area or linked from a confirmation email).
    *   Calls the API route, gets the portal URL, and redirects the user: `window.location.href = portalSession.url`.

## 4. Testing

*   **Stripe Test Mode:** Use Stripe test API keys and test card numbers extensively.
*   **Stripe CLI (Recommended):** For local webhook testing: `stripe listen --forward-to localhost:3000/api/stripe/webhooks` (adjust port if needed).
*   Test all checkout flows (subscriptions, power hours) and webhook handling for different event types.
*   Test subscription cancellations via the Customer Portal.

## 5. Security & Best Practices

*   **NEVER expose secret keys on the client-side.**
*   **ALWAYS verify webhook signatures.**
*   Handle API responses and errors gracefully on both client and server.
*   Use HTTPS for all live transactions (Vercel/Netlify provide this by default).
*   Stay updated with Stripe API versions and security recommendations.
*   Ensure idempotency in webhook handlers if possible (though Stripe helps with this by allowing you to retry events).

This plan provides a robust foundation for Stripe integration. Actual implementation will require careful coding and thorough testing, where AI assistance can be very helpful for boilerplate and specific function generation. 