"use client";
import { Construction } from "lucide-react";

interface PlaceholderSettingsProps {
  title: string;
  description: string;
}

export function PlaceholderSettings({ title, description }: PlaceholderSettingsProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E3E3E3] p-12 text-center">
      <Construction className="w-16 h-16 text-[#676F7E] mx-auto mb-4" />
      <h3 className="text-[2rem] font-semibold text-[#0F1729] mb-2">{title}</h3>
      <p className="text-[1.4rem] text-[#676F7E] max-w-md mx-auto">
        {description}
      </p>
    </div>
  );
}

