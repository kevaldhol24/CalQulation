"use client";

import { ContactFormData, submitContactForm } from "@/actions/contactActions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple front-end validation
    const newErrors = {
      name: !formData.name.trim() ? "Name is required" : undefined,
      email: !formData.email.trim()
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? "Please enter a valid email address"
        : undefined,
      subject: !formData.subject.trim() ? "Subject is required" : undefined,
      message: !formData.message.trim()
        ? "Message is required"
        : formData.message.trim().length < 10
        ? "Message must be at least 10 characters"
        : undefined,
    };

    setErrors(newErrors);

    // If no errors, submit the form
    if (!Object.values(newErrors).some((error) => error)) {
      try {
        setIsSubmitting(true);
        setSubmitStatus({});

        const result = await submitContactForm(formData);

        if (result.success) {
          setSubmitStatus({
            success: true,
            message: result.message,
          });
          // Reset the form
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          setSubmitStatus({
            success: false,
            message: result.message,
          });

          // Update errors if returned from server
          if (result.errors) {
            const serverErrors = result.errors.reduce((acc, err) => {
              acc[err.path as keyof typeof errors] = err.message;
              return acc;
            }, {} as typeof errors);

            setErrors((prev) => ({ ...prev, ...serverErrors }));
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus.message && (
        <Alert
          className={
            submitStatus.success
              ? "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-900"
              : "bg-destructive/10 border-destructive/50"
          }
        >
          {submitStatus.success ? (
            <CheckCircle2 className="text-green-600 dark:text-green-400" />
          ) : (
            <AlertCircle color="currentColor" className="text-destructive" />
          )}
          <AlertDescription
            className={
              submitStatus.success
                ? "text-green-800 dark:text-green-300"
                : "text-destructive"
            }
          >
            {submitStatus.message}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? "border-destructive" : ""}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p
              id="name-error"
              className="text-xs text-destructive flex items-center gap-1 mt-1"
            >
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email <span className="text-destructive">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "border-destructive" : ""}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-xs text-destructive flex items-center gap-1 mt-1"
            >
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Subject <span className="text-destructive">*</span>
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="What's this about?"
          value={formData.subject}
          onChange={handleInputChange}
          className={errors.subject ? "border-destructive" : ""}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <p
            id="subject-error"
            className="text-xs text-destructive flex items-center gap-1 mt-1"
          >
            <AlertCircle className="h-3 w-3" />
            {errors.subject}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Message <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us how we can help..."
          rows={6}
          value={formData.message}
          onChange={handleInputChange}
          className={`resize-y ${errors.message ? "border-destructive" : ""}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p
            id="message-error"
            className="text-xs text-destructive flex items-center gap-1 mt-1"
          >
            <AlertCircle className="h-3 w-3" />
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};
