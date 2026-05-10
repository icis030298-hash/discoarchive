"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Post } from "@/types";
import { supabase } from "@/lib/supabase";

interface PostContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  isLoaded: boolean;
  showUploadModal: boolean;
  setShowUploadModal: (show: boolean) => void;
  handleUpload: (data: any) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (id: string, data: Partial<Post>) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      // Map Supabase snake_case to our camelCase types
      const mappedPosts: Post[] = (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        thumbnailUrl: p.thumbnail_url,
        videoUrl: p.video_url,
        tags: p.tags || [],
        createdAt: p.created_at,
        author: { id: p.author_id, name: p.author_name, avatarUrl: "" },
        comments: p.comments || [],
        reactions: p.reactions || [],
      }));
      setPosts(mappedPosts);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpload = async (
    data: Omit<Post, "id" | "createdAt" | "comments" | "reactions" | "author">
  ) => {
    const { error } = await supabase.from("posts").insert([
      {
        title: data.title,
        thumbnail_url: data.thumbnailUrl,
        video_url: data.videoUrl,
        tags: data.tags,
        author_id: "current-user",
        author_name: "You",
        comments: [],
        reactions: [
          { emoji: "👍", count: 0, userReacted: false },
          { emoji: "🔥", count: 0, userReacted: false },
          { emoji: "❤️", count: 0, userReacted: false },
        ],
      },
    ]);

    if (error) {
      console.error("Error uploading post:", error);
      alert("업로드 중 오류가 발생했습니다.");
    } else {
      fetchPosts();
      setShowUploadModal(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting post:", error);
      alert("삭제 중 오류가 발생했습니다.");
    } else {
      fetchPosts();
    }
  };

  const handleUpdate = async (id: string, updatedData: Partial<Post>) => {
    // Map camelCase to snake_case for DB
    const dbUpdate: any = {};
    if (updatedData.title !== undefined) dbUpdate.title = updatedData.title;
    if (updatedData.thumbnailUrl !== undefined) dbUpdate.thumbnail_url = updatedData.thumbnailUrl;
    if (updatedData.videoUrl !== undefined) dbUpdate.video_url = updatedData.videoUrl;
    if (updatedData.tags !== undefined) dbUpdate.tags = updatedData.tags;
    if (updatedData.comments !== undefined) dbUpdate.comments = updatedData.comments;
    if (updatedData.reactions !== undefined) dbUpdate.reactions = updatedData.reactions;

    const { error } = await supabase
      .from("posts")
      .update(dbUpdate)
      .eq("id", id);

    if (error) {
      console.error("Error updating post:", error);
    } else {
      fetchPosts();
    }
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
