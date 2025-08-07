import React from "react";
import FileDropZone from "./FileDropZone";
import UploadedFilesList from "./UploadedFilesList";

const FileUpload = ({
  uploadedFiles,
  onFileUpload,
  onRemoveFile,
  onBotListUpload,
  onTargetListUpload,
}) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FileDropZone
          title="Target links"
          section="data"
          acceptedTypes=".csv,.xlsx,.xls,.txt"
          onFileUpload={onTargetListUpload}
          onFileSelect={onFileUpload}
        />
        <FileDropZone
          title="Bot links"
          section="bot"
          acceptedTypes=".csv, .xlsx,.xls,.txt"
          onFileUpload={onBotListUpload}
          onFileSelect={onFileUpload}
        />
      </div>

      <UploadedFilesList
        uploadedFiles={uploadedFiles}
        onRemoveFile={onRemoveFile}
      />
    </div>
  );
};

export default FileUpload;
