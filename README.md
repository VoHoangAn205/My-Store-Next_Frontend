# HOANGAN Store Full-Stack E-Commerce (Next, Typescript, Tailwind)

An e-commerce storefront built with Next.js (App Router), React, TypeScript, and Tailwind CSS. It talks to a separate Express REST API for products, carts, orders, and authentication.

> **Backend Repository:** [Link to Backend Repo](https://github.com/VoHoangAn205/My-Online-Store-API)  
> **Live Website:** [https://myWebsite.vercel.app](https://hoangan-online-store-v2.vercel.app)

---

## 🚀 Technical Highlights

- **Single-flight refresh with a request queue:** When several requests fail with `401` at the same time (for example, a page that loads cart, profile, and orders together), only the first one calls `/refresh`. The others wait in a queue and are retried with the new token. This avoids duplicate refresh calls, which matters when refresh tokens rotate. A `_retry` flag prevents infinite refresh loops.

- **Non-blocking auth bootstrap:** `AuthProvider` restores the session on reload (refresh, then load user info) without blocking rendering, so public pages are still server-rendered and indexable. It exposes an `authStatus` (`loading`, `authed`, `guest`) that guards and the header use, and a shared init promise keeps React Strict Mode from firing the refresh twice.

- **Layered route protection:** Protected areas use three layers: `proxy.ts` as a cheap early redirect for visitors without a session cookie, a client-side guard that checks status and role, and server-side verification on every Express endpoint. The first two improve the experience, and the API is what actually enforces access.

- **Hybrid rendering by page type:** Public pages (category, product detail) are Server Components that fetch on the server for SEO and fast first paint. Private pages fetch on the client, where the in-memory token is available. Pages stay thin Server Components that render a client component only for the interactive part.

- **URL as the single source of truth for list state:** Sort, items per page, page number, and status filters live in the query string and are read with `useSearchParams`. Links are shareable, reload and back/forward work, and the page number resets in the same navigation as any filter change. The API validates and caps `limit` and `page` on the server.

- **Predictable error handling:** Errors are classified at the API layer, then handled where the context is known: `notFound()` for missing resources, `error.tsx` boundaries for unrecoverable failures, inline messages for partial failures, and toasts for user actions. A shared `getErrorMessage` helper surfaces the readable message sent by the Express API.

- **Email OTP registration:** Sign-up verifies the email with a 6-digit code before creating the account, using a dedicated OTP input component and a resend action.
  
---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router, Server Components)
- **State Management:** Zustand
- **Language:** TypeScript
- **HTTP Client:** Axios (Private & Public Instances with Interceptors)
- **Notifications:** Sonner
- **Images:** next/image with Cloudinary
- **Styling:** Tailwind CSS
- **Hosting:** Vercel

---

### 🔐 Authentication flow
1. **Access token** is kept in memory (Zustand store), never in `localStorage`.
2. **Refresh token** is an `httpOnly` cookie set by the Express API.
3. On every full page load, `AuthProvider` calls `POST /refresh`, stores the new access token, then loads the user info and sets `authStatus` (`loading`, `authed`, or `guest`).
4. `axiosPrivate` attaches `Authorization: Bearer <token>` to each request. If a request returns **401**, a response interceptor refreshes the token once, queues parallel failed requests, and retries them.
5. `proxy.ts` (Next.js 16 middleware replacement) redirects visitors without the refresh cookie away from protected routes. It is only an early gate. **The Express API verifies the token and role on every protected endpoint.**

Roles: `5150` Admin, `1984` Vendor, `2001` User.

---

## ⚙️ Environment Variables

```env
VITE_API_BASE_URL=https://hoangan-online-store.onrender.com
```
