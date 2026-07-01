import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillOrbit from './components/SkillOrbit';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import InquiryForm from './components/InquiryForm';

function App() {
  // Simple check to serve the inquiry form if accessed on a separate tab via ?inquiry=xxx
  const searchParams = new URLSearchParams(window.location.search);
  const inquiryType = searchParams.get('inquiry');

  if (inquiryType === 'job' || inquiryType === 'gig') {
    return <InquiryForm type={inquiryType} />;
  }

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] selection:bg-orangeAccent selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Intro Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <SkillOrbit />

      {/* Projects Section */}
      <Projects />

      {/* Experience Section */}
      <Experience />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}

export default App;
