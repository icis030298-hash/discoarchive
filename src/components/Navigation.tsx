"use client";

import Link from "next/link";

interface NavigationProps {
  onNewPost?: () => void;
}

export default function Navigation({ onNewPost }: NavigationProps) {
  return (
    <nav className="bg-discord-darkest border-b border-discord-divider px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-discord-blurple rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
            D
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-discord-blurple transition-colors">
            discoarchive
          </span>
        </Link>
        <div className="hidden md:flex gap-4 ml-6">
          <Link href="/" className="text-discord-muted hover:text-white transition-colors font-medium">
            Gallery
          </Link>
          <Link href="/event" className="text-discord-muted hover:text-white transition-colors font-medium">
            Event
          </Link>
        </div>
      </div>
      <div>
        <button
          onClick={onNewPost}
          className="bg-discord-blurple hover:bg-[#5865F2] text-white px-4 py-2 rounded-md font-medium shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Post
        </button>
      </div>
    </nav>
  );
}
