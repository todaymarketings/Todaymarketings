import { useState } from "react";
import EmailCampaignsTable from "../email/EmailCampaignsTable";
import StatCard from "../email/StatCard";
import SubscribersTable from "../email/SubscribersTable";
import CampaignModal from "../email/CampaignModal";
import SubscriberModal from "../email/SubscriberModal";

export default function EmailMarketingDashboard() {
  // Campaign data
  const [campaigns] = useState({
    1: {
      id: "1",
      name: "Monthly Newsletter",
      status: "Active",
      sent: "8,452",
      openRate: "24.6%",
      clickRate: "3.8%",
      conversions: "127",
      subject: "Monthly Newsletter - April 2025",
      content: "Hi [FIRST_NAME],\n\nHere's what's new this month...",
      audience: "All Subscribers",
      scheduledDate: "April 10, 2025",
    },
    2: {
      id: "2",
      name: "Spring Sale Promotion",
      status: "Active",
      sent: "5,218",
      openRate: "32.1%",
      clickRate: "7.2%",
      conversions: "243",
      subject: "Spring SALE - 30% Off Everything!",
      content: "Hi [FIRST_NAME],\n\nDon't miss our biggest spring sale ever...",
      audience: "Engaged Customers",
      scheduledDate: "April 5, 2025",
    },
    3: {
      id: "3",
      name: "Product Launch",
      status: "Scheduled",
      sent: "0",
      openRate: "-",
      clickRate: "-",
      conversions: "-",
      subject: "Introducing our NEW Product Line",
      content:
        "Hi [FIRST_NAME],\n\nWe're excited to announce our latest innovation...",
      audience: "All Subscribers",
      scheduledDate: "April 25, 2025",
    },
    4: {
      id: "4",
      name: "Welcome Series",
      status: "Active",
      sent: "3,127",
      openRate: "42.8%",
      clickRate: "12.3%",
      conversions: "186",
      subject: "Welcome to Our Community!",
      content: "Hi [FIRST_NAME],\n\nThank you for joining us...",
      audience: "New Subscribers",
      scheduledDate: "Automated",
    },
  });

  // Subscriber data
  const [subscribers] = useState({
    1: {
      id: "1",
      email: "sarahjohnson@example.com",
      firstName: "Sarah",
      lastName: "Johnson",
      dateSubscribed: "Apr 17, 2025",
      source: "Website Form",
      status: "Active",
      tags: ["New Customer", "Newsletter"],
      campaigns: ["Monthly Newsletter"],
    },
    2: {
      id: "2",
      email: "michaelsmith@example.com",
      firstName: "Michael",
      lastName: "Smith",
      dateSubscribed: "Apr 16, 2025",
      source: "Landing Page",
      status: "Active",
      tags: ["Lead", "Webinar Attendee"],
      campaigns: ["Spring Sale Promotion"],
    },
    3: {
      id: "3",
      email: "davidwilliams@example.com",
      firstName: "David",
      lastName: "Williams",
      dateSubscribed: "Apr 16, 2025",
      source: "Social Media",
      status: "Active",
      tags: ["Lead", "Social Media"],
      campaigns: ["Monthly Newsletter", "Spring Sale Promotion"],
    },
    4: {
      id: "4",
      email: "laurabrown@example.com",
      firstName: "Laura",
      lastName: "Brown",
      dateSubscribed: "Apr 15, 2025",
      source: "Import",
      status: "Pending",
      tags: ["Imported"],
      campaigns: [],
    },
  });

  // Modal states
  const [isCampaignModalVisible, setIsCampaignModalVisible] = useState(false);
  const [isSubscriberModalVisible, setIsSubscriberModalVisible] =
    useState(false);
  const [currentCampaignId, setCurrentCampaignId] = useState(null);
  const [currentSubscriberId, setCurrentSubscriberId] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);

  // Modal handlers
  const handleViewCampaign = (campaignId) => {
    setCurrentCampaignId(campaignId);
    setCurrentAction("view");
    setIsCampaignModalVisible(true);
  };

  const handleEditCampaign = (campaignId) => {
    setCurrentCampaignId(campaignId);
    setCurrentAction("edit");
    setIsCampaignModalVisible(true);
  };

  const handleCreateCampaign = () => {
    setCurrentCampaignId(null);
    setCurrentAction("create");
    setIsCampaignModalVisible(true);
  };

  const handleViewSubscriber = (subscriberId) => {
    setCurrentSubscriberId(subscriberId);
    setIsSubscriberModalVisible(true);
  };

  const handleCloseCampaignModal = () => {
    setIsCampaignModalVisible(false);
  };

  const handleCloseSubscriberModal = () => {
    setIsSubscriberModalVisible(false);
  };

  const handleSaveCampaign = () => {
    if (currentAction === "edit") {
      alert(
        `Changes to "${campaigns[currentCampaignId].name}" saved successfully!`
      );
    } else if (currentAction === "create") {
      alert("New campaign created successfully!");
    }
    setIsCampaignModalVisible(false);
  };

  // Get current campaign and subscriber
  const currentCampaign = currentCampaignId
    ? campaigns[currentCampaignId]
    : null;
  const currentSubscriber = currentSubscriberId
    ? subscribers[currentSubscriberId]
    : null;

  // Generate modal title
  let modalTitle = "Campaign";
  if (currentAction === "view" && currentCampaign) {
    modalTitle = `View Campaign: ${currentCampaign.name}`;
  } else if (currentAction === "edit" && currentCampaign) {
    modalTitle = `Edit Campaign: ${currentCampaign.name}`;
  } else if (currentAction === "create") {
    modalTitle = "Create New Campaign";
  }

  return (
    <>
      <EmailCampaignsTable
        campaigns={campaigns}
        onViewCampaign={handleViewCampaign}
        onEditCampaign={handleEditCampaign}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Subscriber Growth"
          value="12,486"
          change="+2.4%"
          subtitle="Total subscribers"
          barType="chart"
        />

        <StatCard
          title="Average Open Rate"
          value="28.5%"
          change="+1.2%"
          subtitle="Industry avg: 21.3%"
          barType="progress"
          barValue={73}
          barLabel={{
            text: "Above Average",
            color: "text-blue-600 bg-blue-200",
            barColor: "bg-blue-500",
          }}
        />

        <StatCard
          title="Click-Through Rate"
          value="6.7%"
          change="-0.3%"
          subtitle="Industry avg: 6.5%"
          barType="progress"
          barValue={52}
          barLabel={{
            text: "Meets Target",
            color: "text-green-600 bg-green-200",
            barColor: "bg-green-500",
          }}
        />
      </div>

      <SubscribersTable
        subscribers={subscribers}
        onViewSubscriber={handleViewSubscriber}
      />

      <div className="flex justify-end">
        <button
          onClick={handleCreateCampaign}
          className="bg-[#D80032] text-white px-4 py-2 rounded hover:bg-maroondark transition-colors"
        >
          Create New Campaign
        </button>
      </div>

      <CampaignModal
        isVisible={isCampaignModalVisible}
        title={modalTitle}
        campaign={currentCampaign}
        isEditable={currentAction === "edit" || currentAction === "create"}
        onClose={handleCloseCampaignModal}
        onCancel={handleCloseCampaignModal}
        onSave={handleSaveCampaign}
      />

      <SubscriberModal
        isVisible={isSubscriberModalVisible}
        subscriber={currentSubscriber}
        onClose={handleCloseSubscriberModal}
      />
    </>
  );
}
