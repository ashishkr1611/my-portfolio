import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"draw" | "glow" | "exit">("draw");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("glow"), 1800);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    const t3 = setTimeout(onComplete, 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F172A]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/30"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: (Math.random() - 0.5) * 600,
                y: (Math.random() - 0.5) * 600,
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2.5,
                delay: 0.5 + i * 0.08,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Outer ring */}
          <motion.div
            className="absolute w-40 h-40 rounded-full border border-blue-500/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === "glow" ? [1, 1.3, 0] : [0, 1],
              opacity: phase === "glow" ? [0.5, 0.8, 0] : [0, 0.5],
            }}
            transition={{ duration: phase === "glow" ? 0.8 : 1, ease: "easeOut" }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-purple-500/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === "glow" ? [1, 1.5, 0] : [0, 1],
              opacity: phase === "glow" ? [0.4, 0.6, 0] : [0, 0.4],
            }}
            transition={{ duration: phase === "glow" ? 0.8 : 1, delay: 0.15, ease: "easeOut" }}
          />

          {/* Glow burst */}
          {phase === "glow" && (
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-[80px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5], opacity: [0, 0.8, 0] }}
              transition={{ duration: 1 }}
            />
          )}

          {/* Initials */}
          <div className="relative flex items-center gap-1">
            {/* A */}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-400 to-blue-300"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "5rem", lineHeight: 1 }}
              initial={{ opacity: 0, y: 40, scale: 0.5, filter: "blur(10px)" }}
              animate={{
                opacity: 1,
                y: 0,
                scale: phase === "glow" ? [1, 1.1, 1] : 1,
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              A
            </motion.span>

            {/* K */}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-blue-400 to-purple-300"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "5rem", lineHeight: 1 }}
              initial={{ opacity: 0, y: -40, scale: 0.5, filter: "blur(10px)" }}
              animate={{
                opacity: 1,
                y: 0,
                scale: phase === "glow" ? [1, 1.1, 1] : 1,
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              K
            </motion.span>
          </div>

          {/* Subtitle */}
          <motion.p
            className="absolute mt-32 text-gray-500"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === "glow" ? [0.7, 1] : [0, 0.7], y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Ashish Kumar
          </motion.p>

          {/* Bottom loading bar */}
          <motion.div
            className="absolute bottom-16 w-48 h-[2px] rounded-full bg-white/5 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.6, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
