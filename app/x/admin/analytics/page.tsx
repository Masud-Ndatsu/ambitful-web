import { Button } from "@/components/ui/button";
import AdminLayout from "../../components/AdminLayout";
import { Download } from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import SiteVisitChart from "../../components/SiteVisitChart";
import RegionProgress from "../../components/RegionProgress";

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <main className="p-8 pb-48 max-h-screen overflow-y-scroll scroll-smooth">
        <header className="flex items-center justify-between">
          <h3 className="text-[2rem] leading-[2.4rem] tracking-[-0.6px]">
            Track engagement and performance metrics.
          </h3>
          <Button
            variant={"outline"}
            className="bg-white  py-[1.4rem] px-8 text-[1.8rem] rounded-2xl"
          >
            <Download className="w-8! h-8!" />
            Export Report
          </Button>
        </header>
        <section className="flex gap-6 mt-12">
          <div className="bg-white border border-[#E3E3E3] flex-2 h-[531px] rounded-2xl p-8">
            <div className="flex justify-between items-start">
              <h3 className="text-[2rem] leading-[1.6rem]">
                Top 10 Users This Week
              </h3>
              <p className="text-[1.2rem] leading-[1.6rem]">Monthly</p>
            </div>

            {/* ACtivities */}
            <div className="mt-12 py-2 px-6 flex flex-col gap-4">
              <div className="h-24 border border-[#E3E3E3] rounded-[.6rem] flex items-center justify-between p-6">
                <div className="flex items-center gap-6 text-lg">
                  <Avatar className="w-[2.9rem] h-[2.9rem] rounded-2xl!">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-[#0F1729] text-[1.4rem] font-medium leading-8">
                      Sarah Johnson
                    </h3>
                    <p className="text-[#00000080] text-[1.2rem] font-medium leading-[1.6rem]">
                      Software Engineer
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[1.4rem] text-[#21C45D]">2,847</p>
                  <p className="text-[1.2rem] text-[#00000080]">activities</p>
                </div>
              </div>
              <div className="h-24 border border-[#E3E3E3] rounded-[.6rem] flex items-center justify-between p-6">
                <div className="flex items-center gap-6 text-lg">
                  <Avatar className="w-[2.9rem] h-[2.9rem] rounded-2xl!">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-[#0F1729] text-[1.4rem] font-medium leading-8">
                      Sarah Johnson
                    </h3>
                    <p className="text-[#00000080] text-[1.2rem] font-medium leading-[1.6rem]">
                      Software Engineer
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[1.4rem] text-[#21C45D]">2,847</p>
                  <p className="text-[1.2rem] text-[#00000080]">activities</p>
                </div>
              </div>
              <div className="h-24 border border-[#E3E3E3] rounded-[.6rem] flex items-center justify-between p-6">
                <div className="flex items-center gap-6 text-lg">
                  <Avatar className="w-[2.9rem] h-[2.9rem] rounded-2xl!">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-[#0F1729] text-[1.4rem] font-medium leading-8">
                      Sarah Johnson
                    </h3>
                    <p className="text-[#00000080] text-[1.2rem] font-medium leading-[1.6rem]">
                      Software Engineer
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[1.4rem] text-[#21C45D]">2,847</p>
                  <p className="text-[1.2rem] text-[#00000080]">activities</p>
                </div>
              </div>
              <div className="h-24 border border-[#E3E3E3] rounded-[.6rem] flex items-center justify-between p-6">
                <div className="flex items-center gap-6 text-lg">
                  <Avatar className="w-[2.9rem] h-[2.9rem] rounded-2xl!">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-[#0F1729] text-[1.4rem] font-medium leading-8">
                      Sarah Johnson
                    </h3>
                    <p className="text-[#00000080] text-[1.2rem] font-medium leading-[1.6rem]">
                      Software Engineer
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[1.4rem] text-[#21C45D]">2,847</p>
                  <p className="text-[1.2rem] text-[#00000080]">activities</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white border border-[#E3E3E3] flex-1 rounded-2xl p-8">
              <h3 className="text-[2rem] leading-[1.6rem]">Highest Activity</h3>
            </div>
            <div className="bg-white border border-[#E3E3E3] flex-2 rounded-2xl p-8">
              <h3 className="text-[2rem] leading-[1.6rem]">
                Most Searched Terms
              </h3>
            </div>
          </div>
        </section>

        <section className="flex gap-6 mt-12">
          <div className="bg-white border border-[#E3E3E3] flex-2 h-[345px] rounded-2xl p-8">
            <SiteVisitChart />
          </div>
          <div className="bg-white border border-[#E3E3E3] flex-1 rounded-2xl p-8">
            <h3 className="text-[2rem] leading-[1.6rem]">Top Regions </h3>
            <RegionProgress name="United States" percentage={85} total={3500} />
            <RegionProgress
              name="United Kingdom"
              percentage={65}
              total={30000}
            />{" "}
            <RegionProgress name="Nigeria" percentage={55} total={30000} />{" "}
            <RegionProgress name="United States" percentage={85} total={3000} />{" "}
            <RegionProgress name="Canada" percentage={85} total={30000} />
          </div>
        </section>
        <section className="flex gap-6 mt-12">
          <div className="bg-white border border-[#E3E3E3] flex-2 h-[442px] rounded-2xl p-8"></div>
          <div className="bg-white border border-[#E3E3E3] flex-1 rounded-2xl p-8"></div>
        </section>
      </main>
    </AdminLayout>
  );
}
