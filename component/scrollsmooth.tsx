
"use client";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function SmoothScroll() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringTextRef = useRef<HTMLSpanElement>(null);

 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 0.5,
    infinite: false,
    smoothTouch: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const update = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);

  (window as any).lenis = lenis;

  return () => {
    gsap.ticker.remove(update);
    lenis.destroy();
  };
}, []);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringText = ringTextRef.current;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "none",
      });

      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleHover = () => {
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(ring, {
        scale: 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        mixBlendMode: "normal",
        duration: 0.4,
      });
    };

    const handleProjectHover = () => {
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(ring, {
        scale: 2.2,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        mixBlendMode: "normal",
        duration: 0.4,
      });
      gsap.to(ringText, { opacity: 1, scale: 0.8, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
        mixBlendMode: "difference",
        duration: 0.4,
      });
      gsap.to(ringText, { opacity: 0, scale: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const updateListeners = () => {
      const interactables = document.querySelectorAll("a, button, .cursor-pointer, [data-cursor='view']");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
          const target = e.currentTarget as HTMLElement;
          if (target.hasAttribute('data-cursor')) handleProjectHover();
          else handleHover();
        });
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    updateListeners();
    return () => window.removeEventListener("mousemove", moveCursor);
  });

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center overflow-hidden"
        style={{ mixBlendMode: "difference" }}
      >
        <span ref={ringTextRef} className="text-[10px] uppercase font-bold opacity-0 scale-0">View</span>
      </div>

      <style jsx global>{`
        /* Essential for Mobile Lenis */
        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }

        /* Prevent system "bounce" on iOS which fights with smooth scroll */
        body {
          overscroll-behavior-y: none;
        }

        @media (min-width: 768px) {
          body, a, button, [data-cursor="view"], .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}