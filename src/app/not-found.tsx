import { Metadata } from "next";
import { NotFoundContent } from "@/components/feature/NotFound/NotFoundContent";

export const metadata: Metadata = {
  title: "Page Not Found | Calqulation",
  description: "Sorry, the page you're looking for cannot be found. Return to Calqulation's homepage.",
  robots: {
    index: false,
    follow: true,
  }
};

// This ensures the component is rendered as a Server Component without client-side interactivity
export default function NotFound() {
  return <NotFoundContent />;
}

