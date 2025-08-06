import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface PerformanceData {
  fps: number;
  memory: number;
  cpu: number;
  gpu: number;
  network: number;
}

export function PerformanceMonitor() {
  const [performance, setPerformance] = useState<PerformanceData>({
    fps: 60,
    memory: 45,
    cpu: 23,
    gpu: 67,
    network: 89,
  });

  const [isVisible, setIsVisible] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationFrame: number;

    const updatePerformance = () => {
      const now = performance.now();
      frameCount.current++;

      // Calculate FPS
      if (now - lastTime.current >= 1000) {
        const fps = Math.round(
          (frameCount.current * 1000) / (now - lastTime.current),
        );
        frameCount.current = 0;
        lastTime.current = now;

        // Simulate realistic performance metrics
        setPerformance((prev) => ({
          fps: Math.max(30, Math.min(120, fps + (Math.random() - 0.5) * 10)),
          memory: Math.max(
            20,
            Math.min(80, prev.memory + (Math.random() - 0.5) * 5),
          ),
          cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 8)),
          gpu: Math.max(30, Math.min(95, prev.gpu + (Math.random() - 0.5) * 6)),
          network: Math.max(
            50,
            Math.min(100, prev.network + (Math.random() - 0.5) * 3),
          ),
        }));
      }

      animationFrame = requestAnimationFrame(updatePerformance);
    };

    // Show after delay
    const timer = setTimeout(() => setIsVisible(true), 4000);
    updatePerformance();

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const getStatusColor = (
    value: number,
    type: "fps" | "memory" | "cpu" | "gpu" | "network",
  ) => {
    switch (type) {
      case "fps":
        return value >= 55 ? "#00ff88" : value >= 30 ? "#ffaa00" : "#ff4444";
      case "memory":
        return value <= 50 ? "#00ff88" : value <= 70 ? "#ffaa00" : "#ff4444";
      case "cpu":
        return value <= 40 ? "#00ff88" : value <= 70 ? "#ffaa00" : "#ff4444";
      case "gpu":
        return value <= 80 ? "#00ff88" : value <= 90 ? "#ffaa00" : "#ff4444";
      case "network":
        return value >= 80 ? "#00ff88" : value >= 60 ? "#ffaa00" : "#ff4444";
      default:
        return "#00ff88";
    }
  };

  const metrics = [
    {
      label: "FPS",
      value: Math.round(performance.fps),
      unit: "",
      type: "fps" as const,
    },
    {
      label: "RAM",
      value: Math.round(performance.memory),
      unit: "%",
      type: "memory" as const,
    },
    {
      label: "CPU",
      value: Math.round(performance.cpu),
      unit: "%",
      type: "cpu" as const,
    },
    {
      label: "GPU",
      value: Math.round(performance.gpu),
      unit: "%",
      type: "gpu" as const,
    },
    {
      label: "NET",
      value: Math.round(performance.network),
      unit: "%",
      type: "network" as const,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
      transition={{ duration: 0.8 }}
      className="absolute top-1/2 left-10 transform -translate-y-1/2 pointer-events-none z-20"
    >
      <div className="glass-morphism p-4 rounded-lg space-y-3 min-w-[140px]">
        {/* Header */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full"
          />
          <span className="text-cyan-400 text-xs font-mono uppercase">
            MONITOR
          </span>
        </div>

        {/* Metrics */}
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 4.5 + index * 0.1 }}
            className="flex items-center justify-between space-x-3"
          >
            <span className="text-white/70 text-xs font-mono">
              {metric.label}
            </span>
            <div className="flex items-center space-x-2">
              <motion.span
                className="text-xs font-mono font-bold min-w-[2.5rem] text-right"
                style={{ color: getStatusColor(metric.value, metric.type) }}
                animate={{
                  scale:
                    metric.type === "fps" && metric.value < 30
                      ? [1, 1.1, 1]
                      : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat: metric.value < 30 ? Infinity : 0,
                }}
              >
                {metric.value}
                {metric.unit}
              </motion.span>

              {/* Mini bar chart */}
              <div className="w-8 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: getStatusColor(metric.value, metric.type),
                    width: `${Math.min(100, (metric.value / (metric.type === "fps" ? 120 : 100)) * 100)}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (metric.value / (metric.type === "fps" ? 120 : 100)) * 100)}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* System Status */}
        <div className="border-t border-white/10 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-xs font-mono">STATUS</span>
            <motion.div
              animate={{
                color: ["#00ff88", "#00ffff", "#00ff88"],
                textShadow: [
                  "0 0 5px #00ff88",
                  "0 0 10px #00ffff",
                  "0 0 5px #00ff88",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs font-mono font-bold"
            >
              OPTIMAL
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// System logs component
export function SystemLogs() {
  const [logs, setLogs] = useState<
    Array<{ id: number; message: string; type: "info" | "success" | "warning" }>
  >([]);
  const logId = useRef(0);

  useEffect(() => {
    const logMessages = [
      { message: "Three.js renderer initialized", type: "success" as const },
      { message: "Shader compilation successful", type: "success" as const },
      { message: "Neural network loaded", type: "info" as const },
      { message: "Audio context created", type: "info" as const },
      { message: "Holographic display active", type: "success" as const },
      { message: "Particle system optimized", type: "info" as const },
      { message: "Magnetic interactions enabled", type: "success" as const },
      { message: "Performance monitor started", type: "info" as const },
    ];

    let messageIndex = 0;

    const addLog = () => {
      if (messageIndex < logMessages.length) {
        const newLog = {
          id: logId.current++,
          ...logMessages[messageIndex],
        };

        setLogs((prev) => [...prev.slice(-4), newLog]);
        messageIndex++;

        setTimeout(addLog, 800 + Math.random() * 400);
      }
    };

    const timer = setTimeout(addLog, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 3 }}
      className="absolute bottom-32 left-10 w-80 pointer-events-none z-20"
    >
      <div className="glass-morphism p-3 rounded-lg">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-mono uppercase">
            SYSTEM LOGS
          </span>
        </div>

        <div className="space-y-1 max-h-20 overflow-hidden">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center space-x-2"
            >
              <div
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{
                  backgroundColor:
                    log.type === "success"
                      ? "#00ff88"
                      : log.type === "warning"
                        ? "#ffaa00"
                        : "#00aaff",
                }}
              />
              <span
                className="text-xs font-mono truncate"
                style={{
                  color:
                    log.type === "success"
                      ? "#00ff88"
                      : log.type === "warning"
                        ? "#ffaa00"
                        : "#ffffff",
                }}
              >
                {log.message}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
