"use client";

// Final Deployment Trigger - Flag: nodejs_compat enabled
import { useState } from "react";
import Navigation from "./Navigation";
import UploadModal from "./UploadModal";
import { usePosts } from "@/context/PostContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { handleUpload, isLoaded } = usePosts();
  const [showUploadModal, setShowUploadModal] = useState(false);

  if (!isLoaded) {
    return <div className="min-h-screen bg-discord-dark flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-discord-blurple border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <>
      <Navigation onNewPost={() => setShowUploadModal(true)} />
      {children}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
    </>
  );
}
