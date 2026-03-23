import { motion } from "motion/react";
import { Award, BookOpen, Brain, Network, Server, Trophy, Sparkles } from "lucide-react";
import { useColors } from "./ThemeContext";

const certifications = [
  {
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM Certification",
    year: "2026",
    desc: "Completed a 12-hour certification with a perfect score (100%), covering AI fundamentals, machine learning concepts, generative AI applications, and ethical considerations in intelligent systems.",
    icon: Brain,
  },
  {
    title: "Fundamentals of Network Communication",
    issuer: "University of Colorado System (Coursera)",
    year: "2026",
    desc: "Completed a 15-hour course with a grade of 97.70%, covering network protocols, OSI model, data communication, and network architecture with practical understanding of modern communication systems.",
    icon: Network,
  },
  {
    title: "How to Use ChatGPT and Generative AI for Passive Income",
    issuer: "Packt (Coursera)",
    year: "2025",
    desc: "Completed a 3-hour practical course with a 93% grade, focused on using ChatGPT and generative AI tools for content creation, automation, and building digital income streams. Learned how to leverage AI for productivity, marketing, and real-world applications.",
    icon: Brain,
  },
  {
    title: "DevOps Prerequisite Course",
    issuer: "KodeKloud (Coursera)",
    year: "2025",
    desc: "Completed a 13-hour foundational DevOps course with a perfect score (100%), covering Linux fundamentals, application development basics, cloud concepts, and essential DevOps tools including system administration and software deployment.",
    icon: Server,
  },
  {
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    year: "2025",
    desc: "Completed the Generative AI Mastermind program, gaining practical knowledge of modern AI tools, generative models, and real-world AI applications. Explored how AI can be leveraged for productivity, automation, and innovation.",
    icon: Sparkles,
  },
  {
    title: "4-Week Virtual Internship Program",
    issuer: "Certificate of Completion",
    year: "2024",
    desc: "Completed a structured virtual internship gaining hands-on experience in industry workflows.",
    icon: Award,
  },
  {
    title: "International Conference on Advanced Sustainable Futuristic Materials",
    issuer: "Conference Participation",
    year: "2024",
    desc: "Participated in an international conference exploring advanced sustainable futuristic materials and emerging technologies.",
    icon: BookOpen,
  },
  {
    title: "Naukri Campus Young Turks – Certificate of Merit",
    issuer: "Naukri Campus",
    year: "2024",
    desc: "Achieved 94.93 percentile in one of India's largest skill competitions. Recognized by industry experts for strong problem-solving abilities and technical aptitude.",
    icon: Trophy,
  },
];

export function Certifications() {
  const c = useColors();

  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Achievements
          </p>
          <h2 className={c.text} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Certifications
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`group relative backdrop-blur-sm border rounded-2xl p-6 transition-all text-center cert-card ${c.cardBg} ${c.cardBorder} ${c.surfaceHoverBorder}`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className={`mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border flex items-center justify-center mb-5 cert-icon ${c.dark ? "border-white/10" : "border-purple-200"}`}>
                  <cert.icon size={24} className="text-purple-400" />
                </div>
                <h3 className={c.text + " mb-1"} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.05rem" }}>
                  {cert.title}
                </h3>
                <p className="text-purple-300 mb-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem" }}>
                  {cert.issuer}
                </p>
                <span
                  className="inline-block px-3 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
                >
                  {cert.year}
                </span>
                <p className={c.textSecondary} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.6 }}>
                  {cert.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}