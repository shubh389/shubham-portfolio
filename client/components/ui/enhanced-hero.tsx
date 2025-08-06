import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticButton, SoundButton } from "./magnetic-button";
import { Badge } from "@/components/ui/badge";
import { ThreeScene } from "./three-scene";
import { ShaderBackground } from "./shader-background";
import { HolographicDisplay, HolographicUI } from "./holographic-display";
import { SoundVisualizer, AudioControls } from "./sound-visualizer";
import { NeuralNetwork, AIStatusIndicator } from "./neural-network";
import { PerformanceMonitor, SystemLogs } from "./performance-monitor";
import {
  Download,
  Rocket,
  Sparkles,
  ArrowDown,
  Code2,
  Brain,
  Zap,
} from "lucide-react";

interface EnhancedHeroProps {
  scrollToSection: (section: string) => void;
}

export function EnhancedHero({ scrollToSection }: EnhancedHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleControls = useAnimation();
  const contentControls = useAnimation();
  const isInView = useInView(heroRef, { once: true });

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Loading animation sequence
  useEffect(() => {
    if (isInView) {
      const animateIn = async () => {
        await titleControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
        });

        await contentControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 },
        });

        setIsLoaded(true);
      };

      animateIn();
    }
  }, [isInView, titleControls, contentControls]);

  const stats = [
    { label: "Years Experience", value: "4+", icon: Rocket },
    { label: "Projects Completed", value: "50+", icon: Code2 },
    { label: "Happy Clients", value: "25+", icon: Sparkles },
    { label: "Technologies", value: "20+", icon: Brain },
  ];

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const titleText = "Building Digital Solutions That Scale";
  const words = titleText.split(" ");

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Shader Background */}
      <ShaderBackground />

      {/* Three.js Background */}
      <ThreeScene />

      {/* Holographic Display */}
      <HolographicDisplay isVisible={isLoaded} mouse={mousePosition} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/60 z-10" />

      {/* Floating Elements */}
      <motion.div
        className="absolute inset-0 z-20"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 text-center">
        {/* Glassmorphism Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Badge
            variant="outline"
            className="glass-morphism text-lg px-6 py-3 border-cyan-500/30 text-cyan-400 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300"
          >
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            Full Stack Developer
          </Badge>
        </motion.div>

        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={titleControls}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold leading-tight">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 mb-2">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    custom={wordIndex * 10 + letterIndex}
                    variants={letterVariants}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    className={
                      word === "Digital"
                        ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent"
                        : word === "Solutions"
                          ? "bg-gradient-to-r from-violet-600 via-purple-500 to-magenta-600 bg-clip-text text-transparent"
                          : "text-white"
                    }
                    style={{ display: "inline-block" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentControls}
          className="mb-8"
        >
          <p className="text-xl md:text-3xl text-gray-300 font-light tracking-wide">
            <span className="text-cyan-400">React</span>
            <span className="mx-4 text-gray-500">•</span>
            <span className="text-blue-400">Node.js</span>
            <span className="mx-4 text-gray-500">•</span>
            <span className="text-purple-400">Blockchain</span>
            <span className="mx-4 text-gray-500">•</span>
            <span className="text-pink-400">AI Integration</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={contentControls}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          I create modern web applications and scalable systems that solve real
          problems and drive business growth with cutting-edge technology.
        </motion.p>

        {/* Glassmorphism Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentControls}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="glass-morphism p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 text-center">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentControls}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <SoundButton
            variant="default"
            size="lg"
            className="glass-morphism bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl"
            onClick={() => scrollToSection("projects")}
            glowColor="#00ffff"
            magnetic={true}
          >
            <Rocket className="h-5 w-5 mr-3" />
            <span>View My Work</span>
          </SoundButton>

          <MagneticButton
            variant="outline"
            size="lg"
            className="glass-morphism border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-xl px-8 py-4 text-lg font-semibold"
            onClick={() => {
              const link = document.createElement("a");
              link.href =
                "mailto:shubhamdev9128@gmail.com?subject=CV Request&body=Hi Shubham, I would like to request your CV. Thank you!";
              link.click();
            }}
            glowColor="#8b5cf6"
            magnetic={true}
          >
            <Download className="h-5 w-5 mr-3" />
            <span>Download CV</span>
          </MagneticButton>
        </motion.div>

        {/* Floating CTA Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex justify-center space-x-8"
        >
          {[Zap, Code2, Brain].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut",
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center"
            >
              <Icon className="h-6 w-6 text-cyan-400" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
        onClick={() => scrollToSection("about")}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-sm text-gray-400 font-medium">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2"
            />
          </div>
          <ArrowDown className="h-4 w-4 text-gray-400" />
        </motion.div>
      </motion.div>

      {/* Advanced UI Overlays */}
      <HolographicUI />
      <NeuralNetwork />
      <AIStatusIndicator />
      <SoundVisualizer isActive={isLoaded} />
      <AudioControls />
      <PerformanceMonitor />
      <SystemLogs />

      {/* Matrix-style code rain effect */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: window.innerHeight + 100,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="absolute text-green-400 text-xs font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              filter: "blur(0.5px)",
            }}
          >
            {Array.from({ length: 20 }, () =>
              String.fromCharCode(33 + Math.random() * 94),
            ).join("")}
          </motion.div>
        ))}
      </div>

      {/* Glitch effect overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.1, 0, 0.05, 0],
          scaleX: [1, 1.001, 1, 1.002, 1],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 8 + Math.random() * 5,
        }}
        className="absolute inset-0 bg-cyan-400 mix-blend-screen pointer-events-none z-15"
      />
    </section>
  );
}
