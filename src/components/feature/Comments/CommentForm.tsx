"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Send,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { submitComment } from "@/actions/commentActions";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CommentFormProps {
  postId: string;
}

export const CommentForm = ({ postId }: CommentFormProps) => {
  const [comment, setComment] = useState({
    body: "",
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<{
    body?: string;
    name?: string;
    email?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const validateEmail = (email: string) => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setComment((prev) => ({ ...prev, email }));

    if (email && !validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const body = e.target.value;
    setComment((prev) => ({ ...prev, body }));
    if (submitted && !body.trim()) {
      setErrors((prev) => ({ ...prev, body: "Comment text is required" }));
    } else {
      setErrors((prev) => ({ ...prev, body: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setComment((prev) => ({ ...prev, name }));
    if (submitted && !name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    // Validate all fields
    const newErrors = {
      body: !comment.body.trim() ? "Comment text is required" : undefined,
      name: !comment.name.trim() ? "Name is required" : undefined,
      email:
        comment.email && !validateEmail(comment.email)
          ? "Please enter a valid email address"
          : undefined,
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (!Object.values(newErrors).some((error) => error)) {
      // Submit the form using the server action
      try {
        setIsSubmitting(true);
        setSubmitStatus({});

        const result = await submitComment({
          body: comment.body,
          name: comment.name,
          email: comment.email || undefined,
          postId: postId,
        });

        if (result.success) {
          setSubmitStatus({
            success: true,
            message: result.message,
          });
          // Reset the form
          setComment({
            body: "",
            name: "",
            email: "",
          });
          setSubmitted(false);
        } else {
          setSubmitStatus({
            success: false,
            message: result.error,
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (_e: any) {
        setSubmitStatus({
          success: false,
          message: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (!Object.keys(submitStatus).length) return;
    setTimeout(() => {
      setSubmitStatus({});
    }, 5000);

  }, [submitStatus]);

  return (
    <div
      className={`rounded-xl border border-border bg-white/90 dark:bg-gray-800/90 shadow-sm p-5 mt-8`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
          <MessageCircle className="text-blue-600 dark:text-blue-400 h-5 w-5" />
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white">
          Leave a comment
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Textarea
            id="comment-textarea"
            placeholder="Write your comment here..."
            className={`min-h-[100px] resize-y w-full ${
              errors.body ? "border-destructive" : ""
            }`}
            value={comment.body}
            onChange={handleBodyChange}
            aria-label="Comment text"
            aria-invalid={errors.body ? "true" : "false"}
          />
          {errors.body && (
            <div className="flex items-center text-destructive text-xs mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.body}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <Input
                placeholder="Your name"
                value={comment.name}
                onChange={handleNameChange}
                aria-label="Name"
                className={errors.name ? "border-destructive" : ""}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <div className="flex items-center text-destructive text-xs mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="relative">
              <Input
                type="email"
                placeholder="Your email (optional)"
                value={comment.email}
                onChange={handleEmailChange}
                aria-label="Email"
                className={errors.email ? "border-destructive" : ""}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <div className="flex items-center text-destructive text-xs mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
          </div>
        </div>

        {submitStatus.success && (
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-300">
              {submitStatus.message ||
                "Your comment has been submitted and will appear after review."}
            </AlertDescription>
          </Alert>
        )}

        {submitStatus.success === false && (
          <Alert className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-300">
              {submitStatus.message ||
                "Failed to submit comment. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end">
          <Button
            className="flex items-center gap-2"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
