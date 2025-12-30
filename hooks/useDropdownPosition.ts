import { useState, useRef, useEffect } from "react";

export type DropdownPosition = "top" | "bottom";

interface UseDropdownPositionOptions {
  isOpen: boolean;
  threshold?: number; // Minimum space required below to position dropdown downward
}

export function useDropdownPosition(options: UseDropdownPositionOptions) {
  const { isOpen, threshold = 200 } = options;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<DropdownPosition>("bottom");

  useEffect(() => {
    if (!isOpen || !buttonRef.current) {
      return;
    }

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const newPosition = spaceBelow < threshold ? "top" : "bottom";
        setPosition(newPosition);
      }
    };

    // Use requestAnimationFrame to avoid sync setState in effect
    requestAnimationFrame(updatePosition);
  }, [isOpen, threshold]);

  return {
    buttonRef,
    position,
    positionClasses: position === "top" ? "bottom-full mb-1" : "top-full mt-1",
  };
}
