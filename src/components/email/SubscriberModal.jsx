export default function SubscriberModal({ isVisible, subscriber, onClose }) {
  if (!isVisible || !subscriber) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Subscriber Details</h3>
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
          {/* Subscriber details - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="break-words">{subscriber.email}</p>
            </div>
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p>
                {subscriber.firstName} {subscriber.lastName}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-500">
                Date Subscribed
              </p>
              <p>{subscriber.dateSubscribed}</p>
            </div>
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-500">Source</p>
              <p>{subscriber.source}</p>
            </div>
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p
                className={
                  subscriber.status === "Active"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {subscriber.status}
              </p>
            </div>
          </div>

          {/* Tags section */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500 mb-1">Tags</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {subscriber.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Campaigns section */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500 mb-1">Campaigns</p>
            <div className="mt-1">
              {subscriber.campaigns.length > 0 ? (
                subscriber.campaigns.map((campaign, index) => (
                  <p key={index} className="text-sm mb-1">
                    {campaign}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">No campaigns</p>
              )}
            </div>
          </div>

          {/* Activity section */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="text-md font-medium mb-2">Activity</h4>
            <div className="text-sm space-y-2">
              <div className="flex items-start">
                <span className="w-3 h-3 rounded-full bg-green-500 mt-1 mr-2 flex-shrink-0"></span>
                <span>Email opened: Monthly Newsletter (Apr 15, 2025)</span>
              </div>
              <div className="flex items-start">
                <span className="w-3 h-3 rounded-full bg-blue-500 mt-1 mr-2 flex-shrink-0"></span>
                <span>Link clicked: Product Page (Apr 15, 2025)</span>
              </div>
              <div className="flex items-start">
                <span className="w-3 h-3 rounded-full bg-gray-300 mt-1 mr-2 flex-shrink-0"></span>
                <span>
                  Email received: Spring Sale Promotion (Apr 12, 2025)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
