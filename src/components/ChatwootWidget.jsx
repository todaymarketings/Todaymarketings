import { useEffect } from "react";

const ChatwootWidget = () => {
  useEffect(() => {
    if (window.chatwootSDK) return;

    const script = document.createElement("script");
    script.src = "https://app.chatwoot.com/packs/js/sdk.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.chatwootSDK.run({
        websiteToken: "UyEq79M4EwUZWYKEQfFANAn6", // Replace this
        baseUrl: "https://app.chatwoot.com",
      });
    };

    document.body.appendChild(script);
  }, []);

  return null;
};

export default ChatwootWidget;
