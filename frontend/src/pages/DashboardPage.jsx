import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import MetricCard from '../components/MetricCard';

const osData = [{ name: 'RHEL', value: 58 }, { name: 'Ubuntu', value: 24 }, { name: 'SLES', value: 18 }];
const compliance = [{ name: 'Compliant', value: 842 }, { name: 'Pending', value: 130 }, { name: 'Failed', value: 28 }];
const usage = [{ cluster: 'A', value: 73 }, { cluster: 'B', value: 55 }, { cluster: 'C', value: 82 }];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl p-8 bg-gradient-to-br from-cyan-700/30 to-purple-700/30 border border-cyan-500/20">
        <h2 className="text-3xl font-bold">Enterprise Infrastructure Control Center</h2>
        <p className="text-slate-300">Real-time vSphere + Ansible inventory and patch compliance.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Total Servers" value="1,000" color="text-cyan-400" />
        <MetricCard title="Patched Today" value="173" color="text-emerald-400" />
        <MetricCard title="Pending Updates" value="130" color="text-amber-400" />
        <MetricCard title="Failed Patch Jobs" value="28" color="text-rose-400" />
        <MetricCard title="Powered Off VMs" value="17" color="text-purple-400" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl p-4 bg-slate-800 h-72"><h3>OS Distribution</h3><ResponsiveContainer><PieChart><Pie data={osData} dataKey="value" nameKey="name">{osData.map((_, i) => <Cell key={i} fill={['#06b6d4','#6366f1','#14b8a6'][i]} />)}</Pie></PieChart></ResponsiveContainer></div>
        <div className="rounded-xl p-4 bg-slate-800 h-72"><h3>Patch Compliance</h3><ResponsiveContainer><BarChart data={compliance}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#22c55e" /></BarChart></ResponsiveContainer></div>
        <div className="rounded-xl p-4 bg-slate-800 h-72"><h3>Cluster Usage</h3><ResponsiveContainer><BarChart data={usage}><XAxis dataKey="cluster" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#8b5cf6" /></BarChart></ResponsiveContainer></div>
      </section>
    </div>
  );
}
