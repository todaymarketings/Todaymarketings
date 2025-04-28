import { useState, useEffect } from "react";

export default function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: true,
    instagram: false,
    twitter: false,
    linkedin: false,
  });
  const [scheduledTime, setScheduledTime] = useState("");
  const [suggestedTime, setSuggestedTime] = useState("");
  const [suggestedHashtags, setSuggestedHashtags] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: compose, 2: schedule, 3: platforms
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [suggestedFormattedTime, setSuggestedFormattedTime] = useState("");

  // Initialize with current date/time + 1 hour and set suggested time
  useEffect(() => {
    // Set initial scheduled time (current time + 1 hour)
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    const formattedDateTime = now.toISOString().slice(0, 16);
    setScheduledTime(formattedDateTime);

    // Set suggested optimal time as tomorrow at 2PM (exactly 14:00)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);

    // Create ISO string but ensure time is exactly 14:00 (2PM)
    // First create date part in YYYY-MM-DD format
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    // Create time part with fixed 14:00 (2PM)
    const formattedSuggestedTime = `${year}-${month}-${day}T14:00`;
    setSuggestedTime(formattedSuggestedTime);

    // Format for display in the UI
    const displayDay = tomorrow.toLocaleString("en-US", { weekday: "long" });
    setSuggestedFormattedTime(`${displayDay} at 2:00 PM`);

    // Listen for open modal events
    document.addEventListener("openCreatePostModal", handleOpenModal);

    return () => {
      document.removeEventListener("openCreatePostModal", handleOpenModal);
    };
  }, []);

  // Handle opening modal from external components
  const handleOpenModal = (event) => {
    setIsOpen(true);
    setCurrentStep(1); // Always start at compose step
    setShowSuccessMessage(false);

    // If coming from AI suggestions, pre-populate with that suggestion
    if (event.detail?.source === "aiSuggestion" && event.detail?.suggestion) {
      setAiSuggestion(event.detail.suggestion);
      if (event.detail.suggestion.type === "Content Idea") {
        setPostContent(
          `${event.detail.suggestion.title}\n\n#trending #industry`
        );
      } else if (event.detail.suggestion.type === "Engagement Boost") {
        setPostContent(
          "🗳️ Poll: What's the most important social media metric for your business?\n- Engagement\n- Reach\n- Conversions\n- Brand Awareness\n\nShare your thoughts below!"
        );
      }

      // Set optimal time if that was the suggestion
      if (event.detail.suggestion.type === "Optimal Time") {
        setScheduledTime(suggestedTime);
      }
    }
  };

  // Generate hashtag suggestions based on post content
  useEffect(() => {
    if (postContent.length > 1) {
      // This would connect to an AI service in a real app
      const generateHashtags = () => {
        const content = postContent.toLowerCase();
        const hashtags = [];

        if (content.includes("trend") || content.includes("industry")) {
          hashtags.push("#trending", "#industryinsights");
        }

        if (content.includes("audience") || content.includes("engagement")) {
          hashtags.push("#engagement", "#socialstrategy");
        }

        if (content.includes("poll")) {
          hashtags.push("#feedback", "#customerinsights");
        }

        // Always add these general ones if we don't have enough
        if (hashtags.length < 3) {
          hashtags.push("#socialmedia", "#digitalmarketing");
        }

        return hashtags.slice(0, 5); // Limit to 5 hashtags
      };

      setSuggestedHashtags(generateHashtags());
    }
  }, [postContent]);

  // Handle platform toggle
  const togglePlatform = (platform) => {
    setSelectedPlatforms({
      ...selectedPlatforms,
      [platform]: !selectedPlatforms[platform],
    });
  };

  // Add a hashtag to the post content
  const addHashtag = (hashtag) => {
    setPostContent(postContent + " " + hashtag);
  };

  // Use the suggested optimal time - ensure we use the exact same datetime string
  const useOptimalTime = () => {
    setScheduledTime(suggestedTime);
    console.log("Setting scheduled time to:", suggestedTime);
  };

  // Navigate to next step
  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // If we're at the last step, finish the process
      finishPostCreation();
    }
  };

  // Navigate to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Display success message
  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
  };

  // Handle final submission
  const finishPostCreation = () => {
    // In a real application, this would connect to your backend
    console.log("Submitting post:", {
      content: postContent,
      platforms: selectedPlatforms,
      scheduledTime: scheduledTime,
    });

    // Generate success message
    const platformCount =
      Object.values(selectedPlatforms).filter(Boolean).length;
    const platformText = platformCount === 1 ? "platform" : "platforms";

    // Parse the scheduled date for display
    const scheduledDate = new Date(scheduledTime);

    const formattedDate = scheduledDate.toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const message = `Post successfully scheduled for ${formattedDate} on ${platformCount} ${platformText}!`;
    displaySuccessMessage(message);

    // Show success message for 3 seconds, then reset and close
    setTimeout(() => {
      setIsOpen(false);
      setShowSuccessMessage(false);
      setPostContent("");
      setSelectedPlatforms({
        facebook: true,
        instagram: false,
        twitter: false,
        linkedin: false,
      });
      setCurrentStep(1); // Reset to first step
    }, 3000);
  };

  // Get the text for the Next button based on current step
  const getNextButtonText = () => {
    if (currentStep === 1) return "Next: Schedule";
    if (currentStep === 2) return "Next: Platforms";
    return "Finish";
  };

  // Check if current step is valid to proceed
  const isCurrentStepValid = () => {
    if (currentStep === 1) return postContent.trim().length > 0;
    if (currentStep === 2) return scheduledTime !== "";
    if (currentStep === 3)
      return Object.values(selectedPlatforms).some(Boolean);
    return false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="absolute top-4 right-4 left-4 z-10">
            <div className="bg-[#F9DEC9] border border-[#D80032] text-[#3D0C11] px-4 py-3 rounded shadow-md flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#D80032]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="border-b border-[#F78CA2] border-opacity-30 p-4 flex justify-between items-center bg-[#F9DEC9] rounded-t-lg">
          <h2 className="text-lg font-semibold text-[#3D0C11]">
            Create New Post{" "}
            {!showSuccessMessage && `(Step ${currentStep} of 3)`}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#3D0C11] hover:text-[#D80032]"
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {!showSuccessMessage && (
          <div className="bg-[#F9DEC9] bg-opacity-30 px-6 py-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#D80032] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Step 1: Compose */}
        {currentStep === 1 && !showSuccessMessage && (
          <div className="p-6">
            <h3 className="text-[#3D0C11] font-medium mb-3">
              What would you like to share?
            </h3>

            {aiSuggestion && (
              <div className="mb-4 p-3 bg-[#F9DEC9] bg-opacity-50 rounded-md border border-[#F78CA2] border-opacity-30">
                <p className="text-sm text-[#3D0C11]">
                  <span className="font-semibold">AI Suggestion:</span>{" "}
                  {aiSuggestion.title}
                </p>
              </div>
            )}

            <textarea
              className="w-full h-40 p-4 border border-[#F78CA2] border-opacity-30 rounded-md focus:ring-[#D80032] focus:border-[#D80032] outline-none"
              placeholder="Type your post content here..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>

            {suggestedHashtags.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-[#3D0C11] mb-2">
                  Suggested Hashtags:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedHashtags.map((hashtag, index) => (
                    <button
                      key={index}
                      className="px-2 py-1 bg-[#F9DEC9] text-[#3D0C11] text-sm rounded-md hover:bg-[#F78CA2] hover:text-white transition-colors"
                      onClick={() => addHashtag(hashtag)}
                    >
                      {hashtag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Schedule */}
        {currentStep === 2 && !showSuccessMessage && (
          <div className="p-6">
            <h3 className="text-[#3D0C11] font-medium mb-3">
              When would you like to publish this post?
            </h3>

            <div className="mb-4">
              <label className="block text-[#3D0C11] font-medium mb-2">
                Schedule Post
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-[#F78CA2] border-opacity-30 rounded-md focus:ring-[#D80032] focus:border-[#D80032] outline-none"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>

            <div className="bg-[#F9DEC9] bg-opacity-40 p-4 rounded-md border border-[#F78CA2] border-opacity-30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#3D0C11]">
                    AI-Recommended Time
                  </p>
                  <p className="text-sm text-[#3D0C11] opacity-80">
                    {suggestedFormattedTime}
                  </p>
                  <p className="text-xs text-[#3D0C11] opacity-60 mt-1">
                    Your audience is most active during this time
                  </p>
                </div>
                <button
                  className="bg-[#D80032] text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition-colors"
                  onClick={useOptimalTime}
                >
                  Use This Time
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Select Platforms */}
        {currentStep === 3 && !showSuccessMessage && (
          <div className="p-6">
            <h3 className="text-[#3D0C11] font-medium mb-3">
              Where would you like to share your post?
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-md border cursor-pointer transition-all ${
                  selectedPlatforms.facebook
                    ? "border-[#D80032] bg-[#F9DEC9] bg-opacity-50"
                    : "border-[#F78CA2] border-opacity-30 hover:border-[#F78CA2]"
                }`}
                onClick={() => togglePlatform("facebook")}
              >
                <div className="flex items-center">
                  <div className="text-[#D80032] mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                    </svg>
                  </div>
                  <span className="text-[#3D0C11]">Facebook</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-md border cursor-pointer transition-all ${
                  selectedPlatforms.instagram
                    ? "border-[#D80032] bg-[#F9DEC9] bg-opacity-50"
                    : "border-[#F78CA2] border-opacity-30 hover:border-[#F78CA2]"
                }`}
                onClick={() => togglePlatform("instagram")}
              >
                <div className="flex items-center">
                  <div className="text-[#D80032] mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </div>
                  <span className="text-[#3D0C11]">Instagram</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-md border cursor-pointer transition-all ${
                  selectedPlatforms.twitter
                    ? "border-[#D80032] bg-[#F9DEC9] bg-opacity-50"
                    : "border-[#F78CA2] border-opacity-30 hover:border-[#F78CA2]"
                }`}
                onClick={() => togglePlatform("twitter")}
              >
                <div className="flex items-center">
                  <div className="text-[#D80032] mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
                  </div>
                  <span className="text-[#3D0C11]">Twitter</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-md border cursor-pointer transition-all ${
                  selectedPlatforms.linkedin
                    ? "border-[#D80032] bg-[#F9DEC9] bg-opacity-50"
                    : "border-[#F78CA2] border-opacity-30 hover:border-[#F78CA2]"
                }`}
                onClick={() => togglePlatform("linkedin")}
              >
                <div className="flex items-center">
                  <div className="text-[#D80032] mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                    </svg>
                  </div>
                  <span className="text-[#3D0C11]">LinkedIn</span>
                </div>
              </div>
            </div>

            {Object.values(selectedPlatforms).filter(Boolean).length === 0 && (
              <p className="text-[#D80032] text-sm mt-4">
                Please select at least one platform to share your post.
              </p>
            )}
          </div>
        )}

        {/* Success Message Content (when shown full screen) */}
        {showSuccessMessage && (
          <div className="p-16 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-[#F9DEC9] rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-[#D80032]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#3D0C11] mb-2">
              Success!
            </h3>
            <p className="text-[#3D0C11] text-center">{successMessage}</p>
          </div>
        )}

        {/* Modal Footer */}
        {!showSuccessMessage && (
          <div className="border-t border-[#F78CA2] border-opacity-30 p-4 flex justify-between items-center">
            <div className="flex items-center text-sm text-[#3D0C11]">
              {currentStep === 3 && (
                <>
                  {Object.values(selectedPlatforms).filter(Boolean).length}{" "}
                  platform(s) selected
                </>
              )}
            </div>
            <div className="flex gap-2">
              {currentStep > 1 ? (
                <button
                  className="px-4 py-2 border border-[#F78CA2] text-[#3D0C11] rounded-md hover:bg-[#F9DEC9] transition-colors"
                  onClick={goToPreviousStep}
                >
                  Back
                </button>
              ) : (
                <button
                  className="px-4 py-2 border border-[#F78CA2] text-[#3D0C11] rounded-md hover:bg-[#F9DEC9] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              )}
              <button
                className={`px-4 py-2 text-white rounded-md transition-colors ${
                  isCurrentStepValid()
                    ? "bg-[#D80032] hover:bg-maroondark"
                    : "bg-[#F78CA2] cursor-not-allowed"
                }`}
                onClick={goToNextStep}
                disabled={!isCurrentStepValid()}
              >
                {getNextButtonText()}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
