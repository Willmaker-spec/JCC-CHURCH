"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Devotionals() {
  const { language, messages } = useLanguage();
  const devotionals = messages.home.devotionals;
  const locale =
    language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : "en-US";
  const today = new Date().toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="bg-gradient-to-br from-[#f8f3ea] via-[#f4efe7] to-[#efe9dc] py-16 md:py-24">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-jcc-gold">
            {devotionals.badge}
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-jcc-navy md:text-5xl">
            {devotionals.heading}
          </h2>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-[28px] border border-jcc-gold/20 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] sm:p-7 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-jcc-gold/10 p-3">
                  <BookOpen className="h-6 w-6 text-jcc-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-jcc-navy-light">
                    {devotionals.cardSubtitle}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-jcc-navy-light sm:text-sm">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{today}</span>
                  </div>
                </div>
              </div>

              <h3 className="mb-3 break-words text-2xl font-bold leading-tight text-jcc-navy sm:text-[28px]">
                {devotionals.cardTitle}
              </h3>

              <p className="mb-4 break-words text-sm italic text-jcc-navy-light">
                {devotionals.verse} — {devotionals.verseRef}
              </p>

              <p className="mb-6 break-words text-sm leading-relaxed text-jcc-navy-light sm:text-base">
                {devotionals.cardBody}
              </p>

              <Link
                href="/devotionals"
                className="group inline-flex items-center gap-2 font-semibold text-jcc-gold transition-colors hover:text-jcc-gold-dark"
              >
                <span>{devotionals.cta}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-jcc-gold/20 bg-white/80 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-8">
                <h3 className="mb-4 text-2xl font-bold text-jcc-navy md:text-3xl">
                  {devotionals.introTitle}
                </h3>
                <p className="text-base leading-relaxed text-jcc-navy-light">
                  {devotionals.introBody}
                </p>
              </div>

              <div className="space-y-4 rounded-[28px] border border-jcc-gold/20 bg-[#fffaf1] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:p-8">
                {devotionals.benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 rounded-lg bg-jcc-gold/10 p-2">
                      <span className="text-xl">{benefit.emoji}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="mb-1 font-semibold text-jcc-navy">
                        {benefit.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-jcc-navy-light">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/devotionals"
                className="inline-flex items-center justify-center rounded-full bg-jcc-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-jcc-gold-dark shadow-[0_12px_24px_rgba(218,160,75,0.25)]"
              >
                {devotionals.primaryCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
