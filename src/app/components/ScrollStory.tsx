import { useRef, useState, useEffect } from "react";
import { Lightbulb, Palette, Code2, Rocket } from "lucide-react";
import { useColors } from "./ThemeContext";

const steps = [
  {
    label: "Idea",
    num: "01",
    desc: "Every great project begins with a problem worth solving. I research, brainstorm, and distill complex challenges into clear, actionable concepts.",
    details: ["User Research", "Problem Definition", "Brainstorming", "Feasibility Analysis"],
    icon: Lightbulb,
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(251, 191, 36, 0.15)",
    bgWord: "THINK",
  },
  {
    label: "Design",
    num: "02",
    desc: "Pixels with purpose. I craft intuitive interfaces and design systems that balance aesthetics with usability — every detail intentional.",
    details: ["Wireframing", "UI/UX Design", "Prototyping", "Design Systems"],
    icon: Palette,
    gradient: "from-pink-400 to-purple-500",
    glow: "rgba(236, 72, 153, 0.15)",
    bgWord: "CRAFT",
  },
  {
    label: "Build",
    num: "03",
    desc: "Clean architecture, performant code, and scalable solutions. I turn designs into production-ready applications with modern tech stacks.",
    details: ["Frontend Dev", "Backend APIs", "Testing", "CI/CD Pipelines"],
    icon: Code2,
    gradient: "from-blue-400 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.15)",
    bgWord: "CODE",
  },
  {
    label: "Result",
    num: "04",
    desc: "Ship, measure, iterate. Delivering polished products that make real impact — then continuously improving based on data and feedback.",
    details: ["Deployment", "Performance", "Analytics", "Iteration"],
    icon: Rocket,
    gradient: "from-green-400 to-emerald-500",
    glow: "rgba(52, 211, 153, 0.15)",
    bgWord: "SHIP",
  },
];

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const c = useColors();

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const sectionHeight = ref.current.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / sectionHeight)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = Math.min(Math.floor(progress * steps.length), steps.length - 1);

  return (
    <section ref={ref} className="relative" style={{ height: `${steps.length * 80}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background word */}
        {steps.map((step, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={step.bgWord}
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none transition-opacity duration-700"
              style={{ opacity: isActive ? 0.04 : 0 }}
            >
              <span
                className="text-white whitespace-nowrap"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(8rem, 22vw, 20rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                {step.bgWord}
              </span>
            </div>
          );
        })}

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const size = 2 + Math.random() * 3;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 5;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400/20 scroll-particle"
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
                animation: `float ${4 + Math.random() * 4}s ease-in-out ${delay}s infinite alternate`,
              }}
            />
          );
        })}

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          {/* Top: step indicators */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-12">
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              return (
                <div key={step.num} className="flex items-center gap-2 md:gap-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        width: isActive ? 44 : 32,
                        height: isActive ? 44 : 32,
                        background: isActive
                          ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                          : isPast
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(255,255,255,0.05)",
                        boxShadow: isActive ? `0 0 24px ${step.glow}` : "none",
                      }}
                    >
                      {isActive ? (
                        <div
                          className={`rounded-full flex items-center justify-center bg-gradient-to-br ${step.gradient}`}
                          style={{ width: "100%", height: "100%" }}
                        >
                          <step.icon size={isActive ? 20 : 14} className="text-white" />
                        </div>
                      ) : (
                        <span
                          className="text-gray-500"
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", fontWeight: 600 }}
                        >
                          {isPast ? "✓" : step.num}
                        </span>
                      )}
                    </div>
                    <span
                      className="hidden md:block transition-colors duration-300"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        color: isActive ? "white" : isPast ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-8 md:w-16 h-px mb-4 md:mb-5 overflow-hidden bg-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-500 origin-left"
                        style={{ transform: `scaleX(${isPast ? 1 : isActive ? ((progress * steps.length) - i) : 0})` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Main card */}
          <div className="relative" style={{ minHeight: 320 }}>
            {steps.map((step, i) => {
              const stepStart = i / steps.length;
              const stepEnd = (i + 1) / steps.length;
              const stepLen = stepEnd - stepStart;

              let opacity = 0;
              let y = 50;
              let scale = 0.95;

              if (progress >= stepStart && progress < stepEnd) {
                const local = (progress - stepStart) / stepLen;
                opacity = 1;
                y = 0;
                scale = 1;

                if (i > 0 && local < 0.15) {
                  const t = local / 0.15;
                  opacity = t;
                  y = 50 * (1 - t);
                  scale = 0.95 + 0.05 * t;
                }
                if (i < steps.length - 1 && local > 0.85) {
                  const t = (local - 0.85) / 0.15;
                  opacity = 1 - t;
                  y = -30 * t;
                  scale = 1 - 0.05 * t;
                }
              } else if (progress >= stepEnd && i === steps.length - 1) {
                opacity = 1;
                y = 0;
                scale = 1;
              }

              return (
                <div
                  key={step.label}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity,
                    transform: `translateY(${y}px) scale(${scale})`,
                    pointerEvents: opacity > 0.5 ? "auto" : "none",
                  }}
                >
                  <div
                    className="w-full max-w-3xl rounded-3xl border border-white/10 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    {/* Accent glow */}
                    <div
                      className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl"
                      style={{ background: step.glow, opacity: 0.6 }}
                    />
                    <div
                      className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl"
                      style={{ background: step.glow, opacity: 0.3 }}
                    />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start gap-5 mb-6">
                        <div
                          className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}
                          style={{ boxShadow: `0 8px 32px ${step.glow}` }}
                        >
                          <step.icon size={28} className="text-white" />
                        </div>
                        <div>
                          <span
                            className="text-gray-500 block mb-1"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em" }}
                          >
                            STEP {step.num}
                          </span>
                          <h3
                            className={`text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`}
                            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
                          >
                            {step.label}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className="text-gray-400 mb-8"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 520 }}
                      >
                        {step.desc}
                      </p>

                      {/* Detail tags */}
                      <div className="flex flex-wrap gap-2">
                        {step.details.map((d) => (
                          <span
                            key={d}
                            className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-gray-400"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem" }}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll hint */}
          {progress < 0.05 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-gray-500" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                SCROLL
              </span>
              <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
                <div className="w-1 h-2 rounded-full bg-white/40 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS for floating particles */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          100% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}