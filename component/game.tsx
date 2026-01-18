"use client";
import { useRef, useEffect, useState } from "react";
import { Play, RotateCcw, Trophy } from "lucide-react";

export default function GameSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game Logic Variables (Refs to avoid re-renders)
  const player = useRef({ x: 0, y: 0, radius: 8 });
  const enemies = useRef<any[]>([]);
const animationFrameId = useRef<number | null>(null);

  const initGame = () => {
    enemies.current = [];
    setScore(0);
    setGameState("playing");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      player.current.x = e.clientX - rect.left;
      player.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const update = () => {
      if (gameState !== "playing") return;

      // Spawn enemies
      if (Math.random() < 0.05) {
        const side = Math.floor(Math.random() * 4);
        let x, y;
        if (side === 0) { x = Math.random() * canvas.width; y = -20; }
        else if (side === 1) { x = canvas.width + 20; y = Math.random() * canvas.height; }
        else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height + 20; }
        else { x = -20; y = Math.random() * canvas.height; }

        enemies.current.push({
          x, y,
          radius: Math.random() * 4 + 2,
          speed: Math.random() * 2 + 1 + (score / 1000),
          angle: Math.atan2(player.current.y - y, player.current.x - x)
        });
      }

      // Move enemies & Check Collision
      enemies.current.forEach((en, index) => {
        en.x += Math.cos(en.angle) * en.speed;
        en.y += Math.sin(en.angle) * en.speed;

        // Collision Check
        const dist = Math.hypot(player.current.x - en.x, player.current.y - en.y);
        if (dist < player.current.radius + en.radius) {
          setGameState("gameover");
          if (score > highScore) setHighScore(score);
        }

        // Remove off-screen
        if (en.x < -50 || en.x > canvas.width + 50 || en.y < -50 || en.y > canvas.height + 50) {
          enemies.current.splice(index, 1);
          setScore(s => s + 10);
        }
      });

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Player (Glow Effect)
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#b6ed12";
      ctx.fillStyle = "#b6ed12";
      ctx.beginPath();
      ctx.arc(player.current.x, player.current.y, player.current.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw Enemies
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      enemies.current.forEach(en => {
        ctx.beginPath();
        ctx.arc(en.x, en.y, en.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(update);
    };

    if (gameState === "playing") {
      update();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameState, score]);

  return (
    <section className="py-24 bg-[#050505] px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-[#b6ed12] font-mono text-xs uppercase tracking-[0.4em] block mb-2">Lab // 01</span>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-none">THE VOID</h2>
          </div>
          <div className="flex gap-8 border-l border-white/15 pl-8">
            <div>
              <p className="text-zinc-600 text-[10px] uppercase font-bold mb-1">Score</p>
              <p className="text-2xl font-mono text-white leading-none">{score}</p>
            </div>
            <div>
              <p className="text-zinc-600 text-[10px] uppercase font-bold mb-1">Best</p>
              <p className="text-2xl font-mono text-[#b6ed12] leading-none">{highScore}</p>
            </div>
          </div>
        </div>

        {/* Game Box */}
        <div 
          ref={containerRef}
          className="relative w-full h-[500px] bg-zinc-900/20 border border-white/10 rounded-[2.5rem] overflow-hidden cursor-none backdrop-blur-3xl"
        >
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Idle Screen */}
          {gameState === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-30">
              <p className="text-zinc-400 font-mono text-sm mb-6 uppercase tracking-[0.2em]">Ready to focus?</p>
              <button 
                onClick={initGame}
                className="group flex items-center gap-3 bg-[#b6ed12] text-black px-8 py-4 rounded-full font-bold uppercase text-sm hover:scale-105 transition-all"
              >
                Start Protocol <Play size={16} fill="black" />
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/20 backdrop-blur-xl z-30 animate-in fade-in duration-500">
              <Trophy className="text-[#b6ed12] mb-4" size={40} />
              <h3 className="text-4xl font-bold text-white mb-2 uppercase">Protocol Failed</h3>
              <p className="text-zinc-400 font-mono mb-8">System Overrun at {score} points</p>
              <button 
                onClick={initGame}
                className="flex items-center gap-2 border border-[#b6ed12] text-[#b6ed12] px-6 py-3 rounded-full font-bold uppercase text-xs hover:bg-[#b6ed12] hover:text-black transition-all"
              >
                Reboot <RotateCcw size={14} />
              </button>
            </div>
          )}

          {/* Player Helper Text (only shown while playing) */}
          {gameState === "playing" && score < 100 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 font-mono text-[10px] uppercase tracking-widest animate-pulse pointer-events-none">
              Move your mouse to dodge the particles
            </div>
          )}
        </div>
      </div>
    </section>
  );
}