import React from "react";
import { Download, CheckCircle, Clock } from "lucide-react";

const DownloadCenter = ({ downloads }) => {
  return (
    <div className="space-y-4">
      {downloads.map((download) => (
        <div
          key={download.id}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Download className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">{download.name}</h3>
                <p className="text-sm text-gray-500">
                  {download.size} • Generated {download.date}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {download.status === "ready" ? (
                <span className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Ready
                </span>
              ) : (
                <span className="flex items-center text-yellow-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  Generating...
                </span>
              )}

              <button
                disabled={download.status !== "ready"}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  download.status === "ready"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DownloadCenter;
