import React from "react";
import { Upload } from "lucide-react";

const FileDropZone = ({
  title,
  section,
  acceptedTypes,
  onFileUpload,
  onFileSelect,
}) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">
        Drag and drop files here or click to browse
      </p>
      <p className="text-sm text-gray-500 mb-4">Accepts: {acceptedTypes}</p>
      <input
        type="file"
        multiple
        accept={acceptedTypes}
        onChange={(e) => {
          if (onFileSelect) onFileSelect(e.target.files, section);
          if (onFileUpload) onFileUpload(e.target.files);
        }}
        className="hidden"
        id={`file-${section}`}
      />
      <label
        htmlFor={`file-${section}`}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
      >
        Choose Files
      </label>
    </div>
  );
};

export default FileDropZone;
