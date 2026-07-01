import React, { useEffect, useRef } from 'react';
import { Download, ArrowRight, Mail } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set size
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse interactive coordinates
    const mouse = { x: null, y: null, radius: 140 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // Initialize particles
    const particleCount = Math.min(80, Math.floor((width * height) / 18000));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232, 84, 26, 0.4)';
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(232, 84, 26, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(232, 84, 26, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }


    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToContact = () => {
    const section = document.getElementById('contact');
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0d] pt-20 px-6"
    >
      {/* Background One Piece Manga with orange-sepia overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-25 filter sepia-[60%] contrast-[120%] brightness-[80%]"
        style={{ backgroundImage: "url('/one_piece_bg.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0d0d0d]/65 via-[#0d0d0d]/80 to-orangeAccent/20" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" aria-hidden="true" />

      {/* Interactive Neural Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        id="hero-canvas"
      />

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">

        {/* Left Side: Headline & Intro */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-6">
            Hello, I'm <span className="text-orangeAccent relative inline-block">
              Shresh !
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-orangeAccent/20 rounded"></span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 font-sans max-w-2xl leading-relaxed mb-8">
            I build AI that works, ship code that scales, and learn faster than most.
            <span className="text-white font-medium"> Preferably paid — but always learning.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Resume button triggers download */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-orangeAccent text-white hover:bg-orangeAccent/90 font-semibold text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-orangeAccent/20 focus:outline-none focus:ring-2 focus:ring-orangeAccent/50"
              id="hero-resume-btn"
            >
              <Download size={16} />
              Resume
            </a>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-neutral-700 hover:border-orangeAccent text-white hover:text-orangeAccent font-semibold text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-1 bg-neutral-900/40 backdrop-blur-sm focus:outline-none"
              id="hero-hire-btn"
            >
              Hire Me
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Side: Stacked Blob shapes */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] tracking-widest uppercase font-mono text-neutral-500">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border-2 border-neutral-700 flex justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-orangeAccent animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
