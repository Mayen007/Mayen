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
import { Activity } from "./components/Activity";
import { Contact } from "./components/Contact";

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

            {/* Activity Section */}
            <Activity />

            {/* Contact Section */}
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
