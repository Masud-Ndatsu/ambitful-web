"use client";

import { useParams, useRouter } from "next/navigation";
import { useOpportunity, useOpportunities } from "@/hooks/useOpportunities";
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMemo } from "react";
import { TopBar } from "../../components/TopBar";
import { useAuth } from "@/hooks/useAuthentication";

export default function OpportunityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const { data: opportunity, isLoading } = useOpportunity(id);

  // Calculate days ago with proper memoization to avoid impure function calls during render
  const daysAgo = useMemo(() => {
    if (!opportunity) return 0;
    const now = new Date().getTime();
    const createdTime = new Date(opportunity.createdAt).getTime();
    return Math.floor((now - createdTime) / (1000 * 60 * 60 * 24));
  }, [opportunity]);

  // Fetch similar opportunities based on categories
  const categoryIds = opportunity?.opportunityCategories.map(
    (cat) => cat.opportunityType.id
  );
  const { data: similarOpportunitiesData } = useOpportunities(
    {
      category: categoryIds?.join(","),
      limit: 3,
    },
    false
  );

  if (isLoading) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <TopBar isAuth={isAuthenticated} user={user} />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#007947]" />
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <TopBar isAuth={isAuthenticated} user={user} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[2.4rem] font-bold mb-4 text-[#0F1729]">
              Opportunity not found
            </h1>
            <Button onClick={() => router.push("/x/opportunities")}>
              Back to Opportunities
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* TopBar */}
      <TopBar isAuth={isAuthenticated} user={user} />

      {/* Main Content Area */}
      <section className="flex-1 overflow-hidden bg-[#F6F8FB]">
        <div className="h-full flex flex-col overflow-y-scroll">
          {/* Breadcrumbs */}
          <div className="bg-white border-b border-[#E3E3E3] px-8 py-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[1.4rem] text-[#505662] hover:text-[#0F1729] transition-colors font-degular"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Opportunities</span>
              <span>/</span>
              <span className="text-[#0F1729] font-medium">
                {opportunity.title}
              </span>
            </button>
          </div>

          {/* Content Container */}
          <div className="max-w-[1400px] mx-auto px-8 py-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header Card */}
                <div className="bg-white rounded-2xl p-8 border border-[#E3E3E3]">
                  <div className="flex flex-col lg:flex-row items-start gap-6">
                    <div className="flex items-start gap-6 flex-1 min-w-0">
                      {/* Company Logo */}
                      <div className="h-[6.4rem] w-[6.4rem] grid place-items-center bg-[#007947] text-white rounded-2xl shrink-0 font-bold text-[2.4rem]">
                        {opportunity.organization.charAt(0).toUpperCase()}
                      </div>

                      {/* Title and Meta */}
                      <div className="flex-1 min-w-0">
                        <h1 className="text-[2.8rem] font-bold text-[#0F1729] mb-2 font-degular break-words">
                          {opportunity.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-[1.4rem] text-[#505662] mb-4 font-degular">
                          <span className="font-medium">
                            {opportunity.organization}
                          </span>
                          <span>•</span>
                          <span>{opportunity.locations[0] || "Remote"}</span>
                          <span>•</span>
                          <span>Posted {daysAgo} days ago</span>
                        </div>
                        <div className="flex flex-col items-start gap-3">
                          {opportunity.opportunityCategories.map((cat) => (
                            <Badge
                              key={cat.opportunityType.id}
                              className="bg-[#F6F8FB] text-[#0F1729] border-0 text-[1.2rem] px-3 py-1 font-degular"
                            >
                              {cat.opportunityType.name}
                            </Badge>
                          ))}
                          {opportunity.compensation && (
                            <Badge className="bg-[#E7F5E1] text-[#007947] border-0 text-[1.2rem] px-3! py-2! font-semibold font-degular break-words whitespace-normal">
                              {opportunity.compensation}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="w-full lg:w-auto lg:shrink-0">
                      <Button
                        className="w-full lg:w-auto bg-[#007947] hover:bg-[#00df82] text-white text-[1.4rem] font-semibold px-8 py-6 rounded-xl transition-colors"
                        onClick={() => {
                          if (opportunity.applicationUrl) {
                            window.open(opportunity.applicationUrl, "_blank");
                          }
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>

                {/* About the Role */}
                <div className="bg-white rounded-2xl p-8 border border-[#E3E3E3]">
                  <h2 className="text-[2rem] font-bold text-[#0F1729] mb-4 font-degular">
                    About the Role
                  </h2>
                  <p className="text-[1.4rem] text-[#505662] leading-relaxed whitespace-pre-wrap font-degular">
                    {opportunity.description}
                  </p>
                </div>

                {/* Requirements */}
                {opportunity.requirements &&
                  opportunity.requirements.length > 0 && (
                    <div className="bg-white rounded-2xl p-8 border border-[#E3E3E3]">
                      <h2 className="text-[2rem] font-bold text-[#0F1729] mb-4 font-degular">
                        Requirements
                      </h2>
                      <ul className="space-y-3">
                        {opportunity.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-[1.4rem] text-[#505662] font-degular"
                          >
                            <span className="text-[#007947] mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Benefits & Perks */}
                {opportunity.benefits && opportunity.benefits.length > 0 && (
                  <div className="bg-white rounded-2xl p-8 border border-[#E3E3E3]">
                    <h2 className="text-[2rem] font-bold text-[#0F1729] mb-6 font-degular">
                      Benefits & Perks
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {opportunity.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-[#F6F8FB] rounded-xl"
                        >
                          <div className="h-10 w-10 rounded-lg bg-[#007947] flex items-center justify-center shrink-0">
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-[1.4rem] text-[#0F1729] font-medium font-degular">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Application Deadline */}
                <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-[#505662]" />
                    <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                      Application Deadline
                    </span>
                  </div>
                  <p className="text-[1.4rem] font-bold text-[#0F1729] font-degular">
                    {formatDate(opportunity.deadline)}
                  </p>
                </div>

                {/* Eligibility */}
                {opportunity.eligibility &&
                  opportunity.eligibility.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="h-5 w-5 text-[#505662]" />
                        <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                          Eligibility
                        </span>
                      </div>
                      <p className="text-[1.4rem] font-bold text-[#0F1729] font-degular">
                        {opportunity.eligibility.join(", ")}
                      </p>
                    </div>
                  )}

                {/* Experience Level */}
                {opportunity.experienceLevel && (
                  <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-[#505662]" />
                      <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                        Experience Level
                      </span>
                    </div>
                    <p className="text-[1.4rem] font-bold text-[#0F1729] font-degular">
                      {opportunity.experienceLevel}
                    </p>
                  </div>
                )}

                {/* Duration */}
                {opportunity.duration && (
                  <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-[#505662]" />
                      <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                        Duration
                      </span>
                    </div>
                    <p className="text-[1.4rem] font-bold text-[#0F1729] font-degular">
                      {opportunity.duration}
                    </p>
                  </div>
                )}
                {/* Location */}
                {opportunity.locations && opportunity.locations.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-5 w-5 text-[#505662]" />
                      <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                        Location{opportunity.locations.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {opportunity.locations.map((location, index) => (
                        <p
                          key={index}
                          className="text-[1.4rem] font-bold text-[#0F1729] font-degular"
                        >
                          {location}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Opportunity */}
                <Button
                  variant="outline"
                  className="w-full border-[#E3E3E3] text-[#0F1729] text-[1.4rem] font-semibold py-6 rounded-xl flex items-center justify-center gap-2 hover:bg-[#F6F8FB] font-degular"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link copied!",
                      description: "Opportunity link copied to clipboard",
                    });
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Share Opportunity
                </Button>

                {/* Apply on Company Site */}
                {opportunity.applicationUrl && (
                  <Button
                    className="w-full bg-[#007947] hover:bg-[#00df82] text-white text-[1.4rem] font-semibold py-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    onClick={() =>
                      window.open(opportunity.applicationUrl!, "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4" />
                    Apply on Company Site
                  </Button>
                )}
              </div>
            </div>

            {/* Similar Opportunities */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[2.4rem] font-bold text-[#0F1729] font-degular">
                  Similar Opportunities
                </h2>
                <Button
                  variant="link"
                  className="text-[#007947] text-[1.4rem] font-semibold hover:text-[#00df82] transition-colors"
                  onClick={() => router.push("/x/opportunities")}
                >
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarOpportunitiesData?.opportunities
                  .filter((opp) => opp.id !== id)
                  .slice(0, 3)
                  .map((opp) => (
                    <div
                      key={opp.id}
                      className="bg-white rounded-2xl p-6 border border-[#E3E3E3] cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => router.push(`/x/opportunities/${opp.id}`)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="h-12 w-12 grid place-items-center bg-[#007947] text-white rounded-xl shrink-0 font-bold text-lg">
                          {opp.organization.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[1.4rem] font-semibold text-[#0F1729] mb-1 truncate font-degular">
                            {opp.title}
                          </h3>
                          <p className="text-[1.2rem] text-[#505662] font-degular">
                            {opp.organization}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[1.2rem] text-[#505662] mb-3 font-degular">
                        <span>{opp.locations[0] || "Remote"}</span>
                        {opp.compensation && (
                          <>
                            <span>•</span>
                            <span className="text-[#007947] font-semibold">
                              {opp.compensation}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {opp.opportunityCategories.slice(0, 2).map((cat) => (
                          <Badge
                            key={cat.opportunityType.id}
                            className="bg-[#F6F8FB] text-[#0F1729] border-0 text-[1rem] px-2 py-1 font-degular"
                          >
                            {cat.opportunityType.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
