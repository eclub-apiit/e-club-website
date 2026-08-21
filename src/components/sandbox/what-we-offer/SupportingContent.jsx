import React from 'react';

export default function SupportingContent({ extra }) {
  if (!extra) return null;

  if (extra.type === 'bullets') {
    return (
      <ul className="mt-6 space-y-3 max-w-xl mx-auto md:mx-0 text-left">
        {extra.items.map((text, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#14f2db] shrink-0 shadow-[0_0_8px_rgba(20,242,219,0.6)]" />
            <span className="text-slate-400 leading-relaxed">{text}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (extra.type === 'steps') {
    return (
      <ol className="mt-6 space-y-4 max-w-xl mx-auto md:mx-0 text-left">
        {extra.items.map((text, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="shrink-0 w-8 h-8 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 text-[#a64d79] font-bold text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-slate-400 leading-relaxed pt-1">{text}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (extra.type === 'tags') {
    return (
      <div className="mt-6 max-w-xl mx-auto md:mx-0">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {extra.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#a64d79] text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-slate-400 text-sm italic">{extra.note}</p>
      </div>
    );
  }

  if (extra.type === 'stat') {
    return (
      <div className="mt-6 max-w-xl mx-auto md:mx-0">
        <div className="flex items-baseline gap-4 justify-center md:justify-start flex-wrap">
          <span className="text-5xl md:text-6xl font-black font-display text-[#a64d79] tracking-tight">
            {extra.value}
          </span>
          <span className="text-white font-semibold text-lg">{extra.label}</span>
        </div>
        <p className="mt-3 text-slate-400 leading-relaxed">{extra.note}</p>
      </div>
    );
  }

  if (extra.type === 'paragraph') {
    return (
      <p className="mt-6 text-slate-400 leading-relaxed text-lg max-w-xl mx-auto md:mx-0">
        {extra.text}
      </p>
    );
  }

  return null;
}
