
// "use client";
// import { useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowUpRight } from "lucide-react";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const PROJECTS = [
//   {
//     id: "01",
//     title: "VELOCE & E-Commerce",
//     category: "React / Rest API/ ",
//     image: "/veloce.png",
//   },
//   {
//     id: "02",
//     title: "Quantum E-Commerce",
//     category: "Next.js / Django / Stripe",
//     image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
//   }
// ];

// export default function ProjectSection() {
//   const container = useRef<HTMLDivElement>(null);
//   const { contextSafe } = useGSAP({ scope: container });

//   // 1. Perspective Tilt Logic (Desktop Only)
//   const onMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
//     // Only apply tilt if it's not a touch device
//     if (window.matchMedia("(pointer: coarse)").matches) return;

//     const card = e.currentTarget;
//     const imageWrapper = card.querySelector(".tilt-wrapper") as HTMLElement;
//     const rect = card.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width - 0.5;
//     const y = (e.clientY - rect.top) / rect.height - 0.5;

//     gsap.to(imageWrapper, {
//       rotationY: x * 15,
//       rotationX: -y * 15,
//       transformPerspective: 1000,
//       ease: "power2.out",
//       duration: 0.6,
//     });
//   });

//   const onMouseLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
//     const imageWrapper = e.currentTarget.querySelector(".tilt-wrapper");
//     gsap.to(imageWrapper, {
//       rotationY: 0,
//       rotationX: 0,
//       ease: "power3.out",
//       duration: 0.8,
//     });
//   });

//   useGSAP(() => {
//     // Reveal Header
//     gsap.from(".project-header-text", {
//       scrollTrigger: {
//         trigger: ".project-header",
//         start: "top 85%",
//         toggleActions: "play reverse play reverse",
//       },
//       y: 40,
//       opacity: 0,
//       stagger: 0.1,
//       duration: 0.8,
//       ease: "power4.out",
//     });

//     const projects = gsap.utils.toArray(".project-card");
    
//     projects.forEach((project: any) => {
//       const image = project.querySelector(".project-image");
//       const info = project.querySelector(".project-info");
//       const overlay = project.querySelector(".project-overlay");

//       // Entrance Reveal
//       gsap.fromTo(project, 
//         { y: 50, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           scrollTrigger: {
//             trigger: project,
//             start: "top 90%",
//             end: "bottom 10%",
//             toggleActions: "play reverse play reverse",
//           }
//         }
//       );

//       // Parallax effect on Image
//       gsap.to(image, {
//         yPercent: 15,
//         ease: "none",
//         scrollTrigger: {
//           trigger: project,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true,
//         },
//       });

//       // Mobile "Hover" Simulation: When card is in center of screen, remove overlay
//       gsap.to(overlay, {
//         opacity: 0,
//         scrollTrigger: {
//           trigger: project,
//           start: "top 60%",
//           end: "top 30%",
//           scrub: true,
//         }
//       });
//     });
//   }, { scope: container });

//   return (
//     <section ref={container} className="relative w-full bg-[#050505] py-20 md:py-32 px-6 md:px-20 overflow-hidden">
      
//       {/* Section Header */}
//       <div className="project-header mb-16 md:mb-32 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//         <div className="overflow-hidden">
//           <span className="project-header-text block text-[#b6ed12] font-mono text-xs md:text-sm uppercase tracking-widest mb-4">
//             02 / Selected Works
//           </span>
//           <h2 className="project-header-text text-5xl md:text-9xl font-bold tracking-tighter text-white uppercase leading-none">
//             Projects
//           </h2>
//         </div>
//         <p className="project-header-text text-zinc-500 max-w-xs text-sm md:text-base font-medium leading-relaxed">
//           A collection of digital experiences built with performance and aesthetics.
//         </p>
//       </div>

//       {/* Projects List */}
//       <div className="max-w-5xl mx-auto space-y-32 md:space-y-64">
//         {PROJECTS.map((project) => (
//           <div 
//             key={project.id} 
//             className="project-card group relative"
//             onMouseMove={onMouseMove}
//             onMouseLeave={onMouseLeave}
//             style={{ perspective: "1000px" }}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
//               {/* Image Column: Height Fixed via Aspect Ratios */}
//               <div 
//                 className="tilt-wrapper md:col-span-8 rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 relative"
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 <img 
//                   src={project.image} 
//                   alt={project.title}
//                   className="project-image w-full h-[120%] -top-[10%] absolute object-cover opacity-80 md:opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
//                 />
                
//                 {/* Overlay that clears on scroll (Mobile) or Hover (Desktop) */}
//                 <div className="project-overlay absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                
//                 {/* MOBILE HEIGHT: aspect-[4/5] | DESKTOP HEIGHT: aspect-[16/10] */}
//                 <div className="aspect-[4/5] md:aspect-[16/10] w-full" />
//               </div>

//               {/* Info Column */}
//               <div className="project-info md:col-span-4 flex flex-col justify-center z-10">
//                 <div className="flex items-center gap-4 mb-4 md:mb-8">
//                   <span className="text-zinc-500 font-mono text-lg md:text-xl">{project.id}</span>
//                   <div className="h-[1px] w-8 md:w-12 bg-zinc-800 group-hover:w-16 md:group-hover:w-20 group-hover:bg-[#b6ed12] transition-all duration-500" />
//                 </div>
                
//                 <h3 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 group-hover:text-[#b6ed12] transition-colors duration-500 leading-tight tracking-tighter">
//                   {project.title}
//                 </h3>
                
//                 <p className="text-zinc-500 font-medium tracking-wide text-base md:text-lg mb-8 md:mb-0">
//                   {project.category}
//                 </p>

//                 {/* Mobile: Visible always | Desktop: Fade in on hover */}
//                 <div className="flex items-center gap-3 text-white font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] md:opacity-0 md:group-hover:opacity-100 md:-translate-x-5 md:group-hover:translate-x-0 transition-all duration-700">
//                   View Case Study <ArrowUpRight size={18} className="text-[#b6ed12]" />
//                 </div>
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Background Glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[1000px] h-[300px] md:h-[1000px] bg-[#b6ed12]/5 rounded-full blur-[80px] md:blur-[180px] pointer-events-none z-0" />
//     </section>
//   );
// }





"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link"; // Import Next.js Link for better performance

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "01",
    title: "VELOCE & E-Commerce",
    category: "React / Rest API",
    image: "/veloce.png",
    link: "https://veloce-vercel-89qu2mb6z-zhiyads-projects.vercel.app", // ADD YOUR LINK HERE
  },
  {
    id: "02",
    title: "AI Attendance",
    category: "Python/Django/Flutter",
    image: "\ai.png",
    link: "/#", 
  }
];

export default function ProjectSection() {
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  const onMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = e.currentTarget;
    const imageWrapper = card.querySelector(".tilt-wrapper") as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(imageWrapper, {
      rotationY: x * 15,
      rotationX: -y * 15,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.6,
    });
  });

  const onMouseLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const imageWrapper = e.currentTarget.querySelector(".tilt-wrapper");
    gsap.to(imageWrapper, {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 0.8,
    });
  });

  useGSAP(() => {
    // Header Reveal
    gsap.from(".project-header-text", {
      scrollTrigger: {
        trigger: ".project-header",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power4.out",
    });

    const projects = gsap.utils.toArray(".project-card");
    projects.forEach((project: any) => {
      const image = project.querySelector(".project-image");
      const overlay = project.querySelector(".project-overlay");

      gsap.fromTo(project, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: project,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      gsap.to(image, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: project,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(overlay, {
        opacity: 0,
        scrollTrigger: {
          trigger: project,
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-[#050505] py-20 md:py-32 px-6 md:px-20 overflow-hidden">
      
      <div className="project-header mb-16 md:mb-32 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="overflow-hidden">
          <span className="project-header-text block text-[#b6ed12] font-mono text-xs md:text-sm uppercase tracking-widest mb-4">
            02 / Selected Works
          </span>
          <h2 className="project-header-text text-5xl md:text-9xl font-bold tracking-tighter text-white uppercase leading-none">
            Projects
          </h2>
        </div>
        <p className="project-header-text text-zinc-500 max-w-xs text-sm md:text-base font-medium leading-relaxed">
          A collection of digital experiences built with performance and aesthetics.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-32 md:space-y-64">
        {PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className="project-card group relative"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ perspective: "1000px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* IMAGE LINK WRAPPER */}
              <Link 
                href={project.link}
                target={project.link.startsWith('http') ? "_blank" : "_self"}
                className="tilt-wrapper md:col-span-8 rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 relative cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image w-full h-[120%] -top-[10%] absolute object-cover opacity-80 md:opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                />
                <div className="project-overlay absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                <div className="aspect-[4/5] md:aspect-[16/10] w-full" />
              </Link>

              <div className="project-info md:col-span-4 flex flex-col justify-center z-10">
                <div className="flex items-center gap-4 mb-4 md:mb-8">
                  <span className="text-zinc-500 font-mono text-lg md:text-xl">{project.id}</span>
                  <div className="h-[1px] w-8 md:w-12 bg-zinc-800 group-hover:w-16 md:group-hover:w-20 group-hover:bg-[#b6ed12] transition-all duration-500" />
                </div>
                
                <h3 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 group-hover:text-[#b6ed12] transition-colors duration-500 leading-tight tracking-tighter">
                  {project.title}
                </h3>
                
                <p className="text-zinc-500 font-medium tracking-wide text-base md:text-lg mb-8">
                  {project.category}
                </p>

                {/* TEXT LINK WRAPPER */}
                <Link 
                  href={project.link}
                  target={project.link.startsWith('http') ? "_blank" : "_self"}
                  className="flex items-center gap-3 text-white font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] md:opacity-0 md:group-hover:opacity-100 md:-translate-x-5 md:group-hover:translate-x-0 transition-all duration-700 hover:text-[#b6ed12]"
                >
                  View Case Study <ArrowUpRight size={18} className="text-[#b6ed12]" />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[1000px] h-[300px] md:h-[1000px] bg-[#b6ed12]/5 rounded-full blur-[80px] md:blur-[180px] pointer-events-none z-0" />
    </section>
  );
}