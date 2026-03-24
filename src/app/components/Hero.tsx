import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Github, Linkedin, ArrowDown, Mail } from "lucide-react";
import { useColors } from "./ThemeContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CanvasBackground } from "./CanvasBackground";
import profilePhoto from "@/assets/photo.png";

const PROFILE_IMG = profilePhoto;

const titles = ["E-Commerce Operations", "Data Management", "Research Enthusiast", "Quick Learner"];

export function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const c = useColors();
  
  // Parallax setup
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]); // Slower moving
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]); // Faster moving opposite
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const current = titles[titleIdx];
    const speed = deleting ? 40 : 80;
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % titles.length);
      return;
    }
    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, titleIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: y1 }} className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[128px] ${c.dark ? "bg-blue-500/20" : "bg-blue-500/10"} hero-orb-1`} />
        <motion.div style={{ y: y2 }} className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[128px] ${c.dark ? "bg-purple-500/20" : "bg-purple-500/10"} hero-orb-2`} />
        <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-[100px] ${c.dark ? "bg-indigo-500/10" : "bg-indigo-500/5"}`} />
      </div>

      {/* Canvas Particle Background */}
      <CanvasBackground />

      <motion.div style={{ opacity, y: useTransform(scrollY, [0, 500], [0, 100]) }} className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative group">
            {/* Rotating gradient border */}
            <div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 group-hover:opacity-100 transition-opacity duration-500"
              style={{ animation: "spin-slow 4s linear infinite" }}
            />
            {/* Glow effect */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Photo container */}
            <div
              className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-[3px]"
              style={{ borderColor: c.bg }}
            >
              <ImageWithFallback
                src={PROFILE_IMG}
                alt="Ashish Kumar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status indicator */}
            <motion.div
              className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-400 border-[3px]"
              style={{ borderColor: c.bg }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-blue-400 mb-4"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          Welcome to my world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={c.heroGradient + " mb-4"}
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.1 }}
        >
          Hi, I'm Ashish Kumar
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 h-12 flex items-center justify-center"
        >
          <span className={c.textSecondary} style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>
            {text}
            <span className="inline-block w-[2px] h-6 bg-blue-400 ml-1 animate-pulse" />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem" }}
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className={`px-8 py-3 rounded-full border transition-all cursor-pointer ${c.contactBtnBorder}`}
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem" }}
          >
            Contact Me
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-5 justify-center hero-socials"
        >
          {[
            { icon: Github, href: "https://github.com/ashishkr1611" },
            { icon: Linkedin, href: "https://linkedin.com/in/ashish2510" },
            { icon: Mail, href: "mailto:work.ashish00@gmail.com" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${c.socialBorder} ${c.iconText} ${c.socialHover}`}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={c.textMuted + " absolute bottom-10 left-1/2 -translate-x-1/2"}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}