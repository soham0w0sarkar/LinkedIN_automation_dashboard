import { useState } from "react";

export const useCrashReports = () => {
  const [crashReports, setCrashReports] = useState([
    {
      id: 1,
      title: "Application Crash - Login Module",
      severity: "high",
      date: "2025-06-23",
      status: "pending",
      description:
        "User reported crash when attempting to login with special characters",
    },
    {
      id: 2,
      title: "Memory Leak - Dashboard",
      severity: "medium",
      date: "2025-06-22",
      status: "investigating",
      description: "Gradual memory increase observed in dashboard component",
    },
    {
      id: 3,
      title: "UI Freeze - File Upload",
      severity: "low",
      date: "2025-06-21",
      status: "resolved",
      description: "Interface becomes unresponsive during large file uploads",
    },
  ]);

  const updateCrashReportStatus = (id, newStatus) => {
    setCrashReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
  };

  const deleteCrashReport = (id) => {
    setCrashReports((prev) => prev.filter((report) => report.id !== id));
  };

  return {
    crashReports,
    updateCrashReportStatus,
    deleteCrashReport,
  };
};
