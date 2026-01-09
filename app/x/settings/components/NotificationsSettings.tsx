"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface NotificationOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export function NotificationsSettings() {
  const [notifications, setNotifications] = useState<NotificationOption[]>([
    {
      id: "email_opportunities",
      label: "New Opportunities",
      description: "Get notified when new opportunities match your profile",
      enabled: true,
    },
    {
      id: "email_applications",
      label: "Application Updates",
      description: "Receive updates about your job applications",
      enabled: true,
    },
    {
      id: "email_recommendations",
      label: "AI Recommendations",
      description: "Get personalized opportunity recommendations from our AI",
      enabled: false,
    },
    {
      id: "email_newsletter",
      label: "Weekly Newsletter",
      description: "Receive our weekly digest of top opportunities",
      enabled: true,
    },
    {
      id: "email_marketing",
      label: "Marketing & Promotions",
      description: "Receive information about new features and promotions",
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
        <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-2">
          Email Notifications
        </h3>
        <p className="text-[1.4rem] text-[#676F7E] mb-6">
          Choose which emails you&apos;d like to receive
        </p>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0"
            >
              <Checkbox
                id={notification.id}
                checked={notification.enabled}
                onCheckedChange={() => toggleNotification(notification.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor={notification.id}
                  className="text-[1.4rem] font-medium text-[#0F1729] cursor-pointer"
                >
                  {notification.label}
                </label>
                <p className="text-[1.3rem] text-[#676F7E]">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
        <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-2">
          Push Notifications
        </h3>
        <p className="text-[1.4rem] text-[#676F7E] mb-4">
          Enable browser push notifications for real-time updates
        </p>
        <div className="flex items-center gap-4">
          <Checkbox id="push_enabled" />
          <label
            htmlFor="push_enabled"
            className="text-[1.4rem] text-[#344054] cursor-pointer"
          >
            Enable push notifications
          </label>
        </div>
      </section>
    </div>
  );
}
