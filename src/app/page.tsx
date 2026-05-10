"use client";

import { useState, useMemo } from "react";
import { Post } from "@/types";
import { DUMMY_POSTS, ALL_TAGS } from "@/data/dummyPosts";
import Navigation from "@/components/Navigation";
import PostCard from "@/components/PostCard";
import PostModal from "@/components/PostModal";
import UploadModal from "@/components/UploadModal";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))),
    [posts]
  );

  const filteredPosts = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag]
  );

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

  return (
    <>
      <Navigation onNewPost={() => setShowUploadModal(true)} />

      <main className="flex-1 flex flex-col">
        {/* Hero */}
        <section className="relative py-16 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-discord-blurple/10 to-transparent pointer-events-none" />
          <h1 className="relative text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Our{" "}
            <span className="text-discord-blurple">Discord</span>{" "}
            Memories
          </h1>
          <p className="relative text-discord-muted text-lg max-w-xl mx-auto">
            친구들과 디스코드에서 함께한 순간들을 기록하고 공유해보세요.
          </p>
        </section>

        {/* Tag Filters */}
        <section className="px-6 pb-6 flex flex-wrap items-center gap-2 max-w-7xl mx-auto w-full">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              activeTag === null
                ? "bg-discord-blurple text-white"
                : "bg-discord-darker text-discord-muted hover:bg-discord-hover hover:text-white border border-discord-divider"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeTag === tag
                  ? "bg-discord-blurple text-white"
                  : "bg-discord-darker text-discord-muted hover:bg-discord-hover hover:text-white border border-discord-divider"
              }`}
            >
              #{tag}
            </button>
          ))}
        </section>

        {/* Gallery Grid */}
        <section className="px-6 pb-12 max-w-7xl mx-auto w-full">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-discord-muted text-lg">
                {activeTag
                  ? `#${activeTag} 태그에 해당하는 게시물이 없습니다.`
                  : "아직 게시물이 없습니다. 첫 추억을 기록해보세요!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={setSelectedPost}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
    </>
  );
}
