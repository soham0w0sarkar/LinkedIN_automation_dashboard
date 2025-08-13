import React, { useState } from "react";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import {
  Sidebar,
  FileUpload,
  CrashReports,
  DownloadCenter,
  AssignTargetsModal,
} from "./index";
import { useFileUpload, useCrashReports, useDownloads } from "../hooks";
import {
  getSectionTitle,
  getSectionDescription,
} from "../utils/sectionHelpers";

const CampaignDashboard = ({ campaign }) => {
  const [activeSection, setActiveSection] = useState("upload");
  const [botList, setBotList] = useState([]);
  const [targetList, setTargetList] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const {
    uploadedFiles,
    handleFileUpload,
    handleTargetListUpload,
    handleBotListUpload,
    removeFile,
  } = useFileUpload();

  const { crashReports, updateCrashReportStatus, deleteCrashReport } =
    useCrashReports();
  const { downloads } = useDownloads();


  const handleAssignmentSave = async (assignments) => {
    try {
      for (const [botId, targetIndices] of Object.entries(assignments)) {
        await updateDoc(
          doc(db, "Campaigns", campaign.id, "bot_accounts", botId),
          {
            Profiles: targetIndices.map((i) => ({
              name: targetList[i].name,
              email: targetList[i].email,
              link: targetList[i].link,
              headline: targetList[i].headline,
            })),
          }
        );
      }

      setTargetList((prev) =>
        prev.filter((_, i) => !Object.values(assignments).flat().includes(i))
      );

      await updateDoc(
        doc(db, "Campaigns", campaign.id, "target_list", "setDocumentId"),
        {
          links: targetList.filter(
            (_, i) => !Object.values(assignments).flat().includes(i)
          ),
          process: true,
        }
      );
    } catch (error) {
      console.error("Error updating assignments:", error);
    } finally {
      setShowAssignModal(false);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "upload":
        return (
          <FileUpload
            uploadedFiles={uploadedFiles}
            onFileUpload={handleFileUpload}
            onRemoveFile={removeFile}
            onTargetListUpload={async (files) => {
              const targetList = await handleTargetListUpload(
                files,
                campaign.id
              );
              setTargetList(targetList);
            }}
            onBotListUpload={async (files) => {
              const bots = await handleBotListUpload(files, campaign.id);
              setBotList(bots);
              setShowAssignModal(true);
            }}
          />
        );
      case "crash":
        return (
          <CrashReports
            crashReports={crashReports}
            onUpdateStatus={updateCrashReportStatus}
            onDeleteReport={deleteCrashReport}
          />
        );
      case "download":
        return <DownloadCenter downloads={downloads} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Assign Targets Modal */}
      {showAssignModal && (
        <AssignTargetsModal
          bots={botList}
          targetLinks={targetList}
          onClose={() => setShowAssignModal(false)}
          handleSave={handleAssignmentSave}
        />
      )}
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {getSectionTitle(activeSection)}
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {campaign.name}
              </span>
              {campaign.setup?.type && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {campaign.setup?.type
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              )}
            </div>
            <p className="text-gray-600">
              {getSectionDescription(activeSection)}
            </p>
          </div>

          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default CampaignDashboard;
