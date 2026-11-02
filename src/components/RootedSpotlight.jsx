"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Sparkles, Users } from "lucide-react";

export default function RootedSpotlight() {
  const rooted = {
    badge: "Announcement",
    title: "HEART ROOM",
    description:
      "A prayer & counseling meeting designed to create space for healing, encouragement, and restoration. You do not want to miss this.",
    experiences: [
      "Prayer and pastoral counseling",
      "Space for healing and encouragement",
      "Community support and restoration",
    ],
    schedule: [
      { label: "Date", value: "Saturday, 31 January 2026" },
      { label: "Time", value: "10:00 AM" },
      {
        label: "Venue",
        value: "The Light House, Opp 43B, Babaponmile Street, Mangoro, Ikeja",
      },
    ],
    mainImageAlt: "Heart Room event",
    hangoutImageAlt: "Heart Room",
    hangoutTitle: "All are welcome",
    hangoutSubtitle: "Come with an expectant heart",
    primaryCta: "Register",
    secondaryCta: "See Events",
  };
  const scheduleIcons = [Calendar, Clock, MapPin];
  const mainImage = "/images/Brand.jpg";
  const hangoutImage = "/images/Brand.jpg";
  return (
    <section className="relative bg-gradient-to-b from-white via-jcc-cream to-white py-20">
      <div className="container-custom grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jcc-orange/10 border border-jcc-orange/30 text-jcc-orange font-semibold tracking-wide uppercase text-xs mb-5">
            <Sparkles className="h-4 w-4" />
            {rooted.badge}
          </p>
          <h2 className="font-anton text-4xl md:text-5xl text-jcc-navy leading-tight mb-4">
            {rooted.title}
          </h2>
          <p className="text-lg text-gray-700 mb-6">{rooted.description}</p>
          <ul className="space-y-3 mb-6">
            {rooted.experiences.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-800">
                <span className="mt-1 h-2 w-2 rounded-full bg-jcc-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {rooted.schedule.map(({ label, value }, idx) => {
              const Icon = scheduleIcons[idx % scheduleIcons.length];
              return (
                <div
                  key={label}
                  className="bg-white rounded-2xl shadow-lg border border-jcc-cream/60 p-4"
                >
                  <Icon className="h-5 w-5 text-jcc-orange mb-2" />
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-jcc-navy">
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Hangout menu removed per request - no food names shown */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-jcc-orange text-white font-bold uppercase tracking-wide shadow-lg hover:scale-105 transition"
            >
              {rooted.primaryCta || "See Events"}
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-jcc-navy text-jcc-navy font-bold uppercase tracking-wide hover:bg-jcc-navy hover:text-white transition"
            >
              {rooted.secondaryCta || "More Details"}
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[30px] overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src={mainImage}
              alt={rooted.mainImageAlt}
              width={900}
              height={1200}
              className="object-cover h-full"
              priority
            />
          </div>
          <div className="absolute -bottom-8 -left-6 w-64">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white rotate-3">
              <Image
                src={hangoutImage}
                alt={rooted.hangoutImageAlt}
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4 mt-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-jcc-orange" />
                <div>
                  <p className="text-sm font-semibold text-jcc-navy">
                    {rooted.hangoutTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {rooted.hangoutSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
