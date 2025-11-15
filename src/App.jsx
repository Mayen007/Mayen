/**
 * Main App Component
 * Sets up providers and renders the portfolio
 */

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { queryClient } from "./lib/queryClient";
import { Header, Footer } from "./components/layout";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          {/* Header/Navigation */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow" id="home">
            <div className="container-custom py-32">
              <h1 className="text-4xl md:text-6xl font-bold text-center animate-fade-in">
                <span className="text-gradient">Mayen Akech</span>
              </h1>
              <p className="text-xl text-center mt-4 text-gray-600 dark:text-gray-400 animate-slide-up">
                Full-Stack Developer | Building Solutions, One Bug Fix at a Time
              </p>
              <div className="text-center mt-8 animate-fade-in">
                <p className="text-gray-500 dark:text-gray-500">
                  Portfolio components loading... 🚀
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-600 mt-4">
                  Theme toggle in top right • Navigation ready • GitHub API
                  configured
                </p>
              </div>
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
