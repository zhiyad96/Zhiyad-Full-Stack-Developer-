
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layout, Terminal, Cpu, Database, Server, Shield, Globe, Layers } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SKILLS = [
  { category: "Backend", icon: <Terminal size={20} />, title: "Python/Django", desc: "Scalable APIs & Logic" },
  { category: "Frontend", icon: <Layout size={20} />, title: "Next.js/React", desc: "Modern UI/UX" },
  { category: "Database", icon: <Database size={20} />, title: "PostgreSQL", desc: "Data Architecture" },
  { category: "Styling", icon: <Layers size={20} />, title: "Tailwind/Framer", desc: "Pixel Perfect" },
  { category: "API", icon: <Globe size={20} />, title: "FastAPI/REST", desc: "High Performance" },
];

const MARQUEE_TEXT = ["PYTHON", "DJANGO", "NEXTJS", "REACT", "GSAP", "TAILWIND"];

export default function SkillSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Automatic Marquee
    gsap.to(marqueeTrackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 25,
      repeat: -1,
    });

    // 2. Horizontal Scroll Logic
    const scrollWidth = horizontalRef.current!.scrollWidth;
    const amountToScroll = scrollWidth - window.innerWidth;

    gsap.to(horizontalRef.current, {
      x: -amountToScroll - 100, // Move left by the calculated overflow
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        // The end should be proportional to how much content there is
        end: () => `+=${scrollWidth}`, 
        invalidateOnRefresh: true,
      }
    });

    // 3. Card Animations (Opacity fix)
    gsap.from(".skill-card", {
      opacity: 0,
      scale: 0.8,
      y: 50,
      stagger: 0.1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 20%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#050505] w-full overflow-hidden">
      {/* Container that takes up the full screen and stops vertical scroll */}
      <div ref={triggerRef} className="h-screen w-full flex flex-col justify-center gap-12 relative">
        
        {/* TOP: Header & Marquee */}
        <div className="flex flex-col gap-8 w-full">
          <div className="px-6 md:px-20">
            <span className="text-[#b6ed12] font-mono text-sm uppercase tracking-[0.3em] block mb-2"> Expertise</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase">Technical Skills</h2>
          </div>

          <div className="relative w-full overflow-hidden border-y border-white/5 py-6 bg-white/[0.02]">
            <div ref={marqueeTrackRef} className="flex whitespace-nowrap will-change-transform">
              {[...MARQUEE_TEXT, ...MARQUEE_TEXT].map((text, i) => (
                <span 
                  key={i} 
                  className="text-4xl md:text-6xl font-black px-12 text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: The Horizontal Section */}
        {/* 'w-max' ensures the container is as wide as all cards combined */}
        <div className="relative w-full overflow-visible px-6 md:px-20">
          <div 
            ref={horizontalRef} 
            className="flex flex-row flex-nowrap gap-6 w-max will-change-transform"
          >
            {SKILLS.map((skill, idx) => (
              <div 
                key={idx} 
                className="skill-card group flex-shrink-0 w-[300px] h-[350px] p-8 rounded-[2rem] bg-zinc-900/60 border border-white/10 flex flex-col justify-between transition-colors duration-500 hover:border-[#b6ed12]/50"
              >
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <div className="p-4 rounded-2xl bg-white/5 text-[#b6ed12] group-hover:bg-[#b6ed12] group-hover:text-black transition-all">
                      {skill.icon}
                    </div>
                    <span className="text-zinc-700 font-mono text-sm">0{idx + 1}</span>
                  </div>
                  
                  <p className="text-[#b6ed12] text-[10px] font-mono uppercase tracking-widest mb-2 opacity-70">
                    {skill.category}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {skill.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300">
                    {skill.desc}
                  </p>
                </div>
                
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#b6ed12] w-0 group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            ))}
            
            {/* Essential padding at the end */}
            <div className="w-[100px] flex-shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}




