import { useMemo, useState } from 'react';
import { servers } from '../data/mockData';
import { exportCsv } from '../utils/csv';

const pageSize = 10;

export default function InventoryPage() {
  const [q, setQ] = useState('');
  const [os, setOs] = useState('all');
  const [cluster, setCluster] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => servers.filter((s) =>
    (s.hostname.toLowerCase().includes(q.toLowerCase()) || s.ip.includes(q)) &&
    (os === 'all' || s.os === os) && (cluster === 'all' || s.cluster === cluster)
  ), [q, os, cluster]);

  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <div className="card p-4">
      <div className="grid md:grid-cols-4 gap-2 mb-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search hostname or IP" className="px-3 py-2 rounded-lg bg-slate-800" />
        <select value={os} onChange={(e) => setOs(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-800"><option value="all">All OS</option><option>RHEL 9.6</option><option>Ubuntu 22.04</option><option>SLES 15</option></select>
        <select value={cluster} onChange={(e) => setCluster(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-800"><option value="all">All Clusters</option><option>CBD-PRD-A</option><option>CBD-PRD-B</option><option>CBD-DR</option></select>
        <button onClick={() => exportCsv(filtered)} className="rounded-lg bg-cyan-500 text-slate-900 font-semibold">Export CSV</button>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b border-slate-700"><th>Hostname</th><th>IP Address</th><th>Operating System</th><th>CPU</th><th>Memory</th><th>Cluster</th><th>Patch Status</th><th>Last Reboot Time</th></tr></thead>
          <tbody>{pageRows.map((s) => <tr key={s.id} className="border-b border-slate-800"><td>{s.hostname}</td><td>{s.ip}</td><td>{s.os}</td><td>{s.cpu}</td><td>{s.memory} GB</td><td>{s.cluster}</td><td>{s.patch}</td><td>{s.reboot}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded border">Prev</button>
        <span className="px-2">{page}/{pages}</span>
        <button onClick={() => setPage((p) => Math.min(pages, p + 1))} className="px-3 py-1 rounded border">Next</button>
      </div>
    </div>
  );
}
