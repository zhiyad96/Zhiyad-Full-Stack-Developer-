
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github, Linkedin, Instagram, FileText } from "lucide-react";

export default function ModernHero() {
    const container = useRef<HTMLDivElement>(null);
    const { contextSafe } = useGSAP({ scope: container });

    const handleEmailClick = () => {
        window.location.href = "mailto:mhdzhiyad9656@gmail.com?subject=Project Inquiry";
    };

    const onMouseEnter = contextSafe(() => {
        const tl = gsap.timeline();
        tl.to(".arrow-icon", { x: 20, y: -20, opacity: 0, duration: 0.3, ease: "power2.in" })
            .set(".arrow-icon", { x: -20, y: 20 })
            .to(".arrow-icon", { x: 0, y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    });

    const onMouseLeave = contextSafe(() => {
        gsap.to(".arrow-icon", { x: 0, y: 0, opacity: 1, duration: 0.3 });
    });

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
        tl.from(".hero-badge", { y: -20, opacity: 0 })
            .from(".hero-text", { y: 100, opacity: 0, stagger: 0.1 }, "-=0.8")
            .from(".cta-group", { y: 30, opacity: 0 }, "-=0.5")
            .from(".social-bottom", { y: 20, opacity: 0, stagger: 0.1 }, "-=0.8");

        gsap.to(".hero-badge", { y: 5, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2 });
    }, { scope: container });

    return (
        <section ref={container} className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-center px-6 md:px-20 overflow-hidden text-white">

            <div className="z-10 flex flex-col items-center">
                {/* Header Badge */}
                <div className="hero-badge z-20 group inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 bg-white/5 text-[12px] md:text-[13px] font-mono uppercase tracking-[0.3em] text-white/90 mb-10 backdrop-blur-md cursor-default hover:bg-white/10 hover:border-[#b6ed12]/50 transition-all duration-500">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b6ed12] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b6ed12]"></span>
                    </span>
                    Hello I'm Muhammed Zhiyad
                    <span className="group-hover:rotate-12 transition-transform duration-300">👋</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4 flex flex-col items-center text-center mb-12">
                    <div className="overflow-hidden h-fit">
                        <h1 className="hero-text text-6xl md:text-9xl font-bold tracking-tighter leading-none">
                            PYTHON <span className="text-zinc-500">Full stack</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden h-fit">
                        <h1 className="hero-text text-6xl md:text-9xl font-bold tracking-tighter leading-none italic text-zinc-500">
                            Developer
                        </h1>
                    </div>
                </div>

                {/* DUAL CTA GROUP */}
                <div className="cta-group flex flex-col sm:flex-row items-center gap-6 mb-12">
                    <div className="group relative">
                        <button
                            onClick={handleEmailClick}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            className="relative px-10 py-4 bg-[#b6ed12] text-black font-bold rounded-full flex items-center justify-center overflow-hidden text-sm active:scale-95 z-20 cursor-pointer"
                        >
                            <span className="relative z-10">Email me</span>
                            <div className="relative w-5 h-5 ml-2 overflow-hidden flex items-center justify-center">
                                <div className="arrow-icon">
                                    <ArrowUpRight size={18} strokeWidth={3} />
                                </div>
                            </div>
                        </button>
                        <div className="absolute inset-0 bg-[#b6ed12] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full" />
                    </div>

                    <a
                        href="https://drive.google.com/file/d/1C45FldDcS0RYZeBJRyA3wbx9bGIlET9H/view?usp=drive_link"
                        download
                        className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-500 text-sm font-bold uppercase tracking-widest"
                    >
                        <FileText size={18} />
                        Get Resume
                    </a>
                </div>

                {/* BOTTOM SOCIALS - Centered under CTAs */}
                <div className="social-bottom flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-white/10" />
                    {[
                        { icon: <Github size={18} />, href: "https://github.com/zhiyad96" },
                        { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/muhammedzhiyad/" },
                        { icon: <Instagram size={18} />, href: "https://www.instagram.com/m_zhiyad?igsh=MXY4ZnkyajFnOHQ4MQ==" }
                    ].map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-zinc-500 hover:text-[#b6ed12] hover:border-[#b6ed12]/40 hover:bg-[#b6ed12]/5 transition-all duration-300"
                        >
                            {social.icon}
                        </a>
                    ))}
                    <div className="w-12 h-[1px] bg-white/10" />
                </div>
            </div>



            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Soft Lime Glow */}
            <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-[#b6ed12]/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}








// "use client";
// import { useRef, useState } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ArrowUpRight, Github, Linkedin, Instagram, FileText, Sun, Moon } from "lucide-react";

// export default function ModernHero() {
//     const container = useRef<HTMLDivElement>(null);
//     const [isDark, setIsDark] = useState(true);
//     const { contextSafe } = useGSAP({ scope: container });

//     const toggleTheme = contextSafe(() => {
//         const newTheme = !isDark;
//         setIsDark(newTheme);

//         // 1. Animate the Sliding Toggle Switch
//         // We move the knob 32 pixels to the right for light mode
//         gsap.to(".toggle-knob", {
//             x: newTheme ? 0 : 32, 
//             backgroundColor: newTheme ? "#b6ed12" : "#000000",
//             duration: 0.5,
//             ease: "back.out(1.7)"
//         });

//         // 2. Background transition
//         gsap.to(container.current, {
//             backgroundColor: newTheme ? "#050505" : "#fafafa",
//             duration: 0.8,
//             ease: "power2.inOut"
//         });
        
//         // 3. Typography color transition
//         gsap.to(".theme-text", {
//             color: newTheme ? "#ffffff" : "#121212",
//             duration: 0.6,
//         });

//         // 4. Grid pattern opacity
//         gsap.to(".grid-pattern", {
//             opacity: newTheme ? 0.1 : 0.05,
//             duration: 1
//         });
//     });

//     const handleEmailClick = () => {
//         window.location.href = "mailto:mhdzhiyad9656@gmail.com?subject=Project Inquiry";
//     };

//     useGSAP(() => {
//         const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
//         tl.from(".hero-badge", { y: -20, opacity: 0 })
//           .from(".hero-text", { y: 100, opacity: 0, stagger: 0.1 }, "-=0.8")
//           .from(".cta-group", { y: 30, opacity: 0 }, "-=0.5");

//         gsap.to(".hero-badge", { y: 5, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2 });
//     }, { scope: container });

//     return (
//         <section ref={container} className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-20 overflow-hidden bg-[#050505] transition-colors duration-500">
//             <div className="z-10 flex flex-col items-center">
                
//                 {/* --- UPDATED PREMIUM BADGE --- */}
//                 <div className={`hero-badge flex items-center rounded-full border transition-all duration-700 backdrop-blur-xl mb-10 p-2 shadow-2xl ${
//                     isDark ? 'border-white/10 bg-white/5 shadow-black/50' : 'border-black/10 bg-black/5 shadow-black/5'
//                 }`}>
                    
//                     {/* Identity Section */}
//                     <div className="flex items-center gap-3 pl-4 pr-6">
//                         <span className="relative flex h-2 w-2">
//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b6ed12] opacity-75"></span>
//                             <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b6ed12]"></span>
//                         </span>
//                         <span className={`text-[11px] md:text-[12px] font-mono uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-500 ${isDark ? "text-white/80" : "text-black font-bold"}`}>
//                             Muhammed Zhiyad 👋
//                         </span>
//                     </div>

//                     {/* SLIDING TOGGLE SWITCH - Improved Visibility */}
//                     <div 
//                         onClick={toggleTheme}
//                         className={`relative w-16 h-8 rounded-full cursor-pointer flex items-center p-1 border transition-all duration-500 ${
//                             isDark ? 'bg-zinc-900 border-white/10' : 'bg-zinc-200 border-black/10'
//                         }`}
//                     >
//                         {/* The Sliding Knob - Ensure it's inside the track */}
//                         <div className="toggle-knob absolute left-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg bg-[#b6ed12] z-20">
//                             {isDark ? (
//                                 <Sun size={12} className="text-black" fill="currentColor" />
//                             ) : (
//                                 <Moon size={12} className="text-white" fill="currentColor" />
//                             )}
//                         </div>
                        
//                         {/* Background Guide Icons */}
//                         <div className="flex justify-between w-full px-1.5 opacity-20 pointer-events-none">
//                             <div className="w-4" /> {/* Spacer */}
//                             <Moon size={12} className={isDark ? 'text-white' : 'text-black'} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Heading */}
//                 <div className="space-y-2 flex flex-col items-center text-center mb-12">
//                     <h1 className={`hero-text theme-text text-6xl md:text-9xl font-black tracking-tighter leading-none transition-colors duration-500 ${isDark ? 'text-white' : 'text-[#121212]'}`}>
//                         PYTHON <span className="text-zinc-500/80">Full stack</span>
//                     </h1>
//                     <h1 className="hero-text text-6xl md:text-9xl font-black tracking-tighter leading-none italic text-zinc-500/80">
//                         Developer
//                     </h1>
//                 </div>

//                 {/* CTAs */}
//                 <div className="cta-group flex flex-col sm:flex-row items-center gap-6">
//                     <button
//                         onClick={handleEmailClick}
//                         className="px-10 py-5 bg-[#b6ed12] text-black font-bold rounded-full text-xs uppercase tracking-widest active:scale-95 shadow-lg shadow-[#b6ed12]/20"
//                     >
//                         Get in Touch
//                     </button>
//                     <a
//                         href="#"
//                         className={`px-8 py-5 rounded-full border transition-all duration-500 text-xs font-bold uppercase tracking-widest ${
//                             isDark 
//                             ? 'border-white/10 bg-white/5 text-white hover:bg-white hover:text-black' 
//                             : 'border-black/10 bg-black/5 text-black hover:bg-black hover:text-white'
//                         }`}
//                     >
//                         <FileText size={18} className="inline mr-2" />
//                         Resume
//                     </a>
//                 </div>
//             </div>

//             {/* Background Pattern */}
//             <div className={`grid-pattern absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-10' : 'opacity-[0.05]'}`}>
//                 <div className={`h-full w-full ${isDark ? 'bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#00000020_1px,transparent_1px),linear-gradient(to_bottom,#00000020_1px,transparent_1px)]'} bg-[size:60px_60px]`} />
//             </div>
//         </section>
//     );
// }