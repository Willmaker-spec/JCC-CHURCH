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
  description: 'Jubilee Christian Centre Church — Acts 1:8: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth." Join us for powerful teaching, worship, and community.',
  openGraph: {
    title: 'Jubilee Christian Centre Church',
    description: 'Jubilee Christian Centre Church — Acts 1:8: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth."',
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
