"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import UploadModal from "./UploadModal";
import { usePosts } from "@/context/PostContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { handleUpload } = usePosts();
  const [showUploadModal, setShowUploadModal] = useState(false);

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

