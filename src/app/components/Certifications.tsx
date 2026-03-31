import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, BookOpen, Brain, Network, Server, Trophy, Sparkles, ExternalLink, X } from "lucide-react";
import { useColors } from "./ThemeContext";

const certifications = [
  {
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM Certification",
    year: "2026",
    desc: "Completed a 12-hour certification with a perfect score (100%), covering AI fundamentals, machine learning concepts, generative AI applications, and ethical considerations in intelligent systems.",
    icon: Brain,
    link: "/certificates/ibm-ai.pdf",
  },
  {
    title: "Fundamentals of Network Communication",
    issuer: "University of Colorado (Coursera)",
    year: "2026",
    desc: "Completed a 15-hour course with a score of 97.70%, covering core networking concepts including OSI model, TCP/IP, network protocols, and modern communication systems.",
    icon: Network,
    link: "/certificates/network-fundamentals.pdf",
  },
  {
    title: "How to Use ChatGPT and Generative AI for Passive Income",
    issuer: "Packt (Coursera)",
    year: "2025",
    desc: "Completed a 3-hour practical course with a 93% grade, focused on using ChatGPT and generative AI tools for content creation, automation, and building digital income streams. Learned how to leverage AI for productivity, marketing, and real-world applications.",
    icon: Brain,
    link: "/certificates/chatgpt-ai.pdf",
  },
  {
    title: "DevOps Prerequisite Course",
    issuer: "KodeKloud (Coursera)",
    year: "2025",
    desc: "Completed a 13-hour foundational DevOps course with a perfect score (100%), covering Linux fundamentals, application development basics, cloud concepts, and essential DevOps tools including system administration and software deployment.",
    icon: Server,
    link: "/certificates/devops-prerequisite.pdf",
  },
  {
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    year: "2025",
    desc: "Completed the Generative AI Mastermind program, gaining practical knowledge of modern AI tools, generative models, and real-world AI applications. Explored how AI can be leveraged for productivity, automation, and innovation.",
    icon: Sparkles,
    link: "/certificates/generative-ai-mastermind.pdf",
  },
  {
    title: "4-Week Virtual Internship Program",
    issuer: "Certificate of Completion",
    year: "2024",
    desc: "Completed a structured virtual internship gaining hands-on experience in industry workflows.",
    icon: Award,
    link: "/certificates/virtual-internship.pdf",
  },
  {
    title: "International Conference on Advanced Sustainable Futuristic Materials",
    issuer: "Conference Participation",
    year: "2024",
    desc: "Participated in an international conference exploring advanced sustainable futuristic materials and emerging technologies.",
    icon: BookOpen,
    link: "/certificates/sustainable-futuristic-materials.pdf",
  },
  {
    title: "Cloud Technologies & Role of Hypervisor in Virtualization",
    issuer: "Sharda University",
    year: "2024",
    desc: "Completed a 30-hour value-added course covering cloud technologies, virtualization concepts, and the role of hypervisors in modern computing systems.",
    icon: Server,
    link: "/certificates/cloud-virtualization.pdf",
  },
  {
    title: "Naukri Campus Young Turks – Certificate of Merit",
    issuer: "Naukri Campus",
    year: "2024",
    desc: "Achieved 94.93 percentile in one of India's largest skill competitions. Recognized by industry experts for strong problem-solving abilities and technical aptitude.",
    icon: Trophy,
    link: "/certificates/naukri-campus.pdf",
  },
];

export function Certifications() {
  const c = useColors();
  const [selectedCert, setSelectedCert] = useState<{ title: string; link: string } | null>(null);

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
                <p className={c.textSecondary + " mb-5"} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.6 }}>
                  {cert.desc}
                </p>
                <motion.button
                  onClick={() => setSelectedCert({ title: cert.title, link: cert.link })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-all cursor-pointer`}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 500 }}
                >
                  View Certificate <ExternalLink size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-5xl h-[80vh] md:h-[90vh] rounded-3xl overflow-hidden shadow-2xl border ${c.cardBg} ${c.cardBorder}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between z-10">
                <h3 className="text-white font-semibold pr-8" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {selectedCert.title}
                </h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors backdrop-blur-sm cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              
              <iframe
                src={selectedCert.link}
                className="w-full h-full border-none bg-white"
                title={selectedCert.title}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}