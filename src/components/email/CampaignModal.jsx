export default function CampaignModal({
  isVisible,
  title,
  campaign,
  isEditable,
  onClose,
  onCancel,
  onSave,
}) {
  if (!isVisible) return null;

  const readonly = isEditable ? "" : "readonly";
  const formClass = isEditable ? "" : "pointer-events-none opacity-75";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div>
          <form className={formClass}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                readOnly={!isEditable}
                className="w-full p-2 border border-gray-300 rounded"
                defaultValue={campaign?.name || ""}
                placeholder="Enter campaign name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Line
              </label>
              <input
                type="text"
                readOnly={!isEditable}
                className="w-full p-2 border border-gray-300 rounded"
                defaultValue={campaign?.subject || ""}
                placeholder="Enter subject line"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                readOnly={!isEditable}
                className="w-full p-2 border border-gray-300 rounded h-32"
                defaultValue={campaign?.content || ""}
                placeholder="Enter email content"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audience
                </label>
                {isEditable && !campaign ? (
                  <select className="w-full p-2 border border-gray-300 rounded">
                    <option>All Subscribers</option>
                    <option>New Subscribers</option>
                    <option>Engaged Customers</option>
                    <option>Inactive Subscribers</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    readOnly={!isEditable}
                    className="w-full p-2 border border-gray-300 rounded"
                    defaultValue={campaign?.audience || ""}
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule
                </label>
                {isEditable && !campaign ? (
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                ) : (
                  <input
                    type="text"
                    readOnly={!isEditable}
                    className="w-full p-2 border border-gray-300 rounded"
                    defaultValue={campaign?.scheduledDate || ""}
                  />
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                readOnly={!isEditable}
                className="w-full p-2 border border-gray-300 rounded"
                defaultValue={campaign?.status || "Draft"}
              >
                <option>Active</option>
                <option>Scheduled</option>
                <option>Draft</option>
                <option>Paused</option>
              </select>
            </div>
          </form>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 mr-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          {isEditable && (
            <button
              onClick={onSave}
              className="px-4 py-2 bg-[#D80032] text-white rounded hover:bg-maroondark"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
