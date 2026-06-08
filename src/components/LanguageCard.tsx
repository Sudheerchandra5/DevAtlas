import { Link } from 'react-router-dom';
import type { Language } from '../types';
import { getTotalTopics } from '../data/languages';

interface LanguageCardProps {
  language: Language;
}

export default function LanguageCard({ language }: LanguageCardProps) {
  const topicCount = getTotalTopics(language);
  const sectionCount = language.sections.length;

  const content = (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-surface-raised p-6 transition-all duration-300 ${
        language.available
          ? 'border-border hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 cursor-pointer'
          : 'border-border-subtle opacity-60 cursor-not-allowed'
      }`}
    >
      {!language.available && (
        <span className="absolute top-4 right-4 rounded-full bg-surface-overlay px-2.5 py-0.5 text-xs font-medium text-text-muted">
          Coming Soon
        </span>
      )}

      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${language.gradient} text-3xl transition-transform group-hover:scale-110`}
      >
        {language.icon}
      </div>

      <h3 className="text-xl font-semibold">{language.name}</h3>
      <p className="mt-1 text-sm text-text-muted italic">{language.tagline}</p>
      <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-2">
        {language.description}
      </p>

      <div className="mt-5 flex items-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {topicCount} topics
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {sectionCount} levels
        </span>
        {language.currentVersion && (
          <span className="ml-auto rounded-md bg-surface-overlay px-2 py-0.5 font-mono text-[10px] text-accent">
            {language.currentVersion}
          </span>
        )}
      </div>

      {language.available && (
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
          Start Learning
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      )}
    </div>
  );

  if (language.available) {
    return <Link to={`/learn/${language.id}`}>{content}</Link>;
  }

  return content;
}
