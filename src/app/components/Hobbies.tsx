import { motion } from "motion/react";
import { Gamepad2, Camera, Navigation, Music, BookOpen, Dumbbell } from "lucide-react";
import { useColors } from "./ThemeContext";

const hobbies = [
  { title: "Gaming", desc: "Exploring virtual worlds and strategy games", icon: Gamepad2 },
  { title: "Photography", desc: "Capturing moments and editing visuals", icon: Camera },
  { title: "Traveling", desc: "Discovering new places and cultures", icon: Navigation },
  { title: "Music", desc: "Listening to and exploring different genres", icon: Music },
  { title: "Reading", desc: "Tech blogs, self-improvement, and fiction", icon: BookOpen },
  { title: "Fitness", desc: "Staying active with workouts and sports", icon: Dumbbell },
];

export function Hobbies() {
  const c = useColors();

  return (
    <section id="hobbies" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Hobbies
          </h2>
          <p className={c.textSecondary} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem" }}>
            What I enjoy outside of work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`group relative border rounded-2xl p-7 text-center transition-all ${
                c.dark
                  ? "bg-[#111a2e]/80 border-blue-500/15 hover:border-blue-500/40"
                  : "bg-white border-gray-200 hover:border-blue-300 shadow-sm"
              } hobby-card`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20 hobby-icon-box">
                  <hobby.icon size={24} className="text-white" />
                </div>
                <h3
                  className={c.text + " mb-2"}
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.05rem" }}
                >
                  {hobby.title}
                </h3>
                <p
                  className={c.textSecondary}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.6 }}
                >
                  {hobby.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}