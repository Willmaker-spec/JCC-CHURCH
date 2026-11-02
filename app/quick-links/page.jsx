"use client";

import Link from "next/link";
import Image from "next/image";
import {
  UserPlus,
  Users,
  Heart,
  BookOpen,
  MessageCircle,
  Video,
  Globe,
} from "lucide-react";

export default function QuickLinksPage() {
  const sections = [
    {
      title: "Get Connected",
      description:
        "Whether you're new or ready to make JCC your home, start your journey here.",
      icon: UserPlus,
      links: [
        {
          title: "First Timers",
          description:
            "Let us know you visited! Connect with our team and receive a warm welcome.",
          url: "/contact#first-timer",
        },
        {
          title: "New Here?",
          description:
            "Learn about JCC, our vision, and how you can be part of our community.",
          url: "/about",
        },
        {
          title: "Connect With Us",
          description:
            "Join a department and use your gifts to serve. Find where you belong.",
          url: "/ministries",
        },
        {
          title: "Watch Online",
          description:
            "Join our live services every Tuesday and Saturday at 8:30 PM.",
          url: "https://youtube.com/jccchurch",
        },
      ],
    },
    {
      title: "Service Units",
      description: "Discover our service units and find where you can serve.",
      icon: Users,
      links: [
        {
          title: "JCC Online ministry",
          description:
            "Lead and support our online services, community, and virtual care.",
          url: "/ministries#jcc-online",
        },
        {
          title: "JCC Firestorm",
          description:
            "Choir department — lead worship and choral ministry for services and events.",
          url: "/ministries#jcc-firestorm",
        },
        {
          title: "JCC Follow up",
          description:
            "Care for new converts and provide follow-up support and discipleship.",
          url: "/ministries#jcc-follow-up",
        },
        {
          title: "JCC Prayer team",
          description:
            "Intercede and stand in prayer for the needs of our community.",
          url: "/ministries#jcc-prayer-team",
        },
        {
          title: "JCC Media & visibility",
          description:
            "Handle media production, live stream, and public visibility efforts.",
          url: "/ministries#jcc-media-visibility",
        },
        {
          title: "JCC Growth initiatives",
          description:
            "Drive strategic growth projects and organisational development.",
          url: "/ministries#jcc-growth-initiatives",
        },
      ],
    },
    {
      title: "Grow & Be Discipled",
      description:
        "Deepen your faith through our teachings, sermons, and devotionals.",
      icon: BookOpen,
      links: [
        {
          title: "Watch Sermons",
          description:
            "Access our complete library of powerful messages and teachings.",
          url: "/sermons",
        },
        {
          title: "Daily Devotionals",
          description:
            "Start your day with Word-based reflections and spiritual insights.",
          url: "/sermons#featured",
        },
        {
          title: "Bible Study Groups",
          description:
            "Join a small group for deeper fellowship and Scripture study.",
          url: "/contact#bible-study",
        },
      ],
    },
    {
      title: "Give & Support",
      description: "Partner with us to spread the gospel and transform lives.",
      icon: Heart,
      links: [
        {
          title: "Give Online",
          description:
            "Support our mission through tithes, offerings, and special projects.",
          url: "/give#give-now",
        },
        {
          title: "Building Project",
          description:
            "Contribute to our permanent church facility and expansion.",
          url: "/give#give-now",
        },
        {
          title: "Global Missions",
          description:
            "Support our vision to reach a billion souls in ten thousand cities.",
          url: "/give#give-now",
        },
      ],
    },
    {
      title: "Prayer & Care",
      description: "We are here for you in every season of life.",
      icon: MessageCircle,
      links: [
        {
          title: "Prayer Request",
          description:
            "Submit a prayer request. Our intercessors are ready to stand with you.",
          url: "/contact#prayer-request",
        },
        {
          title: "Testimony",
          description:
            "Share what God has done! Tell your story of transformation and victory.",
          url: "/contact#testimony",
        },
        {
          title: "Counselling",
          description:
            "Receive biblical guidance and pastoral support in challenging times.",
          url: "/contact#counselling",
        },
        {
          title: "Contact Pastors",
          description:
            "Reach out to our pastoral team for spiritual guidance and support.",
          url: "/contact#pastoral-support",
        },
      ],
    },
    {
      title: "Stay Connected",
      description: "Follow our services and stay updated with JCC events.",
      icon: Video,
      links: [
        {
          title: "YouTube Channel",
          description:
            "Subscribe to watch live services and past sermons anytime.",
          url: "https://youtube.com/@jccchurch",
        },
        {
          title: "WhatsApp Community",
          description:
            "Join our WhatsApp groups for updates, prayers, and fellowship.",
          url: "https://chat.whatsapp.com/",
        },
        {
          title: "Social Media",
          description:
            "Follow us on Instagram, Facebook, and Twitter for daily inspiration.",
          url: "/contact#general",
        },
        {
          title: "Newsletter",
          description:
            "Subscribe to receive weekly updates, devotionals, and event announcements.",
          url: "/#stay-connected",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-20 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="public\images\quick-link.jpg"
            alt="Quick Links"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-jcc-gold/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-jcc-gold/30">
            <Globe className="h-4 w-4 text-jcc-gold" />
            <span className="text-white font-semibold text-sm tracking-wider uppercase">
              Quick Links
            </span>
          </div>

          <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 uppercase leading-tight">
            Welcome to
            <br />
            <span className="text-jcc-orange">
              Jubilee Christian Centre Church
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-white/90 font-semibold mb-4">
            Your Central Hub for Resources and Connection
          </h2>

          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Find everything you need to get connected, grow in your faith, and
            serve our community. Browse the quick links below to access forms,
            programs, and important information quickly.
          </p>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {sections.map((section, sectionIndex) => {
          const IconComponent = section.icon;
          return (
            <section
              key={sectionIndex}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
            >
              {/* Section Header */}
              <div className="flex items-start space-x-4 mb-6 pb-6 border-b-2 border-gray-100">
                <div className="w-14 h-14 bg-jcc-gold rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="font-anton text-3xl md:text-4xl text-jcc-navy mb-2 uppercase">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 text-lg">{section.description}</p>
                </div>
              </div>

              {/* Links Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.url}
                    className="group bg-gray-50 hover:bg-jcc-navy rounded-xl p-6 transition-all duration-300 border-2 border-transparent hover:border-jcc-navy"
                  >
                    <h3 className="font-bold text-lg text-jcc-navy group-hover:text-white mb-2 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white/90 text-sm transition-colors">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-jcc-orange to-jcc-gold py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-anton text-3xl md:text-4xl mb-4 uppercase">
            Need Help Finding Something?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Can&apos;t find what you&apos;re looking for? Our team is here to
            help.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-jcc-navy font-bold rounded-full hover:bg-jcc-navy hover:text-white border-2 border-white transition-all duration-300 uppercase tracking-wide text-sm"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}

// Page-level metadata removed: client component cannot export `metadata`.
