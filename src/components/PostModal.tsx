import { useState } from "react";
import { Post, Comment, Reaction } from "@/types";

interface PostModalProps {
  post: Post;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, data: Partial<Post>) => void;
}

export default function PostModal({ post, onClose, onDelete, onUpdate }: PostModalProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [reactions, setReactions] = useState<Reaction[]>(post.reactions);
  
  // Edit & Delete States
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editTags, setEditTags] = useState(post.tags.join(", "));
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleSaveEdit = () => {
    if (onUpdate) {
      onUpdate(post.id, {
        title: editTitle,
        tags: editTags.split(",").map(t => t.trim()).filter(t => t !== "")
      });
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (deleteConfirm) {
      if (onDelete) onDelete(post.id);
      onClose();
    } else {
      setDeleteConfirm(true);
      // Reset confirm after 3 seconds
      setTimeout(() => setDeleteConfirm(false), 3000);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        id: "current-user",
        name: "You",
        avatarUrl: ""
      },
      content: newComment,
      createdAt: new Date().toISOString()
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    if (onUpdate) {
      onUpdate(post.id, { comments: updatedComments });
    }
    setNewComment("");
  };

  const handleToggleReaction = (emoji: string) => {
    const updatedReactions = reactions.map(r => {
      if (r.emoji === emoji) {
        return {
          ...r,
          count: r.userReacted ? r.count - 1 : r.count + 1,
          userReacted: !r.userReacted
        };
      }
      return r;
    });
    setReactions(updatedReactions);
    if (onUpdate) {
      onUpdate(post.id, { reactions: updatedReactions });
    }
  };

  const availableEmojis = ["👍", "🔥", "😂", "❤️", "🎉", "👀"];

  const handleAddReaction = (emoji: string) => {
    const existing = reactions.find(r => r.emoji === emoji);
    let updatedReactions;
    if (existing) {
      if (!existing.userReacted) {
        updatedReactions = reactions.map(r => 
          r.emoji === emoji ? { ...r, count: r.count + 1, userReacted: true } : r
        );
      } else {
        return;
      }
    } else {
      updatedReactions = [...reactions, { emoji, count: 1, userReacted: true }];
    }
    setReactions(updatedReactions);
    if (onUpdate) {
      onUpdate(post.id, { reactions: updatedReactions });
    }
  };

  // Prevent closing when clicking inside the modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const date = new Date(post.createdAt);
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-discord-darker w-full max-w-5xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-discord-divider"
        onClick={handleModalClick}
      >
        {/* Left Side: Media */}
        <div className="w-full md:w-3/5 bg-black flex items-center justify-center min-h-[300px] md:min-h-0 relative">
          {post.videoUrl ? (
            <video 
              src={post.videoUrl} 
              controls 
              className="w-full h-full object-contain max-h-[50vh] md:max-h-[90vh]"
              poster={post.thumbnailUrl}
            />
          ) : post.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={post.thumbnailUrl} 
              alt={post.title} 
              className="w-full h-full object-contain max-h-[50vh] md:max-h-[90vh]"
            />
          ) : (
            <div className="text-discord-muted">No Media Available</div>
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 md:hidden bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Right Side: Details & Comments */}
        <div className="w-full md:w-2/5 flex flex-col h-[50vh] md:h-auto max-h-[90vh]">
          {/* Header */}
          <div className="p-4 border-b border-discord-divider flex justify-between items-start shrink-0">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                {isEditing ? (
                  <input 
                    className="bg-discord-darkest text-white border border-discord-blurple rounded px-2 py-1 text-lg font-bold w-full mr-2"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <h2 className="text-xl font-bold text-white mb-1">{post.title}</h2>
                )}
                
                <div className="flex gap-2 ml-4">
                  {isEditing ? (
                    <button 
                      onClick={handleSaveEdit}
                      className="bg-discord-blurple text-white px-2 py-1 rounded text-xs font-bold hover:bg-[#5865F2]"
                    >
                      저장
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 text-discord-muted hover:text-white hover:bg-discord-hover rounded-md transition-all" 
                        title="Edit Post"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button 
                        onClick={handleDeleteClick}
                        className={`p-1.5 rounded-md transition-all ${deleteConfirm ? 'bg-discord-loss text-white px-2 text-[10px] font-bold' : 'text-discord-muted hover:text-discord-loss hover:bg-discord-loss/10'}`}
                        title={deleteConfirm ? "Click again to confirm" : "Delete Post"}
                      >
                        {deleteConfirm ? "CONFIRM?" : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-discord-hover overflow-hidden flex items-center justify-center">
                  {post.author.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-white font-bold">{post.author.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-sm font-medium text-white">{post.author.name}</span>
                <span className="text-xs text-discord-muted ml-2">{formattedDate}</span>
              </div>
              
              {isEditing ? (
                <input 
                  className="bg-discord-darkest text-discord-blurple border border-discord-blurple rounded px-2 py-0.5 text-xs w-full"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  placeholder="해시태그 (쉼표로 구분)"
                />
              ) : (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-discord-darkest text-discord-blurple text-xs font-semibold rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={onClose}
              className="hidden md:flex text-discord-muted hover:text-white transition-colors ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Comments Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-discord-dark">
            {comments.length === 0 ? (
              <div className="h-full flex items-center justify-center text-discord-muted text-sm text-center">
                아직 댓글이 없습니다.<br/>첫 소감을 남겨보세요!
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-discord-hover shrink-0 overflow-hidden flex items-center justify-center mt-0.5">
                    {comment.user.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-white font-bold">{comment.user.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-white hover:underline cursor-pointer">{comment.user.name}</span>
                      <span className="text-xs text-discord-muted">
                        {new Date(comment.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className="text-discord-text text-sm mt-0.5">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Reactions & Input Area */}
          <div className="p-4 bg-discord-darker border-t border-discord-divider shrink-0">
            {/* Reactions */}
            <div className="flex flex-wrap gap-2 mb-3">
              {reactions.map((reaction) => reaction.count > 0 && (
                <button
                  key={reaction.emoji}
                  onClick={() => handleToggleReaction(reaction.emoji)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-sm transition-colors border
                    ${reaction.userReacted 
                      ? 'bg-discord-blurple/20 border-discord-blurple text-white' 
                      : 'bg-discord-darkest border-transparent text-discord-muted hover:bg-discord-hover hover:text-white'
                    }`}
                >
                  <span>{reaction.emoji}</span>
                  <span className="font-medium">{reaction.count}</span>
                </button>
              ))}
              
              {/* Add Reaction Dropdown */}
              <div className="flex gap-1 items-center ml-2 border-l border-discord-divider pl-2">
                {availableEmojis.slice(0, 4).map(emoji => (
                  <button 
                    key={emoji} 
                    onClick={() => handleAddReaction(emoji)}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-discord-hover transition-colors"
                    title="Add reaction"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글 작성..."
                className="flex-1 bg-discord-darkest text-discord-text px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-discord-blurple text-sm"
              />
              <button 
                type="submit"
                disabled={!newComment.trim()}
                className="bg-discord-blurple text-white px-4 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5865F2] transition-colors"
              >
                전송
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

