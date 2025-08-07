import React from "react";
import { FileText, X } from "lucide-react";

const UploadedFilesList = ({ uploadedFiles, onRemoveFile }) => {
  if (uploadedFiles.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Uploaded Files</h3>
      </div>
      <div className="divide-y">
        {uploadedFiles.map((file) => (
          <div key={file.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {file.size} • {file.uploadDate} • {file.section}
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemoveFile(file.id)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedFilesList;
