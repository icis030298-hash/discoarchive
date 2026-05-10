"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Post } from "@/types";
import { DUMMY_POSTS } from "@/data/dummyPosts";

interface PostContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  isLoaded: boolean;
  showUploadModal: boolean;
  setShowUploadModal: (show: boolean) => void;
  handleUpload: (data: any) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: Partial<Post>) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("discoarchive-posts");
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(DUMMY_POSTS);
      }
    } else {
      setPosts(DUMMY_POSTS);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("discoarchive-posts", JSON.stringify(posts));
    }
  }, [posts, isLoaded]);

  const handleUpload = (
    data: Omit<Post, "id" | "createdAt" | "comments" | "reactions" | "author">
  ) => {
    const newPost: Post = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      author: { id: "current-user", name: "You", avatarUrl: "" },
      comments: [],
      reactions: [
        { emoji: "👍", count: 0, userReacted: false },
        { emoji: "🔥", count: 0, userReacted: false },
        { emoji: "❤️", count: 0, userReacted: false },
      ],
    };
    setPosts([newPost, ...posts]);
    setShowUploadModal(false);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, updatedData: Partial<Post>) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        isLoaded,
        showUploadModal,
        setShowUploadModal,
        handleUpload,
        handleDelete,
        handleUpdate,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}
