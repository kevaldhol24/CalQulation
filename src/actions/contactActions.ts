"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Define validation schema
const ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(4, { message: "Subject must be at least 4 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate form data
    const validated = ContactSchema.safeParse(data);
    
    if (!validated.success) {
      const errorMessages = validated.error.errors.map(err => ({
        path: err.path[0],
        message: err.message
      }));
      
      return { 
        success: false, 
        errors: errorMessages,
        message: "Please fix the errors in the form."
      };
    }
    
    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
      },
    });
    
    return {
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon.",
      contact
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later."
    };
  }
}
