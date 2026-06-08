import { Link, Outlet, useLocation } from 'react-router-dom';
import MobileBottomNav from './MobileBottomNav';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pb-0">
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface/95 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 group min-h-[44px]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white font-bold text-sm">
              DA
            </div>
            <span className="text-base sm:text-lg font-semibold tracking-tight">DevAtlas</span>
          </Link>

          <nav className="flex items-center gap-1">
            {!isHome && (
              <Link
                to="/"
                className="rounded-lg px-3 py-2.5 min-h-[44px] flex items-center text-sm text-text-secondary active:bg-surface-overlay sm:hover:bg-surface-overlay sm:hover:text-text-primary"
              >
                Home
              </Link>
            )}
            <Link
              to="/learn/java"
              className="rounded-lg px-3 py-2.5 min-h-[44px] flex items-center text-sm text-text-secondary active:bg-surface-overlay sm:hover:bg-surface-overlay sm:hover:text-text-primary"
            >
              Java
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border-subtle bg-surface-raised mb-[calc(4rem+env(safe-area-inset-bottom))] sm:mb-0">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
          <p className="text-center text-xs sm:text-sm text-text-muted">
            DevAtlas — Learn on any device
          </p>
        </div>
      </footer>

      <MobileBottomNav />
    </div>
  );
}
