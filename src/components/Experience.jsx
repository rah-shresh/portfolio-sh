import React, { useState } from 'react';
import { Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import FadeInSection from './FadeInSection';

export default function Experience() {
  const [expanded, setExpanded] = useState(false);

  const experiences = [
    {
      id: 1,
      date: 'june 2026 – JUL 2026',
      role: 'ML Intern',
      company: 'Prodigy InfoTech',
      bullets: [
        'Built AI-powered web applications using Python and JavaScript frameworks.',
        'Developed machine learning pipelines for real-world data classification tasks.',
        'Collaborated with cross-functional teams to ship scalable backend systems.',
      ],
    },
    {
      id: 2,
      date: 'AUG 2026 – PRESENT',
      role: 'AI/ML Researcher & Developer',
      company: 'Independent Projects / Academic Lab',
      bullets: [
        'Explored Generative AI tools and integrated LLM APIs into production apps.',
        'Designed and implemented REST APIs consumed by frontend React applications.',
        'Researched latest AI trends and applied findings to active project pipelines.',
      ],
    },
  ];

  const visibleExperiences = expanded ? experiences : experiences.slice(0, 1);

  return (
    <section
      id="experience"
      className="bg-[#0d0d0d] text-gray-200 py-24 px-6 relative"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Section Heading */}
        <FadeInSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tight text-white inline-block relative pb-2">
            Experience
            <span className="absolute bottom-0 left-0 w-full h-1 bg-orangeAccent"></span>
          </h2>
          <p className="text-neutral-500 font-mono text-xs tracking-widest mt-3 uppercase">
            // Engineering journey & industry contribution
          </p>
        </FadeInSection>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-neutral-800 ml-4 sm:ml-32 pl-6 sm:pl-8 space-y-12">
          {visibleExperiences.map((exp, idx) => (
            <FadeInSection key={exp.id} className="relative">

              {/* Timeline dot */}
              <span className="absolute -left-[35px] top-1.5 flex h-6 h-6 w-6 items-center justify-center rounded-full bg-neutral-950 border-2 border-orangeAccent glow-orange z-20">
                <span className="h-1.5 w-1.5 rounded-full bg-orangeAccent animate-ping-slow"></span>
              </span>

              {/* Date Column (Absolute for screen, inline for mobile) */}
              <div className="hidden sm:block absolute -left-[180px] top-1.5 w-[140px] text-right font-mono text-xs font-bold text-orangeAccent tracking-widest">
                {exp.date}
              </div>

              {/* Mobile date display */}
              <div className="sm:hidden flex items-center gap-1.5 font-mono text-xs font-bold text-orangeAccent tracking-widest mb-2">
                <Calendar size={12} />
                {exp.date}
              </div>

              {/* Experience Card (White/light background) */}
              <div className="bg-white text-neutral-900 rounded-xl p-6 sm:p-8 shadow-xl border border-neutral-200 transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 border-b border-neutral-100 pb-3">
                  <div>
                    <h3 className="font-serif font-black text-xl text-neutral-950">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-orangeAccent font-mono mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <span className="p-2.5 rounded-lg bg-orangeAccent/10 text-orangeAccent">
                    <Briefcase size={18} />
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-sm text-neutral-600 leading-relaxed font-sans">
                      <span className="text-orangeAccent font-bold text-base leading-none select-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </FadeInSection>
          ))}
        </div>

        {/* Toggle Expand Button */}
        <FadeInSection className="flex justify-center mt-12">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900/30 hover:bg-orangeAccent hover:border-orangeAccent text-neutral-300 hover:text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-md focus:outline-none"
            id="experience-toggle-btn"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp size={14} />
              </>
            ) : (
              <>
                Show More <ChevronDown size={14} />
              </>
            )}
          </button>
        </FadeInSection>

      </div>
    </section>
  );
}
