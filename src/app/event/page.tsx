"use client";

import { useEffect, useState } from "react";

export default function EventPage() {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    // Check if the page is being loaded inside an iframe
    if (window.self !== window.top) {
      setIsIframe(true);
    }
  }, []);

  // If inside an iframe, don't render anything (prevents recursion)
  if (isIframe) return null;

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
      <div className="bg-discord-darker rounded-xl border border-discord-divider overflow-hidden shadow-2xl h-[calc(100vh-140px)]">
        <iframe
          src="/event.html"
          className="w-full h-full border-0"
          title="Event Page"
          allow="autoplay"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}



