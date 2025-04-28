import { useState } from "react";

export default function AIContentGenerator() {
  const [businessInput, setBusinessInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [error, setError] = useState("");
  const [businessName, setBusinessName] = useState("Your Business");
  const [contentType, setContentType] = useState("post"); // "post" or "email"

  // Generate random profile avatar color
  const profileColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  // Get current date for the post
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const generateContent = async () => {
    if (!businessInput.trim()) return;

    setIsGenerating(true);
    setError("");

    try {
      let prompt;

      if (contentType === "post") {
        prompt = `Generate a single engaging social media post for a business that: ${businessInput}. 
        The post should be around 2-3 sentences, include relevant emojis, and end with 2-3 hashtags. 
        Make it attention-grabbing and designed to increase engagement. Only return the post text, nothing else.`;
      } else {
        prompt = `Generate a short marketing email for a business that: ${businessInput}.
        The email should include a subject line, greeting, 2-3 short paragraphs of content, and a call to action.
        Make it professional but friendly, with a focus on driving customer engagement or sales.
        Format it with "SUBJECT: [your subject]" on the first line, then the email body.`;
      }

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content.trim();

      if (contentType === "post") {
        setGeneratedPost(generatedContent);
        setGeneratedEmail(""); // Clear the other content type
      } else {
        setGeneratedEmail(generatedContent);
        setGeneratedPost(""); // Clear the other content type
      }

      // Extract business name from input (simple version)
      const businessNameMatch = businessInput.match(
        /(?:I |we |my |our |selling |sell |offer |have )([\w\s]+?)(?:\.|\,|$)/i
      );
      if (businessNameMatch && businessNameMatch[1]) {
        const extractedName = businessNameMatch[1].trim();
        // Capitalize first letter of each word
        const formattedName = extractedName.replace(/\b\w/g, (l) =>
          l.toUpperCase()
        );
        setBusinessName(formattedName || "Your Business");
      }
    } catch (err) {
      console.error("Error generating content:", err);
      setError("Failed to generate content. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to generate a random number of likes, comments, shares
  const getRandomStat = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Function to extract email subject and body
  const parseEmail = (emailContent) => {
    const lines = emailContent.split("\n");
    let subject = "";
    let body = "";

    // Extract subject
    const subjectLine = lines[0];
    if (subjectLine.startsWith("SUBJECT:")) {
      subject = subjectLine.replace("SUBJECT:", "").trim();
      body = lines.slice(1).join("\n").trim();
    } else {
      subject = "Your Marketing Email";
      body = emailContent;
    }

    return { subject, body };
  };

  return (
    <div className="max-w-6xl mx-auto mb-8 mt-4">
      {/* Header */}
      <div
        className="px-6 py-4 rounded-t-xl"
        style={{ backgroundColor: "#3D0C11" }}
      >
        <div className="flex items-center">
          <div
            className="rounded-full p-2 mr-3"
            style={{ backgroundColor: "#D80032" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">AI Content Generator</h2>
        </div>
      </div>

      {/* Main Content Area - Side by Side Layout */}
      <div className="flex flex-col md:flex-row rounded-b-xl shadow-lg overflow-hidden">
        {/* Left Side - Create Content Section */}
        <div className="md:w-1/2">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: "#3D0C11" }}>
              Create Your Content
            </h3>

            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#3D0C11" }}
            >
              What's your business or product?
            </label>
            <div className="flex mb-4">
              <input
                type="text"
                value={businessInput}
                onChange={(e) => setBusinessInput(e.target.value)}
                placeholder="e.g., I sell handmade candles"
                className="flex-grow px-4 py-2 rounded-l-lg border focus:outline-none focus:ring-2"
                style={{ borderColor: "#F78CA2", focusRing: "#D80032" }}
              />
              <button
                onClick={generateContent}
                disabled={isGenerating || !businessInput.trim()}
                className="px-4 py-2 rounded-r-lg font-medium text-white transition-colors"
                style={{
                  backgroundColor: isGenerating ? "#F78CA2" : "#D80032",
                }}
              >
                {isGenerating ? "Generating..." : "Generate"}
              </button>
            </div>

            {/* Content Type Selection */}
            <div className="flex mb-5 border rounded-lg overflow-hidden">
              <button
                className={`flex-1 py-2 text-center transition-colors ${
                  contentType === "post"
                    ? "bg-pink-100 text-pink-800 font-medium"
                    : "bg-white text-gray-600"
                }`}
                onClick={() => setContentType("post")}
              >
                Social Post
              </button>
              <button
                className={`flex-1 py-2 text-center transition-colors ${
                  contentType === "email"
                    ? "bg-pink-100 text-pink-800 font-medium"
                    : "bg-white text-gray-600"
                }`}
                onClick={() => setContentType("email")}
              >
                Marketing Email
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Social Post Preview */}
            {generatedPost && (
              <div>
                <h4
                  className="text-md font-medium mb-3"
                  style={{ color: "#3D0C11" }}
                >
                  Post Preview:
                </h4>
                <div
                  className="rounded-lg overflow-hidden mb-4"
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #E4E4E4",
                  }}
                >
                  {/* Post Header */}
                  <div className="p-3 border-b border-gray-200 flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white font-bold"
                      style={{ backgroundColor: profileColor }}
                    >
                      {businessName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{businessName}</div>
                      <div className="text-xs text-gray-500">{currentDate}</div>
                    </div>
                    <div className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <p className="text-gray-800 whitespace-pre-line">
                      {generatedPost}
                    </p>
                  </div>

                  {/* Placeholder Image */}
                  <div className="bg-gray-100 w-full h-40 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  {/* Engagement Stats */}
                  <div className="p-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <div className="flex items-center text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>{getRandomStat(15, 142)} likes</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{getRandomStat(3, 28)} comments</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        <span>{getRandomStat(2, 15)} shares</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  className="w-full text-center font-medium py-2 px-4 rounded flex items-center justify-center"
                  style={{ backgroundColor: "#D80032", color: "white" }}
                  onClick={() => {
                    navigator.clipboard.writeText(generatedPost);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  Copy post to clipboard
                </button>
              </div>
            )}

            {/* Email Preview */}
            {generatedEmail && (
              <div>
                <h4
                  className="text-md font-medium mb-3"
                  style={{ color: "#3D0C11" }}
                >
                  Email Preview:
                </h4>
                <div
                  className="rounded-lg overflow-hidden mb-4"
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #E4E4E4",
                  }}
                >
                  {/* Email Header */}
                  <div className="p-3 border-b border-gray-200">
                    <div className="flex items-center mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white font-bold text-xs"
                        style={{ backgroundColor: profileColor }}
                      >
                        {businessName.charAt(0)}
                      </div>
                      <div className="font-medium">{businessName}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        From: {businessName.toLowerCase().replace(/\s+/g, "")}
                        @business.com
                      </span>
                      <span className="text-xs text-gray-500">
                        {currentDate}
                      </span>
                    </div>
                    <div className="mt-2 font-medium">
                      Subject: {parseEmail(generatedEmail).subject}
                    </div>
                  </div>

                  {/* Email Content */}
                  <div className="p-4">
                    <div className="text-gray-800 whitespace-pre-line">
                      {parseEmail(generatedEmail).body}
                    </div>
                  </div>

                  {/* Email Footer */}
                  <div className="p-3 border-t border-gray-200 text-xs text-gray-500">
                    <div className="mb-1">{businessName}</div>
                    <div>123 Business Street, Business City</div>
                    <div className="mt-2">
                      <a href="#" className="text-blue-600">
                        Unsubscribe
                      </a>{" "}
                      |{" "}
                      <a href="#" className="text-blue-600">
                        View in browser
                      </a>
                    </div>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  className="w-full text-center font-medium py-2 px-4 rounded flex items-center justify-center"
                  style={{ backgroundColor: "#D80032", color: "white" }}
                  onClick={() => {
                    navigator.clipboard.writeText(generatedEmail);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  Copy email to clipboard
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Information Section */}
        <div className="md:w-1/2 bg-white p-6">
          <h3
            className="text-3xl font-bold mb-3"
            style={{
              color: "#950740",
              borderBottom: "3px solid #950740",
              paddingBottom: "0.5rem",
            }}
          >
            Try AI Content Generator
          </h3>

          <p className="text-gray-700 mb-6">
            Transform your marketing efforts with AI-powered content that
            captivates your audience. Our tool uses advanced artificial
            intelligence to create engaging social posts and marketing emails
            customized to your specific business needs.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                style={{ color: "#D80032" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h4 className="font-medium">Social Media Posts</h4>
            </div>
            <ol className="text-sm text-gray-700 space-y-1 ml-7 list-decimal">
              <li>Grab attention with eye-catching content</li>
              <li>Includes relevant hashtags for better reach</li>
              <li>Optimized for engagement with emojis</li>
              <li>Perfect for Instagram, Facebook, Twitter, and LinkedIn</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                style={{ color: "#D80032" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h4 className="font-medium">Marketing Emails</h4>
            </div>
            <ol className="text-sm text-gray-700 space-y-1 ml-7 list-decimal">
              <li>Compelling subject lines to increase open rates</li>
              <li>Professional yet friendly content</li>
              <li>Strong calls-to-action to drive conversions</li>
              <li>Ready to copy and paste into your email platform</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
