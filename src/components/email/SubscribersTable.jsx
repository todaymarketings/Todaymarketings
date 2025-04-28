export default function SubscribersTable({ subscribers, onViewSubscriber }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-[#3D0C11]">
        Recent Subscribers
      </h2>

      {/* Desktop table - hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F9DEC9]">
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Email
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Subscribed Date
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Source
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Status
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#3D0C11]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.values(subscribers).map((subscriber) => (
              <tr key={subscriber.id} className="border-b border-[#F9DEC9]">
                <td className="p-4">{subscriber.email}</td>
                <td className="p-4">{subscriber.dateSubscribed}</td>
                <td className="p-4">{subscriber.source}</td>
                <td className="p-4">
                  <span
                    className={
                      subscriber.status === "Active"
                        ? "text-[#D80032]"
                        : "text-[#F78CA2]"
                    }
                  >
                    {subscriber.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    className="text-[#D80032] hover:text-[#3D0C11]"
                    data-subscriber-id={subscriber.id}
                    id={`view-subscriber-${subscriber.id}`}
                    onClick={() => onViewSubscriber(subscriber.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {Object.values(subscribers).map((subscriber) => (
          <div
            key={subscriber.id}
            className="bg-[#F9DEC9] rounded-lg p-4 shadow-sm"
          >
            <div className="mb-3">
              <p className="text-sm font-medium text-[#3D0C11]">Email</p>
              <p className="break-words">{subscriber.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <p className="text-sm font-medium text-[#3D0C11]">
                  Subscribed Date
                </p>
                <p>{subscriber.dateSubscribed}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#3D0C11]">Source</p>
                <p>{subscriber.source}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium text-[#3D0C11]">Status</p>
              <p
                className={
                  subscriber.status === "Active"
                    ? "text-[#D80032]"
                    : "text-[#F78CA2]"
                }
              >
                {subscriber.status}
              </p>
            </div>

            <div className="border-t border-[#F78CA2] pt-3 mt-3">
              <button
                className="text-[#D80032] hover:text-[#3D0C11]"
                data-subscriber-id={subscriber.id}
                id={`view-subscriber-mobile-${subscriber.id}`}
                onClick={() => onViewSubscriber(subscriber.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
