'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
export default function WebinarRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    organization: ''
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      // Send registration data to backend API
      const apiResponse = await fetch('/api/nation-takers-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          occupation: formData.occupation,
          organization: formData.organization
        })
      });
      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Registration failed. Please try again.');
      }

      // Send confirmation email with Google Meet link via EmailJS
      const emailJsPublicKey = import.meta.env.VITE_EMAILJS_NTCW_PUBLIC_KEY;
      if (!emailJsPublicKey) {
        console.error('EmailJS public key not found');
        throw new Error('Email configuration error. Please contact support.');
      }
      try {
        // Send confirmation email to user
        await emailjs.send('service_janbhlb', 'template_2r34yat', {
          to_email: formData.email,
          to_name: formData.fullName,
          event_name: 'Nation Takers Career Webinar 1.0',
          event_date: 'Saturday, February 7th, 2026',
          event_time: '10:00 AM WAT',
          meet_link: 'https://meet.google.com/nex-hpqd-wbi',
          from_name: 'The Light Community Church',
          host_name: 'Peter Nelson-Isaiah, Leader of The Light Community Church'
        }, emailJsPublicKey);

        // Send admin notification with registration details
        await emailjs.send('service_janbhlb', 'template_16gwt8g', {
          to_email: 'inthelightcommunity@gmail.com',
          to_name: 'Admin',
          registrant_name: formData.fullName,
          registrant_email: formData.email,
          registrant_phone: formData.phone,
          registrant_occupation: formData.occupation,
          registrant_organization: formData.organization || 'N/A',
          event_name: 'Nation Takers Career Webinar 1.0',
          event_date: 'Saturday, February 7th, 2026',
          from_name: 'NTCW Registration System'
        }, emailJsPublicKey);
      } catch (emailError) {
        console.error('EmailJS error:', emailError);
        throw new Error('Failed to send confirmation email. Please contact us at inthelightcommunity@gmail.com');
      }
      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        occupation: '',
        organization: ''
      });
    } catch (error) {
      console.error('Registration error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };
  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  if (status === 'success') {
    return <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
        <p className="text-gray-300">
          Check your email for the Google Meet link and event details. See you at the webinar!
        </p>
      </div>;
  }
  return <div id="register" className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm scroll-mt-48">
      <h3 className="text-2xl font-bold text-white mb-6">Register for the Webinar</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name *
          </label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-orange" placeholder="John Doe" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address *
          </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-orange" placeholder="john@example.com" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone Number *
          </label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-orange" placeholder="+234 xxx xxx xxxx" />
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-300 mb-1">
            Current Occupation/Role *
          </label>
          <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-orange" placeholder="e.g. Software Engineer, Business Analyst, Student" />
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-1">
            Organization/Company (Optional)
          </label>
          <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-orange" placeholder="Your company name" />
        </div>

        {status === 'error' && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
            {errorMessage || 'Registration failed. Please try again.'}
          </div>}

        <button type="submit" disabled={status === 'submitting'} className="w-full bg-tlcc-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
          {status === 'submitting' ? 'Registering...' : 'Register Now'}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          By registering, you agree to receive event communications and updates.
        </p>
      </form>
    </div>;
}
