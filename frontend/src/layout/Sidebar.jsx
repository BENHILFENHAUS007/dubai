import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  ['/', 'Dashboard'],
  ['/inventory', 'Inventory'],
  ['/virtual-machines', 'Virtual Machines'],
  ['/patch-status', 'Patch Status'],
  ['/snapshots', 'Snapshots'],
  ['/reports', 'Reports'],
  ['/administration', 'Administration']
];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 border-r border-slate-700/40 md:min-h-[calc(100vh-4rem)] p-3 md:p-4">
      {links.map(([href, label]) => (
        <NavLink key={href} to={href} className={({ isActive }) => `block mb-2 px-4 py-3 rounded-xl transition ${isActive ? 'bg-cyan-500 text-slate-900 font-semibold' : 'hover:bg-slate-800/70'}`}>
          {label}
        </NavLink>
      ))}
      <div className="hidden md:flex justify-center gap-2 mt-8">
        {links.slice(0, 5).map(([, label]) => <motion.div whileHover={{ y: -8 }} key={label} className="text-xs p-2 bg-slate-800 rounded-xl">{label.split(' ')[0]}</motion.div>)}
      </div>
    </aside>
  );
}
