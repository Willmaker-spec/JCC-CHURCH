import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import AudioPlayerRoot from './components/AudioPlayerRoot.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import { AudioPlayerProvider } from './components/providers/AudioPlayerProvider.jsx'
import { LanguageProvider } from './components/providers/LanguageProvider.jsx'

const Home = lazy(() => import('../app/page.jsx'))
const Devotionals = lazy(() => import('../app/devotionals/page.jsx'))
const DevotionalPage = lazy(() => import('../app/devotionals/[slug]/page.jsx'))
const Events = lazy(() => import('../app/events/page.jsx'))
const HeartRoom = lazy(() => import('../app/events/heart-room/page.jsx'))
const Manual = lazy(() => import('../app/events/manual/page.jsx'))
const NationTakers = lazy(() => import('../app/events/nation-takers-webinar/page.jsx'))
const Rooted = lazy(() => import('../app/events/rooted/page.jsx'))
const Salvation = lazy(() => import('../app/events/understanding-salvation/page.jsx'))
const Unlearning = lazy(() => import('../app/events/unlearning-conference/page.jsx'))
const Give = lazy(() => import('../app/give/page.jsx'))
const MapPage = lazy(() => import('../app/map/page.jsx'))
const Ministries = lazy(() => import('../app/ministries/page.jsx'))
const QuickLinks = lazy(() => import('../app/quick-links/page.jsx'))
const Sermons = lazy(() => import('../app/sermons/page.jsx'))
const NotFound = lazy(() => import('../app/not-found.jsx'))

function SimplePage({ title, children }) {
  return (
    <section className="min-h-screen px-6 py-24 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      {children}
    </section>
  )
}

function RoutePage({ component: Component }) {
  return (
    <Suspense fallback={<p className="px-6 py-24 text-center">Loading page…</p>}>
      <Component />
    </Suspense>
  )
}

function AppRoutes() {
  const { pathname } = useLocation()

  useEffect(() => {
    const titles = {
      '/': 'Home',
      '/about': 'About Us',
      '/contact': 'Contact',
      '/admin': 'Admin',
      '/devotionals': 'Devotionals',
      '/events': 'Events',
      '/events/heart-room': 'The Heart Room',
      '/events/manual': 'The Manual',
      '/events/nation-takers-webinar': 'Nation Takers Career Webinar',
      '/events/rooted': 'Rooted',
      '/events/understanding-salvation': 'Understanding Salvation',
      '/events/unlearning-conference': 'The Unlearning Conference',
      '/give': 'Give',
      '/map': 'Find Us',
      '/ministries': 'Ministries',
      '/quick-links': 'Quick Links',
      '/sermons': 'Sermons',
    }

    const title = titles[pathname] || (pathname.startsWith('/devotionals/') ? 'Devotional' : 'Page Not Found')
    document.title = `${title} | The Light Community Church`
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<RoutePage component={Home} />} />
      <Route path="/about" element={<SimplePage title="About Us" />} />
      <Route path="/contact" element={<SimplePage title="Contact Us" />} />
      <Route path="/admin" element={<SimplePage title="Admin" />} />
      <Route path="/devotionals" element={<RoutePage component={Devotionals} />} />
      <Route path="/devotionals/:slug" element={<RoutePage component={DevotionalPage} />} />
      <Route path="/events" element={<RoutePage component={Events} />} />
      <Route path="/events/heart-room" element={<RoutePage component={HeartRoom} />} />
      <Route path="/events/manual" element={<RoutePage component={Manual} />} />
      <Route path="/events/nation-takers-webinar" element={<RoutePage component={NationTakers} />} />
      <Route path="/events/rooted" element={<RoutePage component={Rooted} />} />
      <Route path="/events/understanding-salvation" element={<RoutePage component={Salvation} />} />
      <Route path="/events/unlearning-conference" element={<RoutePage component={Unlearning} />} />
      <Route path="/give" element={<RoutePage component={Give} />} />
      <Route path="/map" element={<RoutePage component={MapPage} />} />
      <Route path="/ministries" element={<RoutePage component={Ministries} />} />
      <Route path="/quick-links" element={<RoutePage component={QuickLinks} />} />
      <Route path="/sermons" element={<RoutePage component={Sermons} />} />
      <Route path="*" element={<RoutePage component={NotFound} />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AudioPlayerProvider>
          <Navbar />
          <main className="pt-20 md:pt-24 lg:pt-28">
            <AppRoutes />
          </main>
          <AudioPlayerRoot />
          <Footer />
        </AudioPlayerProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}