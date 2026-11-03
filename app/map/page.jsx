import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock3, MapPin, Navigation, Phone } from 'lucide-react';

const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=5.5218974%2C7.0338158';

export const metadata = {
  title: 'Find Us | Jubilee Christian Centre Church',
  description: 'Plan your visit to Jubilee Christian Centre Church at The Light House, Mangoro, Ikeja, Lagos.',
  openGraph: {
    title: 'Find Us | Jubilee Christian Centre Church',
    description: 'Plan your visit to Jubilee Christian Centre Church at The Light House.',
    images: [{
      url: '/images/hero.jpg',
      alt: 'Jubilee Christian Centre Church',
      width: 1200,
      height: 630
    }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/hero.jpg']
  }
};

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-jcc-navy">
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-jcc-navy px-5 pb-14 pt-28 sm:px-8 md:min-h-[62vh] md:pb-16">
        <Image
          src="/images/rooted2.JPG"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-jcc-navy/95 via-jcc-navy/70 to-jcc-navy/25" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-jcc-gold">
            Jubilee Christian Centre Church
          </p>
          <h1 className="max-w-4xl font-anton text-6xl uppercase leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
            We&apos;d love to see you.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            Join us in person at The Light House for a warm welcome, worship, and time together as a church family.
          </p>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 mb-8 inline-flex items-center gap-3 rounded-sm bg-jcc-gold px-6 py-4 font-bold text-jcc-navy transition-colors hover:bg-white"
          >
            Get directions
            <Navigation size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-jcc-gold">Plan your visit</p>
          <h2 className="mt-3 font-anton text-4xl uppercase leading-tight md:text-5xl">
            Everything you need to find us
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <MapPin className="mb-5 text-jcc-gold" size={30} aria-hidden="true" />
            <h3 className="font-anton text-2xl uppercase">Our location</h3>
            <p className="mt-4 leading-relaxed text-slate-600">
              Jubilee Christian Center<br />
              Amakohia New Road, along Umuodu Mbieri Road<br />
              Owerri 460102, Imo State, Nigeria
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <CalendarDays className="mb-5 text-jcc-gold" size={30} aria-hidden="true" />
            <h3 className="font-anton text-2xl uppercase">Sunday Services</h3>
            <p className="mt-4 text-lg font-semibold">Join us every Sunday</p>
            <p className="mt-1 text-slate-600">9:00 AM</p>
            <div className="mt-5 flex items-start gap-3 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-500">
              <Clock3 size={18} className="mt-0.5 shrink-0 text-jcc-gold" aria-hidden="true" />
              Please arrive a little early so we can welcome you.
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <Phone className="mb-5 text-jcc-gold" size={30} aria-hidden="true" />
            <h3 className="font-anton text-2xl uppercase">Need a hand?</h3>
            <p className="mt-4 leading-relaxed text-slate-600">
              Need help finding the venue? Contact Sir Onyema for directions.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 font-bold text-jcc-navy underline decoration-jcc-gold decoration-2 underline-offset-4 hover:text-jcc-gold"
            >
              Contact Sir Onyema
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        </div>

        <div className="mt-8 grid gap-8 overflow-hidden rounded-lg bg-jcc-navy text-white md:grid-cols-[1.2fr_0.8fr]">
          <div className="p-7 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-jcc-gold">Your first visit</p>
            <h2 className="mt-3 font-anton text-3xl uppercase md:text-4xl">Come as you are</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/75">
              Rooted is our monthly in-person gathering. Expect a welcoming community, worship, a message, and time to connect. Whether it&apos;s your first visit or you&apos;re returning, there&apos;s a place for you.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 bg-white/5 p-7 sm:p-10">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-4 rounded-sm bg-jcc-gold px-5 py-4 font-bold text-jcc-navy transition-colors hover:bg-white"
            >
              Open in Google Maps
              <Navigation size={18} aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-between gap-4 rounded-sm border border-white/30 px-5 py-4 font-semibold text-white transition-colors hover:border-jcc-gold hover:text-jcc-gold"
            >
              Contact our team
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <section className="mt-14">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-jcc-gold">Find your way</p>
            <h2 className="mt-2 font-anton text-3xl uppercase md:text-4xl">Church location map</h2>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="aspect-w-16 aspect-h-9 h-[500px] w-full md:h-[600px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d63541.81732588884!2d7.07355245!3d5.512930900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x1042570a13eccced%3A0xd41af66cde9f3075!2sJubilee%20Christian%20Center%20Amakohia%20New%20Road%20Owerri%20Imo%20State%2C%20Nigeria.%2C%20Amakohia%20New%20Road%20Along%20Umuodu%20Mbieri%2C%20Road%2C%20Owerri%20460102%2C%20Imo!3m2!1d5.521897399999999!2d7.033815799999999!5e0!3m2!1sen!2sng!4v1793728434680!5m2!1sen!2sng" width="100%" height="100%" style={{
                border: 0
              }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Jubilee Christian Center - Owerri Location" />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
