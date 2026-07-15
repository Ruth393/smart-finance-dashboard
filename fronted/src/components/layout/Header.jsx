import { Link, NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-emerald-600 text-white'
      : 'text-slate-300 hover:bg-slate-800 hover:text-white',
  ].join(' ');

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
            SF
          </span>
          <span className="text-lg font-semibold text-white">
            Smart Finance
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
