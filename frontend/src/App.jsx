import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import AdminPage from './pages/AdminPage';

const Placeholder = ({ title }) => <div className="rounded-xl p-6 bg-slate-800">{title}</div>;

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="mx-auto max-w-7xl p-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/patch-status" element={<Placeholder title="Patch Status" />} />
          <Route path="/snapshots" element={<Placeholder title="Snapshots" />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
          <Route path="/administration" element={<AdminPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
