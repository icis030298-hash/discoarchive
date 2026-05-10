"use client";

import Navigation from "@/components/Navigation";

export default function EventPage() {
  return (
    <>
      <Navigation />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[calc(100vh-73px)]">
        <div className="bg-discord-darker p-12 rounded-xl shadow-xl max-w-2xl w-full border border-discord-divider">
          <div className="w-20 h-20 bg-discord-darkest rounded-full flex items-center justify-center mx-auto mb-6 text-discord-blurple">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Event</h1>
          <p className="text-discord-muted mb-8 text-lg">
            이 공간은 나중에 추가될 HTML 기반 이벤트 코드를 위해 예약되어 있습니다.
          </p>

          <div className="border-2 border-dashed border-discord-divider rounded-lg p-10 bg-discord-darkest/50">
            <p className="font-mono text-sm text-discord-muted">
              {`<!-- Insert Event HTML Code Here -->`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
