import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  const [pendingCampaign, setPendingCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Campaigns"));
        const fetchedCampaigns = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched campaigns:", fetchedCampaigns);
        setCampaigns(fetchedCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const addCampaign = (campaignName) => {
    const newCampaign = {
      name: campaignName,
      setup: {
        type: null,
        config: {},
      },
    };
    setPendingCampaign(newCampaign);
    setShowSetup(true);
  };

  const completeSetup = async (campaignType, config) => {
    if (pendingCampaign) {
      const campaignData = {
        ...pendingCampaign,
        setup: {
          type: campaignType,
          config: config,
        },
      };

      try {
        const docRef = await addDoc(collection(db, "Campaigns"), campaignData);
        console.log("Document written with ID: ", docRef.id);
        const completedCampaign = { ...campaignData, id: docRef.id };
        setCampaigns((prev) => [...prev, completedCampaign]);
        setActiveTab(campaigns.length);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      setPendingCampaign(null);
      setShowSetup(false);
    }
  };

  const removeCampaign = (index) => {
    setCampaigns((prev) => prev.filter((_, i) => i !== index));

    if (activeTab >= campaigns.length - 1) {
      setActiveTab(Math.max(0, campaigns.length - 2));
    } else if (activeTab > index) {
      setActiveTab(activeTab - 1);
    }
  };

  const setActiveTabIndex = (index) => {
    setActiveTab(index);
  };

  const cancelSetup = () => {
    setPendingCampaign(null);
    setShowSetup(false);
  };

  return {
    campaigns,
    activeTab,
    showSetup,
    pendingCampaign,
    addCampaign,
    completeSetup,
    removeCampaign,
    setActiveTabIndex,
    cancelSetup,
  };
};
