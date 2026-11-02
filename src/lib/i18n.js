const englishMessages = {
  nav: {
    home: "Home",
    about: "About",
    quickLinks: "Quick Links",
    ministries: "Ministries",
    events: "Events",
    sermons: "Sermons",
    map: "Find Us",
    give: "Give",
  },
  general: { languageLabel: "Language" },
  hero: {
    visionBadge: "Souls Saved. Men Trained. Nations Taken.",
    lines: [
      { prefix: "The Jubilee ", highlight: "Christian Centre", suffix: "" },
      {
        prefix: "A place where everyone ",
        highlight: "is someone in christ",
        suffix: "",
      },
    ],
    watchLive: "Watch Live",
    quickLinks: "Quick Links",
  },
  home: {
    welcome: {
      badgeText: "Join the mission",
      subLabel: "Welcome to The Jubilee Christian Centre",
      heading: "Souls Saved. Men Trained. Nations Taken.",
      description:
        "A community of believers growing in faith and serving the world.",
      cards: [
        {
          href: "/about",
          imageAlt: "About our church",
          eyebrow: "Who we are",
          title: "About Us",
          cta: "Learn more",
        },
        {
          href: "/ministries",
          imageAlt: "Connect with our community",
          eyebrow: "Find your place",
          title: "Our Ministries",
          cta: "Get connected",
        },
        {
          href: "/events",
          imageAlt: "Church gathering",
          eyebrow: "Gather with us",
          title: "Events",
          cta: "See events",
        },
      ],
    },
    globalFamily: {
      badge: "One global family",
      headline: { line1: "The Jubilee", line2: "Christian Centre" },
      description: {
        titleLine1: "A Church Without",
        titleLine2: "Borders",
        paragraphs: [
          "We are a community of believers committed to sharing the Gospel and raising disciples.",
        ],
        quote: "Souls saved. Men trained. Nations taken.",
        highlights: [
          { value: "One", label: "Family" },
          { value: "Many", label: "Nations" },
        ],
      },
      map: {
        title: "Our Global Reach",
        imageAlt: "The Jubilee Christian Centre global community",
        points: ["Nigeria", "United Kingdom", "United States", "Worldwide"],
      },
      journeyHeading: "Find your place",
      journeyItems: [
        {
          title: "Watch",
          description: "Join our services and teachings online.",
          href: "/sermons",
          ctaLabel: "Watch sermons",
        },
        {
          title: "Connect",
          description: "Meet our community and grow together.",
          href: "/ministries",
          ctaLabel: "Get connected",
        },
        {
          title: "Grow",
          description: "Explore resources to strengthen your faith.",
          href: "/devotionals",
          ctaLabel: "Explore resources",
        },
      ],
    },
    featuredSermon: {
      badge: "Latest message",
      heading: "Featured Sermon",
      fallbackDate: "Recent message",
      fallbackDuration: "Watch now",
      fallbackTitle: "Watch a message from The Jubilee Christian Centre",
      fallbackDescription: "Explore sermons and teachings from our church.",
      watchCta: "Watch Sermon",
      viewAll: "All Sermons",
    },
    give: {
      badge: "Partner with us",
      headingLine1: "Be part of",
      headingLine2: "the mission",
      description:
        "Your generosity helps us serve people and share the Gospel.",
      options: [
        { title: "Give", description: "Support the work of the church." },
        { title: "Serve", description: "Use your gifts to bless others." },
        { title: "Share", description: "Help spread the word." },
      ],
      primaryCta: "Give today",
      secondaryCta: "View giving details",
    },
    ministries: {
      badge: "Find your community",
      headingLine1: "Growing",
      headingLine2: "Together",
      description:
        "Connect, serve, and grow through one of our church ministries.",
      ministries: [
        { name: "Worship", description: "Lead the church in worship." },
        { name: "Youth", description: "Raise the next generation in faith." },
        { name: "Outreach", description: "Serve our community." },
      ],
      ctaCard: {
        heading: "Get Involved",
        description: "There is a place for you in our community.",
        button: "Explore ministries",
      },
      bottomCta: {
        text: "Ready to take your next step?",
        linkLabel: "Connect with us",
      },
    },
    newsletter: {
      badge: "Stay connected",
      headingPrimary: "Receive",
      headingAccent: "encouragement",
      description: "Get updates and encouragement from our community.",
      placeholder: "Your email address",
      submitLoading: "Submitting…",
      submitIdle: "Subscribe",
      successMessage: "Thank you for subscribing.",
      errorMessage: "Unable to subscribe right now.",
      privacyNote: "We respect your privacy.",
      benefits: [
        {
          title: "Church news",
          description: "Stay up to date with what is happening.",
        },
        { title: "Encouragement", description: "Receive uplifting messages." },
        {
          title: "Events",
          description: "Hear about upcoming gatherings and events.",
        },
      ],
    },
    devotionals: {
      badge: "Grow in the Word",
      heading: "Daily Devotionals",
      cardSubtitle: "A moment in the Word",
      cardTitle: "Strength for today",
      verse: "Your word is a lamp to my feet",
      verseRef: "Psalm 119:105",
      cardBody: "Find encouragement and grow in your walk with God.",
      cta: "Read devotionals",
      introTitle: "A daily moment with God",
      introBody: "Explore devotionals created to encourage your faith.",
      benefits: [],
      primaryCta: "Browse devotionals",
    },
  },
  footer: {
    tagline: "A Place where Everyone is Somebody in Christ.",
    social: {
      youtube: "YouTube",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      tiktok: "TikTok",
    },
    sections: {
      connect: {
        heading: "Connect",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
      ministries: {
        heading: "Ministries",
        links: [{ label: "Our Ministries", href: "/ministries" }],
      },
      resources: {
        heading: "Resources",
        links: [
          { label: "Devotionals", href: "/devotionals" },
          { label: "Quick Links", href: "/quick-links" },
        ],
      },
      media: {
        heading: "Media",
        links: [
          { label: "Sermons", href: "/sermons" },
          {
            label: "YouTube",
            href: "https://youtube.com/@jccchurch",
            external: true,
          },
        ],
      },
    },
    contact: {
      heading: "Contact",
      people: [{ name: "Church Office", phone: "+2347030966545" }],
    },
    services: {
      heading: "Gather with us",
      lines: ["Sunday Service", "Rooted Prayers", "Friday 6:00PM TILL DAWN "],
    },
    copyright: "Jubilee Christian Centre Church. All rights reserved.",
  },
};

export const DEFAULT_LANGUAGE = "en";

export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
];

export function getMessages() {
  return englishMessages;
}
