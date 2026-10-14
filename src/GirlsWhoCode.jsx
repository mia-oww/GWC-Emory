import React, { useState, useLayoutEffect } from 'react';
import SparkleBackground from './SparkleBackground.jsx';
import Cursor from "./Cursor";
import useScrollFade from './useScrollFade';
import { 
  BookOpen, 
  Code2, 
  Heart, 
  Calendar, 
  ExternalLink, 
  ChevronDown, 
  Smile, 
  HelpCircle,
  ArrowRight,
  Terminal,
  Presentation,
  Lightbulb,
  MapPin,
  Sparkles,
  Play,
  Users,
  Mail
} from 'lucide-react';

const STUDENT_PROJECTS = [
  {
    id: 1,
    title: "Interactive Choose-Your-Own Story",
    studentGrade: "8th Grade Student",
    semester: "fall",
    lang: "Python",
    description: "A text-adventure game exploring an enchanted forest, built using Python conditionals, input prompts, and functions.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80",
    projectUrl: "https://replit.com"
  },
  {
    id: 2,
    title: "A Long Way Home",
    studentGrade: "Spring Web Design Student",
    semester: "spring",
    lang: "HTML & CSS",
    description: "An adventure story game about a stray cat finding her way home, built during our spring web design unit.",
    image: "/projects/a-long-way-home.jpg",
    projectUrl: "https://codepen.io/erial/pen/MYWrMEJ"
  },
  {
    id: 3,
    title: "Study Mood Quiz & Tip Generator",
    studentGrade: "9th Grade Student",
    semester: "spring",
    lang: "JavaScript",
    description: "A mini interactive web app that asks how your study day is going and generates uplifting study tips and playlist ideas.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
    projectUrl: "https://codepen.io"
  },
  {
    id: 4,
    title: "Emoji Password Safety Checker",
    studentGrade: "7th Grade Student",
    semester: "fall",
    lang: "Python",
    description: "A playful Python script testing whether passwords have numbers, symbols, and enough characters with friendly emoji alerts.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80",
    projectUrl: "https://replit.com"
  }
];

const FAQS = [
  {
    q: "Do I need to be a Computer Science major to mentor?",
    a: "Not at all! We welcome students from every major. Whether you are in Art History, Biology, or CS, if you enjoy encouraging young learners, you belong here."
  },
  {
    q: "I only know basic coding. Can I still help?",
    a: "Yes! Many of our mentors start as in-class table assistants where you just help debug typos, celebrate small wins, and talk through the logic alongside the girls."
  },
  {
    q: "When and where do the weekend teaching sessions happen?",
    a: "We meet every Sunday at 2pm on the Emory campus (Math & Science Center). We provide parking passes and snacks for all volunteers."
  },
  {
    q: "Do you supply lesson slides and exercises?",
    a: "Yes! Our curriculum team writes all the slides, fun starter templates, and cheat sheets ahead of time, so you never have to prepare materials from scratch."
  }
];

// Board members shown on the home page. Replace these placeholders with real info;
// add a `photo` URL (e.g. '/team/jane.jpg' in the public folder) to show a picture instead of initials.
const TEAM = [
  { name: 'Member Name', role: 'President', blurb: 'Year · Major', photo: null },
  { name: 'Member Name', role: 'Vice President', blurb: 'Year · Major', photo: null },
  { name: 'Member Name', role: 'Curriculum Lead', blurb: 'Year · Major', photo: null },
  { name: 'Member Name', role: 'Outreach Lead', blurb: 'Year · Major', photo: null },
];

const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

// Questions from parents and prospective students (shown on the For Families tab)
const FAMILY_FAQS = [
  {
    q: "Does my daughter need any coding experience?",
    a: "Not at all! Our sessions assume zero prior experience, and Emory mentors help every student at her own pace."
  },
  {
    q: "When and where do sessions happen?",
    a: "Every Sunday at 2pm in the Emory Math & Science Center (MSC) computer classrooms."
  },
  {
    q: "What will she learn?",
    a: "In the fall, students learn Python through stories and games. In the spring, they build their own web pages with HTML, CSS and JavaScript."
  },
  {
    q: "Can family and friends see her work?",
    a: "Yes! At the end of the year, every student presents her project on campus at our Family & Friends Celebration Showcase."
  }
];

const CONTACT_EMAIL = 'emorygwc@gmail.com';
const INSTAGRAM_HANDLE = 'gwcemory';
const MENTOR_EMAIL_BODY = `Hello Girls Who Code at Emory team,

My name is [Your Name], and I am a [Year] [Major] student at Emory University. I am interested in becoming a mentor with Girls Who Code at Emory.

Could you please share the Google Sheets sign-up document so that I can sign up?

Thank you for your time. I look forward to hearing from you.

Best regards,
[Your Name]`;
const MENTOR_INTEREST_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Mentor Interest: Girls Who Code at Emory')}&body=${encodeURIComponent(MENTOR_EMAIL_BODY)}`;
const STUDENT_INTEREST_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Student Interest: Girls Who Code at Emory')}`;

// lucide no longer ships brand icons, so this is a matching outline Instagram glyph
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

// Who each audience-specific tab is meant for
const AUDIENCES = {
  families: { label: 'For Parents & Students', Icon: Users, iconColor: 'text-[#ec4899]', pill: 'bg-[#fce7f3] text-[#be185d]' },
  mentors: { label: 'For Emory Students', Icon: Presentation, iconColor: 'text-[#3b82f6]', pill: 'bg-[#dbeafe] text-[#1d4ed8]' },
};

function AudienceTag({ audience }) {
  const { label, Icon, pill } = AUDIENCES[audience];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${pill}`}>
      <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {label}
    </span>
  );
}

// Tabs with an `audience` are grouped between dividers in the nav
const NAVIGATION_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'families', label: 'For Families', audience: 'families' },
  { id: 'info', label: 'For Mentors', audience: 'mentors' },
  { id: 'projects', label: 'Projects' },
  { id: 'lectures', label: 'Lectures' },
];

const SEMESTER_FILTERS = [
  { label: 'All Projects', val: 'all' },
  { label: 'Fall (Python)', val: 'fall' },
  { label: 'Spring (HTML & JS)', val: 'spring' }
];

// Lecture decks data
const DEFAULT_LECTURES = [
  {
    id: 'fall-2026',
    term: 'Fall 2026',
    topic: 'Python Basics & Logic Games',
    description: 'Intro to variables, conditionals, while-loops, and interactive terminal storytelling.',
    embedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vTZ9thIOAlFtqVu_s-wd2q3xqv8Amw0Nmb6lmm1TjGqLPnkZJichgv_RTWhv-Yh6k7uHORO1320d5cP/pubembed?start=false&loop=true&delayms=3000'
  },
  {
    id: 'spring-2026',
    term: 'Spring 2026',
    topic: 'Web Design (HTML, CSS & JavaScript)',
    description: 'Document structure, responsive card layouts, flexbox, and dynamic button clicks.',
    embedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vTZ9thIOAlFtqVu_s-wd2q3xqv8Amw0Nmb6lmm1TjGqLPnkZJichgv_RTWhv-Yh6k7uHORO1320d5cP/pubembed?start=false&loop=true&delayms=3000'
  }
];

const ARCHIVED_LECTURES = [
  {
    id: 'fall-2025',
    term: 'Fall 2025',
    topic: 'Python Fundamentals & Mini Mad Libs',
    description: 'Foundations of functions, string formatting, input prompts, and text-based problem solving.',
    embedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vTZ9thIOAlFtqVu_s-wd2q3xqv8Amw0Nmb6lmm1TjGqLPnkZJichgv_RTWhv-Yh6k7uHORO1320d5cP/pubembed?start=false&loop=true&delayms=3000'
  },
  {
    id: 'spring-2025',
    term: 'Spring 2025',
    topic: 'Creative Front-End & Personal Portfolios',
    description: 'Exploring web aesthetics, CSS color theory, box model concepts, and simple DOM manipulation.',
    embedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vTZ9thIOAlFtqVu_s-wd2q3xqv8Amw0Nmb6lmm1TjGqLPnkZJichgv_RTWhv-Yh6k7uHORO1320d5cP/pubembed?start=false&loop=true&delayms=3000'
  }
];


export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeSemester, setActiveSemester] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [expandedArchive, setExpandedArchive] = useState(null);

  // jump back to the top of the page whenever the tab changes
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  useScrollFade(activeTab);

  const toggleFaq = (key) => {
    setOpenFaq((prevKey) => (prevKey === key ? null : key));
  };

  const renderFaqs = (faqs, prefix) =>
    faqs.map((faq, idx) => {
      const key = `${prefix}-${idx}`;
      const isOpen = openFaq === key;
      const faqId = `faq-content-${key}`;
      const btnId = `faq-btn-${key}`;

      return (
        <div
          key={key}
          className="border border-[#e7e5e4] rounded-2xl bg-white overflow-hidden"
        >
          <button
            type="button"
            id={btnId}
            aria-expanded={isOpen}
            aria-controls={faqId}
            onClick={() => toggleFaq(key)}
            className="w-full text-left px-5 py-4 flex items-center justify-between text-sm text-[#002169] hover:bg-[#faf8f5] transition-colors font-normal cursor-pointer"
          >
            <span>{faq.q}</span>
            <ChevronDown
              className={`w-4 h-4 text-[#78716c] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          {isOpen && (
            <div
              id={faqId}
              role="region"
              aria-labelledby={btnId}
              className="px-5 pb-4 text-xs text-[#57534e] leading-relaxed"
            >
              {faq.a}
            </div>
          )}
        </div>
      );
    });

  const toggleArchive = (id) => {
    setExpandedArchive((prev) => (prev === id ? null : id));
  };

  const filteredProjects = activeSemester === 'all' 
    ? STUDENT_PROJECTS 
    : STUDENT_PROJECTS.filter((p) => p.semester === activeSemester);

  return (
<div className="min-h-screen text-[#2c3e50] font-sans antialiased selection:bg-[#ccfbf1] selection:text-[#005f56]">
      <SparkleBackground/>
      <Cursor />
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e7e5e4]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button 
            type="button"
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-3 group text-left cursor-pointer border-0 bg-transparent p-0"
          >
            <img
              src="/logo.jpg"
              alt="Emory Girls Who Code logo"
              className="w-12 h-12 rounded-full object-cover shadow-sm transition-transform group-hover:scale-105"
            />
            <div>
              <span className="text-[#002169] font-medium tracking-tight text-base">Girls Who Code</span>
              <span className="text-[#00a79d] font-semibold text-xs ml-1.5 uppercase tracking-wide">at Emory</span>
            </div>
          </button>

          {/* Navigation Tabs */}
          <nav aria-label="Main Navigation" className="flex flex-wrap items-center justify-center gap-1 bg-[#ede8e1]/70 p-1 rounded-3xl sm:rounded-full text-sm">
            {NAVIGATION_TABS.map((tab, idx) => (
              <React.Fragment key={tab.id}>
                {/* divider wherever the nav switches between audience and general tabs */}
                {idx > 0 && !!tab.audience !== !!NAVIGATION_TABS[idx - 1].audience && (
                  <span className="hidden sm:block w-px h-5 bg-[#d6d3d1] mx-1" aria-hidden="true" />
                )}
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  className={`px-4 py-1.5 rounded-full transition-all duration-200 text-sm inline-flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-[#002169] text-white shadow-sm font-medium'
                      : 'text-[#57534e] hover:text-[#002169] font-normal'
                  }`}
                >
                  {tab.audience && (() => {
                    const { Icon, iconColor } = AUDIENCES[tab.audience];
                    return <Icon className={`w-4 h-4 ${activeTab === tab.id ? '' : iconColor}`} aria-hidden="true" />;
                  })()}
                  {tab.label}
                </button>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Tab Panels */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* ================= HOME TAB ================= */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2">
              <div className="lg:col-span-7 space-y-6 text-left">
                <h1 data-fade="up" className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#002169] leading-[1.05] tracking-tight">
                  Welcome to <span className="text-[#00a79d]">Girls Who Code</span> at Emory!
                </h1>
                
                <p data-fade="up" data-fade-delay="200" className="text-base text-[#57534e] leading-relaxed max-w-xl">
                  We are a passionate community of Emory college students introducing girls from local Atlanta schools to computer science!
                </p>

                <div data-fade="up" data-fade-delay="400" className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('info')}
                    className="gwc-shine-btn px-6 py-3 rounded-full text-sm font-medium shadow-sm inline-flex items-center gap-2 cursor-pointer"
                  >
                    Join Us as a Mentor <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    className="px-6 py-3 rounded-full bg-white hover:bg-[#f5f5f4] text-[#002169] border border-[#d6d3d1] text-sm font-medium transition-colors cursor-pointer"
                  >
                    Explore Student Projects
                  </button>
                </div>

                <div data-fade="up" data-fade-delay="600" className="pt-4 flex items-center gap-6 text-xs text-[#78716c]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#8b5cf6]" aria-hidden="true" /> Every Sunday at 2pm
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#ec4899]" aria-hidden="true" /> On Emory's Campus
                  </span>
                </div>
              </div>

              {/* Code Editor Style Visual Card */}
              <div data-fade="left" data-fade-delay="200" className="lg:col-span-5">
                <div className="rounded-3xl bg-white text-[#334155] p-6 shadow-xl border border-[#e7e5e4] relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-[#f0eef5]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                      <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                      <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                      <span className="text-xs text-[#a8a29e] font-mono ml-2">our_mission.py</span>
                    </div>
                    <Terminal className="w-4 h-4 text-[#c4b5fd]" />
                  </div>

                  <div className="pt-4 font-mono text-xs sm:text-sm leading-relaxed space-y-2 text-[#334155]">
                    <p><span className="text-[#8b5cf6]">def</span> <span className="text-[#3b82f6]">build_confidence</span>(student):</p>
                    <p className="pl-4 text-[#a8a29e] italic"># fall: creative python logic</p>
                    <p className="pl-4">skills = [<span className="text-[#10b981]">&quot;curiosity&quot;</span>, <span className="text-[#10b981]">&quot;teamwork&quot;</span>]</p>
                    <p className="pl-4 text-[#a8a29e] italic"># spring: front-end web design</p>
                    <p className="pl-4">skills.append(<span className="text-[#10b981]">&quot;interactive web&quot;</span>)</p>
                    <p className="pl-4"><span className="text-[#8b5cf6]">return</span> <span className="text-[#ec4899]">&quot;she built it herself! <Sparkles className="inline w-3.5 h-3.5 align-[-2px]" aria-hidden="true" />&quot;</span></p>
                    <p className="pt-2 text-[#3b82f6]">&gt; session ready on campus every Sunday at 2pm</p>
                  </div>

                  <div className="mt-5 p-3.5 rounded-2xl bg-[#f8f5ff] flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-mono text-[#6b7280]">
                      <Play className="w-3.5 h-3.5 text-[#8b5cf6]" fill="currentColor" aria-hidden="true" /> run our_mission.py
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fce7f3] text-[#db2777] font-medium">
                      <Heart className="w-3 h-3" fill="currentColor" aria-hidden="true" /> Confidence +100
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Who Are You? Audience Split */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                data-fade="up"
                onClick={() => setActiveTab('families')}
                className="group p-7 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm text-left space-y-3 cursor-pointer"
              >
                <AudienceTag audience="families" />
                <h2 className="text-xl font-medium text-[#002169]">Want Your Daughter to Learn to Code?</h2>
                <p className="text-sm text-[#57534e] leading-relaxed">
                  Weekly Sunday sessions for middle and high school girls. No coding experience needed.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#db2777]">
                  Information for Families <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </button>

              <button
                type="button"
                data-fade="up"
                data-fade-delay="150"
                onClick={() => setActiveTab('info')}
                className="group p-7 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm text-left space-y-3 cursor-pointer"
              >
                <AudienceTag audience="mentors" />
                <h2 className="text-xl font-medium text-[#002169]">Want to Become a Mentor?</h2>
                <p className="text-sm text-[#57534e] leading-relaxed">
                  Teach a mini-lecture or help out at the tables. Every major is welcome.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563eb]">
                  Information for Mentors <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </button>
            </section>

            {/* What We Teach */}
            <section className="space-y-6 pt-4">
              <div data-fade="up" className="text-left space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold">What We Teach</span>
                <h2 className="text-2xl font-medium text-[#002169]">Our Two-Semester Journey</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div data-fade="up" data-fade-delay="100" className="p-8 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-4 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#8b5cf6]/10 rounded-bl-full pointer-events-none" />
                  <div className="w-11 h-11 rounded-2xl bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center font-bold">
                    <Code2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#78716c] font-medium">First Semester • Fall</span>
                    <h3 className="text-xl font-medium text-[#002169] mt-1">Friendly Python</h3>
                  </div>
                  <p className="text-sm text-[#57534e] leading-relaxed">
                    We introduce girls to logic through playful stories, interactive prompts, variables, and math games. Python feels natural, readable, and rewarding from day one.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">Variables</span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">If / Else Logic</span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">Loops & Games</span>
                  </div>
                </div>

                <div data-fade="up" data-fade-delay="250" className="p-8 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-4 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#3b82f6]/10 rounded-bl-full pointer-events-none" />
                  <div className="w-11 h-11 rounded-2xl bg-[#dbeafe] text-[#2563eb] flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#78716c] font-medium">Second Semester • Spring</span>
                    <h3 className="text-xl font-medium text-[#002169] mt-1">Creative Web (HTML, CSS & JS)</h3>
                  </div>
                  <p className="text-sm text-[#57534e] leading-relaxed">
                    Students discover how the web works by styling custom portfolio pages, digital posters, and interactive buttons that react when you click them.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">HTML Structure</span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">CSS Styling</span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">Interactive Buttons</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Team */}
            <section className="space-y-6 pt-4">
              <div data-fade="up" className="text-left space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold">Our Team</span>
                <h2 className="text-2xl font-medium text-[#002169]">Meet the Board</h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {TEAM.map((member, idx) => (
                  <div key={idx} data-fade="up" data-fade-delay={100 + (idx % 4) * 100}>
                    <div className="h-full p-6 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm text-center space-y-3 transition-transform duration-300 hover:-translate-y-1">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={`Photo of ${member.name}`}
                          className="w-20 h-20 mx-auto rounded-full object-cover"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="w-20 h-20 mx-auto rounded-full bg-linear-to-br from-[#00b5ad] to-[#7c4dff] text-white flex items-center justify-center font-display text-xl"
                        >
                          {initials(member.name)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-[#002169]">{member.name}</h3>
                        <p className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold mt-1">{member.role}</p>
                      </div>
                      <p className="text-xs text-[#78716c]">{member.blurb}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gentle Mentorship Banner */}
            <section data-fade="zoom" className="p-8 sm:p-10 rounded-3xl bg-white/90 border border-[#e7e5e4] shadow-sm text-[#002169] text-center max-w-4xl mx-auto space-y-4 relative overflow-hidden">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ffe3f1] text-[#ff4d9d] shadow-sm">
                <Heart className="w-8 h-8" fill="currentColor" aria-hidden="true" />
              </div>
              <div>
                <AudienceTag audience="mentors" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium">Thinking About Getting Involved?</h2>
              <p className="text-sm sm:text-base text-[#3b5288] max-w-xl mx-auto leading-relaxed">
                Whether you want to lead a 20-minute Python lesson or sit alongside a 7th grader to help her fix a typo, your encouragement makes all the difference.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('info')}
                  className="gwc-shine-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium cursor-pointer"
                >
                  See Mentor Opportunities <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </section>

            {/* Contact Info */}
            <section data-fade="up" className="p-8 rounded-3xl bg-white border border-[#e7e5e4] space-y-5 text-left max-w-4xl mx-auto w-full">
              <div className="space-y-1">
                <h2 className="text-xl font-medium text-[#002169]">Contact Us</h2>
                <p className="text-sm text-[#57534e]">Questions about joining, mentoring, or anything else? Reach out!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[#faf8f5] hover:bg-[#fce7f3] transition-colors"
                >
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-[#fce7f3] text-[#db2777] flex items-center justify-center">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs uppercase tracking-wider text-[#78716c] block">Email</span>
                    <span className="text-sm font-medium text-[#002169] break-all">{CONTACT_EMAIL}</span>
                  </div>
                </a>
                <a
                  href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[#faf8f5] hover:bg-[#ede9fe] transition-colors"
                >
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs uppercase tracking-wider text-[#78716c] block">Instagram</span>
                    <span className="text-sm font-medium text-[#002169]">@{INSTAGRAM_HANDLE}</span>
                  </div>
                </a>
              </div>
            </section>
          </div>
        )}

        {/* ================= PROJECTS TAB ================= */}
        {activeTab === 'projects' && (
          <div className="space-y-10 text-left">
            <header data-fade="up" className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold">Student Work</span>
              <h1 className="text-3xl font-medium text-[#002169]">What Our Girls Create</h1>
              <p className="text-sm text-[#57534e] leading-relaxed">
                These are example projects created by our middle and high school students during our weekend workshops. Every project reflects the student's individual passions and ideas!
              </p>
            </header>

            {/* Semester Filters */}
            <div data-fade="up" data-fade-delay="150" className="flex items-center gap-2" role="group" aria-label="Project semester filters">
              {SEMESTER_FILTERS.map((f) => (
                <button
                  key={f.val}
                  type="button"
                  onClick={() => setActiveSemester(f.val)}
                  aria-pressed={activeSemester === f.val}
                  className={`px-4 py-1.5 rounded-full text-xs cursor-pointer ${
                    activeSemester === f.val
                      ? 'gwc-shine-btn font-medium'
                      : 'bg-white border border-[#d6d3d1] text-[#57534e] hover:bg-[#faf8f5] font-normal transition-colors'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div data-fade="up" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <article 
                  key={project.id} 
                  className="rounded-3xl bg-white border border-[#e7e5e4] overflow-hidden shadow-sm flex flex-col transition-all hover:border-[#00a79d]"
                >
                  <div className="h-48 w-full bg-[#f5f5f4] relative overflow-hidden group">
                    <img 
                      src={project.image} 
                      alt={`Screenshot or preview of ${project.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-[#002169] text-xs font-medium shadow-sm">
                        {project.lang}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs text-[#78716c]">{project.studentGrade}</span>
                      <h2 className="text-lg font-medium text-[#002169]">{project.title}</h2>
                      <p className="text-sm text-[#57534e] leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#f5f5f4]">
                      <a 
                        href={project.projectUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#8b5cf6] font-medium hover:text-[#002169] transition-colors"
                      >
                        View Student Code Demo <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="p-6 rounded-3xl bg-white border border-dashed border-[#d6d3d1] text-center text-xs text-[#78716c]">
              Mentors: have a student project link or screenshot to add? share it in our team drive to have it displayed here!
            </aside>
          </div>
        )}

        {/* ================= LECTURES TAB (New Slides Embed) ================= */}
        {activeTab === 'lectures' && (
          <div className="space-y-12 max-w-4xl mx-auto text-left">
            <header data-fade="up" className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold">Curriculum Archive</span>
              <h1 className="text-3xl font-medium text-[#002169]">Lecture Slides & Classroom Guides</h1>
              <p className="text-base text-[#57534e] leading-relaxed font-normal">
                Parents or Emory students, want to look at the slides from previous years? Feel free to explore our weekly lesson decks, starter prompts, and coding challenges below!
              </p>
            </header>

            {/* Default 2 Slide Embeds */}
            <section data-fade="up" className="space-y-10">
              <div className="flex items-center gap-2 border-b border-[#e7e5e4] pb-3">
                <Presentation className="w-5 h-5 text-[#8b5cf6]" aria-hidden="true" />
                <h2 className="text-lg font-medium text-[#002169]">Current & Recent Semesters (Default Views)</h2>
              </div>

              <div className="space-y-8">
                {DEFAULT_LECTURES.map((lec) => (
                  <div key={lec.id} className="p-6 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f5f5f4] pb-3">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-[#ede9fe] text-[#6d28d9] font-semibold text-xs uppercase tracking-wide">
                          {lec.term}
                        </span>
                        <h3 className="text-lg font-medium text-[#002169] mt-2">{lec.topic}</h3>
                      </div>
                      <span className="text-xs text-[#78716c] font-normal">{lec.description}</span>
                    </div>

                    {/* Responsive Google Slides iFrame Container (16:9 ratio) */}
                    <div className="w-full relative rounded-2xl overflow-hidden border border-[#e7e5e4] bg-[#0f172a] aspect-video">
                      <iframe
                        src={lec.embedUrl}
                        title={`${lec.term} Slides Presentation`}
                        className="absolute top-0 left-0 w-full h-full border-0"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Dropdown / Accordion for Remaining Previous Semesters */}
            <section data-fade="up" className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-3">
                <h2 className="text-base font-medium text-[#002169]">Earlier Semesters & Archived Slides</h2>
                <span className="text-xs text-[#78716c]">Click Any Semester Below to View Slides</span>
              </div>

              <div className="space-y-3">
                {ARCHIVED_LECTURES.map((arch) => {
                  const isOpen = expandedArchive === arch.id;
                  const panelId = `archive-deck-${arch.id}`;

                  return (
                    <div 
                      key={arch.id} 
                      className="rounded-2xl border border-[#e7e5e4] bg-white overflow-hidden transition-all shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => toggleArchive(arch.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#faf8f5] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-md bg-[#ede8e1]/70 text-[#002169] font-medium text-xs">
                            {arch.term}
                          </span>
                          <span className="text-sm font-medium text-[#002169]">{arch.topic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#78716c] hidden sm:inline">
                            {isOpen ? 'Hide Slides' : 'View Slides'}
                          </span>
                          <ChevronDown 
                            className={`w-4 h-4 text-[#78716c] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div id={panelId} className="px-5 pb-5 pt-2 border-t border-[#f5f5f4] space-y-3">
                          <p className="text-xs text-[#57534e] leading-relaxed">
                            {arch.description}
                          </p>
                          <div className="w-full relative rounded-2xl overflow-hidden border border-[#e7e5e4] bg-[#0f172a] aspect-video">
                            <iframe
                              src={arch.embedUrl}
                              title={`${arch.term} Slides Presentation`}
                              className="absolute top-0 left-0 w-full h-full border-0"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ================= FAMILIES TAB ================= */}
        {activeTab === 'families' && (
          <div className="space-y-12 max-w-3xl mx-auto text-left">
            <header data-fade="up" className="space-y-2">
              <AudienceTag audience="families" />
              <h1 className="text-3xl font-medium text-[#002169]">Learn to Code With Us</h1>
              <p className="text-sm text-[#57534e] leading-relaxed">
                Girls Who Code at Emory introduces middle and high school girls from around Atlanta to computer science. Emory student mentors guide every step, so no prior experience is needed.
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div data-fade="up" data-fade-delay="100" className="p-6 rounded-3xl bg-white border border-[#e7e5e4] space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#fce7f3] text-[#db2777] flex items-center justify-center">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-base font-medium text-[#002169]">Who It's For</h2>
                <p className="text-sm text-[#57534e] leading-relaxed">Middle and high school girls who are curious about coding, whether or not they've tried it before.</p>
              </div>

              <div data-fade="up" data-fade-delay="200" className="p-6 rounded-3xl bg-white border border-[#e7e5e4] space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-base font-medium text-[#002169]">When & Where</h2>
                <p className="text-sm text-[#57534e] leading-relaxed">Every Sunday at 2pm in the Emory Math & Science Center (MSC) computer classrooms.</p>
              </div>

              <div data-fade="up" data-fade-delay="300" className="p-6 rounded-3xl bg-white border border-[#e7e5e4] space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#dbeafe] text-[#2563eb] flex items-center justify-center">
                  <Code2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-base font-medium text-[#002169]">What She'll Learn</h2>
                <p className="text-sm text-[#57534e] leading-relaxed">Python in the fall, web design with HTML, CSS & JavaScript in the spring, and a showcase to finish the year.</p>
              </div>
            </div>

            <section data-fade="zoom" className="p-8 rounded-3xl bg-white/90 border border-[#e7e5e4] shadow-sm text-[#002169] space-y-4 text-center">
              <h2 className="text-xl font-medium">Interested in Joining?</h2>
              <p className="text-sm text-[#3b5288] max-w-md mx-auto leading-relaxed">
                Send us an email and we'll follow up with next steps.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={STUDENT_INTEREST_MAILTO}
                  className="gwc-shine-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
                >
                  Open Student Interest Form <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveTab('projects')}
                  className="px-6 py-3 rounded-full bg-white hover:bg-[#f5f5f4] text-[#002169] border border-[#d6d3d1] text-sm font-medium transition-colors cursor-pointer"
                >
                  See Student Projects
                </button>
              </div>
            </section>

            <section data-fade="up" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-[#002169]">
                <HelpCircle className="w-4 h-4 text-[#ec4899]" aria-hidden="true" />
                <h2 className="text-lg font-medium">Questions From Families</h2>
              </div>
              <div className="space-y-3">
                {renderFaqs(FAMILY_FAQS, 'family')}
              </div>
            </section>
          </div>
        )}

        {/* ================= INFO / MENTOR TAB ================= */}
        {activeTab === 'info' && (
          <div className="space-y-12 max-w-3xl mx-auto text-left">
            <header data-fade="up" className="space-y-2">
              <AudienceTag audience="mentors" />
              <h1 className="text-3xl font-medium text-[#002169]">Mentoring With Us at Emory</h1>
              <p className="text-sm text-[#57534e] leading-relaxed">
                You don't need any prior teaching background, and you don't have to be a computer science whiz. We provide all slides, templates, and encouragement.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-fade="up" data-fade-delay="100" className="p-7 rounded-3xl bg-white border border-[#e7e5e4] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#dbeafe] text-[#2563eb] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-medium text-[#002169]">Teach a Mini-Lecture</h2>
                <p className="text-sm text-[#57534e] leading-relaxed">
                  Want to practice public speaking in a warm environment? You can lead a 20-minute topic on Python variables, loops, or simple HTML buttons.
                </p>
                <div className="p-3.5 rounded-2xl bg-[#faf8f5] text-xs text-[#78716c] leading-relaxed flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0 text-[#8b5cf6]" aria-hidden="true" />
                  We provide the slides and speaking notes in advance so you feel completely prepared.
                </div>
              </div>

              <div data-fade="up" data-fade-delay="250" className="p-7 rounded-3xl bg-white border border-[#e7e5e4] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#fce7f3] text-[#db2777] flex items-center justify-center font-bold">
                  <Smile className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-medium text-[#002169]">Help Out at the Tables</h2>
                <p className="text-sm text-[#57534e] leading-relaxed">
                  Not ready to present in front of the group? Perfect! You can sit alongside the girls, help answer questions, and assist during the hands-on coding exercises.
                </p>
                <div className="p-3.5 rounded-2xl bg-[#faf8f5] text-xs text-[#78716c] leading-relaxed flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0 text-[#8b5cf6]" aria-hidden="true" />
                  Most first-time mentors start right here and love the one-on-one connection.
                </div>
              </div>
            </div>

            <section data-fade="up" className="p-7 rounded-3xl bg-white border border-[#e7e5e4] space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#8b5cf6]" aria-hidden="true" />
                <h2 className="text-base font-medium text-[#002169]">Session Schedule & Location</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#57534e] pt-1">
                <div>
                  <span className="text-xs uppercase text-[#78716c] block">Fall Sessions</span>
                  <p className="font-normal mt-0.5">Every Sunday at 2pm</p>
                  <p className="text-xs text-[#78716c]">Focus: Python basics & logic games</p>
                </div>
                <div>
                  <span className="text-xs uppercase text-[#78716c] block">Spring Sessions</span>
                  <p className="font-normal mt-0.5">Every Sunday at 2pm</p>
                  <p className="text-xs text-[#78716c]">Focus: HTML, CSS & JavaScript</p>
                </div>
              </div>
              <div className="pt-2 text-xs text-[#78716c] flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-[#ec4899]" aria-hidden="true" />
                Held in the Emory Math & Science Center (MSC) computer classrooms.
              </div>
            </section>

            <section data-fade="zoom" className="p-8 rounded-3xl bg-[#002169] text-white space-y-4 text-center">
              <h2 className="text-xl font-normal">Ready to Say Hello?</h2>
              <p className="text-sm text-[#cbd5e1] max-w-md mx-auto leading-relaxed">
                Send us a quick email to let us know you're interested, and we'll share the sign-up sheet. No commitment required.
              </p>
              <div className="pt-2">
                <a
                  href={MENTOR_INTEREST_MAILTO}
                  className="gwc-shine-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
                >
                  Open Mentor Interest Form <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </section>

            {/* Accordion FAQ */}
            <section data-fade="up" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-[#002169]">
                <HelpCircle className="w-4 h-4 text-[#3b82f6]" aria-hidden="true" />
                <h2 className="text-lg font-medium">Questions From Mentors</h2>
              </div>

              <div className="space-y-3">
                {renderFaqs(FAQS, 'mentor')}
              </div>
            </section>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#e7e5e4] bg-white py-8 mt-20 text-center text-xs text-[#78716c]">
        <div className="max-w-6xl mx-auto px-6 space-y-2">
          <p>Girls Who Code chapter at Emory University • Atlanta, GA</p>
          <p className="text-[#a8a29e]">Dedicated to supporting K-12 girls in computing.</p>
        </div>
      </footer>

    </div>
  );
}