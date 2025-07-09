import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout";
import { BackToTop } from "@/components/common/BackToTop";
import { cookies } from "next/headers";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export async function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const isMobileApp = isMobileAppCookie?.value === "true";

  // If it's a mobile app, don't render header and footer
  if (isMobileApp) {
    return <>{children}</>;
  }

  // Regular web view with header and footer
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}
