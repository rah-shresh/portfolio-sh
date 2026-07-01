import React from 'react';
import { Mail, ExternalLink, Code2 } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import FadeInSection from './FadeInSection';

export default function Contact() {
  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/rah-shresh',
      icon: Github,
      detail: '',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/shres-rahangdale',
      icon: Linkedin,
      detail: '',
    },
    {
      name: 'Email',
      url: 'mailto:shresrahangdale@gmail.com',
      icon: Mail,
      detail: '',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/rah-shresh/',
      icon: Code2,
      detail: '',
    },
  ];

  return (
    <section
      id="contact"
      className="bg-[#111111] text-gray-200 py-24 pb-12 px-6 relative"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Heading */}
        <FadeInSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tight text-white inline-block relative pb-2">
            Get In Touch
            <span className="absolute bottom-0 left-0 w-full h-1 bg-orangeAccent"></span>
          </h2>
          <p className="text-neutral-500 font-mono text-xs tracking-widest mt-3 uppercase">
            // Open for opportunities & collaboration
          </p>
        </FadeInSection>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">

          {/* Left Column: Let's Connect */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="font-serif font-black text-2xl text-white mb-6 tracking-wide text-left">
              Let's Connect
            </h3>

            <div className="flex flex-col">
              {socials.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <div key={social.name} className="flex flex-col">
                    {idx > 0 && <hr className="border-neutral-800 my-4" />}
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-2 text-neutral-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 focus:outline-none"
                      id={`social-link-${social.name.toLowerCase()}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-orangeAccent group-hover:border-orangeAccent/40 transition-all duration-300">
                          <Icon size={18} />
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="font-sans font-bold text-sm tracking-wide group-hover:text-orangeAccent transition-colors duration-300">
                            {social.name}
                          </span>
                          <span className="font-mono text-xs text-neutral-500 mt-0.5">
                            {social.detail}
                          </span>
                        </div>
                      </div>
                      <span className="text-neutral-600 group-hover:text-orangeAccent transition-colors duration-300">
                        <ExternalLink size={14} />
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hire Me Cards */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <h3 className="font-serif font-black text-2xl text-white mb-6 tracking-wide text-left">
              Hire Me
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">

              {/* Job Card */}
              <div className="bg-neutral-200 text-neutral-900 p-6 rounded-xl border border-neutral-300 flex flex-col justify-between min-h-[250px] hover:shadow-lg transition-all duration-300 shadow-sm text-left">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-10 h-10 rounded-lg bg-orangeAccent/10 border border-orangeAccent/20 flex items-center justify-center text-orangeAccent">
                      <span className="font-mono text-xs font-black">JOB</span>
                    </div>
                    <span className="text-[10px] tracking-widest font-mono text-neutral-500 font-bold uppercase">
                      Available 2027
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-neutral-950 mb-1">
                    Full-time position
                  </h4>
                  <p className="text-neutral-600 text-xs font-sans leading-relaxed mb-6">
                    Open to AI/ML Engineer roles at your company. Let's discuss alignment and synergy.
                  </p>
                </div>
                <a
                  href="/?inquiry=job"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-neutral-950 text-white hover:bg-orangeAccent hover:shadow-md font-mono text-xs tracking-wider uppercase font-bold transition-all duration-300"
                >
                  Let's Talk
                </a>
              </div>

              {/* Freelance Card */}
              <div className="bg-neutral-200 text-neutral-900 p-6 rounded-xl border border-neutral-300 flex flex-col justify-between min-h-[250px] hover:shadow-lg transition-all duration-300 shadow-sm text-left">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-10 h-10 rounded-lg bg-orangeAccent/10 border border-orangeAccent/20 flex items-center justify-center text-orangeAccent">
                      <span className="font-mono text-xs font-black">GIG</span>
                    </div>
                    <span className="text-[10px] tracking-widest font-mono text-neutral-500 font-bold uppercase">
                      Flexible hours
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-neutral-950 mb-1">
                    Freelance Projects
                  </h4>
                  <p className="text-neutral-600 text-xs font-sans leading-relaxed mb-6">
                    Available for consulting, custom model training, AI agent engineering, and web contracts.
                  </p>
                </div>
                <a
                  href="/?inquiry=gig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-neutral-950 text-white hover:bg-orangeAccent hover:shadow-md font-mono text-xs tracking-wider uppercase font-bold transition-all duration-300"
                >
                  Start Project
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Area */}
        <div className="border-t border-neutral-900 pt-8 mt-12 text-center flex flex-col items-center justify-center gap-3">
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase" id="footer-copyright">
            © 2026 Shres Rahangdale
          </span>
          <span className="font-sans text-[10px] text-neutral-600">
            Designed for intelligence • Built for utility
          </span>
        </div>

      </div>
    </section>
  );
}
