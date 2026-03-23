import { motion } from "motion/react";
import { useColors } from "./ThemeContext";

const experience = [
  {
    year: "May 2024 - Jun 2024",
    role: "E-Commerce Operations Intern",
    company: "Phooldaan",
    desc: "Organized and maintained structured Excel spreadsheets for e-commerce workflows. Conducted regular data quality checks to identify and correct inconsistencies. Collaborated with team members to streamline data entry processes and maintain data integrity.",
  },
  {
    year: "Feb 2024 - Mar 2024",
    role: "Research Project",
    company: "Campus Navigation using Video-Enriched SUMAP",
    desc: "Researched a video-based campus navigation system to improve student onboarding. Proposed integration with existing college systems to enhance accessibility. Applied multimedia techniques to improve navigation clarity and user engagement.",
  },
];

export function Experience() {
  const c = useColors();

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-blue-400 mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Career</p>
          <h2 className={c.text} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent exp-timeline-line" />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 z-10 mt-6 ring-4 ${c.scrollNodeRing} exp-dot`} />

              <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className={`group relative backdrop-blur-sm border rounded-2xl p-6 transition-all ${c.cardBg} ${c.cardBorder} ${c.surfaceHoverBorder} exp-card`}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <span className="text-blue-400" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 500 }}>{exp.year}</span>
                    <h3 className={c.text + " mt-1"} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.15rem" }}>{exp.role}</h3>
                    <p className="text-purple-300 mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}>{exp.company}</p>
                    <p className={c.textSecondary} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.6 }}>{exp.desc}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}