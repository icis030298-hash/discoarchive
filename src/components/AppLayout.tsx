"use client";

import Navigation from "./Navigation";
import UploadModal from "./UploadModal";
import { usePosts } from "@/context/PostContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { showUploadModal, setShowUploadModal, handleUpload, isLoaded } = usePosts();

  if (!isLoaded) {
    return <div className="min-h-screen bg-discord-dark" />;
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
