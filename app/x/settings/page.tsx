"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuthentication";
import { TopBar } from "../components/TopBar";
import { SettingsSidebar, SettingsSection } from "./components/SettingsSidebar";
import { AccountSettings } from "./components/AccountSettings";
import { NotificationsSettings } from "./components/NotificationsSettings";
import { PrivacySettings } from "./components/PrivacySettings";
import { PlaceholderSettings } from "./components/PlaceholderSettings";

const sectionTitles: Record<
  SettingsSection,
  { title: string; description: string }
> = {
  account: {
    title: "Account Settings",
    description: "Manage your account information and security settings",
  },
  notifications: {
    title: "Notifications",
    description: "Control how and when you receive notifications",
  },
  privacy: {
    title: "Privacy & Security",
    description: "Manage your privacy settings and account security",
  },
  personalization: {
    title: "Personalization & AI",
    description: "Customize your experience and AI preferences",
  },
  documents: {
    title: "Document Management",
    description: "Manage your uploaded documents and resumes",
  },
  billing: {
    title: "Billing & Subscription",
    description: "View your subscription plan and billing history",
  },
  accessibility: {
    title: "Accessibility",
    description: "Customize accessibility options for a better experience",
  },
  language: {
    title: "Language & Localization",
    description: "Set your preferred language and regional settings",
  },
  support: {
    title: "Support & Legal",
    description: "Get help and view legal information",
  },
};

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("account");

  const renderSettingsContent = () => {
    switch (activeSection) {
      case "account":
        return <AccountSettings user={user} />;
      case "notifications":
        return <NotificationsSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "personalization":
        return (
          <PlaceholderSettings
            title="Personalization & AI"
            description="Configure AI recommendations, theme preferences, and personalization options. Coming soon!"
          />
        );
      case "documents":
        return (
          <PlaceholderSettings
            title="Document Management"
            description="Upload, manage, and organize your resumes, cover letters, and other documents. Coming soon!"
          />
        );
      case "billing":
        return (
          <PlaceholderSettings
            title="Billing & Subscription"
            description="View your current plan, upgrade options, and billing history. Coming soon!"
          />
        );
      case "accessibility":
        return (
          <PlaceholderSettings
            title="Accessibility"
            description="Configure screen reader support, font sizes, contrast settings, and more. Coming soon!"
          />
        );
      case "language":
        return (
          <PlaceholderSettings
            title="Language & Localization"
            description="Set your preferred language, timezone, and date format. Coming soon!"
          />
        );
      case "support":
        return (
          <PlaceholderSettings
            title="Support & Legal"
            description="Access help center, contact support, and view terms of service. Coming soon!"
          />
        );
      default:
        return <AccountSettings user={user} />;
    }
  };

  const currentSection = sectionTitles[activeSection];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <TopBar isAuth={isAuthenticated} user={user} />

      <div className="flex-1 flex overflow-hidden">
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="">
            <header className="mb-8">
              <h1 className="text-[2.4rem] font-semibold text-[#0F1729]">
                {currentSection.title}
              </h1>
              <p className="text-[1.4rem] text-[#676F7E] mt-1">
                {currentSection.description}
              </p>
            </header>

            {renderSettingsContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
