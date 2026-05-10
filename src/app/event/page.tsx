"use client";

import Navigation from "@/components/Navigation";

export default function EventPage() {
  return (
    <>
      <Navigation />
      <div className="flex-1 flex flex-col min-h-[calc(100vh-73px)]">
        <iframe
          src="/event.html"
          className="w-full flex-1 border-0"
          style={{ minHeight: "calc(100vh - 73px)" }}
          title="Virtual Crypto Exchange"
          allow="autoplay"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </>
  );
}
