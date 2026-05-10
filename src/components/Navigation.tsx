"use client";

import { usePosts } from "@/context/PostContext";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NavigationProps {
  onNewPost: () => void;
}

export default function Navigation({ onNewPost }: NavigationProps) {
  const { nickname, avatarUrl, handleUpdateProfile, handleUploadAvatar } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(nickname);
  const [tempAvatar, setTempAvatar] = useState(avatarUrl);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setTempName(nickname);
    setTempAvatar(avatarUrl);
  }, [nickname, avatarUrl, isEditing]);

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await handleUploadAvatar(file);
      setTempAvatar(url);
    } catch (err) {
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      handleUpdateProfile(tempName.trim(), tempAvatar.trim());
      setIsEditing(false);
    }
  };

  return (
    <nav className="bg-discord-darkest border-b border-discord-divider px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3 md:gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-discord-blurple rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
            D
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-discord-blurple transition-colors">
            discoarchive
          </span>
        </Link>
        
        {/* Profile Section */}
        <div className="relative flex items-center ml-2 border-l border-discord-divider pl-4">
          {isEditing ? (
            <div className="absolute top-12 left-4 w-64 bg-discord-darker border border-discord-divider rounded-xl shadow-2xl p-4 z-[100] animate-in fade-in zoom-in duration-200">
              <h3 className="text-white font-bold mb-3 text-sm">프로필 수정</h3>
              <form onSubmit={handleProfileSubmit} className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-discord-muted mb-1 block">닉네임</label>
                  <input
                    autoFocus
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full bg-discord-darkest text-white text-sm px-3 py-2 rounded border border-discord-divider outline-none focus:border-discord-blurple"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-discord-muted mb-1 block">프로필 이미지</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempAvatar}
                      onChange={(e) => setTempAvatar(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-discord-darkest text-white text-sm px-3 py-2 rounded border border-discord-divider outline-none focus:border-discord-blurple"
                    />
                    <label className={`cursor-pointer bg-discord-hover hover:bg-gray-600 px-3 py-2 rounded border border-discord-divider transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                      />
                      <span className="text-xs text-white">{isUploading ? "..." : "📁"}</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-discord-blurple text-white text-xs py-2 rounded font-bold hover:bg-[#5865F2] transition-colors">저장</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-discord-hover text-white text-xs py-2 rounded font-bold hover:bg-gray-600 transition-colors">취소</button>
                </div>
              </form>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-3 hover:bg-discord-hover px-2 py-1 rounded transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-discord-blurple/20 overflow-hidden flex items-center justify-center border-2 border-transparent group-hover:border-discord-blurple transition-all">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt="pfp" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-discord-blurple font-bold">{nickname.charAt(0)}</span>
                )}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-discord-muted leading-none mb-1">Welcome</span>
                <span className="text-discord-text text-sm font-bold group-hover:text-white leading-none">
                  {nickname}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden sm:flex gap-4 mr-4">
          <Link href="/" className="text-discord-muted hover:text-white transition-colors text-sm md:text-base font-medium">
            갤러리
          </Link>
          <Link href="/event" className="text-discord-muted hover:text-white transition-colors text-sm md:text-base font-medium">
            이벤트
          </Link>
        </div>
        <button
          onClick={onNewPost}
          className="bg-discord-blurple hover:bg-[#5865F2] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md text-sm md:text-base font-medium shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span className="hidden xs:inline">업로드</span>
        </button>
      </div>
    </nav>
  );
}
