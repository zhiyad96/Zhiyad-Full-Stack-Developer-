"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Instagram, FileText, ArrowRight, ExternalLink } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animation for text and cards
    const revealElements = gsap.utils.toArray(".about-reveal");
    revealElements.forEach((el: any) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });

    // Animated horizontal line
    gsap.fromTo(".about-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: ".about-line",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050505] py-32 px-6 md:px-20 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* Section Header Badge */}
        <div className="overflow-hidden mb-12">
          <span className="about-reveal inline-block text-[#b6ed12] font-mono text-xs uppercase tracking-[0.4em]">
            01 / Narrative
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* LEFT: Main Story & Social Signature */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden">
              <h2 className="about-reveal text-4xl md:text-7xl font-bold leading-[1.05] text-white tracking-tighter uppercase">
                I specialize in build <span className="text-zinc-600 italic">scalable applications</span>
                <span className="text-[#b6ed12]"> with clean architecture</span>.
              </h2>
            </div>

            <div className="about-line h-[1px] w-full bg-white/10 mt-12 mb-12" />

            <div className="overflow-hidden">
              <p className="about-reveal text-zinc-400 text-lg md:text-2xl max-w-2xl leading-relaxed mb-12">
                With hands-on experience in Python, Django, and modern frontend tools
                like React and Next.js, I develop scalable applications focused on
                performance, maintainability, and intuitive user experience.
              </p>
            </div>

            {/* PREMIUM SOCIAL SIGNATURE */}
            <div className="about-reveal flex flex-wrap items-center gap-8 pt-8 border-t border-white/5">
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Connect —</p>
              {[
                { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/zhiyad96" },
                { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/muhammedzhiyad/" },
                { icon: <Instagram size={18} />, label: "Instagram", href: "https://www.instagram.com/m_zhiyad?igsh=MXY4ZnkyajFnOHQ4MQ==" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-[#b6ed12] transition-colors duration-300 group"
                >
                  {item.icon}
                  <span className="text-xs font-bold uppercase tracking-tighter hidden sm:inline">{item.label}</span>
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Details & Action Cards */}
          <div className="lg:col-span-5 flex flex-col gap-12">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12">
              <div className="overflow-hidden border-l border-[#b6ed12]/30 pl-6 group">
                <div className="about-reveal">
                  <h4 className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.2em] mb-3">Core Stack</h4>
                  <p className="text-white font-medium text-lg leading-tight group-hover:text-[#b6ed12] transition-colors duration-500">
                    Python, FastAPI, Django, <br /> Next.js, GSAP & Tailwind
                  </p>
                </div>
              </div>

              <div className="overflow-hidden border-l border-white/10 pl-6">
                <div className="about-reveal">
                  <h4 className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.2em] mb-3">Location</h4>
                  <p className="text-white font-medium text-lg italic">Kerala, India — Available Worldwide</p>
                </div>
              </div>
            </div>

            {/* ACTION CARD: Resume & Contact (Working Email) */}
            <div className="about-reveal mt-auto group">
              <div className="relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#b6ed12]/20 shadow-2xl backdrop-blur-sm">
                <h3 className="text-white text-2xl font-bold mb-6">Let's work together?</h3>

                <div className="flex flex-col gap-4">
                  {/* Resume Download */}
                  <a
                    href="https://drive.google.com/file/d/1WYVKcyzdW6FOcrp7CxCViv0eT0eQNUUm/view?usp=drivesdk"
                    download
                    className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 hover:bg-[#b6ed12] hover:text-black transition-all duration-500 group/btn"
                  >
                    <span className="flex items-center gap-3 font-bold text-sm uppercase">
                      <FileText size={18} /> Get My Resume
                    </span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Working Mailto Link */}
                  <button
                    onClick={() => window.location.href = 'mailto:mhdzhiyad9656@gmail.com?subject=Project Inquiry'}
                    className="flex items-center justify-between w-full p-4 rounded-xl border border-white/10 hover:border-white transition-all duration-500 cursor-pointer group/mail"
                  >
                    <span className="font-bold text-sm uppercase text-white group-hover/mail:tracking-widest transition-all">Get in touch</span>
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b6ed12] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b6ed12]"></span>
                    </div>
                  </button>
                </div>

                {/* Background decorative glow */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#b6ed12]/5 blur-3xl group-hover:bg-[#b6ed12]/10 transition-all duration-700" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}






