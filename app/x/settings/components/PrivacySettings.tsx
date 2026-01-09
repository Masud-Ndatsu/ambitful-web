"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState("public");

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
        <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-2">
          Profile Visibility
        </h3>
        <p className="text-[1.4rem] text-[#676F7E] mb-4">
          Control who can see your profile information
        </p>
        <Select value={profileVisibility} onValueChange={setProfileVisibility}>
          <SelectTrigger className="w-full max-w-md text-[1.4rem] text-[#0F1729] h-16! bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="public"
              className="text-[1.4rem] text-[#0F1729] h-16! bg-white"
            >
              Public - Anyone can view
            </SelectItem>
            <SelectItem
              value="recruiters"
              className="text-[1.4rem] text-[#0F1729] h-16! bg-white"
            >
              Recruiters Only
            </SelectItem>
            <SelectItem
              value="private"
              className="text-[1.4rem] text-[#0F1729] h-16! bg-white"
            >
              Private - Only you
            </SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
        <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-2">
          Two-Factor Authentication
        </h3>
        <p className="text-[1.4rem] text-[#676F7E] mb-4">
          Add an extra layer of security to your account
        </p>
        <Button className="bg-[#03624C] hover:bg-[#024a3a] text-white text-[1.4rem]">
          Enable 2FA
        </Button>
      </section>

      <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
        <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-2">
          Data Privacy
        </h3>
        <p className="text-[1.4rem] text-[#676F7E] mb-4">
          Manage how your data is used
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Checkbox id="analytics" defaultChecked />
            <div>
              <label
                htmlFor="analytics"
                className="text-[1.4rem] font-medium text-[#0F1729] cursor-pointer"
              >
                Usage Analytics
              </label>
              <p className="text-[1.3rem] text-[#676F7E]">
                Help us improve by sharing anonymous usage data
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Checkbox id="personalization" defaultChecked />
            <div>
              <label
                htmlFor="personalization"
                className="text-[1.4rem] font-medium text-[#0F1729] cursor-pointer"
              >
                Personalized Recommendations
              </label>
              <p className="text-[1.3rem] text-[#676F7E]">
                Allow AI to learn from your activity for better recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
        <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-2">
          Active Sessions
        </h3>
        <p className="text-[1.4rem] text-[#676F7E] mb-4">
          Manage devices where you&apos;re currently logged in
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-[1.4rem] text-[#0F1729]">Chrome on MacOS</p>
              <p className="text-[1.2rem] text-[#676F7E]">Current session</p>
            </div>
            <span className="text-[1.2rem] text-green-600 font-medium">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-[1.4rem] text-[#0F1729]">Safari on iPhone</p>
              <p className="text-[1.2rem] text-[#676F7E]">
                Last active 2 hours ago
              </p>
            </div>
            <button className="text-[1.2rem] text-red-600 font-medium hover:underline">
              Revoke
            </button>
          </div>
        </div>
        <Button variant="outline" className="text-[1.4rem] text-[#0F1729]">
          Sign out all other sessions
        </Button>
      </section>
    </div>
  );
}
