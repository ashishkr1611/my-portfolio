import { useState } from "react";
import { motion } from "motion/react";
import { Send, Mail, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useColors } from "./ThemeContext";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const c = useColors();

  const validate = () => {
    let newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      console.log("Submission result:", result);

      if (response.ok && !result.error) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Submission error details:", result.error || result);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-blue-400 mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Get in Touch</p>
          <h2 className={c.text + " mb-4"} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">amazing</span>
          </h2>
          <p className={c.textSecondary + " max-w-lg mx-auto"} style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
            Have a project in mind? I'd love to hear about it. Drop me a message and let's create something extraordinary together.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className={`backdrop-blur-sm border rounded-2xl p-8 space-y-6 contact-form ${c.cardBg} ${c.cardBorder}`}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={c.textSecondary + " mb-2 block"} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem" }}>Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500/50 focus:outline-none transition-colors contact-input ${c.inputBg} ${errors.name ? 'border-red-500/50' : c.inputBorder} ${c.inputText}`}
                    placeholder="Your name"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}
                  />
                  {errors.name && <p className="text-red-400 mt-1" style={{ fontSize: "0.75rem" }}>{errors.name}</p>}
                </div>
                <div>
                  <label className={c.textSecondary + " mb-2 block"} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem" }}>Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500/50 focus:outline-none transition-colors contact-input ${c.inputBg} ${errors.email ? 'border-red-500/50' : c.inputBorder} ${c.inputText}`}
                    placeholder="your@email.com"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}
                  />
                  {errors.email && <p className="text-red-400 mt-1" style={{ fontSize: "0.75rem" }}>{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className={c.textSecondary + " mb-2 block"} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem" }}>Message</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className={`w-full border rounded-xl px-4 py-3 focus:border-blue-500/50 focus:outline-none transition-colors resize-none contact-input ${c.inputBg} ${errors.message ? 'border-red-500/50' : c.inputBorder} ${c.inputText}`}
                  placeholder="Tell me about your project..."
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}
                />
                {errors.message && <p className="text-red-400 mt-1" style={{ fontSize: "0.75rem" }}>{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`}
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
              >
                {status === "idle" && (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
                {status === "loading" && (
                  <>
                    Sending... <Loader2 size={16} className="animate-spin" />
                  </>
                )}
                {status === "success" && (
                  <>
                    Message Sent! <CheckCircle size={16} />
                  </>
                )}
                {status === "error" && (
                  <>
                    Try Again <AlertCircle size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "work.ashish00@gmail.com", href: "mailto:work.ashish00@gmail.com" },
              { icon: MapPin, label: "Location", value: "Greater Noida, Uttar Pradesh, India" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className={`backdrop-blur-sm border rounded-2xl p-6 contact-info ${c.cardBg} ${c.cardBorder}`}>
                <Icon size={20} className="text-blue-400 mb-3" />
                <p className={c.textMuted} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}>{label}</p>
                {href ? (
                  <motion.a 
                    href={href}
                    initial="initial"
                    whileHover="hover"
                    className={`${c.text} hover:text-blue-400 transition-colors cursor-pointer relative inline-block pb-0.5`}
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}
                  >
                    {value}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-400 to-purple-400"
                      variants={{
                        initial: { scaleX: 0, opacity: 0 },
                        hover: { scaleX: 1, opacity: 1 }
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ originX: 0 }}
                    />
                  </motion.a>
                ) : (
                  <p className={c.text} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}>{value}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}