"use client";

import { ContactFormData, submitContactForm } from "@/actions/contactActions";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Generate name from email (everything before @)
      const name = email.split("@")[0];

      // Create subscription data using contact form
      const subscriptionData: ContactFormData = {
        name,
        email,
        subject: "Blog Subscription",
        message: "I want to subscribe to the blog",
      };

      const result = await submitContactForm(subscriptionData);

      if (result.success) {
        toast.success(
          "Thanks for subscribing! You'll receive our latest financial tips."
        );
        setEmail("");
      } else {
        toast.error(result.message || "Subscription failed. Please try again.");
        if (result.errors) {
          // Only show email related errors
          const emailError = result.errors.find(
            (err) => err.path === "email"
          );
          if (emailError) {
            setError(emailError.message);
          }
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-md p-4 mb-4">
      <h4 className="text-white text-base font-bold mb-1">
        Get Financial Updates
      </h4>
      <p className="text-blue-100 mb-3 text-xs">
        Sign up for our newsletter to receive the latest financial tips.
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            className={`truncate px-3 py-1.5 text-sm rounded-lg bg-white/10 backdrop-blur-sm border ${
              error ? "border-red-400" : "border-white/20"
            } text-white placeholder-white/70 mb-2 focus:outline-none focus:ring-1 focus:ring-white/30 w-full pr-7`}
          />
          <Mail className="absolute right-3 top-2.5 h-4 w-4 text-white/70" />
        </div>

        {error && (
          <p className="text-xs text-red-200 flex items-center gap-1 mb-2">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-white text-blue-600 hover:bg-blue-50 h-8 text-xs"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    </div>
  );
}
