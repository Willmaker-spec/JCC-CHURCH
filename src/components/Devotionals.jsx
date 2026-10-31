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
    <section className="py-16 md:py-24 bg-gradient-to-br from-tlcc-cream to-tlcc-cream-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-tlcc-gold font-bold text-sm tracking-wider uppercase mb-3">
            {devotionals.badge}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-tlcc-navy font-serif">
            {devotionals.heading}
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Today's Devotional Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-tlcc-gold/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-tlcc-gold" />
                </div>
                <div>
                  <p className="text-xs text-tlcc-navy-light uppercase tracking-wide">
                    {devotionals.cardSubtitle}
                  </p>
                  <div className="flex items-center text-sm text-tlcc-navy-light">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{today}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-tlcc-navy mb-3">
                {devotionals.cardTitle}
              </h3>

              <p className="text-sm text-tlcc-navy-light italic mb-4">
                {devotionals.verse} — {devotionals.verseRef}
              </p>

              <p className="text-tlcc-navy-light leading-relaxed mb-6">
                {devotionals.cardBody}
              </p>

              <Link
                href="/sermons#featured"
                className="inline-flex items-center text-tlcc-gold hover:text-tlcc-gold-dark font-semibold transition-colors"
              >
                <span>{devotionals.cta}</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Devotional Info & CTA */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-tlcc-navy mb-4">
                  {devotionals.introTitle}
                </h3>
                <p className="text-tlcc-navy-light leading-relaxed mb-6">
                  {devotionals.introBody}
                </p>
              </div>

              <div className="space-y-4">
                {devotionals.benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start space-x-3"
                  >
                    <div className="p-2 bg-tlcc-gold/10 rounded-lg mt-1">
                      <span className="text-xl">{benefit.emoji}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-tlcc-navy mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-tlcc-navy-light">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/sermons#featured"
                className="inline-block px-8 py-4 bg-tlcc-gold hover:bg-tlcc-gold-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
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
