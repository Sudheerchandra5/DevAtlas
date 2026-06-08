import { useParams, Link, Navigate } from 'react-router-dom';
import { getLanguageById, getTotalTopics } from '../data/languages';
import { difficultyConfig, difficultyOrder, type DifficultyLevel } from '../types';
import TopicCard from '../components/TopicCard';
import ProgressBar from '../components/ProgressBar';

export default function LanguagePage() {
  const { languageId } = useParams<{ languageId: string }>();
  const language = languageId ? getLanguageById(languageId) : undefined;

  if (!language) {
    return <Navigate to="/" replace />;
  }

  const totalTopics = getTotalTopics(language);

  return (
    <div className="animate-fade-in">
      {/* Language Hero */}
      <section className={`relative overflow-hidden border-b border-border-subtle`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${language.gradient} opacity-50`} />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-4 sm:mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted min-h-[44px] active:text-text-primary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Languages
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <div
              className={`flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${language.gradient} text-4xl sm:text-5xl`}
            >
              {language.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">{language.name}</h1>
                <span className="rounded-full bg-surface-overlay px-2.5 py-1 font-mono text-[10px] sm:text-xs text-accent border border-accent/20">
                  {language.currentVersion}
                </span>
              </div>
              <p className="mt-1 text-sm text-text-muted italic">{language.tagline}</p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                {language.description}
              </p>

              <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6 text-xs sm:text-sm">
                <MetaItem label="Topics" value={String(totalTopics)} />
                <MetaItem label="Levels" value={String(language.sections.length)} />
                <MetaItem label="Range" value="Beginner → Expert" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Level Navigation */}
      <nav className="sticky top-[calc(3.5rem+env(safe-area-inset-top))] sm:top-16 z-40 border-b border-border-subtle bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
            {language.sections.map((section) => {
              const config = difficultyConfig[section.id as DifficultyLevel];
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`snap-start shrink-0 rounded-full px-4 py-2.5 min-h-[44px] flex items-center text-sm font-medium active:bg-surface-overlay sm:hover:bg-surface-overlay ${config?.color ?? 'text-text-secondary'}`}
                >
                  {section.title}
                  <span className="ml-1.5 text-text-muted text-xs">({section.topics.length})</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Curriculum Sections */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Progress Overview */}
        <div className="mb-8 sm:mb-12 rounded-2xl border border-border bg-surface-raised p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Curriculum Overview</h2>
          <div className="space-y-4">
            {language.sections.map((section, index) => {
              const level = section.id as DifficultyLevel;
              const config = difficultyConfig[level];
              const percentage = Math.round((section.topics.length / totalTopics) * 100);

              return (
                <div key={section.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${config.color}`}>
                        {config.label}
                      </span>
                      <span className="text-xs text-text-muted">
                        {section.topics.length} topics
                      </span>
                    </div>
                    <span className="text-xs text-text-muted">{percentage}%</span>
                  </div>
                  <ProgressBar
                    percentage={percentage}
                    colorClass={
                      index === 0
                        ? 'bg-emerald-500'
                        : index === 1
                          ? 'bg-sky-500'
                          : index === 2
                            ? 'bg-violet-500'
                            : 'bg-amber-500'
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Topic Sections */}
        {language.sections.map((section) => {
          const level = section.id as DifficultyLevel;
          const config = difficultyConfig[level];

          return (
            <section key={section.id} id={section.id} className="mb-12 sm:mb-16 scroll-mt-[calc(7.5rem+env(safe-area-inset-top))] sm:scroll-mt-36">
              <div className="mb-5 sm:mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                <div
                  className={`self-start rounded-xl border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${config.bg} ${config.color} ${config.border}`}
                >
                  {config.label}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold">{section.title} Level</h2>
                  <p className="mt-1 text-sm text-text-secondary">{section.description}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.topics.map((topic, topicIndex) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    index={topicIndex + 1}
                    level={level}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Level progression visual */}
        <div className="mt-8 rounded-2xl border border-border bg-surface-raised p-5 sm:p-8">
          <h3 className="text-base sm:text-lg font-semibold mb-5 sm:mb-6 text-center">Your Learning Path</h3>
          <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-center">
            {difficultyOrder.map((level, index) => {
              const config = difficultyConfig[level];
              const section = language.sections.find((s) => s.id === level);
              return (
                <div key={level} className="flex items-center sm:contents">
                  <div className="flex flex-1 items-center gap-3 rounded-xl bg-surface-overlay/40 p-3 sm:flex-col sm:rounded-none sm:bg-transparent sm:p-0">
                    <div
                      className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border-2 ${config.border} ${config.bg}`}
                    >
                      <span className={`text-sm font-bold ${config.color}`}>{index + 1}</span>
                    </div>
                    <div className="sm:text-center">
                      <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                      {section && (
                        <span className="block text-xs text-text-muted mt-0.5">
                          {section.topics.length} topics
                        </span>
                      )}
                    </div>
                  </div>
                  {index < difficultyOrder.length - 1 && (
                    <div className="hidden sm:block w-16 lg:w-24 h-px bg-border mx-2 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-text-muted">{label}: </span>
      <span className="font-medium text-text-primary">{value}</span>
    </div>
  );
}
