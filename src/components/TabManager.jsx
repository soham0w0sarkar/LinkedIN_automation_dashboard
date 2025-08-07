import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import CampaignModal from "./CampaignModal";

const TabManager = ({
  children,
  activeTab,
  onTabChange,
  onAddTab,
  onRemoveTab,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddTab = (campaignName) => {
    onAddTab(campaignName);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {children.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg border-b-2 transition-colors ${
                activeTab === index
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <span className="font-medium">{tab.props.campaign.name}</span>
              {children.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTab(index);
                  }}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </button>
          ))}

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-t-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Add Campaign</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {children.length > 0 ? (
          children[activeTab]
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 mb-4">No campaigns yet</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Campaign
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Campaign Modal */}
      {showModal && (
        <CampaignModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddTab}
        />
      )}
    </div>
  );
};

export default TabManager;
