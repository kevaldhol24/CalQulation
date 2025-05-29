import { getComments } from "@/actions/commentActions";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { CommentFab } from "./CommentFab";
import { unstable_noStore } from "next/cache";

interface CommentsProps {
  postId: string;
}

export async function Comments({ postId }: CommentsProps) {
  // Ensure no caching at the component level
  unstable_noStore();
  
  // Fetch comments server-side for SEO optimization
  const comments = await getComments(postId);

  return (
    <div className="mt-8" id="comments">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join the discussion</h2>
        <p className="text-gray-600 dark:text-gray-400">
          We&apos;d love to hear your thoughts on this topic. Please be respectful and follow our community guidelines.
        </p>
      </div>
      
      <div id="comment-form">
        <CommentForm postId={postId} />
      </div>
      
      <div className="mt-10">
        <CommentList comments={comments} />
      </div>

      {/* Floating action button to scroll to comment form */}
      <CommentFab />
    </div>
  );
}
