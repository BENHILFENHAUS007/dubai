export default function AdminPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl bg-slate-800 p-5">
        <h3 className="font-semibold mb-3">Server Controls</h3>
        <label className="flex justify-between py-2">Server Enabled <input type="checkbox" defaultChecked /></label>
        <label className="flex justify-between py-2">Patch Automation <input type="checkbox" defaultChecked /></label>
      </div>
      <div className="rounded-xl bg-slate-800 p-5">
        <h3 className="font-semibold mb-3">Manual Metadata Update</h3>
        <input className="w-full mb-2 px-3 py-2 rounded bg-slate-700" placeholder="Hostname" />
        <input className="w-full mb-2 px-3 py-2 rounded bg-slate-700" placeholder="IP" />
        <button className="px-4 py-2 rounded bg-purple-500">Push Update</button>
      </div>
    </div>
  );
}
