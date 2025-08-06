import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  layer: number;
  activation: number;
  size: number;
}

interface Connection {
  from: string;
  to: string;
  weight: number;
  active: boolean;
}

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const animationRef = useRef<number>();

  // Initialize neural network structure
  useEffect(() => {
    const layers = [4, 6, 6, 3]; // Input, hidden1, hidden2, output
    const newNodes: Node[] = [];
    const newConnections: Connection[] = [];

    // Create nodes
    layers.forEach((nodeCount, layerIndex) => {
      for (let i = 0; i < nodeCount; i++) {
        const node: Node = {
          id: `${layerIndex}-${i}`,
          x: layerIndex * 200 + 100,
          y: i * 60 + (300 - (nodeCount * 60) / 2) + 30,
          layer: layerIndex,
          activation: Math.random(),
          size: 8 + Math.random() * 4,
        };
        newNodes.push(node);
      }
    });

    // Create connections between adjacent layers
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayerNodes = newNodes.filter((n) => n.layer === layerIndex);
      const nextLayerNodes = newNodes.filter((n) => n.layer === layerIndex + 1);

      currentLayerNodes.forEach((fromNode) => {
        nextLayerNodes.forEach((toNode) => {
          newConnections.push({
            from: fromNode.id,
            to: toNode.id,
            weight: (Math.random() - 0.5) * 2,
            active: false,
          });
        });
      });
    }

    setNodes(newNodes);
    setConnections(newConnections);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!nodes.length || !connections.length) return;

    const animate = () => {
      const time = Date.now() * 0.001;

      // Update node activations with wave pattern
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          activation:
            (Math.sin(time * 2 + node.layer * 0.5 + node.y * 0.01) + 1) / 2,
        })),
      );

      // Animate connections
      setConnections((prevConnections) =>
        prevConnections.map((conn, index) => ({
          ...conn,
          active: Math.sin(time * 3 + index * 0.1) > 0.3,
        })),
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes.length, connections.length]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !nodes.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    // Draw connections
    connections.forEach((connection) => {
      const fromNode = nodes.find((n) => n.id === connection.from);
      const toNode = nodes.find((n) => n.id === connection.to);

      if (!fromNode || !toNode) return;

      const opacity = connection.active ? 0.8 : 0.2;
      const weight = Math.abs(connection.weight);

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);

      ctx.strokeStyle =
        connection.weight > 0
          ? `rgba(6, 182, 212, ${opacity * weight})`
          : `rgba(236, 72, 153, ${opacity * weight})`;
      ctx.lineWidth = weight * 2 + 0.5;
      ctx.stroke();

      // Add pulse effect for active connections
      if (connection.active) {
        const progress = (Date.now() * 0.005) % 1;
        const pulseX = fromNode.x + (toNode.x - fromNode.x) * progress;
        const pulseY = fromNode.y + (toNode.y - fromNode.y) * progress;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = connection.weight > 0 ? "#00ffff" : "#ec4899";
        ctx.fill();

        ctx.shadowColor = connection.weight > 0 ? "#00ffff" : "#ec4899";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      const activation = node.activation;
      const radius = node.size * (0.8 + activation * 0.4);

      // Node glow
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 5, 0, Math.PI * 2);

      const glowColor =
        node.layer === 0
          ? "#00ff88"
          : node.layer === nodes.reduce((max, n) => Math.max(max, n.layer), 0)
            ? "#ff0088"
            : "#8b5cf6";

      ctx.fillStyle = `rgba(${parseInt(glowColor.slice(1, 3), 16)}, ${parseInt(glowColor.slice(3, 5), 16)}, ${parseInt(glowColor.slice(5, 7), 16)}, ${activation * 0.3})`;
      ctx.fill();

      // Node core
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = glowColor;
      ctx.fill();

      // Node border
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Activation indicator
      if (activation > 0.7) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(activation - 0.7) * 3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }, [nodes, connections]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      className="absolute top-20 right-20 w-96 h-80 pointer-events-none z-20"
    >
      {/* Container */}
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xl rounded-lg border border-cyan-500/20" />

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={384}
          height={320}
          className="absolute inset-0 w-full h-full rounded-lg"
        />

        {/* UI Labels */}
        <div className="absolute top-3 left-3 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          ◉ NEURAL NETWORK
        </div>

        <div className="absolute bottom-3 left-3 text-white/60 text-xs font-mono">
          INPUT → HIDDEN → OUTPUT
        </div>

        {/* Layer labels */}
        <div className="absolute top-8 left-16 text-green-400 text-xs font-mono">
          INPUT
        </div>
        <div className="absolute top-8 left-48 text-purple-400 text-xs font-mono">
          HIDDEN
        </div>
        <div className="absolute top-8 right-16 text-pink-400 text-xs font-mono">
          OUTPUT
        </div>

        {/* Performance metrics */}
        <div className="absolute bottom-8 right-3 text-right">
          <div className="text-cyan-400 text-xs font-mono">ACCURACY: 94.7%</div>
          <div className="text-purple-400 text-xs font-mono">
            LEARNING: ACTIVE
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// AI Status indicator
export function AIStatusIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="absolute bottom-32 right-10 pointer-events-none z-20"
    >
      <div className="glass-morphism p-3 rounded-lg">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 5px #00ff88",
                "0 0 15px #00ff88",
                "0 0 5px #00ff88",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 bg-green-400 rounded-full"
          />
          <div>
            <div className="text-white text-sm font-mono">AI ASSISTANT</div>
            <div className="text-green-400 text-xs font-mono">ONLINE</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
