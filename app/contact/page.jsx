 'use client'

import { useState } from 'react'
import { MessageCircle, Send, ChevronDown } from 'lucide-react'

// Contact reasons with their corresponding WhatsApp templates
const contactReasons = [
  {
    id: 'prayer-request',
    label: 'Prayer Request',
    placeholder: 'Share your prayer request with us...',
    template: (name, message) => 
      `Hi, my name is ${name}. I would like to request prayer for: ${message}`,
    description: 'Submit a prayer request. Our intercessors are ready to stand with you in faith.'
  },
  {
    id: 'testimony',
    label: 'Share Testimony',
    placeholder: 'Tell us what God has done...',
    template: (name, message) => 
      `Hi, my name is ${name}. I want to share a testimony: ${message}`,
    description: 'Share your testimony of God\'s goodness and faithfulness in your life.'
  },
  {
    id: 'first-timer',
    label: 'First Timer',
    placeholder: 'Tell us about your visit...',
    template: (name, message) => 
      `Hi, my name is ${name}. I'm a first timer at JCC. ${message}`,
    description: 'Let us know you visited! Connect with our team and receive a warm welcome.'
  },
  {
    id: 'join-ministry',
    label: 'Join a Ministry',
    placeholder: 'Which ministry are you interested in?',
    template: (name, message) => 
      `Hi, my name is ${name}. I'm interested in joining a ministry. ${message}`,
    description: 'Join a department and use your gifts to serve in God\'s kingdom.'
  },
  {
    id: 'become-member',
    label: 'Become a Member',
    placeholder: 'Tell us why you want to join JCC...',
    template: (name, message) => 
      `Hi, my name is ${name}. I would like to become a member of Jubilee Christian Centre Church. ${message}`,
    description: 'Ready to make JCC your church home? Start your membership journey here.'
  },
  {
    id: 'counselling',
    label: 'Counselling Request',
    placeholder: 'How can we support you?',
    template: (name, message) => 
      `Hi, my name is ${name}. I would like to request counselling. ${message}`,
    description: 'Receive biblical guidance and pastoral support in challenging times.'
  },
  {
    id: 'bible-study',
    label: 'Join Bible Study',
    placeholder: 'Tell us about your interest...',
    template: (name, message) => 
      `Hi, my name is ${name}. I'm interested in joining a Bible study group. ${message}`,
    description: 'Join a small group for deeper fellowship and Scripture study.'
  },
  {
    id: 'visit-rooted',
    label: 'Visit Rooted Meeting',
    placeholder: 'Any questions about the meeting?',
    template: (name, message) => 
      `Hi, my name is ${name}. I would like to attend the Rooted meeting. ${message}`,
    description: 'Join us for our monthly physical gathering every first Saturday at The Light House.'
  },
  {
    id: 'partnership',
    label: 'Partnership & Giving',
    placeholder: 'How would you like to partner with us?',
    template: (name, message) => 
      `Hi, my name is ${name}. I'm interested in partnering with JCC through giving. ${message}`,
    description: 'Partner with us financially to spread the gospel and transform lives.'
  },
  {
    id: 'volunteer',
    label: 'Volunteer',
    placeholder: 'What area would you like to volunteer in?',
    template: (name, message) => 
      `Hi, my name is ${name}. I would like to volunteer at JCC. ${message}`,
    description: 'Serve in our events, ministries, or special programs as a volunteer.'
  },
  {
    id: 'pastoral-support',
    label: 'Speak to a Pastor',
    placeholder: 'What would you like to discuss?',
    template: (name, message) => 
      `Hi, my name is ${name}. I would like to speak with a pastor. ${message}`,
    description: 'Reach out to our pastoral team for spiritual guidance and support.'
  },
  {
    id: 'media-inquiry',
    label: 'Media & Tech Support',
    placeholder: 'Describe your inquiry...',
    template: (name, message) => 
      `Hi, my name is ${name}. I have a media/tech inquiry: ${message}`,
    description: 'Questions about online services, recordings, or technical support.'
  },
  {
    id: 'event-inquiry',
    label: 'Event Information',
    placeholder: 'Which event are you inquiring about?',
    template: (name, message) => 
      `Hi, my name is ${name}. I would like information about an upcoming event. ${message}`,
    description: 'Get information about our conferences, programs, and special events.'
  },
  {
    id: 'general',
    label: 'General Inquiry',
    placeholder: 'How can we help you?',
    template: (name, message) => 
      `Hi, my name is ${name}. ${message}`,
    description: 'Any other questions or comments? We\'d love to hear from you.'
  }
]

function getInitialContact() {
  const defaultReason = contactReasons[0]
  if (typeof window === 'undefined') {
    return { reason: defaultReason, message: '' }
  }

  const [reasonId, ...params] = window.location.hash.replace('#', '').split('&')
  const reason = contactReasons.find((item) => item.id === reasonId) || defaultReason
  const ministryParam = params.find((param) => param.startsWith('ministry='))
  const ministryName = ministryParam
    ? decodeURIComponent(ministryParam.replace('ministry=', ''))
    : ''

  return {
    reason,
    message: ministryName ? `I'm interested in joining the ${ministryName}.` : '',
  }
}

export default function ContactPage() {
  const [initialContact] = useState(getInitialContact)
  const [selectedReason, setSelectedReason] = useState(initialContact.reason)
  const [name, setName] = useState('')
  const [message, setMessage] = useState(initialContact.message)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // WhatsApp contact number (replace with actual number)
  const whatsappNumber = '2349035004764'

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!name.trim() || !message.trim()) {
      alert('Please fill in both your name and message.')
      return
    }

    const whatsappMessage = selectedReason.template(name, message)
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jcc-cream pt-24 md:pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-jcc-navy p-4 rounded-full">
              <MessageCircle className="h-12 w-12 text-jcc-gold" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-anton text-jcc-navy mb-4 uppercase">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re here for you. Whether you need prayer, want to join our community, or have a question, 
            we&apos;d love to connect with you.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reason Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-jcc-navy mb-2 uppercase tracking-wider">
                Reason for Contact
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-jcc-cream border-2 border-jcc-navy rounded-lg px-4 py-4 text-left flex items-center justify-between hover:border-jcc-gold transition-colors"
                >
                  <span className="font-semibold text-jcc-navy">{selectedReason.label}</span>
                  <ChevronDown className={`h-5 w-5 text-jcc-navy transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border-2 border-jcc-navy rounded-lg shadow-xl max-h-96 overflow-y-auto">
                    {contactReasons.map((reason) => (
                      <button
                        key={reason.id}
                        type="button"
                        onClick={() => {
                          setSelectedReason(reason)
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-jcc-cream transition-colors border-b border-gray-200 last:border-b-0 ${
                          selectedReason.id === reason.id ? 'bg-jcc-cream' : ''
                        }`}
                      >
                        <div className="font-semibold text-jcc-navy">{reason.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{reason.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">{selectedReason.description}</p>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-jcc-navy mb-2 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-jcc-cream border-2 border-jcc-navy rounded-lg px-4 py-4 text-jcc-navy placeholder-gray-500 focus:outline-none focus:border-jcc-gold transition-colors"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-jcc-navy mb-2 uppercase tracking-wider">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={selectedReason.placeholder}
                rows={6}
                className="w-full bg-jcc-cream border-2 border-jcc-navy rounded-lg px-4 py-4 text-jcc-navy placeholder-gray-500 focus:outline-none focus:border-jcc-gold transition-colors resize-none"
                required
              />
            </div>

            {/* Preview Section */}
            {name && message && (
              <div className="bg-jcc-cream border-2 border-gray-300 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Message Preview:</p>
                <p className="text-sm text-gray-700 italic">&quot;{selectedReason.template(name, message)}&quot;</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-jcc-navy text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wider hover:bg-jcc-gold hover:text-jcc-navy transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Send via WhatsApp</span>
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Service Times */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-jcc-navy mb-4 uppercase">Service Times</h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold text-jcc-gold">Online Services</p>
                <p>Tuesday & Saturday | 9:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-jcc-gold">Rooted (Physical Gathering)</p>
                <p>First Saturday of the Month | 10:00 AM</p>
              </div>
              <div>
                <p className="font-semibold text-jcc-gold">Prayer Meetings</p>
                <p>Mon-Wed: Rooted Prayers (9:00 PM)</p>
                <p>Watch Hour Prayers: 9:00 PM (fortnightly — every two weeks)</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-jcc-navy mb-4 uppercase">Physical Location</h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold text-jcc-gold">The Light House</p>
                <p>43b Babaponmile Street</p>
                <p>After Winners Chapel</p>
                <p>Mangoro, Ikeja, Lagos</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-jcc-gold">For Directions:</p>
                <p>Contact Isaac</p>
                <a href="tel:+2349058885465" className="text-jcc-navy hover:text-jcc-gold transition-colors">
                  0905 888 5465
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-jcc-navy text-white rounded-lg p-8">
          <h3 className="text-2xl md:text-3xl font-anton mb-4 uppercase">We Can&apos;t Wait to Hear From You!</h3>
          <p className="text-lg">
            Your message matters to us. Whether you&apos;re seeking prayer, looking to connect, or wanting to grow in your faith journey, 
            we&apos;re here to walk with you every step of the way.
          </p>
        </div>
      </div>
    </div>
  )
}

// Page-level metadata removed: this page is a client component ('use client')
// and exporting `metadata` is not allowed. Use site-level metadata in `app/layout.tsx`.
