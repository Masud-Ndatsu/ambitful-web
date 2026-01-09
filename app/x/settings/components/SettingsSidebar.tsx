"use client";
import {
  User,
  Bell,
  Shield,
  Sparkles,
  FileText,
  CreditCard,
  Accessibility,
  Globe,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SettingsSection =
  | "account"
  | "notifications"
  | "privacy"
  | "personalization"
  | "documents"
  | "billing"
  | "accessibility"
  | "language"
  | "support";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const settingsNavItems = [
  { id: "account" as const, label: "Account Settings", icon: User },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "privacy" as const, label: "Privacy & Security", icon: Shield },
  {
    id: "personalization" as const,
    label: "Personalization & AI",
    icon: Sparkles,
  },
  { id: "documents" as const, label: "Document Management", icon: FileText },
  { id: "billing" as const, label: "Billing & Subscription", icon: CreditCard },
  { id: "accessibility" as const, label: "Accessibility", icon: Accessibility },
  { id: "language" as const, label: "Language & Localization", icon: Globe },
  { id: "support" as const, label: "Support & Legal", icon: HelpCircle },
];

export function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <nav className="w-[26rem] bg-white border-r border-[#E3E3E3] p-6">
      <ul className="space-y-2">
        {settingsNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[1.4rem] font-medium transition-colors",
                  isActive
                    ? "bg-[#E8F5F1] text-[#03624C] border-l-4 border-[#03624C]"
                    : "text-[#344054] hover:bg-gray-50"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
