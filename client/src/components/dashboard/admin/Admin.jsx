import React from 'react';
import SidebarCardAdmin from './SidebarCardAdmin';
import Card from './Card';
import BarGraph from './BarGraph';
import  PieChartCard from './PieChartCard';


function Admin() {
  return (
    <div className="flex h-screen w-full bg-gray-100 mt-10">
      {/* Sidebar on the left */}
      <aside className="w-64 bg-[#1e293b] text-white hidden md:block">
        <SidebarCardAdmin />
      </aside>

      {/* Main content on the right */}
      <main className="flex-1 flex flex-col p-4 overflow-auto space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">🔔 Notifications</div>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg">👤</div>
          </div>
        </header>

        {/* Cards / Stats */}
        <section className="flex flex-wrap gap-4">
          <Card />
          <Card />
          <Card />
        </section>
        <div>
          <div>
            <BarGraph/>
          </div>
          <div><PieChartCard/></div>
        </div>
      </main>
    </div>
  );
}

export default Admin;
