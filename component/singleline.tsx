"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,     
          start: "top top",           
          end: "bottom bottom",       
          scrub: 0.5,                
        },
      });
    });

    return () => ctx.revert(); 
  }, []);

  return (
    <div 
      ref={lineRef}
      className="fixed top-0 left-0 w-full h-[4px] bg-[#b6ed12] z-[10000] origin-left scale-x-0 pointer-events-none shadow-[0_0_10px_rgba(182,237,18,0.5)]" 
    />
  );
}