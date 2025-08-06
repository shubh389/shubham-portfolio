import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedOrbFallback() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Dynamic background gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, rgba(0,0,0,1) 70%)",
            "radial-gradient(ellipse at center, rgba(147,51,234,0.05) 0%, rgba(0,0,0,1) 70%)",
            "radial-gradient(ellipse at center, rgba(236,72,153,0.05) 0%, rgba(0,0,0,1) 70%)",
            "radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, rgba(0,0,0,1) 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central reactive orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 2, ease: "easeOut" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(6,182,212,0.1), rgba(147,51,234,0.1), rgba(236,72,153,0.1), rgba(6,182,212,0.1))",
            filter: "blur(2px)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Main orb body */}
        <motion.div
          className="relative w-64 h-64 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          style={{
            background:
              "conic-gradient(from 45deg, rgba(6,182,212,0.3), rgba(147,51,234,0.3), rgba(236,72,153,0.3), rgba(6,182,212,0.3))",
            filter: "blur(1px)",
          }}
          animate={{
            rotate: [0, -360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {/* Inner energy core */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(6,182,212,0.6) 30%, rgba(147,51,234,0.4) 60%, transparent 100%)",
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Pulsing center */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Orbiting energy particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        const radius = 200 + (i % 3) * 50;
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: `linear-gradient(45deg, ${
                i % 3 === 0
                  ? "rgba(6,182,212,0.8)"
                  : i % 3 === 1
                    ? "rgba(147,51,234,0.8)"
                    : "rgba(236,72,153,0.8)"
              }, transparent)`,
              left: "50%",
              top: "50%",
              transformOrigin: `0 ${radius}px`,
            }}
            animate={{
              rotate: [angle, angle + 360],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              rotate: { duration: 12 + i, repeat: Infinity, ease: "linear" },
              scale: {
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        );
      })}

      {/* Floating ambient particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background:
              i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#9333ea" : "#ec4899",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
