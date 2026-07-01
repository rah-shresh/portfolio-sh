import React, { useState } from 'react';
import { ArrowDown, ArrowUp, ExternalLink, Code } from 'lucide-react';
import FadeInSection from './FadeInSection';

export default function Projects() {
  const [expanded, setExpanded] = useState(false);

  const projects = [
    {
      id: 1,
      name: 'CodeMorphix',
      desc: 'CodeMorphix is an AI-powered code translation platform that converts code between multiple programming languages in real-time. It features secure authentication, live code execution, output verification, error detection, modern SaaS UI, and AI-based translation using Gemini API and Piston API.',
      tags: ['JWT Authentication', 'Google Gemini API ', 'React', 'Tailwind CSS', 'Vercel'],
    },
    {
      id: 2,
      name: 'Hand Gesture Recognition',
      desc: 'CNN-based pipeline trained on the LeapGestRecog dataset, incorporating advanced OpenCV preprocessing and Keras/TensorFlow models.',
      tags: ['CNN', 'OpenCV', 'Keras'],
    },
    {
      id: 3,
      name: 'Portfolio Website',
      desc: 'Anime-themed personal developer portfolio with custom canvas neural network background, custom theme overlays, and active scroll spy.',
      tags: ['React', 'CSS', 'Design'],
    },
    {
      id: 4,
      name: 'Food Recognition & Calorie Estimation System',
      desc: 'This project uses a Convolutional Neural Network (CNN) with TensorFlow/Keras to classify food images and provide an estimated calorie value.',
      tags: ['Flask', 'NumPy', 'TensorFlow / Keras'],
    },
    {
      id: 5,
      name: 'Cats vs Dogs Image Classifier using SVM',
      desc: "Users can upload an image through the web application and receive a prediction indicating whether the image contains a cat or a dog.",
      tags: ['Flask', 'OpenCV', 'Scikit-learn'],
    },
    {
      id: 6,
      name: 'Customer Segmentation using K-Means Clustering',
      desc: 'Customers are grouped according to their Annual Income and Spending Score, helping businesses identify different customer categories and create targeted marketing strategies.',
      tags: ['Python', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Flask'],
    },
  ];

  // If expanded, show all 6. If collapsed, show 3 on mobile, but let's show all 6 on desktop and toggle on mobile.
  // Actually, a clean toggle showing 3 initially and 6 when expanded works beautifully across all platforms.
  const visibleProjects = expanded ? projects : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="bg-[#111111] text-gray-200 py-24 px-6 relative"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Heading */}
        <FadeInSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tight text-white inline-block relative pb-2">
            Projects
            <span className="absolute bottom-0 left-0 w-full h-1 bg-orangeAccent"></span>
          </h2>
          <p className="text-neutral-500 font-mono text-xs tracking-widest mt-3 uppercase">
            // Selected builds, machine learning tools & creative works
          </p>
        </FadeInSection>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, idx) => (
            <FadeInSection
              key={project.id}
              className="bg-neutral-900/50 border border-neutral-850 hover:border-orangeAccent/40 p-6 rounded-xl hover:shadow-[0_0_30px_rgba(232,84,26,0.1)] transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Top Meta info */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                  Project - 0{project.id}
                </span>
                <div className="text-neutral-600 group-hover:text-orangeAccent transition-colors duration-300">
                  <Code size={16} />
                </div>
              </div>


              {/* Title */}
              <h3 className="font-serif font-bold text-xl text-white mb-3 group-hover:text-orangeAccent transition-colors duration-300">
                {project.name}
              </h3>

              {/* Description */}
              <div className="h-24 overflow-y-auto pr-2">
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {project.desc}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider font-semibold text-neutral-400 border border-neutral-800 bg-neutral-950 px-2.5 py-1 rounded-full group-hover:border-orangeAccent/30 group-hover:text-orangeAccent/90 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Toggle Expand Button */}
        <FadeInSection className="flex justify-center mt-12">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900/30 hover:bg-orangeAccent hover:border-orangeAccent text-neutral-300 hover:text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-md focus:outline-none"
            id="projects-toggle-btn"
          >
            {expanded ? (
              <>
                Show Less <ArrowUp size={14} />
              </>
            ) : (
              <>
                Show More <ArrowDown size={14} />
              </>
            )}
          </button>
        </FadeInSection>

      </div>
    </section>
  );
}
