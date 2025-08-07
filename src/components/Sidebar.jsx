import React from "react";
import { Upload, AlertTriangle, Download } from "lucide-react";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: "upload", label: "File Upload", icon: Upload },
    { id: "crash", label: "Crash Reports", icon: AlertTriangle },
    { id: "download", label: "Download Center", icon: Download },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      <nav className="mt-6">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 border-r-4 border-blue-600 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
