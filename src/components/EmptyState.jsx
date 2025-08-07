import React from "react";
import { Plus, Users, TrendingUp, Target } from "lucide-react";

const EmptyState = ({ onAddCampaign }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-12 h-12 text-blue-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to LinkedIn Automation
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Create your first campaign to start automating your LinkedIn outreach
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">
              Target Prospects
            </h3>
            <p className="text-sm text-gray-600">
              Find and connect with your ideal audience
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">
              Automate Outreach
            </h3>
            <p className="text-sm text-gray-600">
              Send personalized messages at scale
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Track Results</h3>
            <p className="text-sm text-gray-600">
              Monitor performance and optimize
            </p>
          </div>
        </div>

        <button
          onClick={() => onAddCampaign("My First Campaign")}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Create Your First Campaign</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
