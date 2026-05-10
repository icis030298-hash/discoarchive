import Image from "next/image";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  // Format the date (Year / Month / Day / Time)
  const date = new Date(post.createdAt);
  const formattedDate = `${date.getFullYear()} / ${String(date.getMonth() + 1).padStart(2, '0')} / ${String(date.getDate()).padStart(2, '0')} / ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  return (
    <div 
      className="bg-discord-darker rounded-lg overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-discord-divider/50 group"
      onClick={() => onClick(post)}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-discord-darkest">
        {post.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={post.thumbnailUrl} 
            alt={post.title} 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80";
            }}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (

          <div className="flex items-center justify-center w-full h-full text-discord-muted">
            No Media
          </div>
        )}
        
        {/* Video Icon overlay if it has video */}
        {post.videoUrl && (
          <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-discord-blurple transition-colors">
          {post.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 bg-discord-darkest text-discord-blurple text-xs font-semibold rounded-md border border-discord-divider/50"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-discord-hover overflow-hidden flex items-center justify-center">
              {post.author.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-white font-bold">{post.author.name.charAt(0)}</span>
              )}
            </div>
            <span className="text-sm font-medium text-discord-text">{post.author.name}</span>
          </div>
          
          <div className="text-xs text-discord-muted font-mono flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
}
