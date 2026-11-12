"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function GivePage() {
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [activeTab, setActiveTab] = useState("naira");
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Luxurious Parallax on Hero Image
      gsap.to(".give-parallax-bg", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 150,
        ease: "none",
      });

      // Silky fade up for hero elements
      gsap.from(".give-hero-el", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2,
      });

      // Silky fade up for sections
      gsap.utils.toArray(".give-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  const copyToClipboard = (text, accountType) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountType);
    setTimeout(() => setCopiedAccount(null), 2000);
  };
  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-black text-white selection:bg-jcc-gold selection:text-black"
    >
      {/* HERO SECTION - MASSIVE IMAGE & CLEAN TYPOGRAPHY */}
      <section className="hero-section relative min-h-[38rem] h-[82svh] md:h-[86vh] max-h-[52rem] flex items-end pb-20 md:pb-24 overflow-hidden">
        {/* Full Bleed Parallax Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/give.jpg"
            alt="Give"
            fill
            className="give-parallax-bg object-cover object-center opacity-60 scale-110"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <p className="give-hero-el text-jcc-gold font-medium tracking-[0.3em] uppercase text-sm mb-6">
              Give
            </p>

            <h1 className="give-hero-el text-5xl sm:text-7xl lg:text-8xl font-light mb-8 leading-tight tracking-tight">
              Your Generosity <br />
              <span className="font-semibold text-jcc-gold">Our Mission</span>
            </h1>

            <p className="give-hero-el text-lg md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mb-12">
              Give towards our mission to reach a billion souls in ten thousand
              cities with the message of the gospel.
            </p>

            <div className="give-hero-el flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <a
                href="#give-now"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-jcc-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Give Now</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#other-ways"
                className="group inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Other Ways</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY BANK DETAILS SECTION */}
      <section
        id="give-now"
        className="give-section scroll-mt-24 py-20 md:py-28 bg-white text-black"
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            {/* Sticky Header Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight tracking-tight">
                Ways to Give
              </h2>
              <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
                Join us as we put our money right where our faith is, partnering
                with God for the spread of the gospel.
              </p>
            </div>

            {/* Account Details Column */}
            <div className="lg:col-span-7 rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8 lg:p-10 shadow-sm">
              {/* Ultra-Minimal Tab Switcher */}
              <div className="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-2 mb-10 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("naira")}
                  aria-pressed={activeTab === "naira"}
                  className={`pb-3 text-xs sm:text-sm font-medium tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-colors duration-300 relative ${activeTab === "naira" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
                >
                  Naira Account
                  {activeTab === "naira" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("domiciliary")}
                  aria-pressed={activeTab === "domiciliary"}
                  className={`pb-3 text-xs sm:text-sm font-medium tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-colors duration-300 relative ${activeTab === "domiciliary" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
                >
                  Domiciliary Account
                  {activeTab === "domiciliary" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                  )}
                </button>
              </div>

              {/* Account Views */}
              <div className="min-h-[22rem]">
                {activeTab === "naira" && (
                  <div className="animate-in fade-in duration-700">
                    <div className="mb-8">
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">
                        Bank
                      </p>
                      <p className="text-2xl sm:text-3xl font-light">Access Bank</p>
                    </div>

                    <div className="mb-8">
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">
                        Account Name
                      </p>
                      <p className="text-lg sm:text-xl font-light text-gray-800">
                        Jubilee Christian Centre Amakohia
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">
                        Account Number
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard("0077404368", "Access Bank")
                        }
                        aria-label={
                          copiedAccount === "Access Bank"
                            ? "Account number copied"
                            : "Copy account number"
                        }
                        className="group w-full border-b border-gray-200 pb-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jcc-gold focus-visible:ring-offset-4"
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.12em] sm:tracking-[0.16em] text-black">
                            0077404368
                          </span>
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white transition-colors group-hover:bg-gray-200">
                            {copiedAccount === "Access Bank" ? (
                              <Check className="h-5 w-5 text-green-600" />
                            ) : (
                              <Copy className="h-5 w-5 text-gray-500 transition-colors group-hover:text-black" />
                            )}
                          </span>
                        </span>
                        <span className="mt-2 block text-xs text-gray-500">
                          {copiedAccount === "Access Bank"
                            ? "Copied to clipboard"
                            : "Tap to copy account number"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "domiciliary" && (
                  <div className="animate-in fade-in duration-700">
                    <div className="mb-12">
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">
                        International
                      </p>
                      <p className="text-3xl font-light mb-6">
                        Domiciliary Account
                      </p>
                      <p className="text-xl font-light text-gray-500 leading-relaxed max-w-md">
                        For international donations and foreign currency
                        transfers, please reach out to our finance team
                        directly.
                      </p>
                    </div>

                    <Link
                      href="/contact#partnership"
                      className="group inline-flex items-center text-black hover:text-gray-500 transition-colors duration-500 pb-2 border-b border-black hover:border-gray-500"
                    >
                      <span className="text-sm tracking-[0.2em] uppercase font-medium">
                        Contact Finance
                      </span>
                      <ArrowRight className="h-4 w-4 ml-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT IMAGE/TEXT SECTION (WHY GIVE / OTHER WAYS) */}
      <section id="other-ways" className="give-section scroll-mt-24 bg-[#111] text-white">
        <div className="grid md:grid-cols-2 md:min-h-[80vh]">
          {/* Half Image */}
          <div className="relative h-[40vh] min-h-[18rem] md:h-auto">
            <Image
              src="/images/reach.jpg"
              alt="Worship"
              fill
              className="object-cover opacity-80"
              unoptimized
            />
          </div>

          {/* Half Content */}
          <div className="p-8 sm:p-10 md:p-14 lg:p-20 flex flex-col justify-center">
            <div className="mb-16 md:mb-20">
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-jcc-gold mb-6">
                Mobile Transfer
              </h3>
              <p className="text-3xl font-light leading-tight mb-8">
                Quick, secure giving directly from your mobile banking app.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-4 text-gray-400 font-light">
                  <span className="w-1.5 h-1.5 bg-jcc-gold rounded-full" />
                  <span>Instant transfer</span>
                </li>
                <li className="flex items-center space-x-4 text-gray-400 font-light">
                  <span className="w-1.5 h-1.5 bg-jcc-gold rounded-full" />
                  <span>No additional fees</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-jcc-gold mb-6">
                The Impact
              </h3>
              <div className="space-y-8 md:space-y-10">
                <div>
                  <h4 className="text-xl font-medium mb-2">Witnesses Sent</h4>
                  <p className="text-gray-400 font-light">
                    Supporting evangelism and outreach to unreached communities
                    globally.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-2">People Equipped</h4>
                  <p className="text-gray-400 font-light">
                    Equipping and raising the next generation of leaders and
                    ministers.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-2">Nations Reached</h4>
                  <p className="text-gray-400 font-light">
                    Planting churches and transforming cities with the power of
                    the Gospel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL QUOTE (Minimal) */}
      <section className="give-section py-24 md:py-32 bg-black text-center px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-12">
            2 Corinthians 9:7
          </p>
          <p className="text-2xl sm:text-3xl md:text-5xl font-light leading-tight text-white mb-12 italic">
            &quot;Each of you should give what you have decided in your heart to
            give... for God loves a cheerful giver.&quot;
          </p>
          <div className="w-px h-24 bg-jcc-gold mx-auto" />
        </div>
      </section>
    </main>
  );
}
