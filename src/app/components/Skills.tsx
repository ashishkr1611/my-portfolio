import { motion } from "motion/react";
import { Code, Brain, Server, Wrench, Cpu, Database } from "lucide-react";
import { useColors } from "./ThemeContext";

const categories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["C", "C++", "Python", "SQL", "HTML", "CSS"],
  },
  {
    title: "AI/ML",
    icon: Brain,
    skills: ["Machine Learning", "Prompt Engineering"],
  },
  {
    title: "Backend & Cloud",
    icon: Server,
    skills: ["Supabase", "Clerk", "Vercel"],
  },
  {
    title: "Developer Tools",
    icon: Wrench,
    skills: ["GitHub", "VS Code", "Arduino IDE"],
  },
  {
    title: "Core CS Concepts",
    icon: Cpu,
    skills: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "OOP"],
  },
  {
    title: "Data Management",
    icon: Database,
    skills: ["SQL", "MySQL", "Excel / Google Sheets"],
  },
];

export function Skills() {
  const c = useColors();

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", fontStyle: "italic" }}
          >
            Technical Skills
          </h2>
          <p className={c.textSecondary} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem" }}>
            Technologies and tools I work with.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`group relative backdrop-blur-sm border rounded-2xl p-6 transition-all skill-card ${c.cardBg} ${c.cardBorder} ${c.surfaceHoverBorder}`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <cat.icon size={18} className={c.iconText} />
                <h3 className={c.text} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}>
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-1.5 rounded-lg border transition-all cursor-default skill-badge ${c.dark ? "bg-white/[0.04] border-white/10 text-gray-300 hover:border-blue-500/40 hover:text-white" : "bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600"}`}
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}