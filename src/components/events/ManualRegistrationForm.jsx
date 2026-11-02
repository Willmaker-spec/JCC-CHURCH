'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
export default function ManualRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rideShare: '',
    location: ''
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      // Send registration data to backend API
      const apiResponse = await fetch('/api/manual-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          rideShare: formData.rideShare,
          location: formData.location
        })
      });
      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Registration failed. Please try again.');
      }

      // Send confirmation email via EmailJS (reusing NTCW keys)
      const emailJsPublicKey = import.meta.env.VITE_EMAILJS_NTCW_PUBLIC_KEY;
      if (!emailJsPublicKey) {
        console.error('EmailJS public key not found');
        throw new Error('Email configuration error. Please contact support.');
      }
      try {
        // Send confirmation email to user
        await emailjs.send('service_1s73jcl', 'template_jb7gzkd', {
          to_email: formData.email,
          to_name: formData.fullName,
          event_name: 'The Manual',
          event_date: 'Saturday, March 7th, 2026',
          event_time: '10:00 AM WAT',
          meet_link: 'The Light House, Opp 43B, Babaponmile Street, Mangoro, Ikeja',
          from_name: 'Jubilee Christian Centre Church',
          host_name: 'Peter Nelson-Isaiah, Leader of Jubilee Christian Centre Church'
        }, emailJsPublicKey);

        // Send admin notification with registration details
        await emailjs.send('service_1s73jcl', 'template_azapebl', {
          to_email: 'inthelightcommunity@gmail.com',
          to_name: 'Admin',
          registrant_name: formData.fullName,
          registrant_email: formData.email,
          registrant_phone: formData.phone,
          registrant_ride_share: formData.rideShare === 'yes' ? 'Yes' : 'No',
          registrant_location: formData.location || 'N/A',
          event_name: 'The Manual',
          event_date: 'Saturday, March 7th, 2026',
          from_name: 'Manual Registration System'
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
        rideShare: '',
        location: ''
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
    return <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-green-600 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-tlcc-navy mb-2">Registration Successful!</h3>
        <p className="text-gray-600 mb-3">
          Check your email for event details. See you at The Manual!
        </p>
        <p className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
          📩 <strong>Don&apos;t see the email?</strong> Check your <strong>Spam</strong> or <strong>Junk</strong> folder and mark it as &quot;Not Spam&quot; so you don&apos;t miss future updates.
        </p>
      </div>;
  }
  return <div id="register" className="bg-white rounded-[32px] shadow-2xl border border-tlcc-cream p-8 md:p-10 scroll-mt-48">
      <h3 className="text-2xl font-bold text-tlcc-navy mb-6">Register for The Manual</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-orange" placeholder="John Doe" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-orange" placeholder="john@example.com" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-orange" placeholder="+234 xxx xxx xxxx" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interested in sharing a ride? *
          </label>
          <div className="flex gap-4">
            <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${formData.rideShare === 'yes' ? 'border-tlcc-orange bg-tlcc-orange/10 text-tlcc-orange font-semibold' : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'}`}>
              <input type="radio" name="rideShare" value="yes" checked={formData.rideShare === 'yes'} onChange={handleChange} required className="sr-only" />
              <span>Yes</span>
            </label>
            <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${formData.rideShare === 'no' ? 'border-tlcc-orange bg-tlcc-orange/10 text-tlcc-orange font-semibold' : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'}`}>
              <input type="radio" name="rideShare" value="no" checked={formData.rideShare === 'no'} onChange={handleChange} className="sr-only" />
              <span>No</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Your Location {formData.rideShare === 'yes' ? '*' : '(Optional)'}
          </label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required={formData.rideShare === 'yes'} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-orange" placeholder="e.g. Ikeja, Yaba, Lekki" />
          {formData.rideShare === 'yes' && <p className="text-xs text-gray-500 mt-1">This helps us coordinate ride-sharing for attendees in similar areas.</p>}
        </div>

        {status === 'error' && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
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
