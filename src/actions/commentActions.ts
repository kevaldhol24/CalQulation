"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CommentSubmission {
  body: string;
  name: string;
  email?: string;
  postId: string;
}

// Disable caching to ensure fresh data on each request
export const getComments = async (postId: string) => {
  try {
    // Use no-store option to disable caching and ensure fresh data
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
        approved: true, // Only show approved comments
        deleted: false, // Don't show deleted comments
        spam: false, // Don't show spam comments
      },
      orderBy: [
        {
          parentId: "asc", // null values first (top-level comments)
        },
        {
          createdAt: "desc", // newest first within each level
        },
      ],
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export async function submitComment(data: CommentSubmission) {
  try {
    // Validate required fields
    if (!data.body || !data.body.trim()) {
      return { error: "Comment text is required", success: false };
    }

    if (!data.name || !data.name.trim()) {
      return { error: "Name is required", success: false };
    }

    if (!data.postId) {
      return { error: "Post ID is required", success: false };
    }

    // Create comment in the database
    const comment = await prisma.comment.create({
      data: {
        body: data.body.trim(),
        name: data.name.trim(),
        email: data.email?.trim() || null,
        postId: data.postId,
        parentId: null, // No reply functionality for users
      },
    });

    // Revalidate the path where comments are displayed - ensure it's the correct path
    // For example, if postId is "tool_emi-calculator", revalidate "/tool/loan-calculator"
    const pagePath = data.postId.replace('_', '/');
    revalidatePath(`/${pagePath}`);

    return {
      success: true,
      message: "Your comment has been submitted and will appear after review.",
      comment,
    };
  } catch (error) {
    console.error("Error submitting comment:", error);
    return {
      error: "Failed to submit comment. Please try again.",
      success: false,
    };
  }
}
