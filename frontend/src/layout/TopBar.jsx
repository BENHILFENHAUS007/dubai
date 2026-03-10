import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="h-16 px-4 md:px-6 border-b border-slate-700/40 flex items-center justify-between bg-slate-900/80 backdrop-blur sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <img src="/assets/logo/cbd-logo.svg" className="h-9 w-9 rounded" alt="CBD logo" />
        <div>
          <p className="font-bold tracking-wide">CBD SERVER INVENTORY</p>
          <p className="text-xs text-slate-400">Azure-style DevOps Operations Portal</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-2 rounded-lg bg-cyan-500 text-slate-900 font-semibold">Sync Inventory Now</motion.button>
        <button className="px-3 py-2 rounded-lg border border-slate-600" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
      </div>
    </div>
  );
}
