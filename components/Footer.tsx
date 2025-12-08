import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#131418] text-gray-300 font-dm-sans">
      <div className="max-w-608 mx-auto">
        <div className="flex gap-10">
          <div className="max-w-[71.4rem] w-full p-10 border-r border-gray-800">
            <div className="flex gap-10 justify-center">
              {/* Logo + Description */}
              <h2 className="text-[5rem] font-degular font-bold text-white mb-4">
                Ambitful.ai
              </h2>
              <p className="text-[2rem]  tracking-[-0.027rem] max-w-[36.133rem] mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>

            <p className="text-[2rem]">support@ambitful.ai</p>
          </div>
          <div className="max-w-[71.4rem] w-full grid grid-cols-3 p-10">
            {/* Services */}
            <div>
              <h3 className="font-medium mb-4 text-[2.267rem]">Services</h3>
              <ul className="space-y-3 text-[2rem] text-foreground leading-[100%] tracking-[-0.027rem]">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    AmbitfulAI
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    AmbitfulAI
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="font-medium mb-4 text-[2.267rem]">About</h3>
              <ul className="space-y-3 text-[2rem] text-foreground leading-[100%] tracking-[-0.027rem]">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Benefits
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-medium mb-4 text-[2.267rem]">Follow Us</h3>
              <div className="flex items-center gap-5 text-foreground leading-[100%] tracking-[-0.027rem]">
                <Link href="#" className="hover:text-white transition">
                  <Facebook />
                </Link>
                <Link href="#" className="hover:text-white transition">
                  <Twitter />
                </Link>
                <Link href="#" className="hover:text-white transition">
                  <Instagram />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-10 text-center">
          <p className="text-[2rem] text-gray-400">
            Copyright © 2025, Ambitful. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
