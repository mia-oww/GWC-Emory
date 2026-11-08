import React, { useState } from 'react';
import { Download, ExternalLink, Presentation } from 'lucide-react';

// Shows a semester's slides. A semester can either have a single Google Slides `embedUrl`,
// or a `lectures` list where each lecture has a `pdf` (in public/lectures/) or its own `embedUrl`.
// A lecture with neither shows a "coming soon" placeholder (normally hidden by the caller).
const hasSlides = (lecture) => Boolean(lecture.pdf || lecture.embedUrl);

// Plain count of the decks a semester has, e.g. "6 decks"
export function SlideCount({ semester }) {
  const count = (semester.lectures?.length ? semester.lectures : [semester]).filter(hasSlides).length;
  return (
    <span className="inline-block px-2.5 py-1 rounded-md bg-[#e6faf7] text-[#0f766e] text-xs font-medium whitespace-nowrap">
      {count} {count === 1 ? 'deck' : 'decks'}
    </span>
  );
}

export default function SemesterSlides({ semester }) {
  const lectures = semester.lectures?.length
    ? semester.lectures
    : [{ title: `${semester.term} Slides`, embedUrl: semester.embedUrl }];
  const [current, setCurrent] = useState(0);
  const lecture = lectures[current];

  return (
    <div className="space-y-3">
      {/* lecture picker, shown when the semester has a list of lectures */}
      {semester.lectures?.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label={`${semester.term} lessons`}>
          {lectures.map((lec, idx) => (
            <button
              key={lec.title}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-pressed={current === idx}
              className={`px-3.5 py-1.5 rounded-full text-xs cursor-pointer ${
                current === idx
                  ? 'gwc-shine-btn font-medium'
                  : 'bg-white border border-[#d6d3d1] text-[#57534e] hover:bg-[#faf8f5] transition-colors'
              }`}
            >
              {lec.title}
              {lec.date && <span className="opacity-70"> · {lec.date}</span>}
            </button>
          ))}
        </div>
      )}

      {lecture.topic && (
        <p className="text-sm font-medium text-[#002169]">
          {lecture.title}: {lecture.topic}
        </p>
      )}

      {/* 16:9 viewer */}
      <div className="w-full relative rounded-2xl overflow-hidden border border-[#e7e5e4] bg-[#0f172a] aspect-video">
        {hasSlides(lecture) ? (
          <iframe
            key={lecture.pdf || lecture.embedUrl}
            src={lecture.pdf ? `${lecture.pdf}#view=FitH` : lecture.embedUrl}
            title={`${semester.term}: ${lecture.title}`}
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#faf8f5] text-[#a8a29e]">
            <Presentation className="w-8 h-8" aria-hidden="true" />
            <p className="text-sm">Slides for {lecture.title} coming soon</p>
          </div>
        )}
      </div>

      {/* PDFs don't display inline on some phones, so always offer open/download links */}
      {lecture.pdf && (
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <a
            href={lecture.pdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#8b5cf6] font-medium hover:text-[#002169] transition-colors"
          >
            Open Full Screen <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a
            href={lecture.pdf}
            download
            className="inline-flex items-center gap-1.5 text-[#8b5cf6] font-medium hover:text-[#002169] transition-colors"
          >
            Download PDF <Download className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
