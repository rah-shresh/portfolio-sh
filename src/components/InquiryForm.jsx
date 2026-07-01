import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowLeft, Code, Loader2 } from 'lucide-react';
import supabase from '../lib/supabase';

export default function InquiryForm({ type }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    projectName: '',
    roleTitle: '',
    projectType: 'ai-ml',
    description: '',
    contactEmail: '',
    budget: '',
    timeline: '',
  });

  const isJob = type === 'job';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactEmail || !emailRegex.test(formData.contactEmail.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    
    // Validate other required fields
    if (isJob) {
      if (
        !formData.companyName.trim() ||
        !formData.roleTitle.trim() ||
        !formData.description.trim() ||
        !formData.budget.trim()
      ) {
        setError('Please fill in all required fields.');
        return;
      }
    } else {
      if (
        !formData.projectName.trim() ||
        !formData.description.trim() ||
        !formData.budget.trim() ||
        !formData.timeline.trim()
      ) {
        setError('Please fill in all required fields.');
        return;
      }
    }

    setSubmitting(true);

    try {
      let payload = {
        email: formData.contactEmail.trim(),
        message: formData.description.trim(),
        status: 'Unread',
      };

      if (isJob) {
        payload = {
          ...payload,
          name: formData.companyName.trim(),
          company: formData.companyName.trim(),
          role: formData.roleTitle.trim(),
          contact_type: 'Job',
          salary: formData.budget.trim(),
          budget: '',
          timeline: '',
          project_type: '',
        };
      } else {
        payload = {
          ...payload,
          name: formData.projectName.trim(),
          company: '',
          role: formData.projectType,
          contact_type: 'Freelance',
          budget: formData.budget.trim(),
          salary: '',
          timeline: formData.timeline.trim(),
          project_type: formData.projectType,
        };
      }

      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert([payload]);

      if (supabaseError) {
        throw supabaseError;
      }

      await supabase.functions.invoke("send-email", {
      body: payload,

      });


      // Clear the form on success
      setFormData({
        companyName: '',
        projectName: '',
        roleTitle: '',
        projectType: 'ai-ml',
        description: '',
        contactEmail: '',
        budget: '',
        timeline: '',
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Supabase submission error:', err);
      setError(err.message || 'An error occurred while submitting your proposal. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6 relative overflow-hidden select-none">
        {/* Manga background overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-10 filter sepia-[60%] contrast-[120%] brightness-[40%]"
          style={{ backgroundImage: "url('/one_piece_bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d0d0d] via-[#0d0d0d]/95 to-orangeAccent/10" />

        <div className="relative z-10 max-w-md w-full bg-neutral-900/80 border border-orangeAccent/30 rounded-2xl p-8 text-center backdrop-blur-md shadow-2xl glow-orange">
          <div className="w-16 h-16 bg-orangeAccent/10 text-orangeAccent rounded-full flex items-center justify-center mx-auto mb-6 border border-orangeAccent/20">
            <CheckCircle2 size={36} className="animate-pulse" />
          </div>

          <h2 className="font-serif font-black text-2xl text-white mb-3">
            Inquiry Transmitted!
          </h2>

          <p className="text-neutral-400 text-sm leading-relaxed mb-8">
            Your {isJob ? 'job details' : 'project scope'} have been successfully routed to Shresh's neural pipeline.
            Expect a connection shortly!
          </p>

          <button
            onClick={() => window.close()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-orangeAccent text-white hover:bg-orangeAccent/95 font-semibold text-sm tracking-wide transition-all duration-300"
          >
            Close Tab
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 py-16 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Manga Background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-10 filter sepia-[60%] contrast-[120%] brightness-[40%]"
        style={{ backgroundImage: "url('/one_piece_bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0d0d0d] via-[#0d0d0d]/95 to-orangeAccent/10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative z-10 max-w-xl w-full bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl">

        {/* Header Logo */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orangeAccent/10 border border-orangeAccent/30 flex items-center justify-center text-orangeAccent">
              <Code size={16} />
            </div>
            <span className="font-serif text-base font-bold tracking-tight text-white">
              Shresh<span className="text-orangeAccent font-sans text-xs font-semibold ml-0.5">.dev</span>
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-orangeAccent border border-orangeAccent/20 px-2.5 py-0.5 rounded-full bg-orangeAccent/5">
            {isJob ? 'Employment Proposal' : 'Freelance Contract'}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif font-black text-2xl sm:text-3xl text-white mb-2 text-left">
          {isJob ? 'Propose a Full-time Role' : 'Launch a New Project'}
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm font-sans text-left mb-8 leading-relaxed">
          Provide some parameters below so we can analyze scope and align on expectations.
        </p>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 text-red-200 rounded-xl text-xs sm:text-sm font-sans flex items-center justify-between animate-pulse">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-400 hover:text-white transition-colors font-bold ml-2 focus:outline-none"
            >
              ✕
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">

          {isJob ? (
            // JOB FIELDS
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-2">Company / Organization</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Acme AI"
                  className="w-full bg-neutral-950/80 border border-neutral-800 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-orangeAccent/40 focus:border-orangeAccent outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-2">Target Role Title</label>
                <input
                  type="text"
                  name="roleTitle"
                  required
                  value={formData.roleTitle}
                  onChange={handleChange}
                  placeholder="e.g. AI/ML Engineer Intern"
                  className="w-full bg-neutral-950/80 border border-neutral-800 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-orangeAccent/40 focus:border-orangeAccent outline-none transition-all duration-300"
                />
              </div>
            </div>
          ) : (
            // GIG FIELDS
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-2">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  required
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="e.g. Predictive Analytics Module"
                  className="w-full bg-neutral-950/80 border border-neutral-800 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-orangeAccent/40 focus:border-orangeAccent outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-2">Scope Area</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-neutral-950/80 border border-neutral-800 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-orangeAccent/40 focus:border-orangeAccent outline-none transition-all duration-300"
                >
                  <option value="ai-ml">Machine Learning / NLP / Vision</option>
                  <option value="genai-agents">Generative AI / LLM Agents</option>
                  <option value="fullstack">Full Stack React App</option>
                  <option value="automation">Automations & Scripting</option>
                </select>
              </div>
            </div>
          )}

          {/* Description Textarea */}
          <div>
            <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-2">
              {isJob ? 'Job Description & System Overview' : 'Project Details & Key Deliverables'}
            </label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder={isJob ? 'Outline job duties, expectations, and tech stack details...' : 'Describe what you want to build, specific goals, and features...'}
              className="w-full bg-neutral-950/80 border border-neutral-800 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-orangeAccent/40 focus:border-orangeAccent outline-none transition-all duration-300 resize-none"
            />
          </div>

          {/* Contact Email & Budget/Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-2">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                required
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="you@domain.com"
                className="w-full bg-neutral-950/80 border border-neutral-800 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-orangeAccent/40 focus:border-orangeAccent outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-2">
                {isJob ? 'Salary / Compensation Range' : 'Estimated Project Budget (₹)'}
              </label>
              <input
                type="text"
                name="budget"
                required
                value={formData.budget}
                onChange={handleChange}
                placeholder={isJob ? 'e.g. ₹3000 - ₹4000 / day' : 'e.g. ₹2,000 - ₹5,000'}
                className="w-full bg-neutral-950/80 border border-neutral-800 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-orangeAccent/40 focus:border-orangeAccent outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Timeline / Deadlines */}
          {!isJob && (
            <div>
              <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-2">Expected Project Timeline</label>
              <input
                type="text"
                name="timeline"
                required
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g. 4 - 6 weeks"
                className="w-full bg-neutral-950/80 border border-neutral-800 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-orangeAccent/40 focus:border-orangeAccent outline-none transition-all duration-300"
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 pt-4 border-t border-neutral-850">
            <button
              type="button"
              disabled={submitting}
              onClick={() => window.close()}
              className={`inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors duration-300 ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ArrowLeft size={14} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orangeAccent text-white hover:bg-orangeAccent/95 font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 glow-orange ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? (
                <>
                  Submitting...
                  <Loader2 size={14} className="animate-spin" />
                </>
              ) : (
                <>
                  Submit Proposal
                  <Send size={14} />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
