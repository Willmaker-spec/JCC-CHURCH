import Link from 'next/link';
import Image from 'next/image';
import { Heart, BookHeart, Briefcase, Music, Camera, Coffee, Smartphone, GraduationCap, ArrowRight, CheckCircle, Sparkles, ChevronDown } from 'lucide-react';
export const metadata = {
  title: 'Ministries | The Light Community Church',
  description: 'Discover our service units at TLCC — TLCC Online ministry, TLCC Firestorm, TLCC Follow up, TLCC Prayer team, TLCC Media & visibility, and Growth initiatives.'
};
const departments = [{
  id: 'tlcc-online',
  name: 'TLCC Online ministry',
  icon: Smartphone,
  color: 'text-blue-600',
  bgColor: 'bg-blue-50',
  borderColor: 'border-blue-100',
  description: 'Live services, online discipleship and global connection through digital channels.',
  mission: 'To reach and disciple people across the world through excellent online content and intentional follow-up.',
  activities: ['Live streaming & production', 'Online small groups & discipleship', 'Digital content creation'],
  requirements: ['Willingness to serve on digital teams', 'Basic tech familiarity', 'Consistency & reliability'],
  whatsappLink: '/contact#join-ministry&ministry=TLCC Online ministry'
}, {
  id: 'firestorm',
  name: 'TLCC Firestorm',
  icon: Music,
  color: 'text-red-600',
  bgColor: 'bg-red-50',
  borderColor: 'border-red-100',
  description: 'Choir department — leading worship and choral ministry for services and special events.',
  mission: 'Lead the church in worship through excellent choral ministry and music stewardship.',
  activities: ['Choir rehearsals', 'Worship leading', 'Music arrangement', 'Special event worship'],
  requirements: ['Musical/choral ability', 'Availability for rehearsals and services', 'Heart for worship'],
  whatsappLink: '/contact#join-ministry&ministry=TLCC Firestorm'
}, {
  id: 'follow-up',
  name: 'TLCC Follow up',
  icon: BookHeart,
  color: 'text-emerald-600',
  bgColor: 'bg-emerald-50',
  borderColor: 'border-emerald-100',
  description: 'Caring for new contacts and helping people take their next spiritual steps.',
  mission: 'Ensure every new contact is followed, discipled and integrated into the community.',
  activities: ['New contact follow-up', 'Discipleship pathways', 'Mentoring'],
  requirements: ['Good communication', 'Compassion', 'Follow-through'],
  whatsappLink: '/contact#join-ministry&ministry=TLCC Follow up'
}, {
  id: 'prayer-team',
  name: 'TLCC Prayer team',
  icon: Heart,
  color: 'text-violet-600',
  bgColor: 'bg-violet-50',
  borderColor: 'border-violet-100',
  description: 'Intercession teams and coordinated prayer initiatives across the church.',
  mission: 'Sustain the ministry through persistent, strategic prayer and intercession.',
  activities: ['Intercessory groups', 'Watch hours', 'Prayer chains'],
  requirements: ['Commitment to prayer', 'Discernment', 'Faithfulness'],
  whatsappLink: '/contact#join-ministry&ministry=TLCC Prayer team'
}, {
  id: 'media-visibility',
  name: 'TLCC Media & visibility',
  icon: Camera,
  color: 'text-orange-600',
  bgColor: 'bg-orange-50',
  borderColor: 'border-orange-100',
  description: 'Content production, social media management and creative visibility strategies.',
  mission: 'Produce high-quality media that amplifies the gospel and grows our online reach.',
  activities: ['Video production', 'Social media management', 'Graphic design'],
  requirements: ['Creativity', 'Technical skills (audio/video)', 'Consistency'],
  whatsappLink: '/contact#join-ministry&ministry=TLCC Media & visibility'
}, {
  id: 'growth-initiatives',
  name: 'Growth initiatives',
  icon: Briefcase,
  color: 'text-purple-600',
  bgColor: 'bg-purple-50',
  borderColor: 'border-purple-100',
  description: 'Programs focused on discipleship, leadership development and community growth.',
  mission: 'Create pathways for personal, spiritual and organizational growth within TLCC.',
  activities: ['Leadership training', 'Discipleship programs', 'Community projects'],
  requirements: ['Willingness to learn', 'Commitment to growth', 'Passion for people'],
  whatsappLink: '/contact#join-ministry&ministry=Growth initiatives'
}];
const otherMinistries = [{
  name: 'Media & Technology',
  icon: Camera,
  description: 'Managing live streams, recordings, graphics, and all tech needs'
}, {
  name: 'Worship Team',
  icon: Music,
  description: 'Leading the congregation in spirit-filled worship and praise'
}, {
  name: 'Hospitality',
  icon: Coffee,
  description: 'Creating a welcoming atmosphere and serving refreshments'
}, {
  name: 'Youth Ministry',
  icon: GraduationCap,
  description: 'Raising up the next generation of passionate Christ-followers'
}, {
  name: 'Digital Ministry',
  icon: Smartphone,
  description: 'Managing online presence, social media, and digital engagement'
}];
export default function MinistriesPage() {
  return <main className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/rooted.jpg" alt="Ministries" fill className="object-cover object-top" priority />
          {/* Subtle Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen">
          <div className="absolute top-20 left-10 w-96 h-96 bg-tlcc-gold rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200 rounded-full blur-[100px] animate-pulse" style={{
          animationDelay: '1s'
        }}></div>
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full mb-8 border border-white/20 shadow-2xl">
            <Sparkles className="h-4 w-4 text-tlcc-gold" />
            <span className="text-white font-bold text-xs tracking-widest uppercase">
              Find Your Calling
            </span>
          </div>

          <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl mb-8 uppercase leading-[0.9] tracking-tight drop-shadow-2xl">
            There&apos;s A Place<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tlcc-gold via-yellow-200 to-tlcc-gold">For Everyone</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            God has called you for such a time as this. Discover your gifts, 
            develop your potential, and deploy your talents for kingdom impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="#departments" className="w-full sm:w-auto px-10 py-5 bg-tlcc-gold hover:bg-yellow-400 text-[#0a0a0a] font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(200,160,50,0.3)] hover:shadow-[0_0_40px_rgba(200,160,50,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
              <span>Explore Ministries</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Serve Section */}
      <section className="py-24 bg-white relative z-20 -mt-8 rounded-t-[3rem]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-anton text-4xl md:text-5xl text-tlcc-navy mb-6 uppercase tracking-wide">
              Why <span className="text-tlcc-gold">Serve?</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              Serving isn&apos;t just about what you do—it&apos;s about who you become. 
              When you serve, you grow spiritually, develop your gifts, build meaningful relationships, 
              and make an eternal impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            icon: '🌱',
            title: 'Grow Spiritually',
            desc: 'Serving stretches your faith and deepens your relationship with God'
          }, {
            icon: '🎁',
            title: 'Discover Your Gifts',
            desc: 'Find and develop the unique abilities God has placed in you'
          }, {
            icon: '🤝',
            title: 'Build Community',
            desc: 'Form deep, lasting friendships with like-minded believers'
          }, {
            icon: '⚡',
            title: 'Make Impact',
            desc: 'Be part of something bigger—transforming lives for eternity'
          }].map((item, i) => <div key={i} className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-tlcc-gold/30 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-tlcc-gold/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl text-tlcc-navy mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Main Departments Section */}
      <section id="departments" className="py-24 bg-gray-50/50">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="font-anton text-5xl md:text-6xl text-tlcc-navy mb-6 uppercase tracking-wide">
              Our <span className="text-tlcc-gold">Departments</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Each department plays a vital role in fulfilling our mission. 
              Explore the options below and find where you fit best.
            </p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {departments.map(dept => <div key={dept.id} id={dept.id} className="scroll-mt-32 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
                  {/* Left: Identity */}
                  <div className="flex flex-col">
                    <div className={`inline-flex w-20 h-20 items-center justify-center ${dept.bgColor} rounded-3xl mb-8 border ${dept.borderColor}`}>
                      <dept.icon className={`h-8 w-8 ${dept.color}`} />
                    </div>
                    <h3 className="font-anton text-4xl text-tlcc-navy mb-4 uppercase tracking-wide">
                      {dept.name}
                    </h3>
                    <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                      {dept.description}
                    </p>
                    <div className="mt-auto pt-8 border-t border-gray-100">
                      <Link href={dept.whatsappLink} className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-tlcc-navy hover:bg-tlcc-navy-light text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase tracking-widest text-xs">
                        Join This Ministry
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div className="space-y-10 lg:pl-10 lg:border-l border-gray-100">
                    {/* Mission */}
                    <div>
                      <h4 className="font-bold text-sm text-tlcc-gold uppercase tracking-widest mb-3">Our Mission</h4>
                      <p className="text-gray-700 text-lg leading-relaxed font-medium">
                        {dept.mission}
                      </p>
                    </div>

                    {/* Activities & Requirements Grid */}
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-4">What We Do</h4>
                        <ul className="space-y-3">
                          {dept.activities.map(activity => <li key={activity} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-tlcc-gold flex-shrink-0" />
                              <span className="text-gray-600 text-sm font-medium">{activity}</span>
                            </li>)}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-4">Requirements</h4>
                        <ul className="space-y-3">
                          {dept.requirements.map(req => <li key={req} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-tlcc-gold mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm font-medium">{req}</span>
                            </li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Other Ministries */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-anton text-4xl md:text-5xl text-tlcc-navy mb-6 uppercase tracking-wide">
              More <span className="text-tlcc-gold">Opportunities</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Beyond our main departments, we have specialized ministries 
              that need passionate volunteers just like you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherMinistries.map(ministry => <div key={ministry.name} className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-tlcc-gold/30 transition-all duration-300 group">
                <div className="inline-flex w-12 h-12 items-center justify-center bg-gray-50 group-hover:bg-tlcc-gold/10 rounded-xl mb-6 transition-colors">
                  <ministry.icon className="h-6 w-6 text-tlcc-gold" />
                </div>
                <h3 className="font-bold text-xl text-tlcc-navy mb-3 group-hover:text-tlcc-gold transition-colors">
                  {ministry.name}
                </h3>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                  {ministry.description}
                </p>
                <Link href="/contact#join-ministry" className="inline-flex items-center text-tlcc-navy font-bold text-xs uppercase tracking-widest group-hover:text-tlcc-gold transition-colors">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>)}
          </div>
        </div>
      </section>

      {/* How to Join Timeline */}
      <section className="py-24 bg-tlcc-navy relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tlcc-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3"></div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-anton text-4xl md:text-6xl text-white mb-6 uppercase tracking-wide drop-shadow-lg">
              Ready to <span className="text-tlcc-gold">Get Started?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Joining a ministry is simple. Follow these steps and we&apos;ll help you find your perfect fit.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gray-800 z-0"></div>

              {/* Steps */}
              {[{
              step: '01',
              title: 'Choose a Ministry',
              desc: 'Browse the options and pray about where God is leading you.'
            }, {
              step: '02',
              title: 'Contact Us',
              desc: 'Fill out the form or send us a message via WhatsApp.'
            }, {
              step: '03',
              title: 'Start Serving',
              desc: 'Meet the team, get trained, and begin making impact.'
            }].map((item, i) => <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-[#1a2235] border-2 border-gray-700 flex items-center justify-center mb-6 shadow-2xl relative">
                    <span className="font-anton text-3xl text-tlcc-gold">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-xl text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>)}
            </div>

            <div className="mt-20 text-center">
              <Link href="/contact#join-ministry" className="inline-flex items-center px-12 py-5 bg-tlcc-gold hover:bg-yellow-400 text-[#0a0a0a] font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(200,160,50,0.2)] hover:shadow-[0_0_40px_rgba(200,160,50,0.4)] hover:-translate-y-1 uppercase tracking-widest text-sm">
                <span>Join a Ministry Today</span>
                <ArrowRight className="h-5 w-5 ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Interactive Accordion) */}
      <section className="py-24 bg-gray-50/50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-anton text-4xl md:text-5xl text-tlcc-navy mb-4 uppercase tracking-wide">
              Common <span className="text-tlcc-gold">Questions</span>
            </h2>
            <p className="text-gray-500">Everything you need to know about serving.</p>
          </div>

          <div className="space-y-4">
            {[{
            q: "Do I need to be a member to serve?",
            a: "While we welcome everyone to serve, we encourage those interested in leadership positions to complete our membership process. This ensures alignment with our values and vision."
          }, {
            q: "How much time commitment is required?",
            a: "It varies by department. Some require weekly commitment, others are event-based. We'll work with your schedule to find the best fit for you."
          }, {
            q: "Can I serve in multiple ministries?",
            a: "Yes! However, we recommend starting with one ministry to avoid burnout. Once you're settled, you can explore serving in additional areas."
          }, {
            q: "What if I'm not sure where I fit?",
            a: "No problem! Contact our assimilation team and they'll help you discover your gifts and find the perfect place for you to serve."
          }].map((faq, index) => <details key={index} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 open:shadow-md open:border-tlcc-gold/30">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-tlcc-navy text-lg hover:text-tlcc-gold transition-colors">
                  {faq.q}
                  <span className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-open:rotate-180 group-open:bg-tlcc-gold/10 transition-all duration-300">
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:text-tlcc-gold transition-colors" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  <p>{faq.a}</p>
                </div>
              </details>)}
          </div>
        </div>
      </section>
    </main>;
}
