export default function EventPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
      <div className="bg-discord-darker rounded-xl border border-discord-divider p-12 text-center shadow-2xl">
        <div className="w-20 h-20 bg-discord-blurple/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5865F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M12 18v-6"></path>
            <path d="M8 15h8"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-black text-white mb-4">준비 중인 이벤트입니다</h1>
        <p className="text-discord-muted text-lg max-w-md mx-auto">
          조금만 기다려주세요! 더 재미있는 이벤트로 <br/> 곧 찾아뵙겠습니다.
        </p>
      </div>
    </div>
  );
}


