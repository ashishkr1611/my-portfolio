import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useColors } from "./ThemeContext";

const projects = [
  {
    title: "Video-Enriched SUMAP",
    desc: "A video-based campus navigation system to improve student onboarding and enhance accessibility with multimedia techniques.",
    tags: ["Research", "Multimedia", "Navigation", "UX"],
    img: "https://images.unsplash.com/photo-1661776724340-b488f7d67316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBuYXZpZ2F0aW9uJTIwbWFwJTIwdW5pdmVyc2l0eXxlbnwxfHx8fDE3NzQyNjYyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
  },
  {
    title: "E-Commerce Data Operations",
    desc: "Streamlined e-commerce workflows with structured Excel spreadsheets, data quality checks, and process optimization at Phooldaan.",
    tags: ["Excel", "Data Management", "E-Commerce"],
    img: "https://images.unsplash.com/photo-1763568258367-1c52beb60be7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzcHJlYWRzaGVldCUyMGRhdGElMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc3NDI2NjIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: false,
  },
];

export function Projects() {
  const c = useColors();

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-blue-400 mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Portfolio</p>
          <h2 className={c.text} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative rounded-2xl overflow-hidden border cursor-pointer ${c.cardBorder} ${c.dark ? "bg-white/5 backdrop-blur-sm" : "bg-white"} ${
                p.featured ? "md:col-span-2 md:row-span-2" : ""
              } project-card`}
            >
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={p.img}
                  alt={p.title}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${c.dark ? "opacity-40 group-hover:opacity-60" : "opacity-30 group-hover:opacity-50"}`}
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t ${c.overlayGradient} ${c.overlayMid} to-transparent`} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-blue-500/10 to-purple-500/5" />

              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map((t) => (
                    <span key={t} className={`px-2.5 py-1 rounded-full backdrop-blur-sm ${c.dark ? "bg-white/10 text-white/70" : "bg-black/10 text-gray-700"} project-tag`} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className={c.text + " mb-1"} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: p.featured ? "1.5rem" : "1.1rem" }}>
                  {p.title}
                </h3>
                <p className={c.textSecondary + " mb-4"} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
                <div className="flex gap-3">
                  <a href="#" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${c.socialBorder} ${c.iconText} ${c.socialHover}`}>
                    <Github size={14} />
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${c.socialBorder} ${c.iconText} ${c.socialHover}`}>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}