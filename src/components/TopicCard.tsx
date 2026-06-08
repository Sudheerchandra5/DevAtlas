import type { Topic, DifficultyLevel } from '../types';
import { difficultyConfig } from '../types';

interface TopicCardProps {
  topic: Topic;
  index: number;
  level: DifficultyLevel;
}

export default function TopicCard({ topic, index, level }: TopicCardProps) {
  const config = difficultyConfig[level];

  return (
    <article
      className={`group relative rounded-xl border bg-surface-raised p-5 transition-all duration-200 hover:shadow-lg ${config.border} hover:border-opacity-60`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${config.bg} ${config.color}`}
        >
          {String(index).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary group-hover:text-white transition-colors">
            {topic.title}
          </h3>
          <p className="mt-1.5 text-sm text-text-secondary leading-relaxed line-clamp-3">
            {topic.description}
          </p>

          {(topic.tags || topic.javaVersion) && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {topic.javaVersion && (
                <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                  Java {topic.javaVersion}
                </span>
              )}
              {topic.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-surface-overlay px-2 py-0.5 text-[10px] text-text-muted capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
