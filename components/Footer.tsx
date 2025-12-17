import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#131418] text-muted-foreground">
      <div className="max-w-[159.7rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Section */}
          <div className="p-8 md:p-16 border-r-0 lg:border-r border-gray-800">
            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
              <h2 className="text-[4rem] md:text-[5rem] font-degular font-bold text-white mb-4">
                Ambitful.ai
              </h2>
              <p className="text-[1.8rem] md:text-[2rem] max-w-xl mb-6">
                Empowering careers through AI-driven opportunities and
                personalized guidance for professional growth.
              </p>
            </div>
            <p className="text-[1.8rem] md:text-[2rem] text-primary">
              support@ambitful.ai
            </p>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-16">
            {/* Services */}
            <div>
              <h3 className="font-medium mb-6 text-[2rem] md:text-[2.3rem] text-white">
                Services
              </h3>
              <ul className="space-y-4 text-[1.8rem] md:text-[2rem]">
                <li>
                  <Link
                    href="/opportunities"
                    className="hover:text-primary transition-colors"
                  >
                    Browse Opportunities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ai-advice"
                    className="hover:text-primary transition-colors"
                  >
                    AI Career Advice
                  </Link>
                </li>
                <li>
                  <Link
                    href="/matching"
                    className="hover:text-primary transition-colors"
                  >
                    Job Matching
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="font-medium mb-6 text-[2rem] md:text-[2.3rem] text-white">
                About
              </h3>
              <ul className="space-y-4 text-[1.8rem] md:text-[2rem]">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/benefits"
                    className="hover:text-primary transition-colors"
                  >
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-medium mb-6 text-[2rem] md:text-[2.3rem] text-white">
                Follow Us
              </h3>
              <div className="flex items-center gap-6">
                <Link
                  href="#"
                  className="hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-800"
                >
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-800"
                >
                  <X className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-800"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-800" />

        <div className="py-8 md:py-12 text-center px-8">
          <p className="text-[1.6rem] md:text-[1.8rem] text-gray-400">
            Copyright © 2025, Ambitful.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
