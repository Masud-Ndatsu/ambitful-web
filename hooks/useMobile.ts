"use client";
import { useState, useEffect } from "react";

export const useMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [breakpoint]);

  // Return false during server-side rendering to match client initial state
  if (!mounted) return false;
  
  return isMobile;
};