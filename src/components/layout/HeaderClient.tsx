"use client";
import { useEffect } from "react";

export const HeaderClient = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("bg-blue-900/85", "header-transparent");
          header.classList.remove("bg-transparent");
        } else {
          header.classList.remove("bg-blue-900/85", "header-transparent");
          header.classList.add("bg-transparent");
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

  return null;
};
