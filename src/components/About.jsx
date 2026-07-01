import React from 'react';
import FadeInSection from './FadeInSection';

export default function About() {
  const qaList = [
    {
      question: 'What I do?',
      emoji: '🧠',
      answer: 'Build AI-powered applications, machine learning projects, web apps, and automation tools that solve real-world problems.',
    },
    {
      question: 'Current Mission?',
      emoji: '🚀',
      answer: 'Learning, building, and turning ideas into products that people genuinely find useful.',
    },
    {
      question: 'Tech Stack?',
      emoji: '💻',
      answer: 'Python, JavaScript, React, SQL, Machine Learning, APIs, AI Tools, and whatever helps bring an idea to life.',
    },
    {
      question: 'What am I learning?',
      emoji: '📚',
      answer: 'Machine Learning, Generative AI, AI Agents, Backend Development, System Design, and scalable applications.',
    },
    {
      question: "When I'm not coding?",
      emoji: '🎮',
      answer: 'Watching anime, gaming, exploring startup ideas, learning new technologies, or planning my next project.',
    },
    {
      question: 'What do I care about?',
      emoji: '🎯',
      answer: 'Building useful products, solving meaningful problems, continuous learning, and creating opportunities through technology.',
    },
    {
      question: 'My weakness?',
      emoji: '😅',
      answer: 'Too many startup ideas, not enough time to build them all.',
    },
    {
      question: 'Fun fact?',
      emoji: '🔥',
      answer: 'Every bug teaches me something new. Every project makes me a better builder.',
    },
    {
      question: 'Future Goal?',
      emoji: '🌍',
      answer: 'To create technology that helps people, solves real problems, and makes a meaningful impact.',
    },
  ];

  return (
    <section
      id="about"
      className="bg-[#111111] text-neutral-900 py-24 px-6 relative overflow-hidden"
    >
      {/* Absolute Decorative Elements (Subtle grid lines or background letters) */}
      <div className="absolute right-0 top-0 text-[10rem] font-serif text-neutral-200/50 select-none pointer-events-none font-bold rotate-12 transform translate-x-12 -translate-y-8">
        SHRESH
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Heading */}
        <FadeInSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tight text-white inline-block relative pb-2">
            More Than A Resume
            <span className="absolute bottom-0 left-0 w-full h-1 bg-orangeAccent"></span>
          </h2>
          <p className="text-neutral-500 font-mono text-xs tracking-widest mt-3 uppercase">
            // Getting to know the developer behind the code
          </p>
        </FadeInSection>

        {/* Q&A Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qaList.map((item, idx) => (
            <FadeInSection
              key={idx}
              className="bg-neutral-900/50 border border-neutral-850 hover:border-orangeAccent/40 p-6 rounded-xl hover:shadow-[0_0_30px_rgba(232,84,26,0.1)] transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Question Header */}
              <div className="flex items-center gap-3 mb-4 border-b border-black pb-3">
                <span className="text-2xl" role="img" aria-label="icon">
                  {item.emoji}
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  {item.question}
                </h3>
              </div>

              {/* Answer Content */}
              <p className="text-white text-sm leading-relaxed font-sans font-normal">
                {item.answer}
              </p>
            </FadeInSection>
          ))}
        </div>

      </div>
    </section>
  );
}
