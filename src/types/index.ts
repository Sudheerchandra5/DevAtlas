export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Topic {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  javaVersion?: string;
}

export interface TopicSection {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Language {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  currentVersion: string;
  available: boolean;
  sections: TopicSection[];
}

export const difficultyConfig: Record<
  DifficultyLevel,
  { label: string; color: string; bg: string; border: string; description: string }
> = {
  beginner: {
    label: 'Beginner',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    description: 'Foundations — start here with zero prior experience',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    description: 'Core concepts — build real-world applications',
  },
  advanced: {
    label: 'Advanced',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    description: 'Modern features — master the Java ecosystem',
  },
  expert: {
    label: 'Expert',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    description: 'Deep mastery — JVM internals, architecture & performance',
  },
};

export const difficultyOrder: DifficultyLevel[] = [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
];
