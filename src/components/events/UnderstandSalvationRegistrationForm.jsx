'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { AlertCircle, CheckCircle, Loader2, Mail } from 'lucide-react';
import { registerEvent } from '@/lib/registerEvent'
const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  canAttendAllDays: '',
  expectations: ''
};
export default function UnderstandingSalvationRegistrationForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.canAttendAllDays) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');
    let registrationSaved = false;
    try {
      await registerEvent('understanding-salvation', formData);
      registrationSaved = true;
      const emailJsPublicKey = import.meta.env.VITE_EMAILJS_NTCW_PUBLIC_KEY;
      if (!emailJsPublicKey) {
        throw new Error('Email configuration is missing. Please contact support.');
      }
      const eventName = '4 Days of Understanding Salvation';
      const eventDate = 'April 13, 14, 16 & 17, 2026 (Mon, Tue, Thu, Fri)';
      const eventTime = '7:00 PM';
      const venue = 'The Light House, Opp 43B, Babaponmile Street, Mangoro, Ikeja';

      // Registrant confirmation email
      await emailjs.send('service_1s73jcl', 'template_jb7gzkd', {
        to_email: formData.email,
        to_name: formData.fullName,
        event_name: eventName,
        event_date: eventDate,
        event_time: eventTime,
        meet_link: venue,
        from_name: 'Jubilee Christian Centre Church',
        host_name: 'Apostle Isaiah Peter Nelson',
        registrant_email: formData.email,
        registrant_phone: formData.phone,
        registrant_commitment: formData.canAttendAllDays === 'yes' ? 'Yes' : 'No',
        registrant_expectations: formData.expectations || 'N/A',
        slots: '6 Participants',
        feature_topic: 'Understanding Salvation'
      }, emailJsPublicKey);

      // Admin notification email
      await emailjs.send('service_1s73jcl', 'template_azapebl', {
        to_email: 'inthelightcommunity@gmail.com',
        to_name: 'Admin',
        registrant_name: formData.fullName,
        registrant_email: formData.email,
        registrant_phone: formData.phone,
        registrant_commitment: formData.canAttendAllDays === 'yes' ? 'Yes' : 'No',
        registrant_expectations: formData.expectations || 'N/A',
        event_name: eventName,
        event_date: eventDate,
        event_time: eventTime,
        from_name: 'Understanding Salvation Registration System'
      }, emailJsPublicKey);
      setStatus('success');
      setFormData(initialFormState);
    } catch (error) {
      console.error('Understanding Salvation registration error:', error);
      if (registrationSaved) {
        setStatus('success');
        setFormData(initialFormState);
      } else {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Registration failed. Please try again.');
      }
    }
  };
  if (status === 'success') {
    return <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <CheckCircle className="mx-auto mb-3 h-8 w-8 text-green-600" />
        <h3 className="mb-2 text-2xl font-bold text-jcc-navy">Registration Successful</h3>
        <p className="mb-3 text-gray-700">
          Your seat request has been received. Watch your inbox for confirmation details.
        </p>
        <p className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-gray-600">
          Check your spam or junk folder if you do not see the email in a few minutes.
        </p>
      </div>;
  }
  return <div id="register" className="scroll-mt-48">
      <div className="mb-0">
        <h3 className="text-3xl font-bold text-jcc-navy">Join Cohort 1.0</h3>
        <p className="mt-2 text-sm text-slate-500 font-medium">Limited to <span className="text-jcc-orange font-bold">6 Students</span> for maximum focus.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
            <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required placeholder="Your full name" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-jcc-navy placeholder-slate-400 outline-none transition-all focus:border-jcc-orange/30 focus:bg-white focus:ring-4 focus:ring-jcc-orange/5" />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-jcc-navy placeholder-slate-400 outline-none transition-all focus:border-jcc-orange/30 focus:bg-white focus:ring-4 focus:ring-jcc-orange/5" />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">Phone (WhatsApp preferred)</label>
            <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+234..." className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-jcc-navy placeholder-slate-400 outline-none transition-all focus:border-jcc-orange/30 focus:bg-white focus:ring-4 focus:ring-jcc-orange/5" />
          </div>

          <div>
            <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-slate-500">Commitment: All 4 Days?</label>
            <div className="flex gap-4">
              <label className={`flex-1 cursor-pointer rounded-2xl border px-5 py-4 text-center transition-all ${formData.canAttendAllDays === 'yes' ? 'border-jcc-orange bg-jcc-orange/5 font-bold text-jcc-orange ring-4 ring-jcc-orange/5' : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-white'}`}>
                <input type="radio" name="canAttendAllDays" value="yes" checked={formData.canAttendAllDays === 'yes'} onChange={handleChange} required className="sr-only" />
                Fully Committed
              </label>
              <label className={`flex-1 cursor-pointer rounded-2xl border px-5 py-4 text-center transition-all ${formData.canAttendAllDays === 'no' ? 'border-slate-300 bg-slate-100 font-bold text-slate-600' : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-white'}`}>
                <input type="radio" name="canAttendAllDays" value="no" checked={formData.canAttendAllDays === 'no'} onChange={handleChange} className="sr-only" />
                Uncertain
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="expectations" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
              Personal Goal / Expectation
            </label>
            <textarea id="expectations" name="expectations" rows={3} value={formData.expectations} onChange={handleChange} placeholder="What do you hope to gain?" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-jcc-navy placeholder-slate-400 outline-none transition-all focus:border-jcc-orange/30 focus:bg-white focus:ring-4 focus:ring-jcc-orange/5" />
          </div>
        </div>

        {status === 'error' && <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-600">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm font-semibold leading-none">{errorMessage}</span>
          </div>}

        <button type="submit" disabled={status === 'submitting'} className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-jcc-navy py-5 text-lg font-bold text-white transition-all hover:bg-jcc-navy/90 hover:shadow-xl active:scale-[0.98] disabled:opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-jcc-orange to-jcc-gold opacity-0 transition-opacity group-hover:opacity-10"></div>
          {status === 'submitting' ? <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Processing Registration...
            </> : <>
              <Mail className="h-5 w-5" />
              Request Training Slot
            </>}
        </button>

        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-300">
          Cohort 1.0 • April 2026 • JCC
        </p>
      </form>
    </div>;
}
