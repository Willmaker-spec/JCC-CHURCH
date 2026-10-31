"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Welcome() {
  const { messages } = useLanguage();
  const welcome = messages.home.welcome;

  const cardImages = [
    "/images/aboutus.JPG",
    "/images/connect.JPG",
    "/images/celebration.jpg",
  ];

  return (
    <section className="relative bg-transparent py-16 md:py-20 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-12 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl">
        {/* Badge - Centered */}
        <div className="flex justify-center mb-8">
          <Link
            href="/give"
            className="inline-block bg-rose-500/90 hover:bg-rose-600 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full transition-colors cursor-pointer"
          >
            {welcome.badgeText}
          </Link>
        </div>

        {/* Welcome Text Section - Left Aligned */}
        <div className="mb-10">
          {/* Sub-label with emoji */}
          <div className="flex items-center gap-1 mb-3">
            <span>🏠</span>
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              {welcome.subLabel}
            </p>
          </div>

          {/* Bold Heading */}
          <h1 className="font-anton text-4xl sm:text-5xl text-black mb-3 leading-none uppercase">
            {welcome.heading}
          </h1>

          {/* Paragraph */}
          <p className="max-w-md text-gray-600 text-base leading-relaxed">
            {welcome.description}
          </p>
        </div>

        {/* Cards Section - 3 Column Grid */}
        <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {welcome.cards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer h-[450px] transition-shadow hover:shadow-2xl"
            >
              <Image
                src={cardImages[index] ?? "/images/aboutus.JPG"}
                alt={card.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              <div className="absolute bottom-0 p-6 text-white">
                <p className="uppercase text-xs font-bold tracking-wider text-gray-300 mb-1">
                  {card.eyebrow}
                </p>
                <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                <button className="text-sm font-semibold flex items-center gap-2 group-hover:underline">
                  {card.cta}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
