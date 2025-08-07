export const getSectionTitle = (activeSection) => {
  switch (activeSection) {
    case "upload":
      return "File Upload";
    case "crash":
      return "Crash Reports";
    case "download":
      return "Download Center";
    default:
      return "";
  }
};

export const getSectionDescription = (activeSection) => {
  switch (activeSection) {
    case "upload":
      return "Upload and manage your files";
    case "crash":
      return "Monitor and resolve system issues";
    case "download":
      return "Access generated reports and exports";
    default:
      return "";
  }
};
