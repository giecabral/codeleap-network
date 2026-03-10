# CodeLeap Network

A social feed application built as a frontend engineering test for CodeLeap. Users can create, edit, and delete posts on a shared network.

## Live App

The app is deployed on Vercel and accessible at:

> 🔗 https://codeleap-network-two.vercel.app/

## Tech Stack

- **React 18** — UI library, hooks only (no classes)
- **Vite** — build tool and dev server
- **@tanstack/react-query v5** — server state management (queries and mutations)
- **Plain CSS** — one stylesheet per component, no CSS frameworks
- **Roboto** — font via Google Fonts

## Running Locally

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Deploying to Vercel

### Option A — Vercel CLI

```bash
# Install the Vercel CLI globally
npm install -g vercel

# Deploy from the project root
vercel
```

Log in when the browser opens, accept all defaults (Vercel detects Vite automatically), and your app will be live. For subsequent deploys:

```bash
vercel --prod
```

### Option B — Vercel Dashboard (no CLI)

1. Push the project to a GitHub repository:
   ```bash
   git add .
   git commit -m "initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the GitHub repo

3. Leave all build settings as default — Vercel detects Vite automatically:
   - **Build command:** `vite build`
   - **Output directory:** `dist`

4. Click **Deploy**. Every push to `main` will trigger an automatic re-deploy.

## Core Features

All required features from the spec are implemented:

| Feature | Details |
|---|---|
| Login | Username entry modal shown on first visit |
| View posts | Fetches from `GET https://dev.codeleap.co.uk/careers/` |
| Create post | `POST` with username, title, and content |
| Edit post | `PATCH` — only title and content can be changed |
| Delete post | `DELETE` with confirmation modal |
| Ownership check | Edit and delete buttons only appear on posts owned by the logged-in user |
| React Query | All data fetching and mutations use `useQuery`/`useMutation`/`useInfiniteQuery` |
| Hooks | All components are functional with React hooks — no class components |
| Trailing slash | All API calls include trailing slash as required by Django |

## Add-ons

Beyond the core requirements, the following improvements were implemented:

### Toast Notifications
Success and error toasts appear at the bottom of the screen after every API operation (create, edit, delete). Auto-dismiss after 3.5 seconds. Implemented as a custom `useToast` hook.

### Loading Skeletons
While posts are loading from the API, animated skeleton cards are shown in place of real content. The shimmer animation gives a polished loading experience.

### Personalized Greeting
The create post form greets the logged-in user by name: *"Hello [username]! What's on your mind?"*

### Search and Filtering
A search input in the feed controls filters posts by username in real time (client-side, no extra API calls).

### Sorting
Posts can be sorted by date — latest first or oldest first — via a toggle button. Default is latest first.

### Empty State UI
When there are no posts to display, a friendly empty state is shown with a chat icon and contextual message:
- *"No posts yet — Be the first to share something!"* for an empty feed
- *"No posts found — Try a different username to search for."* when a search yields no results

### Pagination (Load More)
Uses `useInfiniteQuery` to support paginated loading. A "Load more" button appears at the bottom of the feed when the API has additional pages, and disappears once all posts are loaded.

### Logout
A logout button in the header clears the session and returns the user to the login screen.

### Responsiveness
The layout adapts to all screen sizes:
- Feed container is capped at 800px and centered on large screens
- On screens smaller than 600px, padding and font sizes are reduced
- Modals use `min(660px, calc(100% - 32px))` to fit small screens without overflow

### Click-Outside to Close
Both the edit and delete modals close when the user clicks the backdrop outside the modal content.

## Project Structure

```
src/
├── api.js                  # All API calls (fetch, create, update, delete)
├── main.jsx                # Entry point with QueryClientProvider
├── App.jsx                 # Login gate — shows LoginModal or Feed
├── index.css               # Global reset and font
├── hooks/
│   └── useToast.js         # Custom hook for toast state management
├── utils/
│   └── date.js             # timeAgo helper for relative timestamps
└── components/
    ├── LoginModal           # Username entry screen
    ├── Feed                 # Main feed with all state and mutations
    ├── CreatePost           # New post form
    ├── PostCard             # Individual post display
    ├── PostCardSkeleton     # Animated loading placeholder
    ├── EditModal            # Edit title/content modal
    ├── DeleteModal          # Delete confirmation modal
    ├── FeedControls         # Search input and sort toggle
    ├── EmptyState           # No posts UI
    ├── FormField            # Reusable input/textarea field
    └── Toast                # Notification banner
```

## Demo
[https://drive.google.com/file/d/1taiPrsnFU09lZ5h6tCI-iSUKhs28PdgP/view?usp=sharing
](Codeleap Video Demo)
![codeleap-mobile](https://github.com/user-attachments/assets/bf6499bf-bbd3-4429-9403-40bfe38734c2)
