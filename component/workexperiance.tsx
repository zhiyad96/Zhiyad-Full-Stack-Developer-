
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EXPERIENCES = [
  {
    year: "2026 — Present",
    role: "Python Full Stack Developer",
    company: "Bridgeon Solutions",
    desc: "Developing and maintaining full-stack web applications using Python, Django, and modern frontend frameworks like React and Next.js. Focused on building scalable APIs and delivering clean solutions.",
    achievements: [
      "Designed and implemented RESTful APIs",
      "Built responsive UI with React and Next.js",
      "Improved performance and code quality"
    ]
  },
  {
    year: "2024 — 2025",
    role: "Junior Software Engineer",
    company: "TechNexus",
    desc: "Collaborated on building data-driven dashboards and automating backend workflows with Python and PostgreSQL.",
    achievements: [
      "Automated 40% of data entry tasks",
      "Collaborated on UI refinement",
      "Maintained internal documentation"
    ]
  }
];

export default function ExperienceSection() {
  const container = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const calculateScroll = () => {
      if (!listRef.current || !boxRef.current) return 0;
      const innerHeight = listRef.current.scrollHeight;
      const boxHeight = boxRef.current.offsetHeight;
      // We subtract the boxHeight because we only need to scroll 
      // the hidden part of the list.
      return Math.max(0, innerHeight - boxHeight + 80); // +80 for padding
    };

    let scrollDistance = calculateScroll();

    // The Main Pinning Logic
    const mainST = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      // If content is short, stay for 1000px, otherwise proportional to content
      end: () => `+=${Math.max(1000, scrollDistance * 2)}`, 
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(listRef.current, {
          y: -scrollDistance * self.progress,
          ease: "none",
          duration: 0.1
        });
      }
    });

    // Left Side Progress Bar Logic (Horizontal fill)
    gsap.to(".progress-fill", {
      width: "100%", // Changed to width because the container is a horizontal bar
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: mainST.end,
        scrub: true
      }
    });

    // Staggered Entrance for Experience Cards
    gsap.from(".exp-card", {
      x: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 50%",
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="h-screen w-full bg-[#050505] flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT: Static Content */}
        <div className="lg:col-span-5">
          <span className="text-[#b6ed12] font-mono text-sm uppercase tracking-[0.4em] block mb-4">04 / Experience</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.9] mb-8">
            The <br /> Career <br /> Path
          </h2>
          <p className="text-zinc-500 text-lg max-w-sm mb-12">
            A chronological journey through companies, roles, and technical breakthroughs.
          </p>
          
          {/* Custom Scroll Indicator */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Experience Progress</span>
            <div className="w-48 h-[2px] bg-white/10 relative">
              <div className="progress-fill absolute top-0 left-0 h-full w-0 bg-[#b6ed12]" />
            </div>
          </div>
        </div>

        {/* RIGHT: The "Box" with Vertical Scroll */}
        <div 
          ref={boxRef} 
          className="lg:col-span-7 h-[500px] md:h-[650px] border border-white/5 bg-zinc-900/10 rounded-[2.5rem] relative overflow-hidden backdrop-blur-3xl shadow-2xl"
        >
          {/* Premium Fading Overlays */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />

          {/* The Scrolling List */}
          <div ref={listRef} className="p-8 md:p-20 space-y-24">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="exp-card relative pl-12 border-l border-white/10 hover:border-[#b6ed12]/50 transition-colors duration-700 group">
                {/* Year Dot */}
                <div className="absolute -left-[6px] top-0 w-3 h-3 rounded-full bg-[#b6ed12] shadow-[0_0_15px_#b6ed12] scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="absolute -left-[6px] top-0 w-3 h-3 rounded-full bg-zinc-800 border border-white/20 group-hover:opacity-0 transition-opacity" />
                
                <span className="text-[#b6ed12] font-mono text-xs uppercase tracking-[0.2em] block mb-4">
                  {exp.year}
                </span>
                
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                  {exp.role}
                </h3>
                
                <p className="text-zinc-400 font-medium mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#b6ed12] transition-colors" />
                  {exp.company}
                </p>

                <p className="text-zinc-500 text-lg leading-relaxed mb-8 max-w-md">
                  {exp.desc}
                </p>

                <div className="flex flex-wrap gap-4">
                  {exp.achievements.map((item, i) => (
                    <span key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500 tracking-wider">
                      <ChevronRight size={12} className="text-[#b6ed12]" /> {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Bottom Spacer to ensure last item can be scrolled past center */}
            <div className="h-32" />
          </div>
        </div>

      </div>
    </section>
  );
}