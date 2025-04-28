import { useState } from "react";

export default function EmailCampaignsTable({
  campaigns,
  onViewCampaign,
  onEditCampaign,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-[#3D0C11]">
        Active Email Campaigns
      </h2>

      {/* Desktop table - hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F9DEC9]">
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Campaign Name
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Status
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Sent
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Open Rate
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Click Rate
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Conversions
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.values(campaigns).map((campaign) => (
              <tr key={campaign.id} className="border-b border-[#F9DEC9]">
                <td className="p-4">{campaign.name}</td>
                <td className="p-4">
                  <span className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        campaign.status === "Active"
                          ? "bg-[#D80032]"
                          : "bg-[#F78CA2]"
                      }`}
                    ></span>
                    <span
                      className={
                        campaign.status === "Active"
                          ? "text-[#D80032]"
                          : "text-[#F78CA2]"
                      }
                    >
                      {campaign.status}
                    </span>
                  </span>
                </td>
                <td className="p-4">{campaign.sent}</td>
                <td className="p-4">{campaign.openRate}</td>
                <td className="p-4">{campaign.clickRate}</td>
                <td className="p-4">{campaign.conversions}</td>
                <td className="p-4">
                  <button
                    className="text-[#D80032] hover:text-[#3D0C11] mr-2"
                    data-campaign-id={campaign.id}
                    data-action="view"
                    id={`view-campaign-${campaign.id}`}
                    onClick={() => onViewCampaign(campaign.id)}
                  >
                    View
                  </button>
                  <button
                    className="text-[#D80032] hover:text-[#3D0C11]"
                    data-campaign-id={campaign.id}
                    data-action="edit"
                    id={`edit-campaign-${campaign.id}`}
                    onClick={() => onEditCampaign(campaign.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {Object.values(campaigns).map((campaign) => (
          <div
            key={campaign.id}
            className="bg-[#F9DEC9] rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-[#3D0C11]">{campaign.name}</h3>
              <span className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    campaign.status === "Active"
                      ? "bg-[#D80032]"
                      : "bg-[#F78CA2]"
                  }`}
                ></span>
                <span
                  className={
                    campaign.status === "Active"
                      ? "text-[#D80032]"
                      : "text-[#F78CA2]"
                  }
                >
                  {campaign.status}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <p className="text-[#3D0C11]">Sent</p>
                <p>{campaign.sent}</p>
              </div>
              <div>
                <p className="text-[#3D0C11]">Open Rate</p>
                <p>{campaign.openRate}</p>
              </div>
              <div>
                <p className="text-[#3D0C11]">Click Rate</p>
                <p>{campaign.clickRate}</p>
              </div>
              <div>
                <p className="text-[#3D0C11]">Conversions</p>
                <p>{campaign.conversions}</p>
              </div>
            </div>

            <div className="flex space-x-3 border-t border-[#F78CA2] pt-3">
              <button
                className="text-[#D80032] hover:text-[#3D0C11] text-sm"
                data-campaign-id={campaign.id}
                data-action="view"
                id={`view-campaign-mobile-${campaign.id}`}
                onClick={() => onViewCampaign(campaign.id)}
              >
                View
              </button>
              <button
                className="text-[#D80032] hover:text-[#3D0C11] text-sm"
                data-campaign-id={campaign.id}
                data-action="edit"
                id={`edit-campaign-mobile-${campaign.id}`}
                onClick={() => onEditCampaign(campaign.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
