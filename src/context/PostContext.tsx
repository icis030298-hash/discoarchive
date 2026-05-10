"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Post, Comment } from "@/types";
import { supabase } from "@/lib/supabase";

interface PostContextType {
  posts: Post[];
  nickname: string;
  avatarUrl: string;
  isLoaded: boolean;
  setNickname: (name: string) => void;
  setAvatarUrl: (url: string) => void;
  handleUpdateProfile: (name: string, avatar: string) => void;
  handleUploadAvatar: (file: File) => Promise<string>;
  handleUpload: (data: Omit<Post, "id" | "createdAt" | "comments" | "reactions" | "author">) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (id: string, updates: Partial<Post>) => Promise<void>;
  handleAddComment: (postId: string, content: string) => Promise<void>;
  handleAddReaction: (postId: string, emoji: string) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nickname, setNicknameState] = useState<string>("익명");
  const [avatarUrl, setAvatarUrlState] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load profile on mount
  useEffect(() => {
    const savedNickname = localStorage.getItem("disco-nickname");
    const savedAvatar = localStorage.getItem("disco-avatar");
    
    if (savedNickname) {
      setNicknameState(savedNickname);
    } else {
      const randomId = Math.floor(Math.random() * 1000);
      const defaultName = `친구_${randomId}`;
      setNicknameState(defaultName);
      localStorage.setItem("disco-nickname", defaultName);
    }

    if (savedAvatar) {
      setAvatarUrlState(savedAvatar);
    }
    
    fetchPosts();
  }, []);

  const handleUpdateProfile = (name: string, avatar: string) => {
    setNicknameState(name);
    setAvatarUrlState(avatar);
    localStorage.setItem("disco-nickname", name);
    localStorage.setItem("disco-avatar", avatar);
  };

  const handleUploadAvatar = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("posts")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage.from("posts").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const setNickname = (name: string) => {
    setNicknameState(name);
    localStorage.setItem("disco-nickname", name);
  };

  const setAvatarUrl = (url: string) => {
    setAvatarUrlState(url);
    localStorage.setItem("disco-avatar", url);
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        const mappedPosts: Post[] = (data || []).map((p: any) => ({
          id: p.id,
          title: p.title,
          thumbnailUrl: p.thumbnail_url,
          videoUrl: p.video_url,
          tags: p.tags,
          author: {
            id: p.author_id,
            name: p.author_name,
            avatarUrl: p.author_avatar_url || "",
          },
          comments: p.comments || [],
          reactions: p.reactions || [],
          createdAt: p.created_at,
        }));
        setPosts(mappedPosts);
      }
    } finally {
      setIsLoaded(true);
    }
  };

  const handleUpload = async (data: Omit<Post, "id" | "createdAt" | "comments" | "reactions" | "author">) => {
    const { error } = await supabase.from("posts").insert([
      {
        title: data.title,
        thumbnail_url: data.thumbnailUrl,
        video_url: data.videoUrl,
        tags: data.tags,
        author_id: "user-" + nickname,
        author_name: nickname,
        author_avatar_url: avatarUrl,
      },
    ]);

    if (error) {
      console.error("Error inserting post to DB:", error);
      throw new Error(`DB 저장 실패: ${error.message} (${error.details || "상세정보 없음"})`);
    }
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) console.error("Error deleting post:", error);
    fetchPosts();
  };

  const handleUpdate = async (id: string, updates: Partial<Post>) => {
    const { error } = await supabase
      .from("posts")
      .update({
        title: updates.title,
        tags: updates.tags,
      })
      .eq("id", id);
    if (error) console.error("Error updating post:", error);
    fetchPosts();
  };

  const handleAddComment = async (postId: string, content: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      user: {
        id: "user-" + nickname,
        name: nickname,
        avatarUrl: avatarUrl,
      },
      createdAt: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("posts")
      .update({
        comments: [...post.comments, newComment],
      })
      .eq("id", postId);

    if (error) console.error("Error adding comment:", error);
    fetchPosts();
  };

  const handleAddReaction = async (postId: string, emoji: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const existingReaction = post.reactions.find((r) => r.emoji === emoji);
    let newReactions;

    if (existingReaction) {
      newReactions = post.reactions.map((r) =>
        r.emoji === emoji ? { ...r, count: r.count + 1 } : r
      );
    } else {
      newReactions = [...post.reactions, { emoji, count: 1 }];
    }

    const { error } = await supabase
      .from("posts")
      .update({ reactions: newReactions })
      .eq("id", postId);

    if (error) console.error("Error adding reaction:", error);
    fetchPosts();
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        nickname,
        avatarUrl,
        isLoaded,
        setNickname,
        setAvatarUrl,
        handleUpdateProfile,
        handleUploadAvatar,
        handleUpload,
        handleDelete,
        handleUpdate,
        handleAddComment,
        handleAddReaction,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
