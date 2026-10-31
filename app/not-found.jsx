"use client";

import Link from "next/link";
import { VideoText } from "@/components/ui/VideoText";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      {/* 404 Section */}
      <div className="min-h-screen bg-gradient-to-br from-black via-tlcc-navy to-black flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* 404 Video Text */}
          <div className="relative w-full h-[300px] md:h-[400px] z-10">
            <VideoText
              src="https://ls29t3z55w.ufs.sh/f/JEKFIJDsOBct0vrmLYJRG8BKHmvZQkWJ9ElIVcNfzPg63Mbo"
              fontFamily="Montserrat, Helvetica, Arial, sans-serif"
              fontSize={25}
              fontWeight="900"
              letterSpacing="0.05em"
              textTransform="uppercase"
              preload="none"
            >
              404
            </VideoText>
          </div>

          {/* Error Message */}
          <div className="relative space-y-4 z-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">
              One sheep wandered away from the flock…
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              But the Shepherd never stops searching.
              <br />
              Let&apos;s bring you home.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/"
              className="group flex items-center gap-2 px-8 py-4 bg-tlcc-gold text-tlcc-navy font-semibold rounded-lg hover:bg-tlcc-gold-light transition-all duration-300 transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="pt-12 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-4">Quick Links</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link
                href="/about"
                className="text-gray-300 hover:text-tlcc-gold transition-colors"
              >
                About Us
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/sermons"
                className="text-gray-300 hover:text-tlcc-gold transition-colors"
              >
                Sermons
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/ministries"
                className="text-gray-300 hover:text-tlcc-gold transition-colors"
              >
                Ministries
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/give"
                className="text-gray-300 hover:text-tlcc-gold transition-colors"
              >
                Give
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-tlcc-gold transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Give to The Light Community Church Section */}
      <section className="relative py-20 bg-gradient-to-br from-tlcc-navy via-tlcc-navy to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #F5B82E 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="p-8 md:p-12 lg:p-16">
                <h2 className="font-anton text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-none uppercase">
                  Give to The Light Community Church
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Your generosity keeps blessing lives, thank you for giving.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/give"
                    className="px-8 py-4 bg-white border-2 border-tlcc-navy text-tlcc-navy font-bold rounded-full hover:bg-tlcc-navy hover:text-white transition-all duration-300 text-center uppercase tracking-wide"
                  >
                    Give Now
                  </Link>
                  <Link
                    href="/give#building-project"
                    className="px-8 py-4 bg-tlcc-gold text-white font-bold rounded-full hover:bg-tlcc-gold-dark transition-all duration-300 text-center uppercase tracking-wide shadow-lg"
                  >
                    Building Project
                  </Link>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="relative bg-gradient-to-br from-red-50 to-pink-100 p-8 md:p-12 lg:p-16 flex items-center justify-center">
                {/* Hand Illustration SVG */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full max-w-sm opacity-30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M150 250 Q 180 200, 220 220 T 280 200 L 300 250 Q 320 280, 290 320 L 250 350 Q 200 380, 150 350 L 120 320 Q 90 280, 120 250 Z"
                    stroke="#E57373"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M180 180 L 180 250"
                    stroke="#E57373"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M220 160 L 220 240"
                    stroke="#E57373"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M260 180 L 260 250"
                    stroke="#E57373"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Message */}
            <div className="bg-tlcc-gold text-center py-6 px-6">
              <p className="text-sm text-tlcc-navy font-medium">
                We promise not to spam you, but send you edifying and amazing
                content regularly from The Light Community Church International.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
