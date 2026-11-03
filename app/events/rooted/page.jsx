import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock3, MapPin, Navigation, Phone } from 'lucide-react';

const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=The+Light+House%2C+43B+Babaponmile+Street%2C+Mangoro%2C+Ikeja%2C+Lagos';

export default function RootedPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-jcc-navy">
      <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-jcc-navy px-5 pb-16 pt-28 sm:px-8 md:min-h-[70vh] md:pb-20">
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
            className="mt-8 inline-flex items-center gap-3 rounded-sm bg-jcc-gold px-6 py-4 font-bold text-jcc-navy transition-colors hover:bg-white"
          >
            Get directions
            <Navigation size={18} />
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
              The Light House<br />
              Opposite 43B Babaponmile Street<br />
              After Winners Chapel<br />
              Mangoro, Ikeja, Lagos, Nigeria
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <CalendarDays className="mb-5 text-jcc-gold" size={30} aria-hidden="true" />
            <h3 className="font-anton text-2xl uppercase">When we meet</h3>
            <p className="mt-4 text-lg font-semibold">First Saturday of every month</p>
            <p className="mt-1 text-slate-600">10:00 AM</p>
            <div className="mt-5 flex items-start gap-3 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-500">
              <Clock3 size={18} className="mt-0.5 shrink-0 text-jcc-gold" aria-hidden="true" />
              Please arrive a little early so we can welcome you.
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <Phone className="mb-5 text-jcc-gold" size={30} aria-hidden="true" />
            <h3 className="font-anton text-2xl uppercase">Need a hand?</h3>
            <p className="mt-4 leading-relaxed text-slate-600">
              If you need help finding the venue, our team is happy to guide you.
            </p>
            <a
              href="tel:+2349058885465"
              className="mt-5 inline-flex items-center gap-2 font-bold text-jcc-navy underline decoration-jcc-gold decoration-2 underline-offset-4 hover:text-jcc-gold"
            >
              Call Isaac: 0905 888 5465
              <ArrowRight size={16} aria-hidden="true" />
            </a>
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
              Open directions
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
      </section>
    </main>
  );
}
