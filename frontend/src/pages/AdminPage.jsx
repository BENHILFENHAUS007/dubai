export default function AdminPage() {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="card p-4">
        <h2 className="font-semibold mb-2">IAM-style Controls</h2>
        <div className="space-y-2">
          <label className="flex justify-between">Server Enabled <input type="checkbox" defaultChecked /></label>
          <label className="flex justify-between">Patch Automation Enabled <input type="checkbox" defaultChecked /></label>
          <label className="flex justify-between">User Management Allowed <input type="checkbox" defaultChecked /></label>
        </div>
      </div>
      <div className="card p-4">
        <h2 className="font-semibold mb-2">Manual Server Metadata</h2>
        <input className="w-full mb-2 p-2 rounded bg-slate-800" placeholder="Hostname" />
        <input className="w-full mb-2 p-2 rounded bg-slate-800" placeholder="IP Address" />
        <input className="w-full mb-2 p-2 rounded bg-slate-800" placeholder="Cluster" />
        <button className="px-3 py-2 rounded bg-indigo-500">Push Manual Update</button>
      </div>
    </div>
  );
}
