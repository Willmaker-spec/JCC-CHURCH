import Hero from '@/components/Hero';
import Welcome from '@/components/Welcome';
import GlobalFamily from '@/components/GlobalFamily';
import FeaturedSermon from '@/components/FeaturedSermon';
// import Devotionals from '@/components/Devotionals'
import Ministries from '@/components/Ministries';
import Give from '@/components/Give';
import Newsletter from '@/components/Newsletter';
export const metadata = {
  title: 'Home | Jubilee Christian Centre Church',
  description: 'Jubilee Christian Centre Church — Souls Saved. Men Trained. Nations Taken. Join us for powerful teaching, worship, and community.',
  openGraph: {
    title: 'Jubilee Christian Centre Church',
    description: 'Jubilee Christian Centre Church — Souls Saved. Men Trained. Nations Taken.',
    images: [{
      url: '/images/jcc-logo.png',
      alt: 'Jubilee Christian Centre Church Logo',
      width: 800,
      height: 600
    }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/jcc-logo.png']
  }
};
export default function Home() {
  return <>
      <Hero />
      <Welcome />
      <GlobalFamily />
      <FeaturedSermon />
      {/* <Devotionals /> */}
      <Ministries />
      <Give />
      <Newsletter />
    </>;
}
