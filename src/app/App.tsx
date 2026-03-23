import { useState, useCallback } from "react";
import { ThemeProvider, useColors } from "./components/ThemeContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ScrollStory } from "./components/ScrollStory";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Hobbies } from "./components/Hobbies";
import { Contact } from "./components/Contact";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);
  const c = useColors();

  return (
    <>
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <div
        className={`relative min-h-screen transition-colors duration-500 ${loading ? "overflow-hidden h-screen" : ""}`}
        style={{ fontFamily: "Inter, sans-serif", overflowX: "clip", background: c.bg }}
      >
        <Navbar />
        <Hero />
        <div id="about" className="relative">
          <ScrollStory />
        </div>
        <Education />
        <Certifications />
        <Projects />
        <Skills />
        <Experience />
        <Hobbies />
        <Contact />

        {/* Footer */}
        <footer className={`border-t py-8 px-6 text-center ${c.footerBorder}`}>
          <p className={c.textMuted} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem" }}>
            &copy; 2026 Ashish Kumar. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}