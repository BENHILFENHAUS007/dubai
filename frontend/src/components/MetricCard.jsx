import { motion } from 'framer-motion';

export default function MetricCard({ title, value, color }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-4 bg-slate-800 shadow-xl">
      <p className="text-sm text-slate-400">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}
