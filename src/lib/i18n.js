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
    visionBadge: "Welcome to Jubilee Christian Centre",
    lines: [
      { prefix: "Jubilee", highlight: "Christian Centre", suffix: "" },
      {
        prefix: "A place where everybody",
        highlight: "is somebody in Christ",
        suffix: "",
      },
    ],
    watchLive: "Plan Your Visit",
    quickLinks: "Watch Live",
  },
  home: {
    welcome: {
      badgeText: "Join the mission",
      subLabel: "Welcome to The Jubilee Christian Centre",
      heading: "Jubilee is a church where everybody is somebody in Christ, a centre where people's dreams are nurtured and destinies are fulfilled.",
      description:
        "Jubilee is a church where everybody is somebody in Christ, a centre where people's dreams are nurtured and destinies are fulfilled.",
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
          cta: "See upcoming events",
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
          "We are a community of believers committed to sharing the Gospel and converting souls for GOD.",
        ],
        quote: "Acts 1:8 — \"But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.\"",
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
      fallbackTitle: "Watch a message from Jubilee Christian Centre",
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
        description: "There is a place for you in our church.",
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
  about: {
    hero: {
      subtitle: "Jubilee Christian Centre Church",
      headingLead: "Jubilee Christian",
      headingHighlight: "Centre Church",
      description: "A place where everybody is somebody in Christ.",
    },
    missionVision: {
      missionLabel: "Our Mission",
      visionLabel: "Our Vision",
      missionHeading: "Acts 1:8",
      missionStatement: "Jubilee is a church where everybody is somebody in Christ, and a place where people’s dreams are nurtured and destinies are fulfilled.",
      missionDescription:
        "We share the Gospel, help people grow in faith, and equip believers to serve.",
      visionHeading: "A Place for Everyone",
      visionStatement: "In Jubilee Christian Centre, we are building a kingdom of people who will use God's resources as good stewards to worship Him and fulfil His purpose on earth and care for those who are less privileged. We will provide places of hope around the globe where, through preaching, teaching, and healing, people's spiritual, emotional, and physical needs will be met.",
      visionDescription:
        "We are building a welcoming community where people can know Christ and grow together.",
    },
    story: {
      heading: "Our Story",
      paragraphs: [
        "Jubilee Christian Centre Church is a community of believers committed to sharing the Gospel and converting souls.",
        "We gather to worship, learn from Scripture, serve one another, and take the message of Christ into our communities and nations.",
      ],
    },
    beliefs: {
      heading: "What We Believe",
      items: [
        {
          title: "The Bible",
          content:
            "The Bible is God's Word and the foundation for our faith and life.",
          verse: "2 Timothy 3:16",
        },
        {
          title: "Jesus Christ",
          content:
            "Jesus Christ is Lord and the hope of salvation for all who believe.",
          verse: "John 3:16",
        },
        {
          title: "The Gospel",
          content:
            "Through the death and resurrection of Jesus, people can be reconciled to God.",
          verse: "1 Corinthians 15:3-4",
        },
        {
          title: "The Church",
          content:
            "The Church is called to worship God, make disciples, and serve the world.",
          verse: "Matthew 28:19-20",
        },
      ],
    },
    coreValues: {
      heading: "Our Core Values",
      items: [
        {
          title: "The Word",
          description: "We build our lives on the truth of Scripture.",
        },
        {
          title: "Discipleship",
          description: "We help people grow and become mature in Christ.",
        },
        {
          title: "Love",
          description: "We welcome and serve people with the love of Christ.",
        },
        { title: "Faith", description: "We trust God and follow His leading." },
        {
          title: "Excellence",
          description: "We serve faithfully and give our best.",
        },
        {
          title: "Mission",
          description: "We share the Gospel and serve our communities.",
        },
      ],
    },
    leadership: {
      heading: "Our Leadership",
      name: "Rev. Pastor Udoka O. Ukah",
      role: "Head Pastor",
      paragraphs: [
        "Our leadership is committed to teaching God's Word and equipping believers for a life of faith and service.",
      ],
    },
    testimonies: {
      heading: "Stories of Grace",
      intro: "We are grateful for the ways God is at work in people's lives.",
      cards: [],
      share: {
        heading: "Share Your Testimony",
        description: "Tell us how God has been at work in your life.",
        cta: "Share your story",
      },
    },
    finalCta: {
      heading: "Find Your Place",
      description: "Join us as we grow together in Christ.",
      buttons: [
        { label: "Contact Us", href: "/contact" },
        { label: "Explore Ministries", href: "/ministries" },
      ],
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
      people: [{ name: "Church Office", phone: "+234 70 309 665 45" }],
    },
    services: {
      heading: "Worship with us",
      lines: [
        "Friday Vigil — Every Friday",
        "Wednesday Bible Study — 5:00 PM to 7:00 PM",
        "Sunday Morning Service — 6:30 AM to 9:00 AM",
        "Sunday Afternoon Service — 9:30 AM to 12:00 PM",
      ],
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
