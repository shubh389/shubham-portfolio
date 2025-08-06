import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SoundVisualizerProps {
  isActive: boolean;
  frequency?: number;
  amplitude?: number;
}

export function SoundVisualizer({
  isActive = true,
  frequency = 60,
  amplitude = 0.8,
}: SoundVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [audioData, setAudioData] = useState<number[]>([]);

  // Generate fake audio data for visual effect (since we don't have actual audio)
  useEffect(() => {
    if (!isActive) return;

    const generateFakeAudioData = () => {
      const data = [];
      const time = Date.now() * 0.001;

      for (let i = 0; i < 64; i++) {
        const frequency1 = Math.sin(time * 2 + i * 0.1) * 0.5 + 0.5;
        const frequency2 = Math.sin(time * 3 + i * 0.05) * 0.3 + 0.3;
        const frequency3 = Math.sin(time * 1.5 + i * 0.2) * 0.2 + 0.2;

        const combined = (frequency1 + frequency2 + frequency3) * amplitude;
        data.push(combined * 255);
      }

      return data;
    };

    const animate = () => {
      setAudioData(generateFakeAudioData());
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, amplitude]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !audioData.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up gradient
    const gradient = ctx.createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0, "#06b6d4");
    gradient.addColorStop(0.5, "#8b5cf6");
    gradient.addColorStop(1, "#ec4899");

    // Draw frequency bars
    const barWidth = width / audioData.length;

    audioData.forEach((dataPoint, i) => {
      const barHeight = (dataPoint / 255) * height * 0.8;
      const x = i * barWidth;
      const y = height - barHeight;

      // Create bar gradient
      const barGradient = ctx.createLinearGradient(0, height, 0, y);
      barGradient.addColorStop(0, `rgba(6, 182, 212, 0.8)`);
      barGradient.addColorStop(0.5, `rgba(139, 92, 246, 0.8)`);
      barGradient.addColorStop(1, `rgba(236, 72, 153, 0.8)`);

      ctx.fillStyle = barGradient;
      ctx.fillRect(x, y, barWidth - 2, barHeight);

      // Add glow effect
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 10;
      ctx.fillRect(x, y, barWidth - 2, barHeight);
      ctx.shadowBlur = 0;
    });

    // Draw waveform
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 255, 255, 0.6)";
    ctx.lineWidth = 2;

    audioData.forEach((dataPoint, i) => {
      const x = (i / audioData.length) * width;
      const y = height - (dataPoint / 255) * height * 0.5;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }, [audioData]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-20 left-10 w-64 h-32 pointer-events-none z-20"
    >
      {/* Glassmorphism container */}
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-lg border border-cyan-500/30" />

        {/* Canvas for visualizer */}
        <canvas
          ref={canvasRef}
          width={256}
          height={128}
          className="absolute inset-0 w-full h-full rounded-lg"
        />

        {/* UI overlay */}
        <div className="absolute top-2 left-3 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          ♪ AUDIO REACTIVE
        </div>

        {/* Frequency indicator */}
        <div className="absolute bottom-2 right-3 text-white/60 text-xs font-mono">
          {frequency}Hz
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-lg">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 10px rgba(0, 255, 255, 0.3)",
                "0 0 20px rgba(139, 92, 246, 0.3)",
                "0 0 10px rgba(236, 72, 153, 0.3)",
                "0 0 20px rgba(0, 255, 255, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
}

// Floating audio controls
export function AudioControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
      className="absolute top-32 left-10 pointer-events-auto z-20"
    >
      <div className="glass-morphism p-4 rounded-lg space-y-3">
        {/* Play/Pause button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg"
        >
          {isPlaying ? "⏸" : "▶"}
        </motion.button>

        {/* Volume control */}
        <div className="flex items-center space-x-2">
          <span className="text-white/60 text-xs">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
            }}
          />
        </div>

        {/* Visualizer toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          onClick={() => {
            /* Toggle visualizer */
          }}
        >
          📊 VIZ
        </motion.button>
      </div>
    </motion.div>
  );
}
