/**
 * Main App Component
 * Sets up providers and renders the portfolio
 */

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { queryClient } from "./lib/queryClient";
import { Header, Footer } from "./components/layout";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          {/* Header/Navigation */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow">
            {/* Hero Section */}
            <Hero />

            {/* About Section */}
            <About />

            {/* Skills Section */}
            <Skills />

            {/* Projects Section */}
            <Projects />

            {/* Contact Section - Coming Soon */}
            <section id="contact" className="py-20">
              <div className="container-custom text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                  Contact
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Section coming soon...
                </p>
              </div>
            </section>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
