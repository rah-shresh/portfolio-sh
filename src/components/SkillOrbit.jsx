import React, { useState, useEffect, useRef } from 'react';
import FadeInSection from './FadeInSection';

// Categories and matching colors
const CATEGORIES = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'AI / ML',
  'Data',
  'DevOps / Tools',
];

const RING_COLORS = [
  '#E8541A', // Ring 1 - Languages (Orange)
  '#F5A623', // Ring 2 - Frontend (Amber)
  '#4FC3F7', // Ring 3 - Backend (Light Blue)
  '#81C784', // Ring 4 - AI / ML (Green)
  '#CE93D8', // Ring 5 - Data (Purple)
  '#80CBC4', // Ring 6 - DevOps / Tools (Teal)
];

const RING_RADII = [90, 155, 220, 285, 350, 415];

const SKILLS_DATA = [
  // Ring 1 — "Languages" — color #E8541A (orange)
  { name: 'Python', category: 'Languages', ring: 0, color: '#E8541A', icon: 'python/python-original.svg' },
  { name: 'JavaScript', category: 'Languages', ring: 0, color: '#E8541A', icon: 'javascript/javascript-original.svg' },
  { name: 'SQL', category: 'Languages', ring: 0, color: '#E8541A', fallback: '💾' },
  { name: 'HTML5', category: 'Languages', ring: 0, color: '#E8541A', icon: 'html5/html5-original.svg' },

  // Ring 2 — "Frontend" — color #F5A623 (amber)
  { name: 'React', category: 'Frontend', ring: 1, color: '#F5A623', icon: 'react/react-original.svg' },
  { name: 'Vite', category: 'Frontend', ring: 1, color: '#F5A623', icon: 'vite/vite-original.svg' },
  { name: 'Tailwind CSS', category: 'Frontend', ring: 1, color: '#F5A623', icon: 'tailwindcss/tailwindcss-original.svg' },
  { name: 'Figma', category: 'Frontend', ring: 1, color: '#F5A623', icon: 'figma/figma-original.svg' },
  { name: 'UI/UX Design', category: 'Frontend', ring: 1, color: '#F5A623', fallback: '🎨' },

  // Ring 3 — "Backend" — color #4FC3F7 (light blue)
  { name: 'Flask', category: 'Backend', ring: 2, color: '#4FC3F7', icon: 'flask/flask-original.svg' },
  { name: 'Node.js', category: 'Backend', ring: 2, color: '#4FC3F7', icon: 'nodejs/nodejs-original.svg' },
  { name: 'REST APIs', category: 'Backend', ring: 2, color: '#4FC3F7', fallback: '🔌' },
  { name: 'FastAPI', category: 'Backend', ring: 2, color: '#4FC3F7', icon: 'fastapi/fastapi-original.svg' },
  { name: 'Django', category: 'Backend', ring: 2, color: '#4FC3F7', icon: 'django/django-plain.svg' },
  { name: 'Supabase', category: 'Backend', ring: 2, color: '#4FC3F7', fallback: '⚡' },
  { name: 'Vercel', category: 'Backend', ring: 2, color: '#4FC3F7', fallback: '▲' },
  { name: 'MySQL', category: 'Backend', ring: 2, color: '#4FC3F7', icon: 'mysql/mysql-original.svg' },

  // Ring 4 — "AI / ML" — color #81C784 (green)
  { name: 'Machine Learning', category: 'AI / ML', ring: 3, color: '#81C784', fallback: '⚙️' },
  { name: 'Deep Learning', category: 'AI / ML', ring: 3, color: '#81C784', fallback: '🧠' },
  { name: 'Computer Vision', category: 'AI / ML', ring: 3, color: '#81C784', fallback: '👁️' },
  { name: 'Generative AI', category: 'AI / ML', ring: 3, color: '#81C784', fallback: '🪄' },
  { name: 'AI Agents', category: 'AI / ML', ring: 3, color: '#81C784', fallback: '🤖' },
  { name: 'TensorFlow', category: 'AI / ML', ring: 3, color: '#81C784', icon: 'tensorflow/tensorflow-original.svg' },
  { name: 'Keras', category: 'AI / ML', ring: 3, color: '#81C784', icon: 'keras/keras-original.svg' },
  { name: 'OpenCV', category: 'AI / ML', ring: 3, color: '#81C784', icon: 'opencv/opencv-original.svg' },
  { name: 'Scikit-learn', category: 'AI / ML', ring: 3, color: '#81C784', fallback: '📊' },
  { name: 'Prompt Engineering', category: 'AI / ML', ring: 3, color: '#81C784', fallback: '✍️' },

  // Ring 5 — "Data" — color #CE93D8 (purple)
  { name: 'NumPy', category: 'Data', ring: 4, color: '#CE93D8', icon: 'numpy/numpy-original.svg' },
  { name: 'Pandas', category: 'Data', ring: 4, color: '#CE93D8', icon: 'pandas/pandas-original.svg' },
  { name: 'Matplotlib', category: 'Data', ring: 4, color: '#CE93D8', icon: 'matplotlib/matplotlib-original.svg' },
  { name: 'Jupyter Notebook', category: 'Data', ring: 4, color: '#CE93D8', icon: 'jupyter/jupyter-original.svg' },

  // Ring 6 — "DevOps / Tools" — color #80CBC4 (teal)
  { name: 'Git', category: 'DevOps / Tools', ring: 5, color: '#80CBC4', icon: 'git/git-original.svg' },
  { name: 'GitHub', category: 'DevOps / Tools', ring: 5, color: '#80CBC4', icon: 'github/github-original.svg' },
  { name: 'VS Code', category: 'DevOps / Tools', ring: 5, color: '#80CBC4', icon: 'vscode/vscode-original.svg' },
  { name: 'Docker', category: 'DevOps / Tools', ring: 5, color: '#80CBC4', icon: 'docker/docker-original.svg' },
];

export default function SkillOrbit() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredNode, setHoveredNode] = useState(null);

  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const imagesRef = useRef({});
  const activeFilterRef = useRef('All');
  const hoveredNodeRef = useRef(null);

  const centerX = 450;
  const centerY = 450;

  // Preload skill logo images
  useEffect(() => {
    SKILLS_DATA.forEach((skill) => {
      if (skill.icon) {
        const img = new Image();
        img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}`;
        imagesRef.current[skill.name] = img;
      }
    });
  }, []);

  // Update refs when states change to avoid stale closures in the animation loop
  useEffect(() => {
    activeFilterRef.current = activeFilter;
  }, [activeFilter]);

  useEffect(() => {
    hoveredNodeRef.current = hoveredNode;
  }, [hoveredNode]);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    // Distribute angles evenly on rings
    if (nodesRef.current.length === 0) {
      const ringCounts = {};
      SKILLS_DATA.forEach((skill) => {
        ringCounts[skill.ring] = (ringCounts[skill.ring] || 0) + 1;
      });

      const ringIndices = {};
      nodesRef.current = SKILLS_DATA.map((skill) => {
        const ring = skill.ring;
        const indexInRing = ringIndices[ring] || 0;
        ringIndices[ring] = indexInRing + 1;

        const totalInRing = ringCounts[ring];
        const initialAngle = (indexInRing * 2 * Math.PI) / totalInRing;

        return {
          ...skill,
          angle: initialAngle,
        };
      });
    }

    const draw = () => {
      // Clear and set background
      ctx.clearRect(0, 0, 900, 900);
      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(0, 0, 900, 900);

      // 1. Draw subtle grid background
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.04;

      // Spokes (every 30 degrees)
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + 450 * Math.cos(a), centerY + 450 * Math.sin(a));
        ctx.stroke();
      }

      // Concentric circles
      for (let r = 50; r <= 450; r += 50) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // 2. Draw orbit rings
      RING_RADII.forEach((radius, idx) => {
        const ringColor = RING_COLORS[idx];
        const ringCategory = CATEGORIES[idx + 1];
        const isRingActive =
          activeFilterRef.current === 'All' ||
          activeFilterRef.current === ringCategory;

        ctx.globalAlpha = isRingActive ? 0.25 : 0.05;
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 8]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.globalAlpha = 1.0;

      // 3. Update positions and draw connector lines
      nodesRef.current.forEach((node) => {
        const isNodeHovered =
          hoveredNodeRef.current && hoveredNodeRef.current.name === node.name;

        // Animate angle if not hovered
        if (!isNodeHovered) {
          const isClockwise = node.ring % 2 === 0;
          // Speed degrades as we go outward (ring 0: 0.008, ring 5: 0.0035)
          const speed = (0.008 - node.ring * 0.0009) * (isClockwise ? 1 : -1);
          node.angle += speed;
        }

        const ringRadius = RING_RADII[node.ring];
        const ringColor = node.color;
        const ringCategory = node.category;
        const isNodeActive =
          activeFilterRef.current === 'All' ||
          activeFilterRef.current === ringCategory;

        // Draw connector
        ctx.globalAlpha = isNodeActive ? 0.12 : 0.02;
        const x = centerX + ringRadius * Math.cos(node.angle);
        const y = centerY + ringRadius * Math.sin(node.angle);

        ctx.beginPath();
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 1;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1.0;

      // 4. Draw node bubbles and names on top
      nodesRef.current.forEach((node) => {
        const ringRadius = RING_RADII[node.ring];
        const ringColor = node.color;
        const ringCategory = node.category;
        const isNodeActive =
          activeFilterRef.current === 'All' ||
          activeFilterRef.current === ringCategory;

        // Set opacity based on filtering state
        ctx.globalAlpha = isNodeActive ? 1.0 : 0.15;

        const x = centerX + ringRadius * Math.cos(node.angle);
        const y = centerY + ringRadius * Math.sin(node.angle);

        const isNodeHovered =
          hoveredNodeRef.current && hoveredNodeRef.current.name === node.name;
        const nodeRadius = 18 * (isNodeHovered ? 1.3 : 1);

        // Apply glow effect on hover
        if (isNodeHovered) {
          ctx.shadowColor = ringColor;
          ctx.shadowBlur = 15;
        }

        // Circular bubble background (dark)
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#0d0d0d';
        ctx.fill();

        // Bubble border
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = isNodeHovered ? 2.5 : 1.5;
        ctx.stroke();

        ctx.shadowBlur = 0; // reset shadow glow immediately

        // Draw image logo or fallback text/emoji
        const img = imagesRef.current[node.name];
        const imgSize = nodeRadius * 2 * 0.6;
        if (img && img.complete && img.naturalWidth !== 0) {
          ctx.drawImage(
            img,
            x - imgSize / 2,
            y - imgSize / 2,
            imgSize,
            imgSize
          );
        } else {
          ctx.fillStyle = ringColor;
          const isEmoji = node.fallback && node.fallback.length <= 2;
          ctx.font = isEmoji
            ? `${nodeRadius * 0.95}px sans-serif`
            : `bold ${nodeRadius * 0.8}px "Plus Jakarta Sans", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.fallback || node.name.charAt(0), x, y);
        }

        // Draw skill name text below
        const textOffset = nodeRadius + 12;
        ctx.fillStyle = ringColor;
        ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(node.name, x, y + textOffset);
      });

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const mouseY = ((e.clientY - rect.top) / rect.height) * canvas.height;

    let hovered = null;
    for (const node of nodesRef.current) {
      const ringRadius = RING_RADII[node.ring];
      const x = centerX + ringRadius * Math.cos(node.angle);
      const y = centerY + ringRadius * Math.sin(node.angle);

      const dist = Math.hypot(mouseX - x, mouseY - y);
      if (dist < 24) {
        hovered = node;
        break;
      }
    }

    if (hovered?.name !== hoveredNode?.name) {
      setHoveredNode(hovered);
    }
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  return (
    <section
      id="skills"
      className="bg-[#0d0d0d] text-gray-200 py-24 px-6 relative overflow-hidden"
    >
      <style>{`
        @keyframes brain-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 20px 2px rgba(232, 84, 26, 0.4);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.08);
            box-shadow: 0 0 35px 8px rgba(232, 84, 26, 0.75);
          }
        }
        .animate-brain-pulse {
          animation: brain-pulse 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative subtle grid overlay */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <FadeInSection className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tight text-white inline-block relative pb-2">
            Skills
            <span className="absolute bottom-0 left-0 w-full h-1 bg-orangeAccent"></span>
          </h2>
          <p className="text-neutral-500 font-mono text-xs tracking-widest mt-3 uppercase">
            // Core technical proficiencies & neural orbit architecture
          </p>
        </FadeInSection>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto px-4 relative z-20">
          {CATEGORIES.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border focus:outline-none cursor-pointer ${isActive
                    ? 'bg-[#E8541A] border-[#E8541A] text-white shadow-[0_0_15px_rgba(232,84,26,0.4)] scale-105'
                    : 'bg-transparent border-neutral-800 text-neutral-400 hover:border-[#E8541A]/50 hover:text-white'
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Canvas orbit container */}
        <div className="relative w-full max-w-[900px] aspect-square mx-auto bg-[#0d0d0d] rounded-full border border-neutral-900/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Central Pulsing Brain Node */}
          <div className="absolute top-1/2 left-1/2 w-[55px] h-[55px] rounded-full bg-[#0d0d0d] border-2 border-[#E8541A] flex items-center justify-center animate-brain-pulse z-25">
            <span className="text-2xl select-none" role="img" aria-label="brain">
              🧠
            </span>
          </div>

          {/* Interactive HTML Tooltip */}
          {hoveredNode && (
            <div
              className="absolute bg-neutral-950/95 border border-neutral-800 text-xs px-3 py-2 rounded-lg shadow-2xl pointer-events-none transition-all duration-200 ease-out -translate-x-1/2 -translate-y-[140%] z-30"
              style={{
                left: `${((centerX +
                    RING_RADII[hoveredNode.ring] * Math.cos(hoveredNode.angle)) /
                    900) *
                  100
                  }%`,
                top: `${((centerY +
                    RING_RADII[hoveredNode.ring] * Math.sin(hoveredNode.angle)) /
                    900) *
                  100
                  }%`,
                borderColor: hoveredNode.color,
                boxShadow: `0 0 20px ${hoveredNode.color}25`,
              }}
            >
              <div className="font-bold text-white mb-0.5">
                {hoveredNode.name}
              </div>
              <div
                className="text-[9px] font-mono uppercase tracking-wider font-semibold"
                style={{ color: hoveredNode.color }}
              >
                {hoveredNode.category}
              </div>
            </div>
          )}

          {/* Canvas Render Surface */}
          <canvas
            ref={canvasRef}
            width={900}
            height={900}
            className="w-full h-full block relative z-10 transition-all duration-300"
            style={{ cursor: hoveredNode ? 'pointer' : 'default' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </section>
  );
}
