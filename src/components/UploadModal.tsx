import { useState, useRef } from "react";
import { Post } from "@/types";

interface UploadModalProps {
  onClose: () => void;
  onUpload: (post: Omit<Post, "id" | "createdAt" | "comments" | "reactions" | "author">) => void;
}

export default function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const defaultThumbnail = "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80";

    onUpload({
      title,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      thumbnailUrl: mediaUrl ? (isVideo ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" : mediaUrl) : defaultThumbnail,
      videoUrl: isVideo ? mediaUrl : undefined,
    });
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For the prototype, we just create a local object URL
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setPreviewUrl(url);
      setIsVideo(file.type.startsWith('video/'));
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-discord-darker w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-discord-divider"
        onClick={handleModalClick}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create New Post</h2>
            <button onClick={onClose} className="text-discord-muted hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Media Upload Area */}
            <div 
              onClick={handleFileClick}
              className={`w-full aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden
                ${previewUrl ? 'border-transparent bg-black' : 'border-discord-divider hover:border-discord-blurple hover:bg-discord-darkest'}`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*,video/*" 
                className="hidden" 
              />
              
              {previewUrl ? (
                isVideo ? (
                  <video src={previewUrl} className="w-full h-full object-contain" controls />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                )
              ) : (
                <div className="flex flex-col items-center text-discord-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span className="font-medium">Click to upload image or video</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-discord-muted uppercase mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's this memory about?"
                className="w-full bg-discord-darkest text-discord-text px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-discord-blurple"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-discord-muted uppercase mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Valorant, Minecraft, highlight..."
                className="w-full bg-discord-darkest text-discord-text px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-discord-blurple"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="px-5 py-2.5 text-white hover:underline"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!title}
                className="bg-discord-blurple text-white px-6 py-2.5 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5865F2] transition-colors"
              >
                Post Memory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
