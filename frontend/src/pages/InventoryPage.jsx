const columns = ['Hostname', 'IP Address', 'Operating System', 'CPU', 'Memory', 'Cluster', 'Patch Status', 'Power State', 'Last Patch Date'];

export default function InventoryPage() {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <div className="flex flex-wrap gap-3 mb-4">
        <input className="px-3 py-2 rounded bg-slate-700" placeholder="Search hostname or IP" />
        <select className="px-3 py-2 rounded bg-slate-700"><option>All OS</option></select>
        <select className="px-3 py-2 rounded bg-slate-700"><option>All Clusters</option></select>
        <button className="ml-auto px-3 py-2 rounded bg-cyan-500 text-slate-900">Export CSV</button>
      </div>
      <div className="overflow-auto"><table className="w-full text-sm"><thead><tr>{columns.map(c=><th key={c} className="text-left p-2">{c}</th>)}</tr></thead><tbody><tr><td className="p-2" colSpan="9">React Table data grid placeholder with pagination + sorting hooks.</td></tr></tbody></table></div>
    </div>
  );
}
