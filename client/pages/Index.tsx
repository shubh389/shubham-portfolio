import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { ParticleBackground } from "@/components/ui/particle-background";
import { MobileNav } from "@/components/ui/mobile-nav";
import { SimplifiedHero } from "@/components/ui/simplified-hero";
import { CustomCursor, useSupportsCursor } from "@/components/ui/custom-cursor";
import { SimpleNavbar } from "@/components/ui/simple-navbar";
import {
  Github,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Download,
  Code2,
  Rocket,
  Sparkles,
  ArrowDown,
  Send,
  Copy,
  CheckCircle,
  Brain,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Bot,
} from "lucide-react";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const supportsCursor = useSupportsCursor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = [
    {
      name: "React",
      level: 95,
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Node.js",
      level: 90,
      icon: Database,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "TypeScript",
      level: 88,
      icon: Code2,
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Python",
      level: 85,
      icon: Brain,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Blockchain",
      level: 80,
      icon: Globe,
      color: "from-purple-500 to-violet-500",
    },
    { name: "AI/ML", level: 85, icon: Bot, color: "from-pink-500 to-rose-500" },
    {
      name: "MongoDB",
      level: 82,
      icon: Database,
      color: "from-green-600 to-green-800",
    },
    {
      name: "AWS",
      level: 78,
      icon: Cloud,
      color: "from-orange-500 to-red-500",
    },
  ];

  const projects = [
    {
      title: "Quick Cart",
      description:
        "Developed to enable authentic handmade products to be sold by artisans. Through this initiative, traditional art forms and cultural heritage are being preserved.",
      image: "/QuikCart.png",
      technologies: ["Next.js", "Node.js", "Express.js", "MongoDB Atlas", "Clerk Auth" , "Tailwind CSS", "Vercel"],
      liveUrl: "https://quick-cart-bwkt.vercel.app/",
      githubUrl: "https://github.com/shubh389/QuickCart",
      gradient: "from-blue-600 via-purple-600 to-blue-800",
    },
    {
      title: "Seva Sankalp",
      description:
        "Blockchain technology is utilized to ensure proof of origin, while AI is employed to detect deepfakes. The integrity of digital assets is safeguarded through immutable records and smart contracts.",
      image: "/Seva Sankalp.png",
      technologies: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "Solidity", "Ethereum", "Hardhat", "Web3.js", "TensorFlow","OpenCV"," IPFS", "MongoDB", "MetaMask"],
      liveUrl: "https://seva-sankalp-roan.vercel.app/",
      githubUrl: "https://github.com/shubh389/Seva-Sankalp",
      gradient: "from-green-600 via-teal-600 to-green-800",
    },
    {
      title: "AnnaDaan",
      description:
        "Developed to connect households (with surplus food) to volunteers and NGOs, by whom the food is delivered to needy people, orphanages, and old age homes .The gap between food waste and hunger is bridged through the use of technology and community participation.",
      image: "/AnnaDaan.png",
      technologies: ["React", "Node.js", "Express.js", "MongoDB Atlas", "Clerk Auth" , "Tailwind CSS", "Vercel"],
      liveUrl: "https://anndaaan.vercel.app/",
      githubUrl: "https://github.com/shubh389/Anndaaan",
      gradient: "from-purple-600 via-pink-600 to-purple-800",
    },
  ];

  const stats = [
    { label: "Years Experience", value: "4+", icon: Rocket },
    { label: "Projects Completed", value: "50+", icon: Code2 },
    { label: "Happy Clients", value: "25+", icon: Sparkles },
    { label: "Technologies", value: "20+", icon: Globe },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset for fixed navbar
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      // Enhanced smooth scrolling with custom easing
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Alternative implementation for browsers that don't support smooth behavior
      if (!('scrollBehavior' in document.documentElement.style)) {
        smoothScrollPolyfill(offsetPosition);
      }
    }
  };

  // Smooth scroll polyfill for better browser support
  const smoothScrollPolyfill = (targetPosition: number) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // 800ms for smooth animation
    let start: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject: subject || `Project Inquiry from ${name}`,
          message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        // Open mailto link as backup/primary method
        if (result.mailtoUrl) {
          window.location.href = result.mailtoUrl;
        }
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
        console.error("Email sending failed:", result.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error sending email:", error);

      // Fallback to mailto
      const mailtoSubject = subject || `Project Inquiry from ${name}`;
      const mailtoBody = `Hi Shubham,\n\nI'm interested in discussing a project with you.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`;
      const mailtoLink = `mailto:shubhamdev9128@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Simple Navigation */}
      <SimpleNavbar
        activeSection={activeSection}
        isScrolled={isScrolled}
        scrollToSection={scrollToSection}
        scrollYProgress={scrollYProgress}
      />

      {/* Simplified Hero Section */}
      <SimplifiedHero scrollToSection={scrollToSection} />

      {/* Enhanced About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Tech Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Title with Gradient Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background:
                  "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899, #06b6d4)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              About{" "}
              <span className="relative">
                Me
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Enhanced Profile Photo with Effects */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Floating Particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      left: `${20 + i * 8}%`,
                      top: `${15 + (i % 4) * 20}%`,
                    }}
                    animate={{
                      y: [-20, 20, -20],
                      x: [-10, 10, -10],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: 4 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Main Photo Container with Two Opposite Side Curves */}
                <motion.div
                  className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto shadow-2xl"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    borderRadius: "100px 20px 100px 20px",
                    background:
                      "linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)",
                    padding: "3px",
                  }}
                >
                  <div
                    className="w-full h-full bg-black p-2 relative overflow-hidden"
                    style={{
                      borderRadius: "97px 17px 97px 17px",
                    }}
                  >
                    {/* Profile Photo */}
                    <motion.img
                      src="https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2F199507c874244f0f9e886ac688d4e928?format=webp&width=800"
                      alt="Shubham Dev - Full Stack Developer"
                      className="w-full h-full object-cover object-center shadow-xl"
                      style={{
                        borderRadius: "95px 15px 95px 15px",
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      loading="lazy"
                    />

                    {/* Overlay Gradient */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        borderRadius: "95px 15px 95px 15px",
                      }}
                    />

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-sm" />
                    <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-sm" />
                    <div className="absolute bottom-4 left-4 w-5 h-5 bg-gradient-to-br from-pink-400/30 to-transparent rounded-full blur-sm" />
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-sm" />

                    {/* Tech Icons Orbiting */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Database className="absolute top-4 left-1/2 transform -translate-x-1/2 h-6 w-6 text-purple-400 opacity-80" />
                      <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-cyan-400 opacity-80" />
                      <Bot className="absolute bottom-4 left-1/2 transform -translate-x-1/2 h-6 w-6 text-pink-400 opacity-80" />
                      <Brain className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-green-400 opacity-80" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Status Indicator */}
                <motion.div
                  className="absolute -top-2 -right-2 bg-green-400 rounded-full p-3 border-4 border-black shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.7)",
                      "0 0 0 10px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-6 w-6 text-black" />
                </motion.div>

                {/* Responsive adjustments for mobile */}
                <style>{`
                  @media (max-width: 640px) {
                    .relative > .motion-div {
                      width: 300px;
                      height: 300px;
                    }
                  }
                  @media (max-width: 480px) {
                    .relative > .motion-div {
                      width: 250px;
                      height: 250px;
                    }
                  }
                `}</style>
              </div>
            </motion.div>

            {/* Enhanced Content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Typography Hierarchy */}
              <div className="text-left space-y-6">
                <motion.h3
                  className="text-3xl lg:text-4xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Hi, I'm{" "}
                  <motion.span
                    className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent inline-block"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    Shubham
                  </motion.span>{" "}
                  👋
                </motion.h3>

                <motion.p
                  className="text-base lg:text-lg text-gray-300 leading-relaxed text-left max-w-2xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  A passionate{" "}
                  <span className="text-cyan-400 font-semibold">
                    Full Stack Developer
                  </span>{" "}
                  and{" "}
                  <span className="text-purple-400 font-semibold">
                    Digital Architect
                  </span>{" "}
                  who transforms complex ideas into elegant, scalable solutions.
                  With expertise spanning{" "}
                  <motion.span
                    className="text-purple-400 font-semibold relative cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    Blockchain
                    <motion.div className="absolute -inset-1 bg-purple-400/20 blur-sm opacity-0 hover:opacity-100 transition-opacity" />
                  </motion.span>
                  ,{" "}
                  <motion.span
                    className="text-cyan-400 font-semibold relative cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    Artificial Intelligence
                    <motion.div className="absolute -inset-1 bg-cyan-400/20 blur-sm opacity-0 hover:opacity-100 transition-opacity" />
                  </motion.span>
                  , and immersive{" "}
                  <motion.span
                    className="text-pink-400 font-semibold relative cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    3D web experiences
                    <motion.div className="absolute -inset-1 bg-pink-400/20 blur-sm opacity-0 hover:opacity-100 transition-opacity" />
                  </motion.span>
                  , I craft digital experiences that push the boundaries of
                  what's possible on the web.
                </motion.p>

                <motion.p
                  className="text-sm lg:text-base text-gray-400 leading-relaxed text-left max-w-2xl italic"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  From concept to deployment, I believe in building not just
                  applications, but digital ecosystems that empower users and
                  solve real-world challenges through innovative technology.
                </motion.p>
              </div>

              {/* Info Cards Grid */}
              <motion.div
                className="grid md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {/* Location Card */}
                <motion.div
                  className="glass-morphism p-6 rounded-xl group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">🌍</div>
                    <div>
                      <div className="text-lg font-semibold text-cyan-400">
                        India
                      </div>
                      <div className="text-sm text-gray-400">Location</div>
                    </div>
                  </div>
                </motion.div>

                {/* Work Style Card */}
                <motion.div
                  className="glass-morphism p-6 rounded-xl group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">💼</div>
                    <div>
                      <div className="text-lg font-semibold text-purple-400">
                        Remote
                      </div>
                      <div className="text-sm text-gray-400">Work Style</div>
                    </div>
                  </div>
                </motion.div>

                {/* Technologies Card */}
                <motion.div
                  className="glass-morphism p-6 rounded-xl group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">⚙️</div>
                    <div>
                      <div className="text-lg font-semibold text-pink-400">
                        20+
                      </div>
                      <div className="text-sm text-gray-400">Technologies</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Philosophy Card */}
              <motion.div
                className="glass-morphism p-8 rounded-xl border border-cyan-500/30 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                whileHover={{ borderColor: "rgba(6, 182, 212, 0.5)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">💡</div>
                    <h4 className="text-xl font-bold text-white">Philosophy</h4>
                  </div>
                  <blockquote className="text-gray-300 italic text-lg leading-relaxed">
                    "I combine{" "}
                    <span className="text-cyan-400 font-semibold not-italic">
                      Web3
                    </span>
                    ,{" "}
                    <span className="text-purple-400 font-semibold not-italic">
                      AI
                    </span>
                    , and{" "}
                    <span className="text-pink-400 font-semibold not-italic">
                      UI/UX
                    </span>{" "}
                    to build smart and beautiful solutions that shape the
                    future."
                  </blockquote>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Technologies I use to bring ideas to life
            </p>

            {/* Optimized Horizontal Scrolling Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-3 sm:p-4 mx-auto max-w-6xl">
                <motion.div
                  className="flex items-center gap-4 sm:gap-6"
                  animate={{
                    x: [0, -1000],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    willChange: "transform",
                  }}
                >
                  {[
                    { name: "React", icon: "⚛️", color: "text-blue-400" },
                    { name: "TypeScript", icon: "📘", color: "text-blue-600" },
                    { name: "Node.js", icon: "🟢", color: "text-green-400" },
                    { name: "Python", icon: "🐍", color: "text-yellow-400" },
                    { name: "Next.js", icon: "▲", color: "text-white" },
                    { name: "PostgreSQL", icon: "🐘", color: "text-blue-500" },
                    { name: "MongoDB", icon: "🍃", color: "text-green-500" },
                    { name: "Docker", icon: "🐳", color: "text-blue-400" },
                    { name: "AWS", icon: "☁️", color: "text-orange-400" },
                    { name: "Tailwind", icon: "🎨", color: "text-cyan-400" },
                    { name: "Three.js", icon: "🎲", color: "text-yellow-300" },
                    { name: "Solidity", icon: "💰", color: "text-gray-300" },
                    { name: "Web3", icon: "🌐", color: "text-blue-300" },
                    { name: "AI/ML", icon: "🤖", color: "text-green-300" },
                  ]
                    .concat([
                      // Duplicate for seamless loop
                      { name: "React", icon: "⚛️", color: "text-blue-400" },
                      {
                        name: "TypeScript",
                        icon: "📘",
                        color: "text-blue-600",
                      },
                      { name: "Node.js", icon: "🟢", color: "text-green-400" },
                      { name: "Python", icon: "🐍", color: "text-yellow-400" },
                      { name: "Next.js", icon: "▲", color: "text-white" },
                      {
                        name: "PostgreSQL",
                        icon: "🐘",
                        color: "text-blue-500",
                      },
                      { name: "MongoDB", icon: "🍃", color: "text-green-500" },
                      { name: "Docker", icon: "🐳", color: "text-blue-400" },
                      { name: "AWS", icon: "☁️", color: "text-orange-400" },
                      { name: "Tailwind", icon: "🎨", color: "text-cyan-400" },
                    ])
                    .map((tool, index) => (
                      <div
                        key={`${tool.name}-${index}`}
                        className="flex-shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white/5 rounded-full border border-white/10"
                      >
                        <span className="text-lg sm:text-xl">{tool.icon}</span>
                        <span
                          className={`text-xs sm:text-sm font-medium ${tool.color} whitespace-nowrap`}
                        >
                          {tool.name}
                        </span>
                      </div>
                    ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <Card className="bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 text-center relative z-10">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center`}
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.6 },
                      }}
                    >
                      <skill.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          Proficiency
                        </span>
                        <motion.span
                          className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      >
                        <Progress
                          value={skill.level}
                          className="h-2 group-hover:h-3 transition-all duration-300"
                        />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Some of my recent work that showcases my skills and passion
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                  <div className="h-48 relative overflow-hidden group">
                    {/* Project Image */}
                    <img
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                      loading="lazy"
                    />
                    {/* Light Gradient Overlay - Reduced opacity for better image visibility */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-10 transition-all duration-300`}
                    />
                    {/* Light Dark Overlay - Reduced opacity */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    {/* Icon Overlay - Only visible on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Code2 className="h-16 w-16 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 flex-1"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        disabled={project.liveUrl === '#'}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        disabled={project.githubUrl === '#'}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced Responsive */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              Let's{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Email Card */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Email
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 break-all">
                      shubhamdev9128@gmail.com
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="self-start sm:self-auto border-white/20 text-white hover:bg-white/10 shrink-0"
                    onClick={() => copyToClipboard("shubhamdev9128@gmail.com")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                {/* Phone Card */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Phone
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300">
                      +91 9128364783
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="self-start sm:self-auto border-white/20 text-white hover:bg-white/10 shrink-0"
                    onClick={() => copyToClipboard("+91 9128364783")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                {/* Location Card */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Location
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300">
                      India • Remote Worldwide
                    </p>
                  </div>
                </div>

                {/* Status Card */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Status
                    </h3>
                    <p className="text-sm sm:text-base text-green-400">
                      Available for new projects
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 flex-1"
                  onClick={() => window.open("https://github.com/shubh389", '_blank')}
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">GitHub</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1"
                  onClick={() => window.open("https://www.linkedin.com/in/shubham-dev-5a4ba8320/", '_blank')}
                >
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">LinkedIn</span>
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 lg:mt-0"
            >
              <Card className="bg-white/5 border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
                    Send me a message
                  </h3>
                  <form
                    className="space-y-4 sm:space-y-6"
                    onSubmit={handleContactSubmit}
                  >
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        placeholder="Project discussion"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-300 text-sm sm:text-base"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full transition-all duration-300 transform hover:scale-105 py-2 sm:py-3 ${
                        submitStatus === "success"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                          : submitStatus === "error"
                            ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                            : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                      } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="h-4 w-4 sm:h-5 sm:w-5 mr-2 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          <span className="text-sm sm:text-base">
                            Sending...
                          </span>
                        </>
                      ) : submitStatus === "success" ? (
                        <>
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          <span className="text-sm sm:text-base">
                            Message Sent!
                          </span>
                        </>
                      ) : submitStatus === "error" ? (
                        <>
                          <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          <span className="text-sm sm:text-base">
                            Try Again
                          </span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          <span className="text-sm sm:text-base">
                            Send Message
                          </span>
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Shubham Dev. Built with ❤️ using React, TypeScript & TailwindCSS
          </p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Custom Cursor */}
      {supportsCursor && <CustomCursor />}
    </div>
  );
}
