"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";

interface AccountSettingsProps {
  user: User | null;
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState((user as any)?.phone || "");

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
        <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-6">
          Basic Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[1.4rem] text-[#344054] mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[1.4rem]! text-[#0F1729] h-16"
            />
          </div>
          <div>
            <label className="block text-[1.4rem] text-[#344054] mb-2">
              Phone Number
            </label>
            <div className="flex gap-3">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-[1.4rem]! text-[#0F1729] h-16 flex-1"
              />
              <Badge
                variant="outline"
                className="h-16! text-[1.2rem]! rounded-[6px] text-[#0F1729] bg-[#D4D7DE] px-10"
              >
                Enabled 2FA
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Password */}
      <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
        <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-4">
          Password
        </h3>
        <Button className="bg-[#03624C] hover:bg-[#024a3a] text-white text-[1.4rem]">
          Change Password
        </Button>
      </section>

      {/* Social Logins */}
      <SocialLoginsSection />

      {/* Account Activity */}
      <AccountActivitySection />

      {/* Data Export */}
      <DataExportSection />

      {/* Danger Zone */}
      <DangerZoneSection />
    </div>
  );
}

function SocialLoginsSection() {
  const socialAccounts = [
    { name: "Google", icon: "G", connected: true, color: "#DB4437" },
    { name: "LinkedIn", icon: "in", connected: false, color: "#0077B5" },
    { name: "Facebook", icon: "f", connected: false, color: "#4267B2" },
  ];

  return (
    <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
      <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-4">
        Social Logins
      </h3>
      <div className="space-y-3">
        {socialAccounts.map((account) => (
          <div
            key={account.name}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[1.2rem] font-bold"
                style={{ backgroundColor: account.color }}
              >
                {account.icon}
              </div>
              <span className="text-[1.4rem] text-[#344054]">
                {account.name}
              </span>
            </div>
            {account.connected ? (
              <span className="text-[1.3rem] text-[#03624C] font-medium">
                Connected
              </span>
            ) : (
              <button className="text-[1.3rem] text-[#03624C] font-medium hover:underline">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function AccountActivitySection() {
  const activities = [
    { action: "Login from Chrome on MacOS", time: "Today at 2:30 PM" },
    { action: "Password changed", time: "3 days ago" },
  ];

  return (
    <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
      <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-4">
        Account Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="py-2">
            <p className="text-[1.4rem] text-[#0F1729]">{activity.action}</p>
            <p className="text-[1.2rem] text-[#676F7E]">{activity.time}</p>
          </div>
        ))}
      </div>
      <button className="text-[1.3rem] text-[#03624C] font-medium hover:underline mt-4">
        View full activity log
      </button>
    </section>
  );
}

function DataExportSection() {
  return (
    <section className="bg-white rounded-xl border border-[#E3E3E3] p-6">
      <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-2">
        Data Export
      </h3>
      <p className="text-[1.4rem] text-[#676F7E] mb-4">
        Download a copy of all your account data
      </p>
      <Button variant="outline" className="text-[1.4rem]">
        Export Account Data
      </Button>
    </section>
  );
}

function DangerZoneSection() {
  return (
    <section className="bg-white rounded-xl border border-red-200 p-6">
      <h3 className="text-[1.8rem] font-semibold text-[#0F1729] mb-2">
        Danger Zone
      </h3>
      <p className="text-[1.4rem] text-[#676F7E] mb-4">
        Permanently delete or deactivate your account
      </p>
      <div className="flex gap-3">
        <Button variant="destructive" className="text-[1.4rem]">
          Delete Account
        </Button>
        <Button variant="outline" className="text-[1.4rem]">
          Deactivate Account
        </Button>
      </div>
    </section>
  );
}
