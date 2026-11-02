"use client";

import Link from "next/link";
import {
  Users,
  Heart,
  Music,
  Briefcase,
  Camera,
  BookHeart,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const ministryIcons = [Users, Music, BookHeart, Heart, Camera, Briefcase];
const ministryColors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-purple-500",
];

export default function Ministries() {
  const { messages } = useLanguage();
  const ministriesData = messages.home.ministries;
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-jcc-cream z-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-jcc-gold/10 px-6 py-2 rounded-full mb-4">
            <Users className="h-4 w-4 text-jcc-gold" />
            <span className="text-jcc-gold font-bold text-sm tracking-wider uppercase">
              {ministriesData.badge}
            </span>
          </div>
          <h2 className="font-anton text-4xl md:text-5xl lg:text-6xl text-jcc-navy mb-6 uppercase">
            {ministriesData.headingLine1}
            <br />
            <span className="text-jcc-orange">
              {ministriesData.headingLine2}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {ministriesData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ministriesData.ministries.map((ministry, index) => {
            const Icon = ministryIcons[index % ministryIcons.length];
            const color = ministryColors[index % ministryColors.length];
            return (
              <div
                key={ministry.name}
                className="group bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-jcc-gold cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`inline-flex p-4 ${color} rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-2xl text-jcc-navy mb-3 group-hover:text-jcc-gold transition-colors">
                  {ministry.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {ministry.description}
                </p>
                <div className="flex items-center text-jcc-gold opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-sm">
                  Learn More{" "}
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-jcc-gold via-jcc-orange to-jcc-gold bg-[length:200%_200%] animate-gradient rounded-2xl p-8 flex flex-col justify-center items-center text-center text-white shadow-2xl border-4 border-white/50">
            <div className="text-5xl mb-4 animate-bounce">🙌</div>
            <h3 className="font-anton text-2xl md:text-3xl mb-3 uppercase">
              {ministriesData.ctaCard.heading}
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              {ministriesData.ctaCard.description}
            </p>
            <Link
              href="/ministries"
              className="inline-flex items-center px-8 py-3 bg-white text-jcc-navy font-bold rounded-full hover:bg-jcc-navy hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg uppercase text-sm tracking-wider"
            >
              {ministriesData.ctaCard.button}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-jcc-cream">
          <p className="text-gray-600 mb-4 text-lg">
            {ministriesData.bottomCta.text}
          </p>
          <Link
            href="/ministries"
            className="inline-flex items-center text-jcc-gold hover:text-jcc-orange font-bold transition-colors text-lg group"
          >
            <span>{ministriesData.bottomCta.linkLabel}</span>
            <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
