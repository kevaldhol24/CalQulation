"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { FaChevronUp } from "react-icons/fa";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isCommentsFabPresent, setIsCommentsFabPresent] =
    useState<boolean>(false);
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle scroll event to show/hide the button
  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 200) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Run once on initial load
    handleScroll();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check for comments FAB and update when pathname changes
  useEffect(() => {
    // Check if the comments FAB is present after a small delay to ensure DOM is updated
    const checkCommentsFab = () => {
      if (typeof document !== "undefined") {
        const commentFab = document.getElementById("comment-fab");
        setIsCommentsFabPresent(commentFab !== null);
      }
    };

    // Use setTimeout to ensure the DOM has been updated after route changes
    checkCommentsFab();
  }, [pathname]); // Re-run when pathname changes

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size={"icon"}
      className={`h-[40px] w-[40px] fixed rounded-full bg-purple-600 hover:bg-purple-800 transition-all duration-300 z-50 shadow-lg hover:scale-110${
        isCommentsFabPresent ? " bottom-6 right-43" : " bottom-6 right-6"
      }`}
      aria-label="Back to top"
    >
      <FaChevronUp />
    </Button>
  );
};
