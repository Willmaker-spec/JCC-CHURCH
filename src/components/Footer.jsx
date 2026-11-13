"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Youtube, Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

// TikTok SVG Icon Component
const TikTokIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  const { messages } = useLanguage();
  const footer = messages.footer;
  const sections = footer.sections;
  const connectLinks = [
    ...sections.connect.links,
    { label: messages.nav.events, href: "/events" },
    { label: messages.nav.map, href: "/map" },
  ];
  const socialLinks = [
    {
      label: footer.social.youtube,
      href: "https://youtube.com/@jccchurch",
      icon: Youtube,
    },
    {
      label: footer.social.instagram,
      href: "https://instagram.com/jcc",
      icon: Instagram,
    },
    {
      label: footer.social.whatsapp,
      href: "https://chat.whatsapp.com/",
      icon: MessageCircle,
    },
    {
      label: footer.social.tiktok,
      href: "https://www.tiktok.com/@jcc",
      icon: TikTokIcon,
    },
  ];

  return (
    <footer className="relative z-20 overflow-hidden border-t-4 border-jcc-gold bg-gradient-to-br from-[#10243d] via-jcc-navy to-[#0d1b2a] text-slate-200">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 h-96 w-96 rounded-full bg-jcc-gold/[0.06] blur-3xl" />
      <div className="container-custom relative py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Image
              src="/images/jcc-logo.png"
              alt="Jubilee Christian Centre Church"
              width={160}
              height={160}
              className="mb-4 h-14 w-14 rounded-full"
            />
            <p className="mb-5 max-w-sm text-sm leading-6 text-slate-300">
              {footer.tagline}
            </p>
            <Link
              href="/give"
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-jcc-gold px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-jcc-navy transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jcc-gold focus-visible:ring-offset-2 focus-visible:ring-offset-jcc-navy"
            >
              {messages.nav.give}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 bg-white/[0.06] p-2.5 text-slate-200 transition-colors duration-200 hover:border-jcc-gold hover:bg-jcc-gold hover:text-jcc-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jcc-gold"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Church Links */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-jcc-gold">
                {sections.connect.heading}
              </h3>
              <ul className="space-y-3">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors duration-200 hover:text-jcc-gold focus-visible:text-jcc-gold focus-visible:outline-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-jcc-gold">
                {sections.ministries.heading}
              </h3>
              <ul className="space-y-3">
                {sections.ministries.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors duration-200 hover:text-jcc-gold focus-visible:text-jcc-gold focus-visible:outline-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources and Media */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-jcc-gold">
                {sections.resources.heading}
              </h3>
              <ul className="space-y-3">
                {sections.resources.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors duration-200 hover:text-jcc-gold focus-visible:text-jcc-gold focus-visible:outline-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-jcc-gold">
                {sections.media.heading}
              </h3>
              <ul className="space-y-3">
                {sections.media.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors duration-200 hover:text-jcc-gold focus-visible:text-jcc-gold focus-visible:outline-none"
                      {...(link.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-jcc-gold">
                {footer.contact.heading}
              </h4>
              {footer.contact.people.map((person) => (
                <p key={person.phone} className="text-sm leading-6 text-slate-300">
                  {person.name}:{" "}
                  <a
                    href={`tel:${person.phone}`}
                    className="transition-colors hover:text-jcc-gold focus-visible:text-jcc-gold focus-visible:outline-none"
                  >
                    {person.phone}
                  </a>
                </p>
              ))}
            </div>
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-jcc-gold">
                {footer.services.heading}
              </h4>
              {footer.services.lines.map((line) => (
                <p key={line} className="text-sm leading-6 text-slate-300">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-center text-xs text-slate-400 sm:text-left sm:text-sm">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-jcc-gold/60 hover:text-jcc-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jcc-gold"
          >
            Staff login
          </Link>
        </div>
      </div>
    </footer>
  );
}
