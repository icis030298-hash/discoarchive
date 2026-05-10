"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Post, Comment } from "@/types";
import { supabase } from "@/lib/supabase";

interface PostContextType {
  posts: Post[];
  nickname: string;
  isLoaded: boolean;
  setNickname: (name: string) => void;
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load nickname and posts on mount
  useEffect(() => {
    const savedNickname = localStorage.getItem("disco-nickname");
    if (savedNickname) {
      setNicknameState(savedNickname);
    } else {
      const randomId = Math.floor(Math.random() * 1000);
      const defaultName = `친구_${randomId}`;
      setNicknameState(defaultName);
      localStorage.setItem("disco-nickname", defaultName);
    }
    fetchPosts();
  }, []);

  const setNickname = (name: string) => {
    setNicknameState(name);
    localStorage.setItem("disco-nickname", name);
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
      },
    ]);

    if (error) {
      console.error("Error uploading post:", error);
      throw error;
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
        avatarUrl: "",
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
        isLoaded,
        setNickname,
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
