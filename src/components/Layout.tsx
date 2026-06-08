import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white font-bold text-sm transition-transform group-hover:scale-105">
              DA
            </div>
            <div>
              <span className="text-lg font-semibold tracking-tight">DevAtlas</span>
              <span className="hidden sm:inline text-text-muted text-sm ml-2">Learn to Code</span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {!isHome && (
              <Link
                to="/"
                className="rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-overlay hover:text-text-primary"
              >
                All Languages
              </Link>
            )}
            <a
              href="https://github.com/Sudheerchandra5/DevAtlas"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-overlay hover:text-text-primary"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border-subtle bg-surface-raised">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              DevAtlas — Your roadmap from beginner to expert
            </p>
            <p className="text-xs text-text-muted">
              More languages coming soon
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
