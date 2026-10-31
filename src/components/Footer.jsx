"use client";

import Link from "next/link";
import Image from "next/image";
import { Youtube, Instagram, MessageCircle } from "lucide-react";
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
  const socialLinks = [
    {
      label: footer.social.youtube,
      href: "https://youtube.com/@TheLightCommunity",
      icon: Youtube,
    },
    {
      label: footer.social.instagram,
      href: "https://instagram.com/thelight_community",
      icon: Instagram,
    },
    {
      label: footer.social.whatsapp,
      href: "https://chat.whatsapp.com/G395zowpEcAFfYWrmFlyGI",
      icon: MessageCircle,
    },
    {
      label: footer.social.tiktok,
      href: "https://www.tiktok.com/@the.lightcommunity?_r=1&_t=ZS-917gOMTaYuC",
      icon: TikTokIcon,
    },
  ];

  return (
    <footer className="relative z-20 bg-tlcc-green text-white">
      <div className="container-custom py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Image
              src="/images/tlcc-logo.png"
              alt="The Light Community Church"
              width={160}
              height={60}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {footer.tagline}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-tlcc-green-light hover:bg-tlcc-gold rounded-lg transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-tlcc-gold uppercase">
              {sections.connect.heading}
            </h3>
            <ul className="space-y-2">
              {sections.connect.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-tlcc-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-tlcc-gold uppercase">
              {sections.ministries.heading}
            </h3>
            <ul className="space-y-2">
              {sections.ministries.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-tlcc-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-tlcc-gold uppercase">
              {sections.resources.heading}
            </h3>
            <ul className="space-y-2">
              {sections.resources.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-tlcc-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Media */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-tlcc-gold uppercase">
              {sections.media.heading}
            </h3>
            <ul className="space-y-2">
              {sections.media.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-tlcc-gold transition-colors duration-200 text-sm"
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

        {/* Contact Info */}
        <div className="border-t border-tlcc-green-light pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-tlcc-gold">
                {footer.contact.heading}
              </h4>
              {footer.contact.people.map((person) => (
                <p key={person.phone} className="text-gray-300 text-sm">
                  {person.name}:{" "}
                  <a
                    href={`tel:${person.phone}`}
                    className="hover:text-tlcc-gold"
                  >
                    {person.phone}
                  </a>
                </p>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-tlcc-gold">
                {footer.services.heading}
              </h4>
              {footer.services.lines.map((line) => (
                <p key={line} className="text-gray-300 text-sm">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-tlcc-green-light pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
