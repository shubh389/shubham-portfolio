import { useRef, Suspense, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import { Code2, Sparkles, Zap, Heart, ArrowDown, Play } from "lucide-react";
import Spline from "@splinetool/react-spline";

interface SimplifiedHeroProps {
  scrollToSection: (section: string) => void;
}

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      return hasTouchScreen || isSmallScreen || isMobileUserAgent;
    };

    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return isMobile;
}

interface SimplifiedHeroProps {
  scrollToSection: (section: string) => void;
}

function AnimatedHeroContent({
  scrollToSection,
}: {
  scrollToSection: (section: string) => void;
}) {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const titles = [
    {
      text: "Full Stack Developer",
      icon: "Code2",
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      color: "#06b6d4",
    },
    {
      text: "Blockchain Expert",
      icon: "Zap",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      color: "#a855f7",
    },
    {
      text: "AI Enthusiast",
      icon: "Sparkles",
      gradient: "from-green-400 via-cyan-500 to-blue-600",
      color: "#10b981",
    },
    {
      text: "Creative Innovator",
      icon: "Heart",
      gradient: "from-pink-400 via-purple-500 to-indigo-600",
      color: "#ec4899",
    },
  ];

  const iconComponents = {
    Code2,
    Zap,
    Sparkles,
    Heart,
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const letterVariants = {
    initial: {
      y: 100,
      opacity: 0,
      rotateX: -90,
      scale: 0.8,
    },
    animate: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        mass: 0.8,
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      rotateX: 90,
      scale: 0.8,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const IconComponent =
    iconComponents[titles[currentTitle].icon as keyof typeof iconComponents];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Main Name with Enhanced Effects */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -45 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.7,
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
          className="mb-6 sm:mb-8 lg:mb-12 relative"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold relative"
            style={{ perspective: "1000px" }}
          >
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
            </motion.span>

            {/* Enhanced floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${5 + (i % 3) * 30}%`,
                  background: titles[currentTitle].color,
                  boxShadow: `0 0 20px ${titles[currentTitle].color}`,
                }}
                animate={{
                  y: [-30, 30, -30],
                  x: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.h1>
        </motion.div>

        {/* Enhanced Dynamic Titles */}
        <div className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 flex items-center justify-center mb-6 sm:mb-8 lg:mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitle}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 150,
                }}
                className={`p-2 sm:p-3 lg:p-4 rounded-full bg-gradient-to-r ${titles[currentTitle].gradient} shadow-lg`}
                style={{
                  boxShadow: `0 10px 30px ${titles[currentTitle].color}40`,
                }}
              >
                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
              </motion.div>

              <div className="flex flex-wrap justify-center sm:justify-start">
                {titles[currentTitle].text.split(" ").map((word, wordIndex) => (
                  <div key={wordIndex} className="flex mr-2 sm:mr-3 lg:mr-4">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${currentTitle}-${wordIndex}-${letterIndex}`}
                        variants={letterVariants}
                        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r ${titles[currentTitle].gradient} bg-clip-text text-transparent inline-block`}
                        transition={{
                          delay: (wordIndex * 5 + letterIndex) * 0.08,
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotateY: 10,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Tagline */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mb-8 sm:mb-10 lg:mb-16"
        >
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Crafting digital experiences with{" "}
            <motion.span
              className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-semibold"
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              passion
            </motion.span>{" "}
            and{" "}
            <motion.span
              className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-semibold"
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              precision
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced Call to Actions */}
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pointer-events-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.button
            onClick={() => scrollToSection("projects")}
            className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-medium overflow-hidden text-sm sm:text-base lg:text-lg w-full sm:w-auto max-w-xs"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)",
              rotateY: 5,
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              View My Work
            </span>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("contact")}
            className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 border-2 border-cyan-400/50 text-cyan-400 rounded-full font-medium overflow-hidden text-sm sm:text-base lg:text-lg w-full sm:w-auto max-w-xs"
            whileHover={{
              scale: 1.05,
              borderColor: "#06b6d4",
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
              initial={{ scale: 0, rotate: 45 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: "inherit" }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              Let's Connect
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function SimplifiedHero({ scrollToSection }: SimplifiedHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null);
  const isMobile = useIsMobile();

  // Enhanced Spline event handlers for mobile
  const handleSplineLoad = (spline: any) => {
    console.log("Spline scene loaded successfully");
    splineRef.current = spline;
    
    // Enable mobile touch interactions
    if (isMobile && spline) {
      try {
        // Enable touch events on the Spline scene
        const canvas = spline.canvas;
        if (canvas) {
          canvas.style.touchAction = 'auto';
          canvas.style.pointerEvents = 'auto';
          canvas.style.webkitTouchCallout = 'none';
          canvas.style.webkitUserSelect = 'none';
          canvas.style.userSelect = 'none';
          
          // Add mobile-specific touch event listeners
          canvas.addEventListener('touchstart', (e: TouchEvent) => {
            e.stopPropagation();
            console.log('Touch start on Spline canvas');
          }, { passive: true });
          
          canvas.addEventListener('touchmove', (e: TouchEvent) => {
            e.stopPropagation();
          }, { passive: true });
          
          canvas.addEventListener('touchend', (e: TouchEvent) => {
            e.stopPropagation();
            console.log('Touch end on Spline canvas');
          }, { passive: true });

          // Try to enable Spline mobile controls if available
          if (spline.setPointerMode) {
            spline.setPointerMode('touch');
          }
          
          // Enable mobile-friendly camera controls
          if (spline.enableOrbitControls) {
            spline.enableOrbitControls(true);
          }
        }
      } catch (error) {
        console.log("Mobile touch setup error:", error);
      }
    }
  };

  const handleSplineError = (error: any) => {
    console.error("Spline scene error:", error);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Scene */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-white"></div>
            </div>
          }
        >
          <div 
            className="w-full h-full relative spline-container"
            style={{
              touchAction: isMobile ? 'auto' : 'none',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
          >
            <Spline
              scene="https://prod.spline.design/diTNwA7MDXjmBX6n/scene.splinecode"
              style={{
                width: "100%",
                height: "100%",
                pointerEvents: "auto",
                cursor: "auto",
                touchAction: isMobile ? 'auto' : 'none',
              }}
              onLoad={handleSplineLoad}
              onError={handleSplineError}
            />
          </div>
        </Suspense>
      </div>

      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-40 pointer-events-none" />

      {/* Stunning Animated Hero Content */}
      <AnimatedHeroContent scrollToSection={scrollToSection} />
    </section>
  );
}
