import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import { useTheme, useColors } from "./ThemeContext";

const navLinks = ["About", "Education", "Certifications", "Projects", "Skills", "Experience", "Hobbies", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const c = useColors();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? `${c.navBg} backdrop-blur-xl border-b ${c.navBorder}`
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`${c.text} cursor-pointer nav-logo`} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.25rem" }}>
            AK<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">.</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <motion.button
                key={l}
                onClick={() => scrollTo(l)}
                className={`${c.textSecondary} hover:${c.dark ? "text-white" : "text-gray-900"} transition-colors cursor-pointer nav-link relative py-1 group`}
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
                whileHover="hover"
                initial="initial"
                variants={{
                  initial: { y: 0 },
                  hover: { y: -2 }
                }}
              >
                {l}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                  variants={{
                    initial: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                />
              </motion.button>
            ))}
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors ${c.dark ? "bg-white/10 hover:bg-white/20 text-yellow-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                {c.dark ? <Sun size={16} /> : <Moon size={16} />}
              </motion.div>
            </motion.button>
            <a
              href="/resume.pdf"
              download="Ashish_Kumar_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity nav-resume"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
            >
              <Download size={14} />
              Resume
            </a>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <motion.button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${c.dark ? "bg-white/10 text-yellow-300" : "bg-gray-200 text-gray-700"}`}
              whileTap={{ scale: 0.9, rotate: 180 }}
              aria-label="Toggle theme"
            >
              {c.dark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
            <button className={`${c.text} cursor-pointer`} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`md:hidden backdrop-blur-xl border-b ${c.dark ? "bg-[#0F172A]/95 border-white/5" : "bg-white/95 border-gray-200"}`}
          >
            {navLinks.map((l) => (
              <motion.button
                key={l}
                onClick={() => scrollTo(l)}
                className={`block w-full text-left px-6 py-3 ${c.textSecondary} ${c.dark ? "hover:text-white hover:bg-white/5" : "hover:text-gray-900 hover:bg-gray-100"} transition-colors cursor-pointer`}
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
                whileTap={{ x: 4 }}
              >
                {l}
              </motion.button>
            ))}
            <a
              href="/resume.pdf"
              download="Ashish_Kumar_Resume.pdf"
              className={`flex items-center gap-2 px-6 py-3 ${c.text} ${c.dark ? "hover:bg-white/5" : "hover:bg-gray-100"} transition-colors`}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
            >
              <Download size={14} />
              Download Resume
            </a>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}