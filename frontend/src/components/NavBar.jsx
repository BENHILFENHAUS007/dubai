import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const links = ['Dashboard', 'Inventory', 'Patch Status', 'Snapshots', 'Reports', 'Administration'];

export default function NavBar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-slate-700/30 bg-slate-900/70 p-3">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <h1 className="font-bold text-cyan-400">Infra Control Center</h1>
        <nav className="hidden md:flex gap-6 text-sm">
          {links.map((item) => <Link key={item} to={item === 'Dashboard' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}>{item}</Link>)}
        </nav>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-3 py-1 rounded bg-cyan-500 text-slate-950">{theme}</button>
      </div>
      <div className="mx-auto max-w-4xl mt-3 flex justify-center gap-2">
        {links.slice(0,5).map((item) => (
          <motion.div key={item} whileHover={{ y: -8, scale: 1.08 }} className="px-3 py-2 rounded-xl bg-slate-800/80 text-xs">
            {item}
          </motion.div>
        ))}
      </div>
    </header>
  );
}
