import { MapPin, Clock, Phone } from 'lucide-react';
export const metadata = {
  title: 'Map - Rooted Monthly Meeting | The Light Community Church',
  description: 'Find us at our monthly Rooted gathering - every first Saturday at The Light House, Mangoro, Ikeja, Lagos.',
  openGraph: {
    title: 'Rooted - The Light Community Church',
    description: 'Find us at our monthly Rooted gathering - every first Saturday at The Light House.',
    images: [{
      url: 'https://tlcc.ng/images/hero-fallback.jpg',
      alt: 'The Light Community Church - Rooted Location',
      width: 1200,
      height: 630
    }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://tlcc.ng/images/hero-fallback.jpg']
  }
};
export default function MapPage() {
  return <div className="min-h-screen bg-white pt-24 md:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-anton text-tlcc-navy mb-4 uppercase">
            Find Us at Rooted
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for our monthly physical gathering - every first Saturday of the month at The Light House
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Location Card */}
          <div className="bg-tlcc-cream p-6 rounded-lg shadow-md">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <MapPin className="h-8 w-8 text-tlcc-navy" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-tlcc-navy mb-2">Location</h3>
                <p className="text-gray-700">
                  Opp 43b Babaponmile Street<br />
                  After Winners Chapel<br />
                  Mangoro, Ikeja<br />
                  Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>

          {/* Time Card */}
          <div className="bg-tlcc-cream p-6 rounded-lg shadow-md">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-tlcc-navy" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-tlcc-navy mb-2">Meeting Time</h3>
                <p className="text-gray-700">
                  Every First Saturday<br />
                  10:00 AM Prompt
                </p>
                <p className="text-sm text-gray-600 mt-2 italic">
                  Please arrive on time
                </p>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-tlcc-cream p-6 rounded-lg shadow-md">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Phone className="h-8 w-8 text-tlcc-navy" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-tlcc-navy mb-2">Directions</h3>
                <p className="text-gray-700">
                  For directions, please contact:
                </p>
                <p className="text-tlcc-navy font-semibold mt-2">
                  Isaac<br />
                  <a href="tel:+2349058885465" className="hover:text-tlcc-gold transition-colors">
                    0905 888 5465
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Rooted */}
        <div className="bg-tlcc-navy text-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl md:text-3xl font-anton mb-4 uppercase">What is Rooted?</h2>
          <p className="text-lg leading-relaxed">
            Rooted is our monthly physical gathering that brings The Light Community Church together every first Saturday 
            of the month at The Light House. It&apos;s a time of fellowship, worship, and deep connection as we 
            grow together in faith and community. Come experience the warmth of gathering in person!
          </p>
        </div>

        {/* Map */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 w-full h-[500px] md:h-[600px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3234!2d3.3089!3d6.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMTMuMyJOIDPCsDE4JzMyLjAiRQ!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng&q=43b+Babaponmile+Street,+Mangoro,+Ikeja,+Lagos" width="100%" height="100%" style={{
            border: 0
          }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="The Light House - Rooted Meeting Location" />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Can&apos;t find us? Don&apos;t hesitate to call Isaac for assistance.
          </p>
          <a href="https://maps.app.goo.gl/wP2aAjw47wV4nTbZ6" target="_blank" rel="noopener noreferrer" className="inline-block bg-tlcc-navy text-white px-8 py-3 rounded-lg hover:bg-tlcc-gold transition-colors duration-200 font-semibold">
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>;
}
