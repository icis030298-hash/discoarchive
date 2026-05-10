"use client";

import { useState, useMemo } from "react";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import PostModal from "@/components/PostModal";
import { usePosts } from "@/context/PostContext";

export default function Home() {
  const { posts, handleDelete, handleUpdate } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = ["LOL", "메이플스토리", "스타크래프트", "종합게임"];

  const filteredPosts = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag]
  );

  return (
    <main className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="relative py-10 md:py-16 px-6 text-center overflow-hidden">
        <div className="text-center py-12 md:py-20 animate-in fade-in slide-in-from-top duration-1000">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
            discord<span className="text-discord-blurple">archive</span>
          </h1>
          <p className="text-discord-muted text-lg md:text-xl font-medium max-w-2xl mx-auto px-4">
            추억들을 마음껏 박제하고 공유하는 우리들의 공간
          </p>
        </div>
      </section>

      {/* Tag Filters */}
      <section className="px-6 pb-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          <button
            onClick={() => setActiveTag(null)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
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
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTag === tag
                  ? "bg-discord-blurple text-white"
                  : "bg-discord-darker text-discord-muted hover:bg-discord-hover hover:text-white border border-discord-divider"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
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

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </main>
  );
}

