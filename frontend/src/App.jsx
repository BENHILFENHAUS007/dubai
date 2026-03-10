import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopBar from './layout/TopBar';
import Sidebar from './layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import AdminPage from './pages/AdminPage';
import { Placeholder } from './pages/Placeholders';

export default function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 p-3 md:p-5">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/virtual-machines" element={<Placeholder title="Virtual Machines" />} />
            <Route path="/patch-status" element={<Placeholder title="Patch Status" />} />
            <Route path="/snapshots" element={<Placeholder title="Snapshots" />} />
            <Route path="/reports" element={<Placeholder title="Reports" />} />
            <Route path="/administration" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
