import { motion } from 'framer-motion';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AnimatedCounter from '../components/AnimatedCounter';

const cards = [
  ['Total Servers', 1000],
  ['Servers Patched Today', 173],
  ['Pending Updates', 130],
  ['Failed Patch Jobs', 28],
  ['Powered Off VMs', 17]
];
const os = [{ name: 'RHEL', value: 550 }, { name: 'Ubuntu', value: 280 }, { name: 'SLES', value: 170 }];
const compliance = [{ name: 'Patched', value: 842 }, { name: 'Pending', value: 130 }, { name: 'Failed', value: 28 }];
const clusters = [{ cluster: 'CBD-PRD-A', value: 78 }, { cluster: 'CBD-PRD-B', value: 66 }, { cluster: 'CBD-DR', value: 41 }];
const vmPower = [{ name: 'On', value: 131 }, { name: 'Off', value: 17 }];

export default function DashboardPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <section className="card p-6 bg-gradient-to-br from-cyan-700/30 to-indigo-700/30">
        <h1 className="text-2xl md:text-3xl font-bold">Infrastructure Overview</h1>
        <p className="text-slate-300">Real-time Linux and VMware visibility with Ansible-driven updates.</p>
      </section>

      <section className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3">
        {cards.map(([label, value]) => (
          <motion.div whileHover={{ y: -4 }} className="card p-4" key={label}>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="text-2xl font-bold text-cyan-400"><AnimatedCounter value={value} /></p>
          </motion.div>
        ))}
      </section>

      <section className="grid xl:grid-cols-2 gap-4">
        <div className="card p-4 h-72"><h3 className="mb-2">OS Distribution</h3><ResponsiveContainer><PieChart><Pie data={os} dataKey="value" nameKey="name">{os.map((_, i) => <Cell key={i} fill={['#06b6d4', '#8b5cf6', '#22c55e'][i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
        <div className="card p-4 h-72"><h3 className="mb-2">Patch Compliance</h3><ResponsiveContainer><BarChart data={compliance}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#3b82f6" /></BarChart></ResponsiveContainer></div>
        <div className="card p-4 h-72"><h3 className="mb-2">Cluster Usage %</h3><ResponsiveContainer><BarChart data={clusters}><XAxis dataKey="cluster" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#0ea5e9" /></BarChart></ResponsiveContainer></div>
        <div className="card p-4 h-72"><h3 className="mb-2">VM Power States</h3><ResponsiveContainer><PieChart><Pie data={vmPower} dataKey="value" nameKey="name"><Cell fill="#22c55e" /><Cell fill="#ef4444" /></Pie><Tooltip /></PieChart></ResponsiveContainer></div>
      </section>
    </motion.div>
  );
}
