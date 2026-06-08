import { Link } from 'react-router-dom';
import { languages } from '../data/languages';
import { getTotalTopics } from '../data/languages';
import LanguageCard from '../components/LanguageCard';

export default function HomePage() {
  const availableCount = languages.filter((l) => l.available).length;
  const comingSoonCount = languages.filter((l) => !l.available).length;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-violet-500/5" />
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl animate-pulse-glow" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-20 lg:py-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-overlay px-3 py-1.5 sm:px-4 text-xs sm:text-sm text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Structured learning paths for every level</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Master programming
              <span className="block bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">
                one language at a time
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              DevAtlas provides curated, up-to-date learning roadmaps from absolute basics
              to expert-level concepts. Start your journey today and grow at your own pace.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {languages.find((l) => l.available) && (
                <Link
                  to={`/learn/${languages.find((l) => l.available)!.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 min-h-[48px] text-sm font-semibold text-white active:bg-accent-hover sm:hover:bg-accent-hover"
                >
                  Start with Java
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
              <a
                href="#languages"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-overlay px-6 py-3.5 min-h-[48px] text-sm font-semibold text-text-primary active:bg-surface-raised sm:hover:border-accent/50"
              >
                Browse Languages
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border-subtle bg-surface-raised">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4">
            <Stat value={String(availableCount)} label="Languages Available" />
            <Stat
              value={String(
                languages.reduce((sum, l) => sum + (l.available ? getTotalTopics(l) : 0), 0),
              )}
              label="Topics Covered"
            />
            <Stat value="4" label="Difficulty Levels" />
            <Stat value={comingSoonCount > 0 ? `${comingSoonCount}+` : '∞'} label="More Coming" />
          </div>
        </div>
      </section>

      {/* Languages Grid */}
      <section id="languages" className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Choose a Language</h2>
          <p className="mt-2 text-text-secondary">
            Pick a language to explore its complete learning roadmap
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {languages.map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}

          {/* Coming Soon placeholder card */}
          <div className="group relative flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-raised/50 p-8 text-center transition-colors hover:border-accent/30">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-overlay text-2xl">
              ➕
            </div>
            <h3 className="text-lg font-semibold text-text-secondary">More Languages</h3>
            <p className="mt-2 text-sm text-text-muted">
              Python, JavaScript, TypeScript, Go, Rust, and more are on the way
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border-subtle bg-surface-raised">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-10">How DevAtlas Works</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <FeatureStep
              step="01"
              title="Pick a Language"
              description="Choose from our growing catalog of programming languages, each with a structured curriculum."
            />
            <FeatureStep
              step="02"
              title="Follow the Roadmap"
              description="Progress through Beginner → Intermediate → Advanced → Expert levels at your own pace."
            />
            <FeatureStep
              step="03"
              title="Master Every Concept"
              description="Each topic covers modern, up-to-date features so you learn what the industry actually uses."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-2xl sm:text-3xl font-bold text-text-primary">{value}</p>
      <p className="mt-1 text-xs sm:text-sm text-text-muted">{label}</p>
    </div>
  );
}

function FeatureStep({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <span className="font-mono text-sm font-medium text-accent">{step}</span>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
