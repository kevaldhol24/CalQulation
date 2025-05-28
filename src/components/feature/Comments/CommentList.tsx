import { Comment as CommentType } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import moment from "moment";

interface CommentListProps {
  comments: CommentType[];
}

type CommentWithReplies = CommentType & {
  replies?: CommentType[];
};

export const CommentList = ({ comments }: CommentListProps) => {
  // Organize comments into top-level and replies
  const organizeComments = (
    flatComments: CommentType[]
  ): CommentWithReplies[] => {
    const commentMap = new Map<string, CommentWithReplies>();
    const topLevelComments: CommentWithReplies[] = [];

    // First pass: create all comment objects
    flatComments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: organize into hierarchy
    flatComments.forEach((comment) => {
      if (comment.parentId) {
        const parentComment = commentMap.get(comment.parentId);
        if (parentComment && parentComment.replies) {
          parentComment.replies.push(
            commentMap.get(comment.id) as CommentWithReplies
          );
        }
      } else {
        topLevelComments.push(commentMap.get(comment.id) as CommentWithReplies);
      }
    });

    return topLevelComments;
  };

  // Function to format comment text with line breaks preserved and URLs as clickable links
  const formatCommentText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    return text.split("\n").map((line, i) => {
      // If there are no URLs in the line, return it as is
      if (!line.match(urlRegex)) {
        return (
          <span key={i}>
            {line}
            {i < text.split("\n").length - 1 && <br />}
          </span>
        );
      }
      
      // If there are URLs, process them
      const segments: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;
      
      // Reset regex state
      urlRegex.lastIndex = 0;
      
      // Find all URLs in the line
      while ((match = urlRegex.exec(line)) !== null) {
        const url = match[0];
        const index = match.index;
        
        // Add text before URL
        if (index > lastIndex) {
          segments.push(line.substring(lastIndex, index));
        }
        
        // Add URL as clickable link
        segments.push(
          <a
            key={`link-${i}-${segments.length}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline break-words"
          >
            {url}
          </a>
        );
        
        lastIndex = index + url.length;
      }
      
      // Add any remaining text after the last URL
      if (lastIndex < line.length) {
        segments.push(line.substring(lastIndex));
      }
      
      return (
        <span key={i}>
          {segments}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  const organizedComments = organizeComments(comments);

  const renderComment = (comment: CommentWithReplies, isReply = false) => {
    const formattedDate = moment(comment.createdAt).fromNow();

    return (
      <div key={comment.id} className={`${isReply ? "ml-8 mt-4" : "mt-6"}`}>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 h-8 w-8 rounded-full flex items-center justify-center font-medium">
                {comment.name ? comment.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {comment.name || "Anonymous"}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {formatCommentText(comment.body)}
          </div>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-3 mt-3">
            {comment.replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 mt-6">
      {organizedComments.length > 0 ? (
        <>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Comments ({organizedComments.length})
            </h3>
          </div>
          <div>
            {organizedComments.map((comment) => renderComment(comment))}
          </div>
        </>
      ) : (
        <div className="text-center pt-8 text-gray-500 dark:text-gray-400 italic">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

// Export a dynamic configuration to prevent static optimization of this page
export const dynamic = "force-dynamic";
