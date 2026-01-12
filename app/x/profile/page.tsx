"use client";
import React, { useState } from "react";
import { TopBar } from "../components/TopBar";
import { Button } from "@/components/ui/button";
import { useAuth, useUpdateProfile } from "@/hooks/useAuthentication";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  Plus,
  X,
} from "lucide-react";
import Image from "next/image";

interface ProfileFormData {
  name: string;
  email: string;
  phone?: string;
  jobFunction?: string;
  preferredLocations: string[];
  workAuthorization?: string;
  remoteWork: boolean;
}

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [locations, setLocations] = useState<string[]>(
    (user as any)?.preferredLocations || []
  );
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: (user as any)?.phone || "",
      jobFunction: (user as any)?.jobFunction || "",
      preferredLocations: (user as any)?.preferredLocations || [],
      workAuthorization: (user as any)?.workAuthorization || "",
      remoteWork: (user as any)?.remoteWork || false,
    },
  });

  React.useEffect(() => {
    if (user) {
      const userLocations = (user as any)?.preferredLocations || [];
      setLocations(userLocations);
      reset({
        name: user.name,
        email: user.email,
        phone: (user as any)?.phone || "",
        jobFunction: (user as any)?.jobFunction || "",
        preferredLocations: userLocations,
        workAuthorization: (user as any)?.workAuthorization || "",
        remoteWork: (user as any)?.remoteWork || false,
      });
    }
  }, [user, reset]);

  const addLocation = () => {
    if (locationInput.trim() && !locations.includes(locationInput.trim())) {
      const newLocations = [...locations, locationInput.trim()];
      setLocations(newLocations);
      setLocationInput("");
    }
  };

  const removeLocation = (locationToRemove: string) => {
    const newLocations = locations.filter((loc) => loc !== locationToRemove);
    setLocations(newLocations);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLocation();
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync({
        name: data.name,
        phone: data.phone,
        jobFunction: data.jobFunction,
        preferredLocations: locations,
        workAuthorization: data.workAuthorization,
        remoteWork: data.remoteWork,
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8F9FA]">
        <TopBar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03624C] mx-auto mb-4"></div>
            <p className="text-[1.6rem] text-gray-600">Loading profile...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <TopBar />
      <div className="max-w-480 mx-auto p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-[#E3E3E3] p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24 rounded-full bg-linear-to-br from-[#03624C] to-[#00df82] flex items-center justify-center text-white text-[3rem] font-bold">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <h1 className="text-[2.8rem] font-degular font-semibold text-[#1A1D23]">
                  {user?.name}
                </h1>
                <p className="text-[1.6rem] text-[#676F7E]">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[1.2rem] font-medium ${
                      user?.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : user?.role === "MODERATOR"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#03624C] text-white text-[1.6rem] px-6 py-3 rounded-xl"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl border border-[#E3E3E3] p-8">
            <h2 className="text-[2.4rem] font-degular font-semibold text-[#1A1D23] mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-[1.6rem] font-medium text-[#1A1D23] mb-2">
                  <User className="h-5 w-5 text-[#676F7E]" />
                  Full Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-[#E3E3E3] rounded-xl text-[1.6rem] focus:outline-none focus:border-[#03624C] disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-[1.4rem] mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-[1.6rem] font-medium text-[#1A1D23] mb-2">
                  <Mail className="h-5 w-5 text-[#676F7E]" />
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  disabled
                  className="w-full px-4 py-3 border border-[#E3E3E3] rounded-xl text-[1.6rem] bg-gray-50 text-gray-600 cursor-not-allowed"
                  placeholder="your.email@example.com"
                />
                <p className="text-[1.2rem] text-[#676F7E] mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-[1.6rem] font-medium text-[#1A1D23] mb-2">
                  <Phone className="h-5 w-5 text-[#676F7E]" />
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-[#E3E3E3] rounded-xl text-[1.6rem] focus:outline-none focus:border-[#03624C] disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Job Function */}
              <div>
                <label className="flex items-center gap-2 text-[1.6rem] font-medium text-[#1A1D23] mb-2">
                  <Briefcase className="h-5 w-5 text-[#676F7E]" />
                  Job Function
                </label>
                <input
                  {...register("jobFunction")}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-[#E3E3E3] rounded-xl text-[1.6rem] focus:outline-none focus:border-[#03624C] disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              {/* Work Authorization */}
              <div>
                <label className="flex items-center gap-2 text-[1.6rem] font-medium text-[#1A1D23] mb-2">
                  <Globe className="h-5 w-5 text-[#676F7E]" />
                  Work Authorization
                </label>
                <input
                  {...register("workAuthorization")}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-[#E3E3E3] rounded-xl text-[1.6rem] focus:outline-none focus:border-[#03624C] disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="e.g., US Citizen, Work Visa"
                />
              </div>

              {/* Preferred Locations */}
              <div className="col-span-full">
                <label className="flex items-center gap-2 text-[1.6rem] font-medium text-[#1A1D23] mb-2">
                  <MapPin className="h-5 w-5 text-[#676F7E]" />
                  Preferred Locations
                </label>

                {/* Location Tags Display */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {locations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#03624C] text-white px-3 py-1 rounded-lg text-[1.4rem]"
                    >
                      <span>{location}</span>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeLocation(location)}
                          className="hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                  {locations.length === 0 && (
                    <span className="text-[1.4rem] text-[#676F7E] italic">
                      No preferred locations added
                    </span>
                  )}
                </div>

                {/* Location Input */}
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-3 border border-[#E3E3E3] rounded-xl text-[1.6rem] focus:outline-none focus:border-[#03624C]"
                      placeholder="e.g., New York, NY"
                    />
                    <Button
                      type="button"
                      onClick={addLocation}
                      disabled={!locationInput.trim()}
                      className="px-4 py-3 bg-[#03624C] text-white rounded-xl hover:bg-[#025541] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Remote Work Preference */}
            <div className="mt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  {...register("remoteWork")}
                  type="checkbox"
                  disabled={!isEditing}
                  className="h-5 w-5 rounded border-[#E3E3E3] text-[#03624C] focus:ring-[#03624C] disabled:opacity-50"
                />
                <span className="text-[1.6rem] text-[#1A1D23]">
                  Open to remote work opportunities
                </span>
              </label>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-8 flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setLocations((user as any)?.preferredLocations || []);
                    setLocationInput("");
                    reset();
                  }}
                  className="bg-gray-200 text-gray-700 text-[1.6rem] px-8 py-3 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={updateProfileMutation.isPending}
                  className="bg-[#03624C] text-white text-[1.6rem] px-8 py-3 rounded-xl"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </form>

        {/* Account Information */}
        <div className="bg-white rounded-2xl border border-[#E3E3E3] p-8 mt-8">
          <h2 className="text-[2.4rem] font-degular font-semibold text-[#1A1D23] mb-6">
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-[1.4rem] text-[#676F7E] mb-1">Member Since</p>
              <p className="text-[1.6rem] font-medium text-[#1A1D23]">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[1.4rem] text-[#676F7E] mb-1">Last Updated</p>
              <p className="text-[1.6rem] font-medium text-[#1A1D23]">
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[1.4rem] text-[#676F7E] mb-1">
                Email Verified
              </p>
              <p className="text-[1.6rem] font-medium text-[#1A1D23]">
                {(user as any)?.isEmailVerified ? (
                  <span className="text-green-600">✓ Verified</span>
                ) : (
                  <span className="text-orange-600">Pending</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-[1.4rem] text-[#676F7E] mb-1">
                Onboarding Status
              </p>
              <p className="text-[1.6rem] font-medium text-[#1A1D23]">
                {(user as any)?.isOnboardingComplete ? (
                  <span className="text-green-600">✓ Completed</span>
                ) : (
                  <span className="text-orange-600">Incomplete</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
