import { useState } from "react";

export const useDownloads = () => {
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      name: "User Data Export.csv",
      size: "2.3 MB",
      date: "2025-06-23",
      status: "ready",
    },
    {
      id: 2,
      name: "System Logs.txt",
      size: "15.7 MB",
      date: "2025-06-22",
      status: "generating",
    },
    {
      id: 3,
      name: "Analytics Report.xlsx",
      size: "5.1 MB",
      date: "2025-06-21",
      status: "ready",
    },
  ]);

  return {
    downloads,
  };
};
