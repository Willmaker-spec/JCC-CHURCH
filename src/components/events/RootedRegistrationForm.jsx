'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle, Loader2, AlertCircle, Users } from 'lucide-react';
const initialState = {
  fullName: '',
  email: '',
  phone: ''
};
export default function RootedRegistrationForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'yWKH6btB5bEwVcFHU';
  const updateField = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone) {
      setStatus('error');
      setMessage('Please provide your full name, email and phone number.');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const submission = {
        ...form
      };
      const response = await fetch('/api/rooted-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...submission
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to save your registration right now.');
      }
      try {
        await emailjs.send('service_neo34an', 'template_ibwm048', {
          full_name: submission.fullName,
          name: submission.fullName,
          email: submission.email,
          phone: submission.phone,
          event: 'Heart Room',
          time: new Date().toLocaleString('en-NG', {
            timeZone: 'Africa/Lagos',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }, emailPublicKey);
      } catch (emailError) {
        console.error('Heart Room registration email error:', emailError);
      }
      setStatus('success');
      setMessage('You are booked in! We will confirm via email/WhatsApp.');
      setForm(initialState);
    } catch (error) {
      console.error('Heart Room registration error:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };
  return <div className="bg-white rounded-[32px] shadow-2xl border border-tlcc-cream p-8 md:p-10 scroll-mt-48" id="register">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-semibold text-tlcc-navy block mb-2 uppercase tracking-wide">Full Name</label>
            <input type="text" value={form.fullName} onChange={event => updateField('fullName', event.target.value)} required placeholder="Surname & first name" className="w-full border-2 border-tlcc-cream rounded-xl px-4 py-3 focus:outline-none focus:border-tlcc-orange text-tlcc-navy" />
          </div>
          <div>
            <label className="text-sm font-semibold text-tlcc-navy block mb-2 uppercase tracking-wide">Email</label>
            <input type="email" value={form.email} onChange={event => updateField('email', event.target.value)} required placeholder="example@tlcc.ng" className="w-full border-2 border-tlcc-cream rounded-xl px-4 py-3 focus:outline-none focus:border-tlcc-orange text-tlcc-navy" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-tlcc-navy block mb-2 uppercase tracking-wide">Phone Number</label>
          <input type="tel" value={form.phone} onChange={event => updateField('phone', event.target.value)} required placeholder="WhatsApp-enabled phone" className="w-full border-2 border-tlcc-cream rounded-xl px-4 py-3 focus:outline-none focus:border-tlcc-orange text-tlcc-navy" />
          <p className="text-xs text-gray-500 mt-2">One form = one seat. Register again if you&apos;re bringing someone.</p>
        </div>

        {status === 'success' && <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl px-4 py-3">
            <CheckCircle className="h-5 w-5" />
            <p className="text-sm font-semibold">{message}</p>
          </div>}

        {status === 'error' && <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-semibold">{message}</p>
          </div>}

        <button type="submit" disabled={status === 'loading'} className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-tlcc-orange to-tlcc-gold text-white font-bold uppercase tracking-wide rounded-full py-4 shadow-xl hover:shadow-2xl transition disabled:opacity-60">
          {status === 'loading' ? <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving your seat...
            </> : <>
              <Users className="h-5 w-5" /> Reserve My Seat
            </>}
        </button>
        <p className="text-xs text-gray-500 text-center">
          We&apos;ll confirm your registration via email/WhatsApp. By registering you consent to receive event updates.
        </p>
      </form>
    </div>;
}
