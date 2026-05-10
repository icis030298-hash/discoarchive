export default function EventPage() {
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

