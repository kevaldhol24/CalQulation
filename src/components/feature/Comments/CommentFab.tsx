"use client";

import { MessageSquarePlus } from "lucide-react";

export const CommentFab = () => {

  const scrollToCommentForm = () => {
    const commentForm = document.getElementById("comments");
    if (commentForm) {
      commentForm.scrollIntoView({ behavior: "smooth" });
      
      // Add slight delay to focus the textarea after scrolling
      setTimeout(() => {
        const textarea = document.getElementById("comment-textarea");
        if (textarea instanceof HTMLTextAreaElement) {
          textarea.focus();
        }
      }, 600); // Delay to allow smooth scrolling to complete
    }
  };

  return (
    <button
      onClick={scrollToCommentForm}
      className="h-[40px] flex gap-2 p-2 px-4 cursor-pointer items-center fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50 text-md"
      aria-label="Leave a comment"
      id="comment-fab"
    >
      <MessageSquarePlus className="h-6 w-6 mt-[3px]" /> Comments
    </button>
  );
};
