import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("ak-theme") as Theme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("ak-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Shared color tokens based on theme
export function useColors() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return {
    dark,
    bg: dark ? "#0F172A" : "#F8FAFC",
    bgAlt: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    surface: dark ? "bg-white/5" : "bg-gray-100/80",
    surfaceBorder: dark ? "border-white/5" : "border-gray-200",
    surfaceHoverBorder: dark ? "hover:border-white/15" : "hover:border-gray-300",
    text: dark ? "text-white" : "text-gray-900",
    textSecondary: dark ? "text-gray-400" : "text-gray-600",
    textMuted: dark ? "text-gray-500" : "text-gray-500",
    navBg: dark ? "bg-[#0F172A]/80" : "bg-white/80",
    navBorder: dark ? "border-white/5" : "border-gray-200",
    cardBg: dark ? "bg-white/5 backdrop-blur-sm" : "bg-white shadow-sm",
    cardBorder: dark ? "border-white/5" : "border-gray-200/60",
    inputBg: dark ? "bg-white/5" : "bg-gray-50",
    inputBorder: dark ? "border-white/10" : "border-gray-300",
    inputText: dark ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400",
    tagBg: dark ? "bg-white/[0.04] border-white/10" : "bg-gray-100 border-gray-200",
    tagText: dark ? "text-gray-300" : "text-gray-700",
    iconText: dark ? "text-gray-400" : "text-gray-500",
    heroGradient: dark
      ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200"
      : "text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900",
    footerBorder: dark ? "border-white/5" : "border-gray-200",
    scrollNodeRing: dark ? "ring-[#0F172A]" : "ring-[#F8FAFC]",
    socialBorder: dark ? "border-white/10" : "border-gray-300",
    socialHover: dark ? "hover:text-white hover:border-white/30 hover:bg-white/5" : "hover:text-gray-900 hover:border-gray-400 hover:bg-gray-100",
    contactBtnBorder: dark ? "border-white/20 text-white hover:bg-white/5" : "border-gray-300 text-gray-900 hover:bg-gray-100",
    overlayGradient: dark ? "from-[#0F172A]" : "from-[#F8FAFC]",
    overlayMid: dark ? "via-[#0F172A]/60" : "via-[#F8FAFC]/60",
  };
}
