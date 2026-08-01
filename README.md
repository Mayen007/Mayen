# Mayen Akech — Portfolio

> Full-Stack Developer with a Frontend focus | React & MERN Stack

A modern, responsive portfolio site showcasing my projects, skills, and experience. Built with React and Tailwind CSS, with live GitHub data pulled in via the GitHub API.

**Live site:** [makech.me](https://www.makech.me)

## Features

- **Dark/light mode** — theme toggle with localStorage persistence and system preference detection
- **Live GitHub integration** — pulls repositories, pinned projects, and contribution activity directly from the GitHub API
- **Smooth animations** — Framer Motion throughout, including an animated hero and scroll-triggered transitions
- **Fully responsive** — built mobile-first, tested across breakpoints
- **Performance-minded** — React Query caching, lazy loading, code splitting
- **SEO-ready** — meta tags, Open Graph, and semantic HTML

## Tech stack

**Frontend**
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router

**APIs & data**
- GitHub REST API
- GitHub GraphQL API (pinned repos, contributions)
- Octokit
- React Query

**Other libraries**
- React Markdown
- React Icons (Feather Icons, Simple Icons)
- React GitHub Calendar
- React Type Animation

## Getting started

### Prerequisites

- Node.js 18+ and npm
- A GitHub Personal Access Token (for API access)

### Installation

```bash
git clone https://github.com/Mayen007/Mayen.git
cd Mayen
npm install
```

Create a `.env` file in the root directory:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
VITE_GITHUB_USERNAME=your_github_username_here
```

Generate a token at [github.com/settings/tokens](https://github.com/settings/tokens).

Start the dev server:

```bash
npm run dev
```

Then open `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

## Project structure

````
Mayen/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   └── ui/               # Reusable UI components
│   ├── context/              # React Context (Theme)
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # GitHub API client, React Query config
│   ├── utils/                # Helpers, caching logic
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
````

## Component architecture

**UI components**
- `Button` — primary, secondary, and ghost variants
- `Card` — glass-morphism container with built-in animation
- `Loading` — spinner and skeleton loaders
- `ErrorMessage` — user-facing error display
- `Container` / `Section` — consistent layout wrappers

**Layout components**
- `Header` — responsive nav with theme toggle and active-link tracking
- `Footer` — social links and copyright

**Page sections**
- `Hero` — animated intro with typing effect and live GitHub stats
- `About` — bio and background
- `Skills` — tech stack, grouped by category
- `Projects` — dynamic project showcase pulled from GitHub
- `Timeline` — education and milestones
- `GitHub Activity` — contribution calendar
- `Contact` — contact details and social links

## Key features in detail

**GitHub API integration**
- Fetches profile, repositories, and pinned projects
- Displays live star/fork counts and primary language per repo
- Renders a contribution calendar and recent activity feed
- Handles API rate limits and fetch errors gracefully

**Theme system**
- Dark and light mode with system preference detection
- Persisted across sessions via localStorage
- Smooth color transitions on toggle

**Performance**
- React Query caching (10–15 minute stale time)
- localStorage backup cache for GitHub data
- Lazy loading and code splitting
- Optimized asset loading

## Environment variables

| Variable | Description | Required |
|---|---|---|
| `VITE_GITHUB_TOKEN` | GitHub Personal Access Token | Yes |
| `VITE_GITHUB_USERNAME` | Your GitHub username | Yes |
| `VITE_GITHUB_FEATURED_REPOS` | Comma-separated repo names, used as a fallback if pinned repos can't be fetched | No |

## Deployment

### Netlify

1. Push your changes to GitHub.
2. In [Netlify](https://netlify.com), select **Add new site → Import an existing project**, connect your GitHub account, and choose this repository. Netlify will auto-detect build settings from `netlify.toml`.
3. Under **Site settings → Environment variables**, add `VITE_GITHUB_TOKEN` and `VITE_GITHUB_USERNAME`.
4. Deploy. Your site will be live at `https://your-site-name.netlify.app` — add a custom domain under **Site settings → Domain management** if needed.

Netlify auto-deploys on every push to `main`. Configure branch previews in `netlify.toml` if needed.

### Manual deployment

```bash
npm run build
# Deploy the contents of the 'dist' directory to your hosting provider
```

## Contributing

Issues and feature requests are welcome — check the [issues page](https://github.com/Mayen007/Mayen/issues).

## License

[MIT](./LICENSE)

## Author

**Mayen Akech**

- GitHub: [@Mayen007](https://github.com/Mayen007)
- LinkedIn: [Mayen Akech](https://www.linkedin.com/in/makech)
- Email: mayenakech9@gmail.com

---

If you find this useful, a star on the repo is appreciated.
