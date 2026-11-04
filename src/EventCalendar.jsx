import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

// ---- Event data: edit these to update the calendar ----

// Weekly Sunday lecture, repeated every Sunday from SEASON_START to SEASON_END
const LECTURE = { title: 'Emory GWC Lecture', time: '2:00 – 3:30 PM', location: 'MSC W301', type: 'lecture' };
const SEASON_START = '2026-08-30';
const SEASON_END = '2026-12-06';

// Sundays with no lecture
const NO_LECTURE = {
  '2026-09-06': 'Labor Day week',
  '2026-11-22': 'Thanksgiving week',
};

// One-off events
const SPECIAL_EVENTS = [
  {
    date: '2026-11-09',
    title: 'First Gen Week Grand Celebration',
    time: '12:00 – 2:00 PM',
    location: 'Mosaic Center, 3rd Floor Cox Hall',
    note: 'Collaborator event',
    type: 'special',
  },
];

// ---------------------------------------------------------

const TYPE_STYLES = {
  lecture: { pill: 'bg-[#ede9fe] text-[#6d28d9]', dot: 'bg-[#8b5cf6]', label: 'Weekly Lecture' },
  special: { pill: 'bg-[#fce7f3] text-[#be185d]', dot: 'bg-[#ec4899]', label: 'Special Event' },
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const parseKey = (key) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const toKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const monthIndex = (date) => date.getFullYear() * 12 + date.getMonth();

function buildEvents() {
  const byDay = {};
  const add = (key, event) => (byDay[key] = [...(byDay[key] || []), { ...event, date: key }]);

  const end = parseKey(SEASON_END);
  for (let d = parseKey(SEASON_START); d <= end; d.setDate(d.getDate() + 7)) {
    const key = toKey(d);
    if (!NO_LECTURE[key]) add(key, LECTURE);
  }
  SPECIAL_EVENTS.forEach((e) => add(e.date, e));
  return byDay;
}

const formatLongDate = (key) =>
  parseKey(key).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

export default function EventCalendar() {
  const eventsByDay = useMemo(() => buildEvents(), []);
  const [todayKey] = useState(() => toKey(new Date()));

  const firstMonth = monthIndex(parseKey(SEASON_START));
  const lastMonth = monthIndex(parseKey(SEASON_END));
  const upcoming = Object.keys(eventsByDay)
    .filter((key) => key >= todayKey)
    .sort()
    .flatMap((key) => eventsByDay[key]);

  // start on the current month if it's in season, otherwise the first month of the season
  const [month, setMonth] = useState(() => {
    const now = monthIndex(new Date());
    return now >= firstMonth && now <= lastMonth ? now : firstMonth;
  });
  // today is selected by default (the calendar always works off the visitor's current date)
  const [selectedKey, setSelectedKey] = useState(todayKey);

  const year = Math.floor(month / 12);
  const monthNum = month % 12;
  const daysInMonth = new Date(year, monthNum + 1, 0).getDate();
  const leadingBlanks = new Date(year, monthNum, 1).getDay();
  const cells = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => toKey(new Date(year, monthNum, i + 1))),
  ];

  const selectDay = (key) => {
    setSelectedKey(key);
    setMonth(monthIndex(parseKey(key)));
  };

  const selectedEvents = selectedKey ? eventsByDay[selectedKey] || [] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Month grid */}
      <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMonth((m) => m - 1)}
            disabled={month <= firstMonth}
            aria-label="Previous month"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#002169] hover:bg-[#f5f5f4] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <h3 className="text-lg font-medium text-[#002169]" aria-live="polite">
            {new Date(year, monthNum, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            type="button"
            onClick={() => setMonth((m) => m + 1)}
            disabled={month >= lastMonth}
            aria-label="Next month"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#002169] hover:bg-[#f5f5f4] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#78716c] font-medium">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((key, idx) => {
            if (!key) return <div key={`blank-${idx}`} />;
            const events = eventsByDay[key] || [];
            const isSelected = key === selectedKey;
            const isToday = key === todayKey;
            const skipped = NO_LECTURE[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(key)}
                aria-pressed={isSelected}
                aria-label={`${formatLongDate(key)}${events.length ? `, ${events.map((e) => e.title).join(', ')}` : ''}${skipped ? `, no lecture (${skipped})` : ''}`}
                className={`min-h-12 sm:min-h-20 p-1 sm:p-1.5 rounded-xl text-left flex flex-col gap-1 transition-colors ${
                  isSelected ? 'bg-[#f3f0ff] ring-1 ring-[#c4b5fd]' : 'hover:bg-[#faf8f5]'
                }`}
              >
                <span
                  className={`text-xs w-6 h-6 rounded-full flex items-center justify-center ${
                    isToday ? 'bg-[#8b5cf6] text-white font-semibold' : 'text-[#57534e]'
                  }`}
                >
                  {parseKey(key).getDate()}
                </span>
                {/* dots on phones, labeled pills on bigger screens */}
                <span className="flex gap-1 sm:hidden pl-1">
                  {events.map((e, i) => (
                    <span key={i} className={`w-1.5 h-1.5 rounded-full ${TYPE_STYLES[e.type].dot}`} />
                  ))}
                </span>
                <span className="hidden sm:flex flex-col gap-1 w-full">
                  {events.map((e, i) => (
                    <span key={i} className={`block truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium ${TYPE_STYLES[e.type].pill}`}>
                      {e.type === 'lecture' ? 'GWC Lecture' : e.title}
                    </span>
                  ))}
                  {skipped && (
                    <span className="block truncate px-1.5 text-[10px] text-[#a8a29e]">No lecture</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-[#f5f5f4] text-xs text-[#78716c]">
          {Object.values(TYPE_STYLES).map((t) => (
            <span key={t.label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} aria-hidden="true" /> {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Side panel: selected day + coming up */}
      <div className="space-y-6">
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-3">
          <h3 className="text-base font-medium text-[#002169]">
            {selectedKey ? formatLongDate(selectedKey) : 'Select a day'}
          </h3>
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-[#78716c]">
              {selectedKey && NO_LECTURE[selectedKey]
                ? `No lecture this week (${NO_LECTURE[selectedKey]}).`
                : 'No events scheduled.'}
            </p>
          ) : (
            selectedEvents.map((e, i) => (
              <div key={i} className="space-y-1.5">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_STYLES[e.type].pill}`}>
                  {e.note || TYPE_STYLES[e.type].label}
                </span>
                <p className="text-sm font-medium text-[#002169]">{e.title}</p>
                <p className="flex items-center gap-1.5 text-xs text-[#57534e]">
                  <Clock className="w-3.5 h-3.5 text-[#8b5cf6]" aria-hidden="true" /> {e.time}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-[#57534e]">
                  <MapPin className="w-3.5 h-3.5 text-[#ec4899]" aria-hidden="true" /> {e.location}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-3">
          <h3 className="text-base font-medium text-[#002169]">Coming Up</h3>
          {upcoming.length === 0 ? (
            <p className="text-sm text-[#78716c]">No upcoming events. Check back soon!</p>
          ) : (
            <ul className="space-y-2">
              {upcoming.slice(0, 4).map((e, i) => (
                <li key={`${e.date}-${i}`}>
                  <button
                    type="button"
                    onClick={() => selectDay(e.date)}
                    className="w-full flex items-center gap-3 p-2 -mx-2 rounded-xl text-left hover:bg-[#faf8f5] transition-colors"
                  >
                    <span className={`w-2 h-2 shrink-0 rounded-full ${TYPE_STYLES[e.type].dot}`} aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-sm text-[#002169] truncate">{e.title}</span>
                      <span className="block text-xs text-[#78716c]">
                        {parseKey(e.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {e.time}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
