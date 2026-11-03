"use client";

// ...existing code...
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/providers/LanguageProvider";
const navRoutes = {
  home: "/",
  about: "/about",
  devotionals: "/devotionals",
  quickLinks: "/quick-links",
  ministries: "/ministries",
  events: "/events",
  sermons: "/sermons",
  map: "/map",
  give: "/give",
};
const desktopNav = [
  "about",
  "devotionals",
  "ministries",
  "events",
  "sermons",
  "map",
  "give",
];
const mobileNav = [
  "home",
  "about",
  "devotionals",
  "ministries",
  "events",
  "sermons",
  "map",
  "give",
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const { messages } = useLanguage();
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        // Mobile behavior: show on scroll up OR after stopping, hide on scroll down
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          // Scrolling up or near top - show immediately
          setVisible(true);
          clearTimeout(scrollTimeout);
        } else {
          // Scrolling down - hide immediately, but show after stopping
          setVisible(false);
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setVisible(true);
          }, 200);
        }
      } else {
        // Desktop behavior: show on scroll up, hide on scroll down
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          // Scrolling up or near top
          setVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and not near top
          setVisible(false);
        }
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);
  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-lg ${isOpen ? "hidden" : ""} ${visible ? "translate-y-0" : "-translate-y-full"} py-0`}
      >
        <div className="max-w-full pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
          <div className="flex items-center h-16 md:h-20 lg:h-24">
            {/* Logo - Far Left */}
            <Link href="/" className="flex items-center relative z-10">
              <Image
                src="/images/jcc-logo.png"
                alt="The Jubilee Christian Centre Church Logo"
                width={420}
                height={150}
                className="h-20 w-auto md:h-24 lg:h-28"
                priority
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
              {desktopNav.map((key) => {
                const label =
                  key === "devotionals" ? "Devotionals" : messages.nav[key];
                return (
                  <Link
                    key={key}
                    href={navRoutes[key]}
                    className="px-3 py-1 text-jcc-navy hover:text-jcc-gold transition-colors duration-200 font-medium uppercase text-[10px] tracking-wider"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Language selector + Hamburger button */}
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 rounded-lg hover:bg-jcc-cream transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 text-jcc-navy" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu - Fixed Version */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-[60] overflow-y-auto animate-fade-in">
          {/* Logo and Close Button at Top */}
          <div className="fixed top-0 left-0 right-0 z-[70] bg-black pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
            <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
              {/* Logo - Far Left */}
              <Link href="/" className="flex items-center relative z-10">
                <Image
                  src="/images/jcc-logo.png"
                  alt="Jubilee Christian Centre Church Logo"
                  width={420}
                  height={150}
                  className="h-20 w-auto md:h-24 lg:h-28"
                  priority
                />
              </Link>
              {/* Close Button - Far Right */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-900 transition-colors ml-auto"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          <div className="min-h-screen flex flex-col pt-28 md:pt-40 lg:pt-48 pb-16 px-8 md:px-16 lg:px-20">
            <div className="mb-10 block md:hidden text-white">
              <LanguageSwitcher
                variant="dark"
                className="text-white"
                showLabelOnMobile
              />
            </div>
            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-24 lg:gap-40 xl:gap-56">
              {/* Left Column - Main Navigation */}
              <div className="flex flex-col justify-start">
                <nav className="flex flex-col space-y-1 pl-[10px]">
                  {mobileNav.map((key) => {
                    const href = navRoutes[key];
                    const isActive = pathname === href;
                    // For 'devotionals', use a custom label
                    const label =
                      key === "devotionals" ? "Devotionals" : messages.nav[key];
                    return (
                      <Link
                        key={key}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={`font-anton text-5xl md:text-6xl lg:text-7xl ${isActive ? "text-jcc-gold" : "text-white hover:text-jcc-gold"} transition-colors duration-200 leading-none uppercase`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Right Section - Column Grid with Media on New Line */}
              <div className="flex flex-col gap-y-12 ml-4 md:ml-32 lg:ml-40">
                {/* Top Row - Three Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12">
                  {/* Ministries Column */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
                      Ministries
                    </h3>
                    <nav className="flex flex-col space-y-3">
                      <Link
                        href="/ministries#jcc-online"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        JCC Online ministry
                      </Link>
                      <Link
                        href="/ministries#jcc-firestorm"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        JCC Firestorm
                      </Link>
                      <Link
                        href="/ministries#jcc-follow-up"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        JCC Follow up
                      </Link>
                      <Link
                        href="/ministries#jcc-prayer-team"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        JCC Prayer team
                      </Link>
                      <Link
                        href="/ministries#jcc-media-visibility"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        JCC Media & visibility
                      </Link>
                      <Link
                        href="/ministries#jcc-growth-initiatives"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        JCC Growth initiatives
                      </Link>
                    </nav>
                  </div>

                  {/* Resources Column */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
                      Resources
                    </h3>
                    <nav className="flex flex-col space-y-3">
                      <Link
                        href="/sermons#featured"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        Daily Devotionals
                      </Link>
                      <Link
                        href="/about#testimonies"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        Testimonies
                      </Link>
                      <Link
                        href="/events"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        Events & Programs
                      </Link>
                      <Link
                        href="/sermons"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        Sermon Archive
                      </Link>
                    </nav>
                  </div>

                  {/* Connect Column */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
                      Connect
                    </h3>
                    <nav className="flex flex-col space-y-3">
                      <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        Contact Us
                      </Link>
                      <Link
                        href="/map"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        Visit JCC
                      </Link>
                      <Link
                        href="/contact#become-member"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                      >
                        Become a member
                      </Link>
                    </nav>
                  </div>
                </div>

                {/* Bottom Row - Media Column */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
                    Media
                  </h3>
                  <nav className="flex flex-col space-y-3">
                    <a
                      href="https://youtube.com/@jccchurch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-jcc-gold transition-colors duration-200"
                    >
                      Watch online
                    </a>
                  </nav>
                </div>

                {/* Copyright and Social Icons */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    {/* Copyright - Left */}
                    <p className="text-sm text-gray-600">
                      © Copyright {new Date().getFullYear()} The Jubilee
                      Christian Centre Church. All Rights Reserved.
                    </p>

                    {/* Social Icons - Right */}
                    <div className="flex items-center space-x-3">
                      <a
                        href="https://youtube.com/@jccchurch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
                      >
                        <span className="sr-only">YouTube</span>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com/thejubilee_church"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
                      >
                        <span className="sr-only">Instagram</span>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                          <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href="https://chat.whatsapp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
                      >
                        <span className="sr-only">WhatsApp</span>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </a>
                      <a
                        href="https://tiktok.com/@thejubilee_church"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
                      >
                        <span className="sr-only">TikTok</span>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
