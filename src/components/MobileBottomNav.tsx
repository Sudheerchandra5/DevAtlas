import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {
    to: '/',
    label: 'Home',
    match: (path: string) => path === '/',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/learn/java',
    label: 'Java',
    match: (path: string) => path.startsWith('/learn/java'),
    icon: <span className="text-lg leading-none">☕</span>,
  },
];

export default function MobileBottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border-subtle bg-surface/95 backdrop-blur-xl sm:hidden pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-lg">
        {navItems.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 min-h-[56px] transition-colors ${
                active ? 'text-accent' : 'text-text-muted active:text-text-primary'
              }`}
            >
              {item.icon}
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
