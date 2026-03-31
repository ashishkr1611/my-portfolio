import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { useColors } from "./ThemeContext";

const education = [
  {
    degree: "Master of Computer Applications (MCA) — Online Mode",
    school: "Manipal University Jaipur (Online / MAHE)",
    year: "2025 - Present",
    desc: "Currently pursuing MCA to deepen expertise in computer science and software development.",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Sharda University, Greater Noida",
    year: "2022 - 2025",
    desc: "Comprehensive study of programming, data structures, databases, and web technologies.",
  },
  {
    degree: "Intermediate (Class XII) — Bihar School Examination Board",
    school: "S.N.S College, Motihari",
    year: "2020 - 2022",
    desc: "Percentage: 70.6%",
  },
  {
    degree: "Matriculation (Class X) — CBSE",
    school: "CS DAV Public School, Motihari",
    year: "2019 - 2020",
    desc: "Percentage: 80.4%",
  },
];

export function Education() {
  const c = useColors();

  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Background
          </p>
          <h2 className={c.text} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Education
            </span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className={`group relative backdrop-blur-sm border rounded-2xl p-6 md:p-8 transition-all flex gap-6 items-start edu-card ${c.cardBg} ${c.cardBorder} ${c.surfaceHoverBorder}`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className={`relative z-10 shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border flex items-center justify-center edu-icon ${c.dark ? "border-white/10" : "border-blue-200"}`}>
                <GraduationCap size={22} className="text-blue-400" />
              </div>

              <div className="relative z-10 flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className={c.text} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.15rem" }}>
                    {edu.degree}
                  </h3>
                  <span
                    className="px-3 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    {edu.year}
                  </span>
                </div>
                <p className="text-purple-300 mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}>
                  {edu.school}
                </p>
                <p className={c.textSecondary} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {edu.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}