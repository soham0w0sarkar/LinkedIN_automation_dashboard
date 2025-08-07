import React from "react";
import TabManager from "../components/TabManager";
import CampaignDashboard from "../components/CampaignDashboard";
import CampaignSetup from "../components/CampaignSetup";
import EmptyState from "../components/EmptyState";
import { useCampaigns } from "../hooks/useCampaigns";

const AdminDashboard = () => {
  const {
    campaigns,
    activeTab,
    showSetup,
    pendingCampaign,
    addCampaign,
    completeSetup,
    removeCampaign,
    setActiveTabIndex,
    cancelSetup,
  } = useCampaigns();

  if (campaigns.length === 0 && !showSetup) {
    return <EmptyState onAddCampaign={addCampaign} />;
  }

  if (showSetup && pendingCampaign) {
    return (
      <CampaignSetup
        campaignName={pendingCampaign.name}
        onComplete={completeSetup}
        onCancel={cancelSetup}
      />
    );
  }

  return (
    <div className="h-screen bg-gray-50">
      <TabManager
        activeTab={activeTab}
        onTabChange={setActiveTabIndex}
        onAddTab={addCampaign}
        onRemoveTab={removeCampaign}
      >
        {campaigns.map((campaign) => (
          <CampaignDashboard key={campaign.id} campaign={campaign} />
        ))}
      </TabManager>
    </div>
  );
};

export default AdminDashboard;
