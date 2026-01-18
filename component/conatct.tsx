
"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Send, Github, Linkedin, Instagram, ArrowUpRight, Copy, Check } from "lucide-react";

export default function ContactSection() {
  const container = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const copyEmail = () => {
    navigator.clipboard.writeText("mhdzhiyad9656@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to handle the "Send Message" click
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Zhiyad,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
    );
    
    // Triggers the user's default email client
    window.location.href = `mailto:mhdzhiyad9656@gmail.com?subject=${subject}&body=${body}`;
  };

  useGSAP(() => {
    gsap.from(".contact-item", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-[#050505] py-24 px-6 md:px-20 relative overflow-hidden">
      
      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 -left-10 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none leading-none">
        HELLO
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-between py-10">
          <div>
            <div className="contact-item flex items-center gap-3 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b6ed12] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#b6ed12]"></span>
              </span>
              <span className="text-[#b6ed12] font-mono text-xs uppercase tracking-[0.2em]">Available for new projects</span>
            </div>

            <h2 className="contact-item text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.9] mb-12">
              Let's build <br /> <span className="text-zinc-700">something</span> <br /> great.
            </h2>

            <div className="contact-item space-y-6">
              <p className="text-zinc-500 text-lg max-w-sm">
                Have an idea? Reach out and let's turn it into reality with high-end code.
              </p>
              
              <button 
                onClick={copyEmail}
                className="group flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl hover:border-[#b6ed12]/50 transition-all duration-500"
              >
                <div className="text-left">
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">Email Me</p>
                  <p className="text-white font-mono">mhdzhiyad9656@gmail.com</p>
                </div>
                <div className="ml-4 p-2 bg-white/5 rounded-lg text-[#b6ed12] group-hover:bg-[#b6ed12] group-hover:text-black transition-all">
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </div>
              </button>
            </div>
          </div>

          <div className="contact-item flex gap-6 mt-16">
            {[
              { icon: <Github size={20} />, link: "https://github.com/zhiyad96" },
              { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/muhammedzhiyad/" },
              { icon: <Instagram size={20} />, link: "https://www.instagram.com/m_zhiyad?igsh=MXY4ZnkyajFnOHQ4MQ==" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link}
                target="_blank"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#b6ed12] hover:border-[#b6ed12]/40 hover:-translate-y-1 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Working Form */}
        <div className="contact-item bg-zinc-900/20 border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
          <form className="space-y-8" onSubmit={handleSendEmail}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-4">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#b6ed12]/50 focus:bg-[#b6ed12]/5 transition-all duration-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-4">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#b6ed12]/50 focus:bg-[#b6ed12]/5 transition-all duration-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-4">Project Details</label>
              <textarea 
                required
                rows={4}
                placeholder="Tell me about your vision..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#b6ed12]/50 focus:bg-[#b6ed12]/5 transition-all duration-500 resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full group bg-[#b6ed12] text-black font-bold uppercase text-xs tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:gap-5 hover:bg-[#c8ff1a] transition-all duration-500 shadow-[0_0_30px_rgba(182,237,18,0.2)] active:scale-95"
            >
              Send Message <Send size={16} />
            </button>
          </form>

          <p className="text-center text-zinc-700 text-[10px] mt-8 uppercase tracking-widest">
            Average response time: &lt; 24 hours
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-xs font-mono">© 2026 ZHIYAD. ALL RIGHTS RESERVED.</p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          Back to Top <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}