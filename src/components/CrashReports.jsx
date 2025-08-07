import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
} from "lucide-react";

const CrashReports = ({ crashReports, onUpdateStatus, onDeleteReport }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "investigating":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "pending":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {crashReports.map((report) => (
        <div key={report.id} className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold">{report.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                      report.severity
                    )}`}
                  >
                    {report.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{report.description}</p>
                <p className="text-sm text-gray-500">
                  Reported on {report.date}
                </p>
              </div>
              <button
                onClick={() => onDeleteReport(report.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(report.status)}
                <span className="text-sm font-medium capitalize">
                  {report.status}
                </span>
              </div>

              <div className="flex space-x-2">
                <select
                  value={report.status}
                  onChange={(e) => onUpdateStatus(report.id, e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrashReports;
