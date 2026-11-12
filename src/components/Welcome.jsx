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
    <section className="relative z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(247,247,244,0.9)_40%,_rgba(247,247,244,1)_100%)] py-16 md:py-20">
      <div className="mx-auto max-w-7xl rounded-[30px] border border-[#e7dcc5] bg-white/90 px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ring-1 ring-white/70 backdrop-blur-sm lg:px-8 lg:py-12">
        <div className="mb-8 flex justify-center">
          <Link
            href="/give"
            className="inline-flex items-center rounded-full border border-[#d5ac60] bg-[#f7f0e6] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1f2b3d] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f3e6d5]"
          >
            {welcome.badgeText}
          </Link>
        </div>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">🏠</span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                {welcome.subLabel}
              </p>
            </div>

            <h1 className="mb-4 max-w-3xl font-anton text-4xl uppercase leading-none tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {welcome.heading}
            </h1>
          </div>

          <div className="h-px w-full max-w-[180px] bg-gradient-to-r from-[#d5ac60] via-[#d5ac60] to-transparent lg:w-[180px]" aria-hidden="true" />
        </div>

        <div className="mb-10 max-w-3xl">
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            {welcome.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {welcome.cards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative h-[430px] overflow-hidden rounded-[24px] border border-white/20 shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(15,23,42,0.22)]"
            >
              <Image
                src={cardImages[index] ?? "/images/aboutus.JPG"}
                alt={card.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1729]/85 via-[#0d1729]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
                  {card.eyebrow}
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-white">{card.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#f5d9a0] transition-transform duration-200 group-hover:translate-x-1">
                  {card.cta}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
