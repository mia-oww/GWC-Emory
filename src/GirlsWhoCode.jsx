import React, { useState } from 'react';
import SparkleBackground from './SparkleBackground.jsx';
import Cursor from "./Cursor";
import { 
  BookOpen, 
  Code2, 
  Heart, 
  BookHeart,
  Calendar, 
  ExternalLink, 
  ChevronDown, 
  Smile, 
  HelpCircle,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Presentation
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
    title: "Community Pet Adoption Showcase",
    studentGrade: "10th Grade Student",
    semester: "spring",
    lang: "HTML & CSS",
    description: "A multipage static website highlighting rescue animals in Atlanta, complete with cute bios and responsive cards.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80",
    projectUrl: "https://codepen.io"
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
    a: "We meet on Saturday mornings on the Emory campus (Math & Science Center). We provide parking passes and snacks for all volunteers."
  },
  {
    q: "Do you supply lesson slides and exercises?",
    a: "Yes! Our curriculum team writes all the slides, fun starter templates, and cheat sheets ahead of time, so you never have to prepare materials from scratch."
  }
];

const NAVIGATION_TABS = ['home', 'about', 'projects', 'lectures', 'info'];

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

  const toggleFaq = (idx) => {
    setOpenFaq((prevIdx) => (prevIdx === idx ? null : idx));
  };

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
            <div className="w-10 h-10 rounded-xl bg-[#00a79d] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm transition-transform group-hover:scale-105">
              &lt;/&gt;
            </div>
            <div>
              <span className="text-[#002169] font-medium tracking-tight text-base">girls who code</span>
              <span className="text-[#00a79d] font-semibold text-xs ml-1.5 uppercase tracking-wide">at emory</span>
            </div>
          </button>

          {/* Navigation Tabs */}
          <nav aria-label="Main Navigation" className="flex items-center gap-1 bg-[#ede8e1]/70 p-1 rounded-full text-sm">
            {NAVIGATION_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-current={activeTab === tab ? 'page' : undefined}
                className={`px-4 py-1.5 rounded-full capitalize transition-all duration-200 text-sm ${
                  activeTab === tab
                    ? 'bg-[#002169] text-white shadow-sm font-medium'
                    : 'text-[#57534e] hover:text-[#002169] font-normal'
                }`}
              >
                {tab}
              </button>
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
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#ccfbf1] text-[#006059]">
                  <BookHeart className="w-3.5 h-3.5 text-[#e1a4e9]" aria-hidden="true" />
                  Empowering young girls across atlanta!
                </span>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#002169] leading-tight tracking-tight">
                  Welcome to Girls Who Code at Emory!
                </h1>
                
                <p className="text-base text-[#57534e] leading-relaxed max-w-xl">
                  We are a passionate community of Emory college students introducing girls from local Atlanta schools to computer science!
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('info')}
                    className="px-6 py-3 rounded-full bg-[#00a79d] hover:bg-[#008f86] text-white text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
                  >
                    Join us as a mentor <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    className="px-6 py-3 rounded-full bg-white hover:bg-[#f5f5f4] text-[#002169] border border-[#d6d3d1] text-sm font-medium transition-colors cursor-pointer"
                  >
                    Explore student projects
                  </button>
                </div>

                <div className="pt-4 flex items-center gap-6 text-xs text-[#78716c]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00a79d]" /> Zero tech background needed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00a79d]" /> Free lesson templates provided
                  </span>
                </div>
              </div>

              {/* Code Editor Style Visual Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#0f172a] text-[#f8fafc] p-6 shadow-xl border border-[#334155] relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-[#334155]/80">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                      <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                      <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                      <span className="text-xs text-[#94a3b8] font-mono ml-2">our_mission.py</span>
                    </div>
                    <Terminal className="w-4 h-4 text-[#94a3b8]" />
                  </div>

                  <div className="pt-4 font-mono text-xs sm:text-sm leading-relaxed space-y-2 text-[#cbd5e1]">
                    <p><span className="text-[#a78bfa]">def</span> <span className="text-[#38bdf8]">build_confidence</span>(student):</p>
                    <p className="pl-4 text-[#94a3b8]"># fall: creative python logic</p>
                    <p className="pl-4">skills = [<span className="text-[#34d399]">&quot;curiosity&quot;</span>, <span className="text-[#34d399]">&quot;teamwork&quot;</span>]</p>
                    <p className="pl-4 text-[#94a3b8]"># spring: front-end web design</p>
                    <p className="pl-4">skills.append(<span className="text-[#34d399]">&quot;interactive web&quot;</span>)</p>
                    <p className="pl-4"><span className="text-[#a78bfa]">return</span> <span className="text-[#fbbf24]">&quot;she built it herself! ✨&quot;</span></p>
                    <p className="pt-2 text-[#64748b]">&gt; session ready on campus Saturdays</p>
                  </div>

                  <div className="mt-5 p-3.5 rounded-2xl bg-[#1e293b] flex items-center justify-between text-xs">
                    <span className="text-[#94a3b8]">Fall semester: Python</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#00a79d]/20 text-[#2dd4bf] font-medium">No experience needed</span>
                  </div>
                </div>
              </div>
            </section>

            {/* What We Teach */}
            <section className="space-y-6 pt-4">
              <div className="text-left space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold">what we teach</span>
                <h2 className="text-2xl font-medium text-[#002169]">Our Two-Semester Journey</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-4 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffcb05]/10 rounded-bl-full pointer-events-none" />
                  <div className="w-11 h-11 rounded-2xl bg-[#fef3c7] text-[#b45309] flex items-center justify-center font-bold">
                    <Code2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#78716c] font-medium">first semester • fall</span>
                    <h3 className="text-xl font-medium text-[#002169] mt-1">friendly python</h3>
                  </div>
                  <p className="text-sm text-[#57534e] leading-relaxed">
                    We introduce girls to logic through playful stories, interactive prompts, variables, and math games. Python feels natural, readable, and rewarding from day one.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">variables</span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">if / else logic</span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">loops & games</span>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-4 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00a79d]/10 rounded-bl-full pointer-events-none" />
                  <div className="w-11 h-11 rounded-2xl bg-[#ccfbf1] text-[#007a73] flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#78716c] font-medium">second semester • spring</span>
                    <h3 className="text-xl font-medium text-[#002169] mt-1">creative web (html, css & js)</h3>
                  </div>
                  <p className="text-sm text-[#57534e] leading-relaxed">
                    Students discover how the web works by styling custom portfolio pages, digital posters, and interactive buttons that react when you click them.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">html structure</span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">css styling</span>
                    <span className="px-3 py-1 rounded-full bg-[#faf8f5] text-xs text-[#002169] border border-[#e7e5e4]">interactive buttons</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Gentle Mentorship Banner */}
            <section className="p-8 sm:p-10 rounded-3xl bg-[#002169] text-white text-center max-w-4xl mx-auto space-y-4 relative overflow-hidden">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-[#2dd4bf] shadow-sm">
                <Heart className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium">Thinking about getting involved?</h2>
              <p className="text-sm sm:text-base text-[#cbd5e1] max-w-xl mx-auto leading-relaxed">
                Whether you want to lead a 20-minute Python lesson or sit alongside a 7th grader to help her fix a typo, your encouragement makes all the difference.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('info')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00a79d] hover:bg-[#008f86] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  see mentor opportunities <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ================= ABOUT TAB ================= */}
        {activeTab === 'about' && (
          <div className="space-y-12 max-w-3xl mx-auto">
            <header className="space-y-3 text-left">
              <span className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold">who we are</span>
              <h1 className="text-3xl font-medium text-[#002169]">mentoring the next generation in atlanta</h1>
              <p className="text-base text-[#57534e] leading-relaxed font-normal">
                girls who code at emory bridges collegiate volunteers with young students across the greater atlanta area. we believe anyone can learn to program in a space where questions are always welcomed.
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-3xl bg-white border border-[#e7e5e4] space-y-2">
                <div className="text-[#00a79d] font-bold text-lg">01</div>
                <h2 className="font-medium text-[#002169] text-base">patience first</h2>
                <p className="text-xs text-[#78716c] leading-relaxed">errors are just normal steps toward understanding. we never rush student discovery.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#e7e5e4] space-y-2">
                <div className="text-[#00a79d] font-bold text-lg">02</div>
                <h2 className="font-medium text-[#002169] text-base">creative expression</h2>
                <p className="text-xs text-[#78716c] leading-relaxed">students choose their own topics, from favorite books to local animal shelters and fan clubs.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#e7e5e4] space-y-2">
                <div className="text-[#00a79d] font-bold text-lg">03</div>
                <h2 className="font-medium text-[#002169] text-base">accessible to all</h2>
                <p className="text-xs text-[#78716c] leading-relaxed">both our student sessions and our college mentor program assume zero prior experience.</p>
              </div>
            </div>

            <section className="p-8 rounded-3xl bg-white border border-[#e7e5e4] space-y-6 text-left">
              <h2 className="text-xl font-medium text-[#002169]">our yearly learning path</h2>
              
              <div className="space-y-6 border-l-2 border-[#ccfbf1] pl-6 ml-2">
                <div className="space-y-1">
                  <span className="text-xs text-[#00a79d] font-semibold">fall semester</span>
                  <h3 className="text-base font-normal text-[#002169]">python basics & creative terminal games</h3>
                  <p className="text-sm text-[#57534e]">girls learn sequential instructions, string manipulation, user inputs, and conditionals by building interactive text adventures.</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-[#00a79d] font-semibold">spring semester</span>
                  <h3 className="text-base font-normal text-[#002169]">front-end web pages (html, css & js)</h3>
                  <p className="text-sm text-[#57534e]">girls transition into visual creation, learning layout structure, color schemes, font styling, and button logic.</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-[#00a79d] font-semibold">end-of-year</span>
                  <h3 className="text-base font-normal text-[#002169]">family & friends celebration showcase</h3>
                  <p className="text-sm text-[#57534e]">every girl presents her project on campus, showing parents, teachers, and peers what she created.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= PROJECTS TAB ================= */}
        {activeTab === 'projects' && (
          <div className="space-y-10 text-left">
            <header className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold">student work</span>
              <h1 className="text-3xl font-medium text-[#002169]">what our girls create</h1>
              <p className="text-sm text-[#57534e] leading-relaxed">
                these are example projects created by our middle and high school students during our weekend workshops. every project reflects the student's individual passions and ideas!
              </p>
            </header>

            {/* Semester Filters */}
            <div className="flex items-center gap-2" role="group" aria-label="Project semester filters">
              {SEMESTER_FILTERS.map((f) => (
                <button
                  key={f.val}
                  type="button"
                  onClick={() => setActiveSemester(f.val)}
                  aria-pressed={activeSemester === f.val}
                  className={`px-4 py-1.5 rounded-full text-xs font-normal transition-colors cursor-pointer ${
                    activeSemester === f.val 
                      ? 'bg-[#00a79d] text-white' 
                      : 'bg-white border border-[#d6d3d1] text-[#57534e] hover:bg-[#faf8f5]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        className="inline-flex items-center gap-1.5 text-xs text-[#00a79d] font-medium hover:text-[#002169] transition-colors"
                      >
                        view student code demo <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="p-6 rounded-3xl bg-white border border-dashed border-[#d6d3d1] text-center text-xs text-[#78716c]">
              mentors: have a student project link or screenshot to add? share it in our team drive to have it displayed here!
            </aside>
          </div>
        )}

        {/* ================= LECTURES TAB (New Slides Embed) ================= */}
        {activeTab === 'lectures' && (
          <div className="space-y-12 max-w-4xl mx-auto text-left">
            <header className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold">curriculum archive</span>
              <h1 className="text-3xl font-medium text-[#002169]">lecture slides & classroom guides</h1>
              <p className="text-base text-[#57534e] leading-relaxed font-normal">
                parents or emory students, want to look at the previous slides from previous years? feel free to explore our weekly lesson decks, starter prompts, and coding challenges below!
              </p>
            </header>

            {/* Default 2 Slide Embeds */}
            <section className="space-y-10">
              <div className="flex items-center gap-2 border-b border-[#e7e5e4] pb-3">
                <Presentation className="w-5 h-5 text-[#00a79d]" />
                <h2 className="text-lg font-medium text-[#002169]">Current & Recent Semesters (Default Views)</h2>
              </div>

              <div className="space-y-8">
                {DEFAULT_LECTURES.map((lec) => (
                  <div key={lec.id} className="p-6 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f5f5f4] pb-3">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-[#ccfbf1] text-[#007a73] font-semibold text-xs uppercase tracking-wide">
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
            <section className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-3">
                <h2 className="text-base font-medium text-[#002169]">Earlier Semesters & Archived Slides</h2>
                <span className="text-xs text-[#78716c]">Click any semester below to view slides</span>
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
                            {isOpen ? 'Hide slides' : 'View slides'}
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

        {/* ================= INFO / MENTOR TAB ================= */}
        {activeTab === 'info' && (
          <div className="space-y-12 max-w-3xl mx-auto text-left">
            <header className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#00a79d] font-semibold">get involved</span>
              <h1 className="text-3xl font-medium text-[#002169]">mentoring with us at emory</h1>
              <p className="text-sm text-[#57534e] leading-relaxed">
                you don't need any prior teaching background, and you don't have to be a computer science whiz. we provide all slides, templates, and encouragement.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-7 rounded-3xl bg-white border border-[#e7e5e4] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#ccfbf1] text-[#007a73] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-medium text-[#002169]">teach a mini-lecture</h2>
                <p className="text-sm text-[#57534e] leading-relaxed">
                  want to practice public speaking in a warm environment? you can lead a 20-minute topic on python variables, loops, or simple html buttons. 
                </p>
                <div className="p-3.5 rounded-2xl bg-[#faf8f5] text-xs text-[#78716c] leading-relaxed">
                  💡 we provide the slides and speaking notes in advance so you feel completely prepared.
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-white border border-[#e7e5e4] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#fef3c7] text-[#b45309] flex items-center justify-center font-bold">
                  <Smile className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-medium text-[#002169]">help out at the tables</h2>
                <p className="text-sm text-[#57534e] leading-relaxed">
                  not ready to present in front of the group? perfect! you can sit alongside the girls, help answer questions, and assist during the hands-on coding exercises.
                </p>
                <div className="p-3.5 rounded-2xl bg-[#faf8f5] text-xs text-[#78716c] leading-relaxed">
                  💡 most first-time mentors start right here and love the one-on-one connection.
                </div>
              </div>
            </div>

            <section className="p-7 rounded-3xl bg-white border border-[#e7e5e4] space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#00a79d]" aria-hidden="true" />
                <h2 className="text-base font-medium text-[#002169]">session schedule & location</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#57534e] pt-1">
                <div>
                  <span className="text-xs uppercase text-[#78716c] block">fall sessions</span>
                  <p className="font-normal mt-0.5">saturdays 10:30 am – 12:00 pm</p>
                  <p className="text-xs text-[#78716c]">focus: python basics & logic games</p>
                </div>
                <div>
                  <span className="text-xs uppercase text-[#78716c] block">spring sessions</span>
                  <p className="font-normal mt-0.5">saturdays 10:30 am – 12:00 pm</p>
                  <p className="text-xs text-[#78716c]">focus: html, css & javascript</p>
                </div>
              </div>
              <div className="pt-2 text-xs text-[#78716c]">
                📍 held in the emory math & science center (msc) computer classrooms.
              </div>
            </section>

            <section className="p-8 rounded-3xl bg-[#002169] text-white space-y-4 text-center">
              <h2 className="text-xl font-normal">ready to say hello?</h2>
              <p className="text-sm text-[#cbd5e1] max-w-md mx-auto leading-relaxed">
                fill out our short mentor interest form. tell us what you'd be interested in doing—no commitment required.
              </p>
              <div className="pt-2">
                <a
                  href="https://forms.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-6 py-2.5 rounded-full bg-[#00a79d] hover:bg-[#008f86] text-white text-sm font-medium transition-colors"
                >
                  open mentor interest form
                </a>
              </div>
            </section>

            {/* Accordion FAQ */}
            <section className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-[#002169]">
                <HelpCircle className="w-4 h-4 text-[#00a79d]" aria-hidden="true" />
                <h2 className="text-lg font-medium">common questions</h2>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  const faqId = `faq-content-${idx}`;
                  const btnId = `faq-btn-${idx}`;

                  return (
                    <div 
                      key={idx}
                      className="border border-[#e7e5e4] rounded-2xl bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        id={btnId}
                        aria-expanded={isOpen}
                        aria-controls={faqId}
                        onClick={() => toggleFaq(idx)}
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
                })}
              </div>
            </section>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#e7e5e4] bg-white py-8 mt-20 text-center text-xs text-[#78716c]">
        <div className="max-w-6xl mx-auto px-6 space-y-2">
          <p>Girls Who Code chapter at Emory University • Atlanta, GA</p>
          <p className="text-[#a8a29e]">Dedicated to supporting k-12 girls in computing.</p>
        </div>
      </footer>

    </div>
  );
}