# Mayen Akech - Portfolio

> Full-Stack Developer | Building Solutions, One Bug Fix at a Time 🚀

A modern, responsive portfolio website showcasing my projects, skills, and experience. Built with React, Tailwind CSS, and integrated with the GitHub API for real-time project data.

## ✨ Features

- 🌓 **Dark/Light Mode** - Seamless theme switching with localStorage persistence
- 🔄 **Real-time GitHub Integration** - Automatically fetches and displays projects from GitHub API
- 🎨 **Modern UI/UX** - Glass-morphism effects, smooth animations with Framer Motion
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - React Query caching, lazy loading, code splitting
- 🎯 **SEO Ready** - Meta tags, Open Graph, and semantic HTML
- 📊 **GitHub Stats** - Live contribution calendar and activity feed

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React features and hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing

### APIs & Data

- **GitHub REST API** - Repository and user data
- **GitHub GraphQL API** - Pinned repositories and contributions
- **Octokit** - Official GitHub API client
- **React Query** - Data fetching, caching, and state management

### Additional Libraries

- **React Markdown** - Rendering blog posts and documentation
- **React Icons** - Icon library (Feather Icons, Simple Icons)
- **React GitHub Calendar** - Contribution graph visualization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- GitHub Personal Access Token (for API access)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mayen007/Mayen.git
   cd Mayen
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_GITHUB_TOKEN=your_github_personal_access_token_here
   VITE_GITHUB_USERNAME=your_github_username_here
   ```

   Get your GitHub token at: https://github.com/settings/tokens

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
Mayen/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   └── ui/              # Reusable UI components
│   ├── context/             # React Context (Theme)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # GitHub API, React Query config
│   ├── utils/               # Helper functions, cache
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── .env                     # Environment variables (gitignored)
├── .env.example             # Example environment variables
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Component Architecture

### Reusable UI Components

- **Button** - Multiple variants (primary, secondary, ghost)
- **Card** - Glass-morphism container with animations
- **Loading** - Spinner and skeleton loaders
- **ErrorMessage** - User-friendly error displays
- **Container/Section** - Consistent layout wrappers

### Layout Components

- **Header** - Responsive navigation with theme toggle
- **Footer** - Social links and copyright

### Features (In Progress)

- **Hero** - Animated introduction with GitHub stats
- **Projects** - Dynamic project showcase from GitHub
- **Skills** - Tech stack visualization
- **About** - Bio and professional information
- **Contact** - Contact form and social links

## 🔑 Key Features

### GitHub API Integration

- Fetches user profile, repositories, and pinned projects
- Displays live star counts, fork counts, and languages
- Shows contribution calendar and recent activity
- Rate limit handling and error recovery

### Theme System

- Dark and light mode support
- System preference detection
- Smooth color transitions
- localStorage persistence

### Performance

- React Query caching (10-15 minute stale time)
- localStorage backup caching
- Lazy loading and code splitting
- Optimized images and assets

## 📝 Environment Variables

| Variable                     | Description                                                       | Required |
| ---------------------------- | ----------------------------------------------------------------- | -------- |
| `VITE_GITHUB_TOKEN`          | GitHub Personal Access Token                                      | Yes      |
| `VITE_GITHUB_USERNAME`       | Your GitHub username                                              | Yes      |
| `VITE_GITHUB_FEATURED_REPOS` | Comma-separated repo names used if pinned repos cannot be fetched | No       |

## 🚀 Deployment

### Deploy to Netlify

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account and select the repository
   - Netlify will auto-detect the build settings from `netlify.toml`

3. **Configure Environment Variables**

   In Netlify dashboard, go to:
   - Site settings → Environment variables
   - Add the following variables:
     - `VITE_GITHUB_TOKEN`: Your GitHub Personal Access Token
     - `VITE_GITHUB_USERNAME`: `Mayen007`

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `https://your-site-name.netlify.app`
   - Set up a custom domain in Site settings → Domain management

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting service
# The build output is in the 'dist' directory
```

### Continuous Deployment

Netlify automatically deploys when you push to the main branch. Configure deploy contexts in `netlify.toml` for branch previews and production deployments.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Mayen007/Mayen/issues).

## 📄 License

This project is [MIT](./LICENSE) licensed.

## 👤 Author

**Mayen Akech**

- GitHub: [@Mayen007](https://github.com/Mayen007)
- LinkedIn: [Mayen Akech](https://linkedin.com/in/mayenakech)
- Email: mayenakech9@gmail.com
- FreeCodeCamp: [@Mayen007](https://freecodecamp.org/Mayen007)

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

---

Built with ❤️ by Mayen Akech using React, Tailwind CSS, and Framer Motion

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
